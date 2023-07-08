import {
  HomeIcon,
  IdentificationIcon,
  UserGroupIcon,
  UserPlusIcon,
  PresentationChartLineIcon,
  CpuChipIcon,
  InformationCircleIcon,
} from "@heroicons/react/24/solid";
const attr = {
  className: "w-5 h-5 text-inherit",
};

export type Routes = {
  icon: any;
  path: string;
  name: string;
}[];

export const userRoutes: Routes = [
  {
    icon: <HomeIcon {...attr} />,
    name: "Home",
    path: "/user/home",
  },
  {
    icon: <UserGroupIcon {...attr} />,
    name: "Employees",
    path: "/user/employees",
  },
  {
    icon: <UserPlusIcon {...attr} />,

    name: "Create Employee",
    path: "/user/create-employee",

  },
  {
    icon: <PresentationChartLineIcon {...attr} />,
    name: "Company Mental Alertness",
    path: "/user/Company-alertness",
  },
  {
    icon: <IdentificationIcon {...attr} />,

    name: "Company Information",
    path: "/user/company-info",

  },
  {
    icon: <CpuChipIcon {...attr} />,
    name: "Device Guide",
    path: "/user/guide",
  },
  {
    icon: <InformationCircleIcon {...attr} />,
    name: "About Mainbrain",
    path: "/user/about",
  },
];
