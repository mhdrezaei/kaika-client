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
    name: "Workers",
    path: "/user/workers",
  },
  {
    icon: <UserPlusIcon {...attr} />,
    name: "Create_Worker",
    path: "/user/create-worker",
  },
  {
    icon: <PresentationChartLineIcon {...attr} />,
    name: "Company_Mental_Alertness",
    path: "/user/Company-alertness",
  },
  {
    icon: <IdentificationIcon {...attr} />,
    name: "Company_Information",
    path: "/user/user-info",
  },
  {
    icon: <CpuChipIcon {...attr} />,
    name: "Device_Guide",
    path: "/user/guide",
  },
  {
    icon: <InformationCircleIcon {...attr} />,
    name: "About_Mainbrain",
    path: "/user/about",
  },
];
