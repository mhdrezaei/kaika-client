import { IworkerInfo } from "../../api/api-types";

export interface ItestTableRowProps {
  row: {
    _id: string;
    kss: number;
    createdAt: string;
    worker: IworkerInfo;
  };
}
