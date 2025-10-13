import { ITabs } from "@/components/TabView";
import { getMealCategories } from "@/services/meals";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";

interface IUseMealTabs {
  tabs: Array<ITabs>;
}

const useMealTabs = (): IUseMealTabs => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["meal/category"],
    queryFn: async () => getMealCategories(),
  });

  const tabs = useMemo(() => {
    if (!data) return [];
    return data.body.map((c) => ({ trigger: c.name, value: c.id.toString() }));
  }, [data]);

  return {
    tabs,
  };
};

export default useMealTabs;
