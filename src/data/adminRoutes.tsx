import {
  CpuChipIcon,
  HomeIcon,
  UserPlusIcon,
  UserGroupIcon,
} from "@heroicons/react/24/solid";
import { IRoutes } from "../types/data/routes-types";

const attr = {
  className: "w-5 h-5 text-inherit",
};

export const adminRoutes: IRoutes = [
  {
    icon: <HomeIcon {...attr} />,
    name: "Home",
    path: "/admin/home",
  },
  {
    icon: <UserGroupIcon {...attr} />,
    name: "Companies",
    path: "/admin/users",
  },
  {
    icon: <UserPlusIcon {...attr} />,
    name: "Create Company",
    path: "/admin/create-user",
  },
  {
    icon: <CpuChipIcon {...attr} />,
    name: "Register Company",
    path: "/admin/register-user",
  },
];
