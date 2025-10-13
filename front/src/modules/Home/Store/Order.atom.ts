import { IMeal } from "@/types/meal";
import { atom } from "jotai";

export const OrderAtom = atom<Array<IMeal>>([]);

export const addToOrderAtom = atom(null, (get, set, newItem: IMeal) => {
  const currentOrder = get(OrderAtom);
  const exists = currentOrder.find((item) => item.id === newItem.id);

  if (exists) {
    set(
      OrderAtom,
      currentOrder.map((item) =>
        item.id === newItem.id
          ? { ...item, quantity: (item.qty || 1) + 1 }
          : item
      )
    );
  } else {
    set(OrderAtom, [...currentOrder, { ...newItem, qty: 1 }]);
  }
});

export const removeFromOrderAtom = atom(null, (get, set, id: string) => {
  const currentOrder = get(OrderAtom);
  const updatedOrder: Array<IMeal> = currentOrder
    .map((item) =>
      item.id === id ? { ...item, qty: (item.qty || 1) - 1 } : item
    )
    .filter((item) => item.qty && item.qty > 0);

  set(OrderAtom, updatedOrder);
});
