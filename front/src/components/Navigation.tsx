import { cva } from "class-variance-authority";
import { Link, useLocation, useNavigate } from "react-router";
import { useSetAtom } from "jotai";

import LogoIcon from "@icons/logo.svg?react";
import LogoutIcon from "@icons/log_out.svg?react";
import DiscountIcon from "@icons/discount.svg?react";
import DashIcon from "@icons/dashboard.svg?react";
import NotifIcon from "@icons/notification.svg?react";
import SettingIcon from "@icons/setting.svg?react";
import HomeIcon from "@icons/home.svg?react";
import OrdersIcon from "@icons/orders.svg?react";
import Toggle from "./Toggle";
import { authTokenAtom } from "@/store/auth.atom";

const NavigationVariance = cva("p-6 rounded-lg", {
  variants: {
    isActive: {
      true: "bg-kAppCoral [&>svg]:fill-kAppWhite",
      false: "[&>svg]:fill-kAppCoral",
    },
  },
  defaultVariants: {
    isActive: false,
  },
});

const Navigation = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const setToken = useSetAtom(authTokenAtom);

  const HandleLogoutClick = (): void => {
    setToken(null);
    navigate("/login", { replace: true });
  };

  return (
    <div className="bg-kAppDarkNavy h-[100vh] w-[100px] fixed left-0 flex flex-col justify-between items-center py-6">
      <LogoIcon />
      <div className="gap-10 flex flex-col items-center justify-between">
        <Link
          className={NavigationVariance({ isActive: pathname === "/" })}
          to="/"
        >
          <HomeIcon />
        </Link>
        <Link
          to="/discounts"
          className={NavigationVariance({
            isActive: pathname === "/discounts",
          })}
        >
          <DiscountIcon />
        </Link>
        <Link
          to="/orders"
          className={NavigationVariance({
            isActive: pathname === "/orders",
          })}
        >
          <OrdersIcon />
        </Link>
        <Link
          to="/dashboard"
          className={NavigationVariance({
            isActive: pathname === "/dashboard",
          })}
        >
          <DashIcon />
        </Link>
        <Link
          to="/notifications"
          className={NavigationVariance({
            isActive: pathname === "/notifications",
          })}
        >
          <NotifIcon />
        </Link>
        <Link
          to="/settings"
          className={NavigationVariance({ isActive: pathname === "/settings" })}
        >
          <SettingIcon />
        </Link>
      </div>
      <Toggle />
      <button onClick={HandleLogoutClick}>
        <LogoutIcon />
      </button>
    </div>
  );
};

export default Navigation;
