import DeleteIcon from "@icons/trash.svg?react";
import FieldInput from "./FieldInput";
import { FormatPrice } from "@/utils/Numbers";
import { useAtom } from "jotai";
import { removeFromOrderAtom } from "@/modules/Home/Store/Order.atom";

interface IOrderLineProps {
  id: string;
  name: string;
  price: number;
  qty: number;
}

const OrderLine: React.FC<IOrderLineProps> = ({ id, name, price, qty }) => {
  const [, removeFromOrder] = useAtom(removeFromOrderAtom);

  const HandleRemoveClick = (): void => {
    removeFromOrder(id);
  };

  return (
    <div className="my-6 w-full">
      <div className="flex flex-col gap-2">
        <div className="flex gap-2 overflow-hidden justify-center items-center">
          <div className="flex gap-2 w-full">
            <img
              alt="product-name"
              src="images/meals/spicy_ramen.png"
              width={40}
              height={40}
            />
            <div>
              <p className="mb-1 text-sm font-bold truncate">{name}</p>
              <p className="text-xs opacity-55">$ {FormatPrice(price)}</p>
            </div>
          </div>
          <FieldInput
            className="font-bold [&>input]:text-center [&>input]:aspect-square [&>input]:w-10 [&>input]:rounded-md p-0"
            value={qty.toString()}
          />
          <p className="ml-2 font-bold whitespace-nowrap">
            $ {FormatPrice(price * qty)}
          </p>
        </div>
        <div className="flex gap-2 items-center">
          <FieldInput
            placeholder="Order note..."
            className="w-full pl-3 py-3 text-sm h-10 rounded-md"
          />
          <button
            className="ml-2 border border-kAppCoral p-3 rounded-md"
            onClick={HandleRemoveClick}
          >
            <DeleteIcon className="fill-kAppCoral" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderLine;
