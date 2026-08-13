import OrderLine from "@/components/OrderLine";
import RadioButton from "@/components/RadioButton";

import { MealOptions } from "../Constants/Options";
import { useAtomValue } from "jotai";
import { OrderAtom } from "../Store/Order.atom";
import { useMemo } from "react";
import { useNavigate } from "react-router";
import { FormatPrice } from "@/utils/Numbers";

const OrderDetails = () => {
  const navigate = useNavigate();
  const orders = useAtomValue(OrderAtom);
  const orderTotal = useMemo(() => {
    return orders.reduce((acc, { price, qty }) => acc + price * qty, 0);
  }, [orders]);

  const HandleContinueClick = (): void => {
    navigate("/checkout");
  };

  return (
    <div className="fixed right-0 h-full p-6 pb-[200px] w-3/12 bg-kAppDarkNavy flex flex-col items-start">
      <h3 className="text-xl font-bold mb-6">Order #34562</h3>
      <div className="mb-6">
        <RadioButton options={MealOptions} />
      </div>
      <div className="w-full flex font-bold mb-2 gap-2">
        <div className="w-10/12 flex">
          <p className="w-full">Item</p>
          <p className="w-10 shrink-0">Qty</p>
        </div>
        <p className="w-2/12 text-center">Price</p>
      </div>
      <div className="w-full flex-1 overflow-auto border-t border-b">
        {orders.map((o) => (
          <OrderLine key={o.id} img={o.imgURL} {...o} />
        ))}
      </div>
      <div className="absolute w-[calc(100%-3rem)] box-content left-0 bottom-0 mx-6 mb-6">
        <div className="flex justify-between items-center mb-4">
          <p>Discount</p>
          <p>$ {FormatPrice(0)}</p>
        </div>
        <div className="flex justify-between items-center mb-10">
          <p>Sub total</p>
          <p>$ {FormatPrice(orderTotal)}</p>
        </div>
        <button
          className="bg-kAppCoral w-full font-bold text-sm rounded-md p-3 hover:bg-kAppRed disabled:bg-kAppCoolGray"
          disabled={orders.length < 1}
          onClick={HandleContinueClick}
        >
          Continue to Payment
        </button>
      </div>
    </div>
  );
};

export default OrderDetails;
