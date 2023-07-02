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
  IAdminUpdateAWorkerCurrentUserResponse,
  IAverageAllWorkersRes,
  ILast10CautionRes,
} from "../types/api/api-types";

const token: string = "";

export const loginUser = async (userData: IauthLoginRequest) => {
  return axios.post<IauthLoginResponse>("/auth/login/", userData);
};

// Create new user
export const createUser = async (userData: IAdminUserCreateRequest) => {
  return axios.post<IAdminUserCreateResponse>("/user/admin/", userData);
};

// Get all users

export const getAllUsersByAdmin = async () => {
  return axios.get<Array<IAdminGetAllUsers>>("/user/admin");
};

// Get a specific user by ID

export const getSingleUsersByAdmin = async (userId: string) => {
  return axios.get<IAdminGetOneUser>(`/user/admin/${userId}`);
};

// Delete a specific user by ID

export const removeSingleUsersByAdmin = async (userId: string) => {
  return axios.delete<IAdminDeleteOneUser>(`/user/admin/${userId}`);
};

// Update a specific user by ID
export const updateSingleUsersByAdmin = async (userId: string) => {
  return axios.patch<IAdminUpdateUserResponse>(`/user/admin/${userId}`);
};

// get data current user

export const getCurrentUser = async () => {
  return axios.get<IuserInfo>("/user/");
};

// update data current user
export const updateCurrentUser = async (userData: IAdminUpdateUserRequest) => {
  return axios.patch<IAdminUpdateCurrentUserResponse>("/user/", userData);
};

//  Upload logo file

export const updateUserFile = async (file: FormData) => {
  return axios.patch<IuploadFileResponse>("/user/upload-file", file);
};

// ******** WORKER *********

// Get All Worker

export const getAllWorkerByAdmin = async () => {
  return axios.get<Array<IAdminGetAllWorkerResponse>>("/worker/admin/");
};

//   Get all workers of one specific user

export const getAllWorkerOfUserByAdmin = async (userId: string) => {
  return axios.get<Array<IAdminGetAllWorkerOfUserResponse>>(
    `/worker/admin/user-workers/${userId}`
  );
};

// delete a spcific worker

export const deleteWorkerByAdmin = async (userId: string) => {
  return axios.delete<IAdminDeleteWorkerResponse>(`/worker/admin/${userId}`);
};

// update a spcific worker

export const updateWorkerByAdmin = async (userId: string) => {
  return axios.patch<IAdminUpdateWorkerResponse>(`/worker/admin/${userId}`);
};

// get all workers of current user
export const getAllWorkerofCurrentUser = async () => {
  return axios.get<Array<IAdminGetAllWorkerOfCurrentUserResponse>>("/worker/");
};
// create new worker for current user

export const createWorkerCurrentUser = async (
  workerData: IcreateWorkerCurrentUserRequest
) => {
  return axios.post<IcreateWorkerCurrentUserResponse>("/worker/", workerData);
};

// Get a worker for current user or Admin

export const getAWorkerCurrentUserAdmin = async (workerId: string) => {
  return axios.get<IAdminGetAWorkerCurrentUserResponse>(`/worker/${workerId}`);
};

// Delete a worker for current user or Admin

export const deleteAWorkerCurrentUserAdmin = async (workerId: string) => {
  return axios.delete<IAdminDeleteAWorkerCurrentUserResponse>(
    `/worker/${workerId}`
  );
};

export const deleteWorkerListCurrentUserAdmin = async (
  workerIdList: string[]
) => {
  return axios.delete("/worker", { data: { workerIdList } });
};

// Update a worker for current user or Admin
export const updateAWorkerCurrentUserAdmin = async (
  workerId: string,
  workerData: IAdminUpdateAWorkerCurrentUserRequest
) => {
  return axios.patch<IAdminUpdateAWorkerCurrentUserResponse>(
    `/worker/${workerId}`,
    workerData
  );
};

// Upload worker image

export const uploadImageWorker = async ({
  workerId,
  file,
}: {
  workerId: string;
  file: FormData;
}) =>
  axios.patch<IuploadImageWorker>(`/worker/upload-file/${workerId}`, file, {
    headers: { "Content-Type": "multipart/form-data" },
  });

// ******** HSE Info **********

// Get all information of one specific user

export const getHseAllUserInfo = async (userId: string) => {
  return axios.get<IgetHseCurrentUserInfoResponse>(`/hse-info/admin/${userId}`);
};
// Create information of one specific user
export const createHseInfo = async (
  workerId: string,
  hseInfo: IcreateHseInfoRequest
) => {
  return axios.post<IcreateHseInfoResponse>(`/hse-info/${workerId}`, hseInfo);
};

// get all information of current user

export const getHseCurrentUserInfo = async () => {
  return axios.get<IgetHseCurrentUserInfoResponse[]>("/hse-info/");
};

// delete all information of one specific worker

export const deleteHseUserInfo = async (infoId: string) => {
  return axios.delete<IdeleteHseUserInfoResponse>(`/hse-info/${infoId}`);
};

// Registration user

export const RegisterUser = async (userId: string) => {
  return axios.post<IregisterUserResponse>(`/registration/create/`, userId);
};

// ------------------chart------------------
export const last10Caution = async () => {
  return axios.get<ILast10CautionRes[]>("/chart/last10caution");
};

export const top10lowCaution = async (query: string) => {
  console.log(query);
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

export const averageWorkersListYearFa = async ({
  data,
  query,
}: {
  data: IAverageWorkersListReq;
  query: string;
}) => {
  return axios.post<IAverageWorkersListRes[]>(
    "/chart/workers-avg-year-fa?" + query,
    data
  );
};

export const averageAllWorkers = async (query: string) => {
  return axios.get<IAverageAllWorkersRes[]>("/chart/allworkers-avg?" + query);
};

export const averageAllWorkersYearFa = async (query: string) => {
  return axios.get<IAverageAllWorkersRes[]>(
    "/chart/allworkers-avg-year-fa?" + query
  );
};

export const alertUnderThreshold = async (workerId: string) => {
  return axios.post<{ isAlert: boolean }>("/chart/alert-under-threshold", {
    workerId,
  });
};
