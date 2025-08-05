interface IMeal {
  title: string;
  price: number;
  qty: number;
  img: string;
}

export interface IMealsDTO {
  meals: Array<IMeal>;
}
