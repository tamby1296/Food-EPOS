import { useQuery } from "@tanstack/react-query";
import SearchIcon from "@icons/search.svg?react";
import { useSearchParams } from "react-router";

import MealCard from "@/components/MealCard";
import SelectBox from "@/components/SelectBox";
import { getAllMeals } from "@/services/meals";
import TabView from "@/components/TabView";

import { formatDate } from "@/utils/Date";
import FieldInput from "@/components/FieldInput";

import { MealOptions } from "../Constants/Options";
import { SEACH_PARAM_KEY } from "../Constants/SearchParams";
import useMealTabs from "../Hooks/useMealTabs";

const MealList = () => {
  const [searchParams] = useSearchParams();
  const { data, isLoading, isError } = useQuery({
    queryKey: ["meal/list", searchParams.get(SEACH_PARAM_KEY)],
    queryFn: async () => getAllMeals(),
  });

  return (
    <div className="py-7">
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

const MealListView = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { tabs } = useMealTabs();

  const handleTabChange = (tab: string) => {
    searchParams.set(SEACH_PARAM_KEY, tab);
    setSearchParams(searchParams);
  };

  if (tabs.length < 1) return;
  return (
    <div className="p-7">
      <div className="w-full flex justify-between items-center mb-10">
        <div>
          <h1 className="text-3xl font-semibold">Hero Title</h1>
          <h2>{formatDate(new Date(), "EEEE, dd MMMM yyyy")}</h2>
        </div>
        <FieldInput
          placeholder="Search for food, coffee, etc..."
          icon={<SearchIcon />}
        />
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
