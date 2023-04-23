import { colors } from "@material-tailwind/react/types/generic";
import { AxiosResponse } from "axios";
import { IAverageAllWorkersRes } from "../api/api-types";

export interface IAllWorkersChart {
  requestFunc: (
    query: string
  ) => Promise<AxiosResponse<IAverageAllWorkersRes[], any>>;
  color: colors;
  title: string;
  description: string;
}
