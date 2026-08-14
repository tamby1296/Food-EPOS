import { ICartDTO } from "@/types/cart";
import { IOrderDTO } from "@/types/order";
import { EposRequests } from "./http";

export const createCart = () => EposRequests.post<ICartDTO>("/api/cart");

export const getCart = (cartId: string) =>
  EposRequests.get<ICartDTO>(`/api/cart/${cartId}`);

export const addCartItem = (
  cartId: string,
  payload: { mealId: string; quantity: number; note?: string | null }
) => EposRequests.post<ICartDTO>(`/api/cart/${cartId}/items`, payload);

export const updateCartItem = (
  cartId: string,
  itemId: string,
  payload: { quantity: number; note?: string | null }
) => EposRequests.put<ICartDTO>(`/api/cart/${cartId}/items/${itemId}`, payload);

export const removeCartItem = (cartId: string, itemId: string) =>
  EposRequests.delete<ICartDTO>(`/api/cart/${cartId}/items/${itemId}`);

export const completeCart = (cartId: string) =>
  EposRequests.post<IOrderDTO>(`/api/cart/${cartId}/complete`);
