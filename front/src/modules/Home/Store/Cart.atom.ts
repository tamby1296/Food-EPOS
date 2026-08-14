import { atomWithStorage } from "jotai/utils";

export const cartIdAtom = atomWithStorage<string | null>("food-epos-cart-id", null);
