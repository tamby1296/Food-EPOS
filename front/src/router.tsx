import { createBrowserRouter } from "react-router";
import App from "./App";

const router = createBrowserRouter([
  {
    path: "/",
    id: "main-app",
    element: <App />,
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
