import { atomWithStorage } from "jotai/utils";
import { AUTH_TOKEN_KEY } from "@/services/http";

// http.ts reads this key with a plain localStorage.getItem, so this atom must
// store the raw token string too, not jotai's default JSON-encoded value.
const rawStringStorage = {
  getItem: (key: string, initialValue: string | null): string | null =>
    localStorage.getItem(key) ?? initialValue,
  setItem: (key: string, value: string | null): void => {
    if (value === null) localStorage.removeItem(key);
    else localStorage.setItem(key, value);
  },
  removeItem: (key: string): void => localStorage.removeItem(key),
};

export const authTokenAtom = atomWithStorage<string | null>(
  AUTH_TOKEN_KEY,
  null,
  rawStringStorage
);
