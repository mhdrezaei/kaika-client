import React from "react";
import Top10Chart from "../../component/Top10Chart";
import { statisticsChartsData } from "../../data/chart-data";
import { Typography } from "@material-tailwind/react";
import { ClockIcon } from "@heroicons/react/24/outline";

const Home = () => {
  return (
    <div className="grid grid-cols-2 gap-10 mt-7">
      {statisticsChartsData.map((props) => (
        <Top10Chart
          key={props.title}
          {...props}
          footer={
            <Typography
              variant="small"
              className="flex items-center font-normal text-blue-gray-600"
            >
              <ClockIcon strokeWidth={2} className="h-4 w-4 text-inherit" />
              &nbsp;{props.footer}
            </Typography>
          }
        />
      ))}
    </div>
  );
};

export default Home;
