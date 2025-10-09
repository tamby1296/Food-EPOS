import React, { useEffect, useRef, useState } from "react";
import { Root, List, Trigger, Content } from "@radix-ui/react-tabs";

interface ITabs {
  trigger: string;
  value: string;
  content?: React.ReactNode;
}

interface ITabViewProps extends React.PropsWithChildren {
  tabs: ITabs[];
  onTabChange?: (x: string) => void;
  defaultTab?: string | null;
}

const TabView: React.FC<ITabViewProps> = ({
  tabs,
  defaultTab,
  children,
  onTabChange,
}) => {
  const [tab, setTab] = useState(defaultTab ?? tabs[0].value);
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0 });
  const trigerList = useRef<HTMLDivElement>(null);

  const positionActiveIndicator = () => {
    if (!trigerList.current) return;
    const currentTab = trigerList.current.querySelector(
      "[data-state=active]"
    ) as HTMLElement;

    if (currentTab) {
      setIndicatorStyle({
        left: currentTab.offsetLeft,
        width: currentTab.offsetWidth,
      });
    }
  };

  const handleValueChange = (tab: string) => {
    if (onTabChange) onTabChange(tab);
    positionActiveIndicator();
    setTab(tab);
  };

  useEffect(() => {
    setTab(defaultTab ?? tabs[0].value);
    positionActiveIndicator();
  }, [defaultTab, tabs]);

  useEffect(() => {
    window.addEventListener("resize", positionActiveIndicator);
    return () => window.removeEventListener("resize", positionActiveIndicator);
  }, []);

  if (tabs.length === 0) return;
  return (
    <Root
      className="flex w-full flex-col"
      value={tab}
      defaultValue={defaultTab ?? tabs[0].value}
      onValueChange={handleValueChange}
    >
      <List
        ref={trigerList}
        className="relative flex gap-8 shrink-0 border-b border-kAppCharcoal"
        aria-label="Manage your account"
      >
        {tabs.map((t) => (
          <Trigger
            className="pb-2 data-[state=active]:text-kAppCoral"
            key={t.value}
            value={t.value}
          >
            {t.trigger}
          </Trigger>
        ))}
        <div
          className="absolute bottom-0 self-end h-1 w-3/4 rounded-sm transition-all duration-200 bg-kAppCoral"
          style={{
            left: indicatorStyle.left,
            width: indicatorStyle.width * 0.75,
          }}
        ></div>
      </List>
      {children ??
        tabs.map((t) => (
          <Content key={t.value} value={t.value}>
            {t.content}
          </Content>
        ))}
    </Root>
  );
};

export default TabView;
