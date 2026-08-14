import { IOrderDTO, OrderStatus } from "@/types/order";
import { EposRequests } from "./http";

export const getOrders = (status?: OrderStatus) =>
  EposRequests.get<Array<IOrderDTO>>("/api/order", status ? { status } : undefined);

export const getOrder = (orderId: string) =>
  EposRequests.get<IOrderDTO>(`/api/order/${orderId}`);

export const completeOrder = (orderId: string) =>
  EposRequests.patch<IOrderDTO>(`/api/order/${orderId}/complete`);
