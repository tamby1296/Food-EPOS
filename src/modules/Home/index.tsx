import { useSearchParams } from "react-router";
import MealListView from "./Views/MealListView";
import OrderDetails from "./Views/OrderDetails";
import { useEffect } from "react";
import { SEACH_PARAM_KEY } from "./Constants/SearchParams";
import { MealTypes } from "./Types/Meals";

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
  useEffect(() => {
    if (!searchParams.get(SEACH_PARAM_KEY)) {
      searchParams.set(SEACH_PARAM_KEY, MealTypes.HOT);
      setSearchParams(searchParams);
    }
  });
  return <HomeScreen />;
}
