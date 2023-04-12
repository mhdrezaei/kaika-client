export interface sidebarState {
  isOpen: boolean;
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
  isAdmin: boolean;
  createdAt: string;
  updatedAt: string;
}
