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
        path: "/",
        lazy: () => import("@modules/Home"),
      },
      {
        index: true,
        path: "/discounts",
        lazy: () => import("@modules/Discounts"),
      },
      {
        index: true,
        path: "/dashboard",
        lazy: () => import("@modules/Dashboard"),
      },
      {
        index: true,
        path: "/notifications",
        lazy: () => import("@modules/Notifications"),
      },
      {
        index: true,
        path: "/settings",
        lazy: () => import("@modules/Settings"),
      },
    ],
  },
]);

export default router;
