import { cn } from "@/utils/Classname";
import React from "react";

interface IFieldInputProps {
  placeholder?: string;
  className?: string;
  icon?: React.ReactNode;
  value?: string;
}

const FieldInput: React.FC<IFieldInputProps> = ({
  placeholder,
  className,
  icon,
  value,
}) => {
  return (
    <div
      className={cn(
        "p-4 bg-kAppSlate rounded-[8px] flex gap-4 items-center justify-between border border-kAppCharcoal ",
        className
      )}
    >
      {icon}
      <input
        placeholder={placeholder}
        value={value}
        className="bg-kAppSlate text-kAppCoolGray w-full"
      />
    </div>
  );
};

export default FieldInput;
