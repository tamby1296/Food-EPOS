import { IMealCategoriesDTO, IMealsDTO } from "@/types/meal";
import { EposRequests } from "./http";

export const getAllMeals = () =>
  EposRequests.get<IMealsDTO>("/mocks/getMeals.json");

export const getMealCategories = () =>
  EposRequests.get<IMealCategoriesDTO>("/mocks/getMealCategories.json");
