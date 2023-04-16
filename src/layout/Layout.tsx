import React, { PropsWithChildren, useEffect } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { sidebarAction } from "../redux/slice/sidebar-slice";
import { ILayout } from "../types/layout/layout-types";

const Layout: React.FC<PropsWithChildren<ILayout>> = ({ children, routes }) => {
  const dispatch = useAppDispatch();
  const sidebarState = useAppSelector((state) => state.sidebar);

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
          <div className="min-h-screen p-4">
            {children}
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
};

export default Layout;
