import { createBrowserRouter, redirect } from "react-router";
import App from "./App";
import { AUTH_TOKEN_KEY } from "@/services/http";

const router = createBrowserRouter([
  {
    path: "/login",
    lazy: () => import("@modules/Login"),
  },
  {
    path: "/",
    id: "main-app",
    element: <App />,
    loader: () => {
      if (!localStorage.getItem(AUTH_TOKEN_KEY)) {
        throw redirect("/login");
      }
      return null;
    },
    children: [
      {
        index: true,
        lazy: () => import("@modules/Home"),
      },
      {
        path: "/checkout",
        lazy: () => import("@modules/Checkout"),
      },
      {
        path: "/orders",
        lazy: () => import("@modules/Orders"),
      },
      {
        path: "/discounts",
        lazy: () => import("@modules/Discounts"),
      },
      {
        path: "/dashboard",
        lazy: () => import("@modules/Dashboard"),
      },
      {
        path: "/notifications",
        lazy: () => import("@modules/Notifications"),
      },
      {
        path: "/settings",
        lazy: () => import("@modules/Settings"),
      },
    ],
  },
]);

export default router;
