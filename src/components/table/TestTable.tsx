import React, { FC } from "react";
import { ItestTableProps } from "../../types/components/last10cuation/testTable-types";
import TestTableRow from "./TestTableRow";
import { Typography } from "@material-tailwind/react";

const TestTable: FC<ItestTableProps> = ({ headers, data }) => {
  return (
    <div className="grid grid-cols-[repeat(3,minmax(min-content,1fr))_min-content] pt-5 lg:px-5 md:px-2  gap-y-3 gap-x-5 grid-flow-row min-w-fit mb-3 place-items-center place-content-center">
      <Typography
        variant="small"
        className={`text-base min-w-max font-medium uppercase text-blue-gray-50`}
      >
        Worker
      </Typography>
      <Typography
        variant="small"
        className={`text-base min-w-max font-medium uppercase text-blue-gray-50`}
      >
        Job
      </Typography>
      <Typography
        variant="small"
        className={`text-base min-w-max font-medium uppercase text-blue-gray-50`}
      >
        Date of Test
      </Typography>
      <Typography
        variant="small"
        className={`text-base min-w-max font-medium uppercase text-blue-gray-50`}
      >
        Caution
      </Typography>
      {data.map((element) => (
        <TestTableRow key={element._id} row={element} />
      ))}
    </div>
  );
};

export default TestTable;
