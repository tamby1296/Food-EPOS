import { Root, Item } from "@radix-ui/react-radio-group";
import { cva } from "class-variance-authority";
import React, { useState } from "react";

interface IRadioButtonProps {
  options: Array<{
    label: string;
    value: string;
  }>;
}

const RadioItemVariants = cva("text-sm font-bold px-3 py-2 rounded-md", {
  variants: {
    isActive: {
      true: "bg-kAppCoral text-kAppWhite",
      false: "text-kAppCoral border border-kAppCharcoal",
    },
  },
});

const RadioButton: React.FC<IRadioButtonProps> = ({ options }) => {
  const [value, setValue] = useState(options[0].value);
  return (
    <Root
      className="w-full flex gap-2"
      defaultValue={value}
      onValueChange={(v) => setValue(v)}
    >
      {options.map((option, i) => (
        <Item
          className={RadioItemVariants({ isActive: option.value === value })}
          value={option.value}
          key={i}
        >
          {option.label}
        </Item>
      ))}
    </Root>
  );
};

export default RadioButton;
