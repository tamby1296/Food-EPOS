import { formatDate } from "@/utils/Date";
import { FormatPrice } from "@/utils/Numbers";
import DonutChart from "@/components/charts/DonutChart";
import SimpleBarChart from "@/components/charts/SimpleBarChart";

import {
  OrderReport,
  OrderTypeBreakdown,
  SalesReport,
  StatCards,
} from "./Constants/DummyData";

const StatusVariant: Record<string, string> = {
  Paid: "text-kAppCoral",
  Pending: "text-kAppCoolGray",
};

const DashboardScreen = () => {
  return (
    <div className="p-7">
      <div className="mb-10">
        <h1 className="text-3xl font-semibold">Dashboard</h1>
        <h2>{formatDate(new Date(), "EEEE, dd MMMM yyyy")}</h2>
      </div>

      <div className="grid grid-cols-3 gap-6 mb-6">
        {StatCards.map((stat) => (
          <div
            key={stat.label}
            className="bg-kAppDarkNavy rounded-lg p-6 border border-kAppCharcoal"
          >
            <p className="text-kAppCoolGray text-sm mb-2">{stat.label}</p>
            <p className="text-2xl font-bold">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-3 gap-6 items-start">
        <div className="col-span-2 bg-kAppDarkNavy rounded-lg p-6 border border-kAppCharcoal">
          <h3 className="text-xl font-bold mb-4">Order Report</h3>
          <div className="w-full flex font-bold text-sm mb-2 gap-2 text-kAppCoolGray">
            <p className="w-3/12">Order</p>
            <p className="w-3/12">Type</p>
            <p className="w-2/12 text-center">Items</p>
            <p className="w-2/12 text-right">Total</p>
            <p className="w-2/12 text-right">Status</p>
          </div>
          <div className="border-t border-kAppCharcoal">
            {OrderReport.map((order) => (
              <div
                key={order.id}
                className="flex gap-2 py-3 border-b border-kAppCharcoal text-sm"
              >
                <p className="w-3/12 font-bold">#{order.id}</p>
                <p className="w-3/12">{order.type}</p>
                <p className="w-2/12 text-center">{order.items}</p>
                <p className="w-2/12 text-right font-bold">
                  $ {FormatPrice(order.total)}
                </p>
                <p
                  className={`w-2/12 text-right font-bold ${
                    StatusVariant[order.status] ?? ""
                  }`}
                >
                  {order.status}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <div className="bg-kAppDarkNavy rounded-lg p-6 border border-kAppCharcoal">
            <h3 className="text-xl font-bold mb-4">Sales Report</h3>
            <SimpleBarChart data={SalesReport} />
          </div>

          <div className="bg-kAppDarkNavy rounded-lg p-6 border border-kAppCharcoal">
            <h3 className="text-xl font-bold mb-4">Most Type of Order</h3>
            <div className="flex items-center justify-center mb-4">
              <DonutChart data={OrderTypeBreakdown} />
            </div>
            <div className="flex flex-col gap-2">
              {OrderTypeBreakdown.map((slice) => (
                <div
                  key={slice.label}
                  className="flex items-center justify-between text-sm"
                >
                  <div className="flex items-center gap-2">
                    <span
                      className="size-3 rounded-full shrink-0"
                      style={{ backgroundColor: slice.color }}
                    />
                    <p>{slice.label}</p>
                  </div>
                  <p className="font-bold">{slice.value}%</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export { DashboardScreen };

export function Component() {
  return <DashboardScreen />;
}
