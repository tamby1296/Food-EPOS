import { addToOrderAtom } from "@/modules/Home/Store/Order.atom";
import { FormatPrice } from "@/utils/Numbers";
import { useAtom } from "jotai";
import React, { useEffect, useRef, useState } from "react";

interface IMealCardProps {
  id: string;
  title?: string;
  price?: number;
  qty?: number;
  img?: string;
}

const MealCard: React.FC<IMealCardProps> = ({ id, title, price, qty, img }) => {
  const [paddingTop, setPaddingTop] = useState(0);
  const [, addToOrder] = useAtom(addToOrderAtom);
  const imgRef = useRef(null);

  const calculatePaddingTop = () => {
    if (!imgRef.current) return;
    setPaddingTop((imgRef.current as HTMLElement).offsetHeight - 50);
  };

  useEffect(() => {
    calculatePaddingTop();

    window.addEventListener("resize", calculatePaddingTop);
    return () => window.removeEventListener("resize", calculatePaddingTop);
  }, []);

  const HandleMealClick = (): void => {
    addToOrder({
      id,
      name: title ?? "",
      price: price ?? 0,
      img: img ?? "",
      qty: 1,
    });
  };

  return (
    <button
      className="mt-16 mb-7 w-full md:w-[calc(33.3%-28px)] lg:w-[calc(20%-28px)] aspect-square rounded-lg bg-kAppDarkNavy px-6 pb-5 text-center relative"
      style={{
        paddingTop: paddingTop,
      }}
      onClick={HandleMealClick}
    >
      <img
        className="aspect-square w-4/6 absolute -top-[50px] left-0 translate-x-1/4"
        alt={title}
        src={img}
        ref={imgRef}
      />
      <p className="font-bold truncate">{title}</p>
      <p>$ {FormatPrice(price)}</p>
      {qty && <p className="opacity-30 truncate">{qty} remaining</p>}
    </button>
  );
};

export default MealCard;
