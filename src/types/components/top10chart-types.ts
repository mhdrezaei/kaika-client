import { colors } from "@material-tailwind/react/types/generic";
import { AxiosResponse } from "axios";
import { ITop10LowCautios } from "../api/api-types";

export interface ITop10Chart {
  requestFunc: () => Promise<AxiosResponse<ITop10LowCautios[], any>>;
  color: colors;
  title: string;
  description: string;
}
