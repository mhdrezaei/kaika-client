import React, { FC } from "react";
import { IgetHseCurrentUserInfoResponse } from "../../types/api/api-types";
import WorkerInfo from "../worker/WorkerInfo";
import { Progress, Typography } from "@material-tailwind/react";
export interface ItestTableRowProps {
  rows: IgetHseCurrentUserInfoResponse;
}
const TestTableRow: FC<ItestTableRowProps> = ({ rows }) => {
  const date = new Date(rows.createdAt);
  return (
    // Rtable-row
    <div className="w-full md:flex flex-wrap mb-4 ">
      <WorkerInfo workerId={rows?.workerId} />
      <div className="md:w-1/4 flex items-center gap-3 bg-transparent text-kaika-black text-center pl-4 ">
        <div className="md:hidden text-kaika-yellow">Date </div>
        <Typography
          variant="small"
          className="text-sm font-semibold text-blue-gray-50"
        >
          
          {date.toLocaleString()}
        </Typography>
      </div>
      <div className="md:w-1/4 flex items-center gap-3 md:flex-grow  py-2 px-4 overflow-hidden list-none ">
        <div className="md:hidden text-kaika-yellow">KSS </div>
        <Typography
          variant="small"
          className="block text-sm font-medium text-blue-gray-50"
        >
          {100 - rows.kss}%
        </Typography>
        <Progress
          value={100 - rows.kss}
          variant="gradient"
          color={100 - rows.kss === 100 ? "green" : "blue"}
        />
      </div>
    </div>
  );
};

export default TestTableRow;
