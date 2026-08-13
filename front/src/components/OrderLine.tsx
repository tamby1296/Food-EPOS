import DeleteIcon from "@icons/trash.svg?react";
import FieldInput from "./FieldInput";
import { FormatPrice } from "@/utils/Numbers";
import { useAtom } from "jotai";
import {
  changeQtyAtom,
  removeFromOrderAtom,
} from "@/modules/Home/Store/Order.atom";
import { useCallback } from "react";

interface IOrderLineProps {
  id: string;
  name: string;
  img: string;
  price: number;
  qty: number;
}

const OrderLine: React.FC<IOrderLineProps> = ({
  id,
  name,
  img,
  price,
  qty,
}) => {
  const [, removeFromOrder] = useAtom(removeFromOrderAtom);
  const [, changeQty] = useAtom(changeQtyAtom);

  const HandleRemoveClick = (): void => {
    removeFromOrder(id);
  };

  const HandleQtyChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>): void => {
      const newQty = Number.parseInt(event.target.value);
      changeQty({
        id,
        qty: isNaN(newQty) ? 1 : newQty,
      });
    },
    [changeQty, id]
  );

  return (
    <div className="my-6 w-full">
      <div className="flex flex-col gap-2">
        <div className="flex gap-2 overflow-hidden justify-center items-center">
          <div className="w-10/12 flex">
            <div className="flex gap-2 w-full">
              <img alt={name} src={img} width={40} height={40} />
              <div>
                <p className="mb-1 text-sm font-bold truncate">{name}</p>
                <p className="text-xs opacity-55">$ {FormatPrice(price)}</p>
              </div>
            </div>
            <FieldInput
              className="font-bold [&>input]:text-center [&>input]:aspect-square [&>input]:w-10 [&>input]:rounded-md p-0"
              value={qty.toString()}
              onChange={HandleQtyChange}
            />
          </div>
          <p className="w-2/12 ml-2 truncate font-bold whitespace-nowrap text-center">
            $ {FormatPrice(price * qty)}
          </p>
        </div>
        <div className="flex gap-2 items-center">
          <FieldInput
            placeholder="Order note..."
            className="w-10/12 pl-3 py-3 text-sm h-10 rounded-md"
          />
          <button
            className="w-2/12 ml-2 border border-kAppCoral p-3 rounded-md hover:border-kAppRed"
            onClick={HandleRemoveClick}
          >
            <DeleteIcon className="fill-kAppCoral mx-auto" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderLine;
