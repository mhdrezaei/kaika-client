import React from "react";
import {
  Avatar,
  Typography,
  IconButton,
  Button,
} from "@material-tailwind/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { Link, NavLink } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { sidebarAction } from "../redux/slice/sidebar-slice";
import { ISidebar } from "../types/layout/layout-types";
import { baseUrl } from "../data/constants";
import { useTranslation } from "react-i18next";

const Sidebar: React.FC<ISidebar> = ({ routes }) => {
  const { t, i18n } = useTranslation("translation");
  const sidebarState = useAppSelector((state) => state.sidebar);
  const userState = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  return (
    <aside
      className={` ${
        sidebarState.isOpen
          ? "translate-x-0"
          : i18n.language === "fa"
          ? "translate-x-80"
          : "-translate-x-80"
      } fixed  text-gray-100 bg-kaika-black z-30 h-[calc(100vh-32px)] w-72 rounded-xl transition-transform duration-300 xl:translate-x-0`}
    >
      <div className="relative border-b border-blue-gray-50">
        <Link to="/" className="flex items-center gap-4 py-4 px-4">
          {/* <Avatar src={brandImg} size="sm" /> */}
          <Avatar
            src={
              userState.imageUrl
                ? baseUrl + userState.imageUrl
                : "/assets/image/no-profile-photo.jpg"
            }
          />
          <Typography variant="h6">
            {userState.officialName.toUpperCase()}
          </Typography>
        </Link>
      </div>
      <div className="m-4">
        <ul className="mb-4 flex flex-col gap-1">
          {routes.map(({ icon, name, path }) => (
            <li
              onClick={() =>
                sidebarState.isOpen && dispatch(sidebarAction.close())
              }
              key={name}
            >
              <NavLink to={`${path}`}>
                {({ isActive }) => (
                  <Button
                    variant={isActive ? "gradient" : "text"}
                    color={isActive ? "orange" : "white"}
                    className="flex items-center gap-2 px-4 capitalize text-gray-100"
                    fullWidth
                  >
                    {icon}
                    <Typography className="font-medium capitalize ">
                      {t(name)}
                    </Typography>
                  </Button>
                )}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;
