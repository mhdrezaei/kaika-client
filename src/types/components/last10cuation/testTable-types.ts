import {
  ILast10CautionRes,
  IgetHseCurrentUserInfoResponse,
} from "../../api/api-types";

export interface ItestTableRow {
  _id: string;
  workerId: string;
  createdAt: string;
  kss: number;
}
export interface IheaderTableTest {
  Worker: string;
  job: string;
  date: string;
  kss: string;
}

export interface ItestTableProps {
  headers: string[];
  data: ILast10CautionRes[];
}
