import MealCard from "@/components/MealCard";
import { getAllMeals } from "@/services/meals";
import { useQuery } from "@tanstack/react-query";

const HomeScreen = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["meal/list"],
    queryFn: async () => getAllMeals(),
  });

  return (
    <div>
      <div className="w-full flex justify-between items-center mb-10">
        <div>
          <h1>Jaegar Resto</h1>
          <h2>Tuesday, 2 Feb 2025</h2>
        </div>
        <div>
          <input />
        </div>
      </div>
      {!isLoading && !isError && (
        <div className="flex flex-wrap">
          {data?.body?.meals.map((meal, i) => (
            <MealCard key={i} {...meal} />
          ))}
        </div>
      )}
    </div>
  );
};

export default HomeScreen;
