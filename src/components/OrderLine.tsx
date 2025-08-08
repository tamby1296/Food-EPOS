import DeleteIcon from "@icons/trash.svg?react";

const OrderLine = () => {
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
              <p className="mb-1 text-sm font-bold truncate">
                Spicy Ramen Delight
              </p>
              <p className="text-xs opacity-55">$ 2.29</p>
            </div>
          </div>
          <input className="font-bold text-center aspect-square h-full w-10 rounded-md" />
          <p className="ml-2 font-bold whitespace-nowrap">$ 4,56</p>
        </div>
        <div className="flex gap-2 items-center">
          <input
            className="pl-3 py-3 text-sm w-full h-10 rounded-md"
            placeholder="Order Note..."
          />
          <button className="ml-2 border border-kAppCoral p-3 rounded-md">
            <DeleteIcon className="fill-kAppCoral" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderLine;
