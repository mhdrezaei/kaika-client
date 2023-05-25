import { Bars3Icon } from "@heroicons/react/24/outline";
import {
  Typography,
  IconButton,
  Navbar as MTNavbar,
  Breadcrumbs,
  Avatar,
  Menu,
  MenuHandler,
  MenuItem,
  Button,
  MenuList,
  Tooltip,
} from "@material-tailwind/react";
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { sidebarAction } from "../redux/slice/sidebar-slice";
import { INavbar } from "../types/layout/layout-types";
import { baseUrl } from "../data/constants";
import { userAction } from "../redux/slice/user-slice";
import {
  ArrowLeftOnRectangleIcon,
  ArrowsPointingOutIcon,
} from "@heroicons/react/24/solid";

const Navbar: React.FC<INavbar> = ({ routes }) => {
  const dispatch = useAppDispatch();
  const { pathname } = useLocation();
  const [layout, page] = pathname.split("/").filter((el) => el !== "");
  const fixedNavbar = true;

  return (
    <MTNavbar
      color={fixedNavbar ? "gray" : "transparent"}
      className={`rounded-xl transition-all ${
        fixedNavbar
          ? " z-40 py-3 shadow-md shadow-blue-gray-500/5"
          : "px-0 py-1"
      }`}
      fullWidth
      blurred={fixedNavbar}
    >
      <div className="flex  justify-between md:gap-6 md:flex-row md:items-center">
        <div className="capitalize">
          <Breadcrumbs
            className={`bg-transparent p-0 transition-all ${
              fixedNavbar ? "mt-1" : ""
            }`}
          >
            <Link to={`/${layout}`}>
              <Typography
                variant="small"
                color="blue-gray"
                className="font-normal opacity-50 transition-all hover:text-blue-500 hover:opacity-100"
              >
                {layout}
              </Typography>
            </Link>
            {page && (
              <Typography
                variant="small"
                color="blue-gray"
                className="font-normal"
              >
                {page}
              </Typography>
            )}
          </Breadcrumbs>
          {page && (
            <Typography variant="h6" color="blue-gray">
              {page}
            </Typography>
          )}
        </div>
        <div className="flex items-center gap-3">
          <IconButton
            variant="text"
            color="blue-gray"
            className="xl:hidden"
            onClick={() => dispatch(sidebarAction.open())}
          >
            <Bars3Icon strokeWidth={3} className="h-6 w-6 text-blue-gray-500" />
          </IconButton>

          <Button
            variant="text"
            color="blue-gray"
            onClick={() => dispatch(userAction.setUser(null))}
            className="flex capitalize items-center p-1 font-bold text-kaika-black"
          >
            Logout
            <ArrowLeftOnRectangleIcon
              className="cursor-pointer w-7 "
              strokeWidth={5}
            />
          </Button>
        </div>
      </div>
    </MTNavbar>
  );
};

export default Navbar;
