import { ILoginResponseDTO } from "@/types/auth";
import { EposRequests } from "./http";

export const login = (username: string, password: string) =>
  EposRequests.post<ILoginResponseDTO>("/api/auth/login", { username, password });
