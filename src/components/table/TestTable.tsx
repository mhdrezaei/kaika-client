import React, { FC } from "react";
import { ItestTableProps } from "../../types/components/testTable-types";
import TestTableRow from "./TestTableRow";
import { Typography } from "@material-tailwind/react";

const TestTable: FC<ItestTableProps> = ({ headers, data }) => {
  return (
    // wrapper
    <div className="w-full my-4 mx-auto p-4 ">
      {/* Rtable Rtable--5cols Rtable--collapse */}
      <div className="flex flex-wrap mb-3 p-0 ">
        {/* Rtable-row Rtable-row--head  = > display:none*/}
        <div className="w-full md:flex md:flex-nowrap flex-wrap mb-4 hidden ">
          {headers.map((element, index) => (
            // Rtable-cell date-cell column-heading
            <div
              key={index}
              className="w-full flex items-center md:flex-grow md:py-2 md:pl-4 md:px4 md:overflow-hidden md:list-none"
            >
              <Typography
                variant="small"
                className="text-base font-medium uppercase text-blue-gray-50"
              >
                {element}
              </Typography>
            </div>
          ))}
        </div>

        {data?.map((element) => (
          <TestTableRow key={element._id} rows={element} />
        ))}
      </div>
    </div>
  );
};

export default TestTable;
