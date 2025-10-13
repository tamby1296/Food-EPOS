import { cn } from "@/utils/Classname";
import React from "react";

interface IFieldInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  placeholder?: string;
  className?: string;
  icon?: React.ReactNode;
}

const FieldInput: React.FC<IFieldInputProps> = ({
  placeholder,
  className,
  icon,
  value,
  ...props
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
        {...props}
        className="bg-kAppSlate text-kAppCoolGray w-full"
      />
    </div>
  );
};

export default FieldInput;
