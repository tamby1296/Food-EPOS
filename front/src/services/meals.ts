import { IMealsDTO } from "@/types/meal";
import { EposRequests } from "./http";

export const getAllMeals = () => {
  return EposRequests.get<IMealsDTO>("/mocks/getMeals.json");
};
