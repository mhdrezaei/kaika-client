import { IRoutes } from "../data/routes-types";

export interface ILayout {
  routes: IRoutes;
}

export interface INavbar {
  routes: IRoutes;
}

export interface ISidebar {
  routes: {
    icon: JSX.Element;
    path: string;
    name: string;
  }[];
}
