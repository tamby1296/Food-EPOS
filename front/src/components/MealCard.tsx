import React, { useEffect, useRef, useState } from "react";

interface IMealCardProps {
  title?: string;
  price?: number;
  qty?: number;
  img?: string;
}

const MealCard: React.FC<IMealCardProps> = ({ title, price, qty, img }) => {
  const [paddingTop, setPaddingTop] = useState(0);
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

  return (
    <button
      className="mt-16 mb-7 w-full md:w-[calc(33.3%-28px)] lg:w-[calc(20%-28px)] aspect-square rounded-lg bg-kAppDarkNavy px-6 pb-5 text-center relative"
      style={{
        paddingTop: paddingTop,
      }}
    >
      <img
        className="aspect-square w-4/6 absolute -top-[50px] left-0 translate-x-1/4"
        alt={title}
        src={img}
        ref={imgRef}
      />
      <p className="font-bold truncate">{title}</p>
      <p>$ {price}</p>
      <p className="opacity-30 truncate">{qty} remaining</p>
    </button>
  );
};

export default MealCard;
