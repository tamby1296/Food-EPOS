export type OrderStatus = "Created" | "Completed";

export interface IOrderItemDTO {
  id: string;
  mealId: string;
  mealName: string;
  quantity: number;
  unitPrice: number;
  note: string | null;
}

export interface IOrderDTO {
  id: string;
  orderNumber: number;
  status: OrderStatus;
  items: Array<IOrderItemDTO>;
  total: number;
  discount: number;
  isPaid: boolean;
  isDineIn: boolean;
  deliveryAddress: string | null;
  createdAt: string;
  updatedAt: string;
}
