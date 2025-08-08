import MealCard from "@/components/MealCard";
import SelectBox from "@/components/SelectBox";
import { getAllMeals } from "@/services/meals";
import { useQuery } from "@tanstack/react-query";
import { MealOptions } from "../Constants/Options";

const MealList = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["meal/list"],
    queryFn: async () => getAllMeals(),
  });

  return (
    <div className="p-7">
      <div className="w-full flex justify-between items-center mb-10">
        <div>
          <h1 className="text-3xl font-semibold">Jaegar Resto</h1>
          <h2>Tuesday, 2 Feb 2025</h2>
        </div>
        <div>
          <input />
        </div>
      </div>
      <div className="w-full flex items-center justify-between">
        <h3 className="text-xl font-semibold">Choose Dishes</h3>
        <SelectBox options={MealOptions} />
      </div>
      {!isLoading && !isError && (
        <div className="flex flex-wrap justify-evenly">
          {data?.body?.meals.map((meal, i) => (
            <MealCard key={i} {...meal} />
          ))}
        </div>
      )}
    </div>
  );
};

export default MealList;
