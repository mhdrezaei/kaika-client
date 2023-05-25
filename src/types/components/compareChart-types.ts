import { colors } from "@material-tailwind/react/types/generic";
import { AxiosResponse } from "axios";
import {
  IAverageWorkersListReq,
  IAverageWorkersListRes,
} from "../api/api-types";

export interface ICompareChart {
  requestFunc: ({
    data,
    query,
  }: {
    data: IAverageWorkersListReq;
    query: string;
  }) => Promise<AxiosResponse<IAverageWorkersListRes[], any>>;
  color: colors;
}
