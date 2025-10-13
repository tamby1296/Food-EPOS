import { useSearchParams } from "react-router";
import MealListView from "./Views/MealListView";
import OrderDetails from "./Views/OrderDetails";
import { useEffect } from "react";
import { SEACH_PARAM_KEY } from "./Constants/SearchParams";
import useMealTabs from "./Hooks/useMealTabs";

const HomeScreen = () => {
  return (
    <div className="flex pr-[400px]">
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
    if (!searchParams.get(SEACH_PARAM_KEY)) {
      searchParams.set(SEACH_PARAM_KEY, tabs[0].value);
      setSearchParams(searchParams);
    }
  }, [tabs, searchParams, setSearchParams]);

  if (tabs.length < 1) return;
  return <HomeScreen />;
}
