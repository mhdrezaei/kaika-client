import React, { FC } from "react";
import { IgetHseCurrentUserInfoResponse } from "../../types/api/api-types";
import { Avatar, Progress, Typography } from "@material-tailwind/react";
import { ItestTableRowProps } from "../../types/components/last10cuation/testTableRow-types";
import { baseUrl } from "../../data/constants";

const TestTableRow: FC<ItestTableRowProps> = ({ row }) => {
  const date = new Date(row.createdAt);
  return (
    // Rtable-row
    <>
      <div className="flex min-w-max  gap-2 items-center">
        <Avatar
          src={baseUrl + row.worker.imageUrl}
          alt={`${row.worker.firstName} + ${row.worker.lastName}`}
          className="w-16 h-16"
        />
        <Typography
          variant="small"
          className="font-semibold min-w-max text-blue-gray-50"
        >
          {row.worker.firstName} {row.worker.lastName}
        </Typography>
      </div>

      <Typography
        variant="small"
        className="font-semibold w-fit text-blue-gray-50"
      >
        {row.worker.job}
      </Typography>

      <Typography
        variant="small"
        className="text-sm w-fit font-semibold text-blue-gray-50"
      >
        {date.toLocaleDateString()}
      </Typography>
      <div className="flex gap-2 items-center">
        <Typography
          variant="small"
          className="block text-sm w-fit font-medium text-blue-gray-50"
        >
          {100 - row.kss}%
        </Typography>
        <Progress
          className=" w-20"
          value={100 - row.kss}
          variant="gradient"
          color={
            100 - row.kss > 66 ? "green" : 100 - row.kss > 33 ? "yellow" : "red"
          }
        />
      </div>
    </>
  );
};

export default TestTableRow;
