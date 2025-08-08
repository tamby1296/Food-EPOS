import React from "react";

interface IMealCardProps {
  title?: string;
  price?: number;
  qty?: number;
  img?: string;
}

const MealCard: React.FC<IMealCardProps> = ({ title, price, qty, img }) => {
  return (
    <div className="mt-16 m-7 w-[192px] rounded-lg bg-kAppDarkNavy px-6 pb-5 pt-[100px] text-center relative">
      <img
        className="aspect-square w-[132px] absolute -top-[50px] left-0 translate-x-1/4"
        alt={title}
        src={img}
      />
      <p className="font-bold">{title}</p>
      <p>$ {price}</p>
      <p className="opacity-30">{qty} Bowls available</p>
    </div>
  );
};

export default MealCard;
