import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import TabView from "@/components/TabView";
import { FormatPrice } from "@/utils/Numbers";
import { formatDate } from "@/utils/Date";
import { completeOrder, getOrders } from "@/services/orders";
import { OrderStatus } from "@/types/order";

const STATUS_TABS = [
  { trigger: "Created", value: "Created" },
  { trigger: "Completed", value: "Completed" },
];

export function Component() {
  const [status, setStatus] = useState<OrderStatus>("Created");
  const queryClient = useQueryClient();

  const ordersQuery = useQuery({
    queryKey: ["orders", status],
    queryFn: () => getOrders(status),
    staleTime: 0,
    refetchInterval: 15000,
  });

  const completeMutation = useMutation({
    mutationFn: (orderId: string) => completeOrder(orderId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
  });

  const orders = ordersQuery.data?.body ?? [];

  return (
    <div className="p-7 w-full">
      <h1 className="text-3xl font-semibold mb-6">Orders</h1>
      <TabView
        tabs={STATUS_TABS}
        defaultTab={status}
        onTabChange={(tab) => setStatus(tab as OrderStatus)}
      >
        <div className="mt-6 flex flex-col gap-3">
          {orders.map((order) => (
            <div
              key={order.id}
              className="bg-kAppDarkNavy rounded-lg p-4 flex items-center gap-4"
            >
              <div className="w-2/12">
                <p className="font-bold">Order #{order.orderNumber}</p>
                <p className="text-xs opacity-55">
                  {formatDate(order.createdAt, "MMM d, HH:mm")}
                </p>
              </div>
              <div className="w-4/12 text-sm opacity-70 truncate">
                {order.items
                  .map((item) => `${item.quantity}x ${item.mealName}`)
                  .join(", ")}
              </div>
              <div className="w-2/12 text-sm">
                {order.isDineIn
                  ? "Dine-in"
                  : order.deliveryAddress
                  ? "Delivery"
                  : "Takeaway"}
              </div>
              <div className="w-2/12 font-bold">
                $ {FormatPrice(order.total)}
              </div>
              <div className="w-2/12 flex justify-end">
                {order.status === "Created" ? (
                  <button
                    className="bg-kAppCoral font-bold text-sm rounded-md px-4 py-2 hover:bg-kAppRed disabled:bg-kAppCoolGray"
                    disabled={completeMutation.isPending}
                    onClick={() => completeMutation.mutate(order.id)}
                  >
                    Mark Complete
                  </button>
                ) : (
                  <span className="text-kAppCoolGray text-sm">Completed</span>
                )}
              </div>
            </div>
          ))}
          {orders.length < 1 && (
            <p className="text-kAppCoolGray py-6">No orders here yet.</p>
          )}
        </div>
      </TabView>
    </div>
  );
}
