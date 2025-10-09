import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router";

import MealCard from "@/components/MealCard";
import SelectBox from "@/components/SelectBox";
import { getAllMeals } from "@/services/meals";
import TabView from "@/components/TabView";

import { MealOptions } from "../Constants/Options";
import { MealTypes } from "../Types/Meals";
import { SEACH_PARAM_KEY } from "../Constants/SearchParams";
import { formatDate } from "@/utils/Date";

const MealList = () => {
  const [searchParams] = useSearchParams();
  const { data, isLoading, isError } = useQuery({
    queryKey: ["meal/list", searchParams.get(SEACH_PARAM_KEY)],
    queryFn: async () => getAllMeals(),
  });

  return (
    <div className="p-7">
      <div className="w-full flex items-center justify-between">
        <h3 className="text-xl font-semibold">Choose Dishes</h3>
        <SelectBox options={MealOptions} />
      </div>
      {!isLoading && !isError && (
        <div className="flex flex-wrap gap-7 justify-start">
          {data?.body?.meals.map((meal, i) => (
            <MealCard key={i} {...meal} />
          ))}
        </div>
      )}
    </div>
  );
};

const tabs = [
  {
    trigger: "Hot Dishes",
    value: MealTypes.HOT,
    content: <MealList />,
  },
  {
    trigger: "Cold Dishes",
    value: MealTypes.COLD,
    content: <MealList />,
  },
  {
    trigger: "Soup",
    value: MealTypes.SOUP,
    content: <MealList />,
  },
  {
    trigger: "Grill",
    value: MealTypes.GRILL,
    content: <MealList />,
  },
  {
    trigger: "Appetizer",
    value: MealTypes.APPETIZER,
    content: <MealList />,
  },
  {
    trigger: "Dessert",
    value: MealTypes.DESSERT,
    content: <MealList />,
  },
];

const MealListView = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleTabChange = (tab: string) => {
    searchParams.set(SEACH_PARAM_KEY, tab);
    setSearchParams(searchParams);
  };

  return (
    <div className="p-7">
      <div className="w-full flex justify-between items-center mb-10">
        <div>
          <h1 className="text-3xl font-semibold">Hero Title</h1>
          <h2>{formatDate(new Date(), "EEEE, dd MMMM yyyy")}</h2>
        </div>
        <div>
          <input />
        </div>
      </div>
      <TabView
        tabs={tabs}
        defaultTab={searchParams.get(SEACH_PARAM_KEY)}
        onTabChange={handleTabChange}
      >
        <MealList />
      </TabView>
    </div>
  );
};

export default MealListView;
