import { colors } from "@material-tailwind/react/types/generic";
export interface ISidebarState {
  isOpen: boolean;
}
export interface IAlertState {
  isOpen: boolean;
  message: string;
  color: colors;
}

export interface IUserState {
  _id: string;
  email: string;
  password?: string;
  firstName: string;
  lastName: string;
  officialName: string;
  registrationNumber: number;
  tel: string;
  address: string;
  imageUrl: string;
  isAdmin: boolean;
  createdAt: string;
  updatedAt: string;
}
export interface ILangState {
  lang: string;
}
