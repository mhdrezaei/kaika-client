import React, { PropsWithChildren, useEffect } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { sidebarAction } from "../redux/slice/sidebar-slice";
import { ILayout } from "../types/layout/layout-types";
import { AxiosError } from "axios";
import { useQuery } from "react-query";
import { userAction } from "../redux/slice/user-slice";
import { getCurrentUser } from "../service/api";
import { alertActive } from "../util/alertActive";

const Layout: React.FC<PropsWithChildren<ILayout>> = ({ children, routes }) => {
  const dispatch = useAppDispatch();
  const sidebarState = useAppSelector((state) => state.sidebar);

  useQuery("user", getCurrentUser, {
    select: (data) => data.data,
    retry: 1,
    onSuccess: (data) => {
      localStorage.setItem("user", JSON.stringify(data));
      dispatch(userAction.setUser(data));
    },
    onError: (err: AxiosError<any>) => {
      console.log("hi");

      alertActive({ message: err.response?.data.message, color: "red" });
      dispatch(userAction.setUser(null));
    },
  });

  return (
    <>
      {sidebarState.isOpen && (
        <div
          className="w-full h-full absolute  bg-black opacity-50 z-[45] xl:hidden"
          onClick={() => dispatch(sidebarAction.close())}
        ></div>
      )}

      <div
        className="min-h-screen relative bg-kaika-gray p-4"
        // onClick={() => dispatch(sidebarAction.close())}
      >
        <Sidebar routes={routes} />
        <div className="xl:ml-[19rem]">
          <Navbar routes={routes} />
          <div className="lg:p-4 p-1">
            {children}
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
};

export default Layout;
