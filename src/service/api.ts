import axios from "../lib/axiso";
import {
  IauthLoginRequest,
  IauthLoginResponse,
  IcreateHseInfoRequest,
  IregisterUserResponse,
  IAdminUpdateCurrentUserResponse,
  IuploadFileResponse,
  IuserInfo,
  IworkerInfo,
  IAdminUserCreateRequest,
  IAdminUserCreateResponse,
  IAdminGetOneUser,
  IAdminDeleteOneUser,
  IAdminUpdateUserResponse,
  IAdminGetAllUsers,
  IAdminDeleteWorkerResponse,
  IAdminUpdateWorkerResponse,
  IAdminGetAllWorkerOfCurrentUserResponse,
  IcreateWorkerCurrentUserResponse,
  IcreateWorkerCurrentUserRequest,
  IAdminGetAllWorkerResponse,
  IAdminGetAWorkerCurrentUserResponse,
  IAdminDeleteAWorkerCurrentUserResponse,
  IAdminUpdateAWorkerCurrentUserRequest,
  IcreateHseInfoResponse,
  IgetHseCurrentUserInfoResponse,
  IdeleteHseUserInfoResponse,
  IAdminGetAllWorkerOfUserResponse,
  ITop10LowCautios,
  ITop10HighCautios,
  IuploadImageWorker,
  IAverageWorkersListReq,
  IAverageWorkersListRes,
  IAdminUpdateUserRequest,
} from "../types/api/api-types";

const token: string = "";

export const loginUser = async (userData: IauthLoginRequest) => {
  return axios.post<IauthLoginResponse>("/auth/login/", userData);
};

// Create new user
export const createUser = async (userData: IAdminUserCreateRequest) => {
  return axios.post<IAdminUserCreateResponse>("/user/admin/", userData, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

// Get all users

export const getAllUsersByAdmin = async () => {
  return axios.get<Array<IAdminGetAllUsers>>("/user/admin", {
    headers: { Authorization: `Bearer ${token}` },
  });
};

// Get a specific user by ID

export const getSingleUsersByAdmin = async (userId: string) => {
  return axios.get<IAdminGetOneUser>(`/user/admin/${userId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

// Delete a specific user by ID

export const removeSingleUsersByAdmin = async (userId: string) => {
  return axios.delete<IAdminDeleteOneUser>(`/user/admin/${userId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

// Update a specific user by ID
export const updateSingleUsersByAdmin = async (userId: string) => {
  return axios.patch<IAdminUpdateUserResponse>(`/user/admin/${userId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

// get data current user

export const getCurrentUser = async () => {
  return axios.get<IuserInfo>("/user/", {
    headers: { Authorization: `Bearer ${token}` },
  });
};

// update data current user
export const updateCurrentUser = async (userData: IAdminUpdateUserRequest) => {
  return axios.patch<IAdminUpdateCurrentUserResponse>("/user/", userData, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

//  Upload logo file

export const updateUserFile = async (file: string) => {
  return axios.patch<IuploadFileResponse>("/user/upload-file", file, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

// ******** WORKER *********

// Get All Worker

export const getAllWorkerByAdmin = async () => {
  return axios.get<Array<IAdminGetAllWorkerResponse>>("/worker/admin/", {
    headers: { Authorization: `Bearer ${token}` },
  });
};

//   Get all workers of one specific user

export const getAllWorkerOfUserByAdmin = async (userId: string) => {
  return axios.get<Array<IAdminGetAllWorkerOfUserResponse>>(
    `/worker/admin/user-workers/${userId}`,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
};

// delete a spcific worker

export const deleteWorkerByAdmin = async (userId: string) => {
  return axios.delete<IAdminDeleteWorkerResponse>(`/worker/admin/${userId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

// update a spcific worker

export const updateWorkerByAdmin = async (userId: string) => {
  return axios.patch<IAdminUpdateWorkerResponse>(`/worker/admin/${userId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

// get all workers of current user
export const getAllWorkerofCurrentUser = async () => {
  return axios.get<Array<IAdminGetAllWorkerOfCurrentUserResponse>>("/worker/", {
    headers: { Authorization: `Bearer ${token}` },
  });
};
// create new worker for current user

export const createWorkerCurrentUser = async (
  workerData: IcreateWorkerCurrentUserRequest
) => {
  return axios.post<IcreateWorkerCurrentUserResponse>("/worker/", workerData, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

// Get a worker for current user or Admin

export const getAWorkerCurrentUserAdmin = async (workerId: string) => {
  return axios.get<IAdminGetAWorkerCurrentUserResponse>(`/worker/${workerId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

// Delete a worker for current user or Admin

export const deleteAWorkerCurrentUserAdmin = async (workerId: string) => {
  return axios.delete<IAdminDeleteAWorkerCurrentUserResponse>(
    `/worker/${workerId}`,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
};

// Update a worker for current user or Admin
export const updateAWorkerCurrentUserAdmin = async (
  workerId: string,
  workerData: IAdminUpdateAWorkerCurrentUserRequest
) => {
  return axios.patch<IAdminDeleteAWorkerCurrentUserResponse>(
    `/worker/${workerId}`,
    workerData,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
};

// Upload worker image

export const uploadImageWorker = async (workerId: string, file: string) => {
  return axios.patch<IuploadImageWorker>(
    `/worker/upload-file/${workerId}`,
    file,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
};

// ******** HSE Info **********

// Get all information of one specific user

export const getHseAllUserInfo = async (userId: string) => {
  return axios.get<IgetHseCurrentUserInfoResponse>(
    `/hse-info/admin/${userId}`,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
};
// Create information of one specific user
export const createHseInfo = async (
  workerId: string,
  hseInfo: IcreateHseInfoRequest
) => {
  return axios.post<IcreateHseInfoResponse>(`/hse-info/${workerId}`, hseInfo, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

// get all information of current user

export const getHseCurrentUserInfo = async () => {
  return axios.get<IgetHseCurrentUserInfoResponse[]>("/hse-info/", {
    headers: { Authorization: `Bearer ${token}` },
  });
};

// delete all information of one specific worker

export const deleteHseUserInfo = async (infoId: string) => {
  return axios.delete<IdeleteHseUserInfoResponse>(`/hse-info/${infoId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

// Registration user

export const RegisterUser = async (userId: string) => {
  return axios.post<IregisterUserResponse>(`/registration/create/`, userId, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

// ------------------chart------------------
export const last10Caution = async () => {
  return axios.get<IgetHseCurrentUserInfoResponse[]>("/chart/last10caution");
};

export const top10lowCaution = async (query: string) => {
  return axios.get<ITop10LowCautios[]>("/chart/top10LowCautionOfUser?" + query);
};

export const top10highCaution = async (query: string) => {
  return axios.get<ITop10HighCautios[]>(
    "/chart/top10highCautionOfUser?" + query
  );
};

export const averageWorkersList = async ({
  data,
  query,
}: {
  data: IAverageWorkersListReq;
  query: string;
}) => {
  return axios.post<IAverageWorkersListRes[]>(
    "/chart/workers-avg?" + query,
    data
  );
};
