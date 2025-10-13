interface IMeal {
  title: string;
  price: number;
  qty: number;
  img: string;
  id: string;
}

export interface IMealsDTO {
  meals: Array<IMeal>;
}

interface IMealCategory {
  id: number;
  name: string;
}

export type IMealCategoriesDTO = Array<IMealCategory>;
