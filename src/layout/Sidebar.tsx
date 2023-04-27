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

const Sidebar: React.FC<ISidebar> = ({ routes }) => {
  const sidebarState = useAppSelector((state) => state.sidebar);
  const officialName = useAppSelector((state) => state.user.officialName);
  const dispatch = useAppDispatch();

  return (
    <aside
      className={` ${
        sidebarState.isOpen ? "translate-x-0" : "-translate-x-80"
      } fixed  text-gray-100 bg-kaika-black z-50 h-[calc(100vh-32px)] w-72 rounded-xl transition-transform duration-300 xl:translate-x-0`}
    >
      <div className="relative border-b border-blue-gray-50">
        <Link to="/" className="flex items-center gap-4 py-6 px-8">
          {/* <Avatar src={brandImg} size="sm" /> */}
          <Typography variant="h6">{officialName.toUpperCase()}</Typography>
        </Link>
        <IconButton
          variant="text"
          color="gray"
          size="sm"
          ripple={false}
          className="absolute right-0 top-0 grid rounded-br-none rounded-tl-none xl:hidden"
          onClick={() => dispatch(sidebarAction.close())}
        >
          <XMarkIcon strokeWidth={2.5} className="h-5 w-5" />
        </IconButton>
      </div>
      <div className="m-4">
        {routes.map(({ icon, name, path }) => (
          <ul key={name} className="mb-4 flex flex-col gap-1">
            <li key={name}>
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
                      {name}
                    </Typography>
                  </Button>
                )}
              </NavLink>
            </li>
          </ul>
        ))}
      </div>
    </aside>
  );
};

export default Sidebar;
