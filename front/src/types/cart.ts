export type CartStatus = "Active" | "Completed" | "Expired";

export interface ICartItemDTO {
  id: string;
  mealId: string;
  mealName: string;
  mealImgUrl: string | null;
  quantity: number;
  unitPrice: number;
  note: string | null;
}

export interface ICartDTO {
  id: string;
  status: CartStatus;
  items: Array<ICartItemDTO>;
  total: number;
  expiresAt: string;
}
