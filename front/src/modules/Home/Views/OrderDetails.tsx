import OrderLine from "@/components/OrderLine";
import RadioButton from "@/components/RadioButton";

import { MealOptions } from "../Constants/Options";
import { useAtomValue } from "jotai";
import { OrderAtom } from "../Store/Order.atom";
import { useMemo } from "react";
import { FormatPrice } from "@/utils/Numbers";

const OrderDetails = () => {
  const orders = useAtomValue(OrderAtom);
  const orderTotal = useMemo(() => {
    return orders.reduce((acc, { price, qty }) => acc + price * qty, 0);
  }, [orders]);

  return (
    <div className="fixed right-0 h-full p-6 pb-[200px] w-[400px] bg-kAppDarkNavy flex flex-col items-start">
      <h3 className="text-xl font-bold mb-6">Order #34562</h3>
      <div className="mb-6">
        <RadioButton options={MealOptions} />
      </div>
      <div className="w-full flex font-bold mb-2 gap-2">
        <p className="flex-grow">Item</p>
        <p className="basis-[50px]">Qty</p>
        <p className="basis-[50px]">Price</p>
      </div>
      <div className="w-full flex-1 pr-2 overflow-auto border-t border-b">
        {orders.map((o) => (
          <OrderLine key={o.id} {...o} />
        ))}
      </div>
      <div className="absolute w-[calc(100%-3rem)] box-content left-0 bottom-0 mx-6 mb-6">
        <div className="flex justify-between items-center mb-4">
          <p>Discount</p>
          <p>$0</p>
        </div>
        <div className="flex justify-between items-center mb-10">
          <p>Sub total</p>
          <p>$ {FormatPrice(orderTotal)}</p>
        </div>
        <button className="bg-kAppCoral w-full font-bold text-sm rounded-md p-3">
          Continue to Payment
        </button>
      </div>
    </div>
  );
};

export default OrderDetails;
