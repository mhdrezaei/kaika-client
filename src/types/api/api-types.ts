// Auth : types
export interface IauthLoginRequest {
  email: string;
  password: string;
}
export interface IauthLoginResponse {
  access_token: string;
}

// ******** USER   **********

//  Create new user types
export interface IAdminUserCreateRequest {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  officialName: string;
  registrationNumber: number;
  tel: number;
  address: string;
}

export interface IAdminUserCreateResponse {
  _id: string;
  email: string;
  firstName: string;
  lastName: string;
  officialName: string;
  registrationNumber: number;
  tel: number;
  address: string;
  createdAt: string;
  updatedAt: string;
}

export interface IuserInfo extends IAdminUserCreateResponse {
  isAdmin: boolean;
  imageUrl: string;
}
// Get All Users types
export interface IAdminGetAllUsers extends IuserInfo {}

// Get specific user types
export interface IAdminGetOneUser extends IuserInfo {}

// Delete specific user types
export interface IAdminDeleteOneUser extends IuserInfo {}

// Update a specific user by ID types

export interface IAdminUpdateUserResponse {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  officialName: string;
  registrationNumber: number;
  tel: number;
  address: string;
}

// update data current user type
export interface IAdminUpdateCurrentUserResponse {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  officialName: string;
  registrationNumber: number;
  tel: number;
  address: string;
}

//  Upload logo file type

export interface IuploadFileRequest {
  file: string;
}

export interface IuploadFileResponse {
  _id: string;
  email: string;
  firstName: string;
  lastName: string;
  officialName: string;
  registrationNumber: number;
  tel: string;
  address: string;
  isAdmin: boolean;
  imageUrl: string;
}

// ******** WORKER *********

export interface IworkerInfo {
  _id: string;
  firstName: string;
  lastName: string;
  birthDate: string;
  imageUrl: string;
  job: string;
  tel: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}
//  Get all worker information by Admin
export interface IAdminGetAllWorkerResponse extends IworkerInfo {}
//  Get all worker information of specific user by Admin
export interface IAdminGetAllWorkerOfUserResponse extends IworkerInfo {}
//  Delete a spcific worker by Admin
export interface IAdminDeleteWorkerResponse extends IworkerInfo {}
//  Get All worker information of current user by current user
export interface IAdminGetAllWorkerOfCurrentUserResponse extends IworkerInfo {}

// update a spcific worker type by Admin
export interface IAdminUpdateWorkerResponse {
  firstName: string;
  lastName: string;
  birthDate: string;
  job: string;
  tel: number;
  email: string;
}

// create new worker for current user types

export interface IcreateWorkerCurrentUserRequest {
  firstName: string;
  lastName: string;
  birthDate: string;
  job: string;
  tel: number;
  email: string;
}
export interface IcreateWorkerCurrentUserResponse
  extends IcreateWorkerCurrentUserRequest {
  _id: string;
  createdAt: string;
  updatedAt: string;
}

// Get a worker for current user or Admin
export interface IAdminGetAWorkerCurrentUserResponse extends IworkerInfo {}
// Delete a worker for current user or Admin
export interface IAdminDeleteAWorkerCurrentUserResponse extends IworkerInfo {}

// Update a worker for current user or Admin

export interface IAdminUpdateAWorkerCurrentUserRequest {
  firstName: string;
  lastName: string;
  birthDate: Date;
  job: string;
  tel: string;
  email: string;
}
export interface IAdminUpdateAWorkerCurrentUserResponse {
  _id: string;
  firstName: string;
  lastName: string;
  birthDate: string;
  imageUrl: string;
  job: string;
  tel: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}
// upload Worker image by current user
export interface IuploadImageWorker extends IworkerInfo {}

// ******** HSE Info **********

export interface IHseUserInfo {
  _id: string;
  blinkFrequency: number;
  blinkDuration: number;
  kss: number;
  blinkingRatio: number[];
  userId: string;
  workerId: string;
  createdAt: string;
  updatedAt: string;
}
// Get all information of one specific user
export interface IgetHseAllUserInfoResponse extends IHseUserInfo {}

//  create new information for worker of current user

export interface IcreateHseInfoRequest {
  blinkFrequency: number;
  blinkDuration: number;
  kss: number;
  blinkingRatio: number[];
}

export interface IcreateHseInfoResponse extends IHseUserInfo {}

// get all information of current user
export interface IgetHseCurrentUserInfoResponse extends IHseUserInfo {}
// delete all information of one specific worker
export interface IdeleteHseUserInfoResponse extends IHseUserInfo {}

//  ******* REGISTRATION ********

// Register a user type
export interface IregisterUserResponse {
  _id: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
}
