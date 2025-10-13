interface IMeal {
  name: string;
  price: number;
  qty: number;
  img: string;
  id: string;
}

export type IMealsDTO = Array<IMeal>;

interface IMealCategory {
  id: number;
  name: string;
}

export type IMealCategoriesDTO = Array<IMealCategory>;
