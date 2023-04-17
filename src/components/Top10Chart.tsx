import {
  Card,
  CardHeader,
  CardBody,
  Typography,
} from "@material-tailwind/react";
import Chart from "react-apexcharts";
import { top10chartOptions } from "../util/top10chart-options";
import { useQuery } from "react-query";
import React from "react";
import { ITop10Chart } from "../types/components/top10chart-types";
import { alertActive } from "../util/alertActive";
import { AxiosError } from "axios";

const Top10Chart: React.FC<ITop10Chart> = ({
  requestFunc,
  color,
  description,
  title,
}) => {
  const { data, isFetching, isSuccess, isError, error } = useQuery(
    title,
    requestFunc,
    {
      onError: (error: AxiosError<any>) => {
        alertActive({ message: error.response?.data.message, color: "red" });
      },
    }
  );

  const options = top10chartOptions({
    data: data?.data,
    color,
  });

  return (
    <Card className="h-fit w-full bg-kaika-black">
      <CardHeader
        variant="gradient"
        color={options.color}
        className="h-[500px]"
      >
        {isSuccess && !isFetching && <Chart {...options.chart} />}
      </CardHeader>
      <CardBody className="p-6">
        <Typography variant="h6" className="text-orange-200">
          {title}
        </Typography>
        <Typography variant="small" className="font-normal text-kaika-yellow">
          {description}
        </Typography>
      </CardBody>
    </Card>
  );
};

export default Top10Chart;
