import React from "react";
import {
  Content,
  Icon,
  Item,
  ItemText,
  Portal,
  Root,
  Trigger,
  Value,
  Viewport,
} from "@radix-ui/react-select";

import ChevronIcon from "@icons/chevron.svg?react";

interface ISelectBoxProps {
  options: Array<{
    label: string;
    value: string;
  }>;
}

const SelectBox: React.FC<ISelectBoxProps> = ({ options }) => {
  return (
    <Root defaultValue={options[0].value}>
      <Trigger className="p-4 rounded-lg flex items-center gap-3 bg-kAppDarkNavy border border-kAppCharcoal focus:outline-none">
        <Icon className="flex items-center justify-center w-5 h-5">
          <ChevronIcon />
        </Icon>
        <Value placeholder="Select an option" />
      </Trigger>
      <Portal>
        <Content
          className="rounded-md bg-kAppDarkNavy border border-kAppCharcoal px-3 py-2 "
          align="center"
        >
          <Viewport>
            {options.map((option, i) => (
              <Item
                key={i}
                value={option.value}
                className="hover:outline-none focus:outline-none data-[highlighted]:bg-kAppCoral p-1 rounded-sm"
              >
                <ItemText>{option.label}</ItemText>
              </Item>
            ))}
          </Viewport>
        </Content>
      </Portal>
    </Root>
  );
};

export default SelectBox;
