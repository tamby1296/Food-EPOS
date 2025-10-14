import { IMealCategoriesDTO, IMealsDTO } from "@/types/meal";
import { EposRequests } from "./http";

export const getAllMeals = (categoryId?: number) =>
  EposRequests.get<IMealsDTO>(
    "/api/meal",
    categoryId ? { categoryId: categoryId.toString() } : undefined
  );

export const getMealCategories = () =>
  EposRequests.get<IMealCategoriesDTO>("/api/meal/categories");
