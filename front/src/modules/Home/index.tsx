import { useAtomValue } from "jotai";
import { useSearchParams } from "react-router";
import { useEffect, useMemo } from "react";

import { cn } from "@/utils/Classname";

import MealListView from "./Views/MealListView";
import OrderDetails from "./Views/OrderDetails";
import { SEACH_PARAM_KEY } from "./Constants/SearchParams";
import useMealTabs from "./Hooks/useMealTabs";
import { OrderAtom } from "./Store/Order.atom";

const HomeScreen = () => {
  const orders = useAtomValue(OrderAtom);
  const hasOrders = useMemo(() => orders.length > 0, [orders]);

  return (
    <div className={cn(!hasOrders ? "w-10/12 mx-auto" : "flex pr-[400px]")}>
      <MealListView />
      {hasOrders && <OrderDetails />}
    </div>
  );
};

export { HomeScreen };

export function Component() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { tabs } = useMealTabs();

  useEffect(() => {
    if (!searchParams.get(SEACH_PARAM_KEY)) {
      searchParams.set(SEACH_PARAM_KEY, tabs[0].value);
      setSearchParams(searchParams);
    }
  }, [tabs, searchParams, setSearchParams]);

  if (tabs.length < 1) return;
  return <HomeScreen />;
}
