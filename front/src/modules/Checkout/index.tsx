import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";

import FieldInput from "@/components/FieldInput";
import RadioButton from "@/components/RadioButton";
import { FormatPrice } from "@/utils/Numbers";
import { useCart } from "@/modules/Home/Hooks/useCart";
import { HttpError } from "@/services/http";

import { PaymentOptions } from "./Constants/PaymentOptions";

const ConfirmationPanel = () => {
  const { cart } = useCart();
  const items = cart?.items ?? [];

  return (
    <div className="p-7 w-full">
      <h1 className="text-3xl font-semibold mb-1">Confirmation</h1>
      <h3 className="text-xl font-bold mb-6">Cart</h3>

      <div className="w-full flex font-bold mb-2 gap-2 text-sm">
        <p className="w-6/12">Item</p>
        <p className="w-2/12 text-center">Qty</p>
        <p className="w-4/12 text-right">Price</p>
      </div>
      <div className="w-full border-t border-kAppCharcoal">
        {items.map((item) => (
          <div
            key={item.id}
            className="flex items-center gap-2 py-4 border-b border-kAppCharcoal"
          >
            <div className="w-6/12 flex items-center gap-3 overflow-hidden">
              <img
                alt={item.mealName}
                src={item.mealImgUrl ?? ""}
                width={40}
                height={40}
                className="shrink-0"
              />
              <p className="font-bold truncate">{item.mealName}</p>
            </div>
            <p className="w-2/12 text-center">{item.quantity}</p>
            <p className="w-4/12 text-right font-bold">
              $ {FormatPrice(item.unitPrice * item.quantity)}
            </p>
          </div>
        ))}
        {items.length < 1 && (
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
          <p>$ {FormatPrice(cart?.total ?? 0)}</p>
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
  const { cart, completeCart, isCompleting } = useCart();
  const items = cart?.items ?? [];
  const [method, setMethod] = useState(PaymentOptions[0].value);
  const [orderNumber, setOrderNumber] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (orderNumber === null) return;
    const timeout = setTimeout(() => {
      navigate("/");
    }, 1500);
    return () => clearTimeout(timeout);
  }, [orderNumber, navigate]);

  const HandleConfirmClick = async (): Promise<void> => {
    setError(null);
    try {
      const response = await completeCart();
      setOrderNumber(response?.body.orderNumber ?? null);
    } catch (err) {
      if (err instanceof HttpError && err.status === 410) {
        setError("This cart has expired. Please start a new order.");
      } else if (err instanceof HttpError && err.status === 400) {
        setError("Your cart is empty.");
      } else {
        setError("Something went wrong. Please try again.");
      }
    }
  };

  return (
    <div className="fixed right-0 h-full p-6 w-3/12 bg-kAppDarkNavy flex flex-col items-start">
      <h3 className="text-xl font-bold mb-6">Payment</h3>

      {orderNumber !== null ? (
        <div className="w-full flex-1 flex flex-col items-center justify-center text-center gap-2">
          <p className="text-2xl font-bold text-kAppCoral">
            Payment Successful!
          </p>
          <p className="text-kAppCoolGray text-sm">Order #{orderNumber}</p>
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

          {error && <p className="text-kAppRed text-sm mb-4">{error}</p>}

          <div className="w-full mt-auto">
            <div className="flex justify-between items-center mb-6">
              <p className="font-bold">Total Due</p>
              <p className="font-bold text-xl">
                $ {FormatPrice(cart?.total ?? 0)}
              </p>
            </div>
            <button
              className="bg-kAppCoral w-full font-bold text-sm rounded-md p-3 hover:bg-kAppRed disabled:bg-kAppCoolGray"
              disabled={items.length < 1 || isCompleting}
              onClick={HandleConfirmClick}
            >
              {isCompleting ? "Processing…" : "Confirm Payment"}
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
  const { cartId, cart, isLoading } = useCart();
  if (!cartId) return <NoOrderRedirect />;
  if (isLoading) return null;
  if (!cart || cart.items.length < 1) return <NoOrderRedirect />;
  return <CheckoutScreen />;
}

const NoOrderRedirect = () => {
  const navigate = useNavigate();
  useEffect(() => {
    navigate("/", { replace: true });
  }, [navigate]);
  return null;
};
