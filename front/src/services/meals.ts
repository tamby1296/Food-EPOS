import { IMealCategoriesDTO, IMealsDTO } from "@/types/meal";
import { EposRequests } from "./http";

export const getAllMeals = (categoryId = -1) =>
  EposRequests.get<IMealsDTO>(`/api/Meal/category/${categoryId}`);

export const getMealCategories = () =>
  EposRequests.get<IMealCategoriesDTO>("/api/Meal/category");
