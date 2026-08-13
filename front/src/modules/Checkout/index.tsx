import { useEffect, useMemo, useState } from "react";
import { useAtomValue, useSetAtom } from "jotai";
import { Link, useNavigate } from "react-router";

import FieldInput from "@/components/FieldInput";
import RadioButton from "@/components/RadioButton";
import { FormatPrice } from "@/utils/Numbers";
import { OrderAtom } from "@/modules/Home/Store/Order.atom";

import { PaymentOptions } from "./Constants/PaymentOptions";

const ORDER_LABEL = "Order #34562";

const ConfirmationPanel = () => {
  const orders = useAtomValue(OrderAtom);
  const subTotal = useMemo(
    () => orders.reduce((acc, { price, qty }) => acc + price * qty, 0),
    [orders]
  );

  return (
    <div className="p-7 w-full">
      <h1 className="text-3xl font-semibold mb-1">Confirmation</h1>
      <h3 className="text-xl font-bold mb-6">{ORDER_LABEL}</h3>

      <div className="w-full flex font-bold mb-2 gap-2 text-sm">
        <p className="w-6/12">Item</p>
        <p className="w-2/12 text-center">Qty</p>
        <p className="w-4/12 text-right">Price</p>
      </div>
      <div className="w-full border-t border-kAppCharcoal">
        {orders.map((o) => (
          <div
            key={o.id}
            className="flex items-center gap-2 py-4 border-b border-kAppCharcoal"
          >
            <div className="w-6/12 flex items-center gap-3 overflow-hidden">
              <img
                alt={o.name}
                src={o.imgURL}
                width={40}
                height={40}
                className="shrink-0"
              />
              <p className="font-bold truncate">{o.name}</p>
            </div>
            <p className="w-2/12 text-center">{o.qty}</p>
            <p className="w-4/12 text-right font-bold">
              $ {FormatPrice(o.price * o.qty)}
            </p>
          </div>
        ))}
        {orders.length < 1 && (
          <p className="py-6 text-kAppCoolGray">No items in this order.</p>
        )}
      </div>

      <div className="max-w-sm mt-6">
        <div className="flex justify-between items-center mb-2">
          <p>Discount</p>
          <p>$ {FormatPrice(0)}</p>
        </div>
        <div className="flex justify-between items-center font-bold">
          <p>Sub total</p>
          <p>$ {FormatPrice(subTotal)}</p>
        </div>
      </div>

      <Link
        to="/"
        className="inline-block mt-8 text-sm text-kAppCoral font-bold"
      >
        &larr; Back to Menu
      </Link>
    </div>
  );
};

const PaymentPanel = () => {
  const navigate = useNavigate();
  const orders = useAtomValue(OrderAtom);
  const resetOrder = useSetAtom(OrderAtom);
  const [method, setMethod] = useState(PaymentOptions[0].value);
  const [isSuccess, setIsSuccess] = useState(false);

  const total = useMemo(
    () => orders.reduce((acc, { price, qty }) => acc + price * qty, 0),
    [orders]
  );

  useEffect(() => {
    if (!isSuccess) return;
    const timeout = setTimeout(() => {
      resetOrder([]);
      navigate("/");
    }, 1500);
    return () => clearTimeout(timeout);
  }, [isSuccess, navigate, resetOrder]);

  const HandleConfirmClick = (): void => {
    setIsSuccess(true);
  };

  return (
    <div className="fixed right-0 h-full p-6 w-3/12 bg-kAppDarkNavy flex flex-col items-start">
      <h3 className="text-xl font-bold mb-6">Payment</h3>

      {isSuccess ? (
        <div className="w-full flex-1 flex flex-col items-center justify-center text-center gap-2">
          <p className="text-2xl font-bold text-kAppCoral">
            Payment Successful!
          </p>
          <p className="text-kAppCoolGray text-sm">
            Redirecting to menu&hellip;
          </p>
        </div>
      ) : (
        <>
          <div className="mb-6 w-full">
            <p className="text-sm font-bold mb-2">Payment Method</p>
            <RadioButton options={PaymentOptions} onValueChange={setMethod} />
          </div>

          {method === "card" && (
            <div className="w-full flex flex-col gap-3 mb-6">
              <FieldInput
                placeholder="Card Number"
                className="w-full py-4"
              />
              <div className="flex gap-3">
                <FieldInput placeholder="MM/YY" className="w-1/2 py-4" />
                <FieldInput placeholder="CVV" className="w-1/2 py-4" />
              </div>
            </div>
          )}

          <div className="w-full mt-auto">
            <div className="flex justify-between items-center mb-6">
              <p className="font-bold">Total Due</p>
              <p className="font-bold text-xl">$ {FormatPrice(total)}</p>
            </div>
            <button
              className="bg-kAppCoral w-full font-bold text-sm rounded-md p-3 hover:bg-kAppRed disabled:bg-kAppCoolGray"
              disabled={orders.length < 1}
              onClick={HandleConfirmClick}
            >
              Confirm Payment
            </button>
          </div>
        </>
      )}
    </div>
  );
};

const CheckoutScreen = () => {
  return (
    <div className="w-9/12 flex pr-7">
      <ConfirmationPanel />
      <PaymentPanel />
    </div>
  );
};

export { CheckoutScreen };

export function Component() {
  const orders = useAtomValue(OrderAtom);
  if (orders.length < 1) return <NoOrderRedirect />;
  return <CheckoutScreen />;
}

const NoOrderRedirect = () => {
  const navigate = useNavigate();
  useEffect(() => {
    navigate("/", { replace: true });
  }, [navigate]);
  return null;
};
