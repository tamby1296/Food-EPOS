import { createBrowserRouter } from "react-router";
import App from "./App";
import HomeScreen from "@modules/Home";
import DiscountScreen from "@modules/Discounts";
import DashboardScreen from "@modules/Dashboard";
import NotificationScreen from "@/modules/Notifications";
import SettingsScreen from "@modules/Settings";

const router = createBrowserRouter([
  {
    path: "/",
    id: "main-app",
    element: <App />,
    children: [
      {
        index: true,
        path: "/",
        element: <HomeScreen />,
      },
      {
        index: true,
        path: "/discounts",
        element: <DiscountScreen />,
      },
      {
        index: true,
        path: "/dashboard",
        element: <DashboardScreen />,
      },
      {
        index: true,
        path: "/notifications",
        element: <NotificationScreen />,
      },
      {
        index: true,
        path: "/settings",
        element: <SettingsScreen />,
      },
    ],
  },
]);

export default router;
