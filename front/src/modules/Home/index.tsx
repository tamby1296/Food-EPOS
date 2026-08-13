import { useSearchParams } from "react-router";
import { useEffect } from "react";

import { cn } from "@/utils/Classname";

import MealListView from "./Views/MealListView";
import OrderDetails from "./Views/OrderDetails";
import { SEACH_PARAM_KEY } from "./Constants/SearchParams";
import useMealTabs from "./Hooks/useMealTabs";

const HomeScreen = () => {
  return (
    <div className={cn("w-9/12 flex pr-7")}>
      <MealListView />
      <OrderDetails />
    </div>
  );
};

export { HomeScreen };

export function Component() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { tabs } = useMealTabs();

  useEffect(() => {
    if (!searchParams.get(SEACH_PARAM_KEY) && tabs.length > 0) {
      searchParams.set(SEACH_PARAM_KEY, tabs[0].value);
      setSearchParams(searchParams);
    }
  }, [tabs, searchParams, setSearchParams]);

  if (tabs.length < 1) return;
  return <HomeScreen />;
}
