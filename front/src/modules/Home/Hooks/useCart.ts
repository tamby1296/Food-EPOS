import { useAtom } from "jotai";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { HttpError } from "@/services/http";
import {
  addCartItem,
  completeCart,
  createCart,
  getCart,
  removeCartItem,
  updateCartItem,
} from "@/services/cart";
import { cartIdAtom } from "../Store/Cart.atom";

export const useCart = () => {
  const [cartId, setCartId] = useAtom(cartIdAtom);
  const queryClient = useQueryClient();

  const cartQuery = useQuery({
    queryKey: ["cart", cartId],
    queryFn: async () => {
      if (!cartId) return null;
      try {
        const response = await getCart(cartId);
        return response?.body ?? null;
      } catch (error) {
        if (error instanceof HttpError && error.status === 410) {
          setCartId(null);
          return null;
        }
        throw error;
      }
    },
    enabled: !!cartId,
    staleTime: 0,
  });

  const invalidate = () =>
    queryClient.invalidateQueries({ queryKey: ["cart", cartId] });

  const handleExpired = (error: unknown) => {
    if (error instanceof HttpError && error.status === 410) {
      setCartId(null);
    }
  };

  const ensureCartId = async (): Promise<string> => {
    if (cartId) return cartId;
    const response = await createCart();
    if (!response) throw new Error("Failed to create cart");
    setCartId(response.body.id);
    return response.body.id;
  };

  const addItemMutation = useMutation({
    mutationFn: async (payload: {
      mealId: string;
      quantity: number;
      note?: string | null;
    }) => {
      const id = await ensureCartId();
      return addCartItem(id, payload);
    },
    onSuccess: invalidate,
    onError: handleExpired,
  });

  const updateItemMutation = useMutation({
    mutationFn: (payload: {
      itemId: string;
      quantity: number;
      note?: string | null;
    }) => {
      if (!cartId) throw new Error("No active cart");
      return updateCartItem(cartId, payload.itemId, {
        quantity: payload.quantity,
        note: payload.note,
      });
    },
    onSuccess: invalidate,
    onError: handleExpired,
  });

  const removeItemMutation = useMutation({
    mutationFn: (itemId: string) => {
      if (!cartId) throw new Error("No active cart");
      return removeCartItem(cartId, itemId);
    },
    onSuccess: invalidate,
    onError: handleExpired,
  });

  const completeCartMutation = useMutation({
    mutationFn: async () => {
      if (!cartId) throw new Error("No active cart");
      return completeCart(cartId);
    },
    onSuccess: () => {
      setCartId(null);
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
    onError: handleExpired,
  });

  return {
    cartId,
    cart: cartQuery.data,
    isLoading: cartQuery.isLoading,
    addItem: addItemMutation.mutate,
    updateItem: updateItemMutation.mutate,
    removeItem: removeItemMutation.mutate,
    completeCart: completeCartMutation.mutateAsync,
    isCompleting: completeCartMutation.isPending,
  };
};
