export interface IMeal {
  id: string;
  name: string;
  price: number;
  qty: number;
  img: string;
}

export type IMealsDTO = Array<IMeal>;

interface IMealCategory {
  id: number;
  name: string;
}

export type IMealCategoriesDTO = Array<IMealCategory>;
