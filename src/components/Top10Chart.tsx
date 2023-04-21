import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Button,
  Option,
  Select,
  Input,
} from "@material-tailwind/react";
import Chart from "react-apexcharts";
import { top10chartOptions } from "../util/top10chart-options";
import { useMutation } from "react-query";
import React, { LegacyRef, useEffect, useRef, useState } from "react";
import { ITop10Chart } from "../types/components/top10chart-types";
import { ClockLoader } from "react-spinners";
import { CalendarDaysIcon } from "@heroicons/react/24/solid";
import { AxiosError } from "axios";
import { alertActive } from "../util/alertActive";

const Top10Chart: React.FC<ITop10Chart> = ({
  requestFunc,
  color,
  description,
  title,
}) => {
  const [date, setDate] = useState(new Date().toLocaleDateString());
  const [period, setPeriod] = useState("day");
  const dateRef = useRef<HTMLInputElement>();
  const handleInterviewDateClick = () => {
    dateRef.current?.showPicker();
  };

  const mutation = useMutation({
    mutationFn: requestFunc,
    mutationKey: title,
    onError: (err: AxiosError) =>
      alertActive({ message: err.message, color: "red" }),
  });

  useEffect(() => {
    mutation.mutateAsync(`date=${date}&period=${period}`);
  }, []);

  const options = top10chartOptions({
    data: mutation.data?.data,
    color,
  });

  return (
    <Card className="h-fit w-full bg-kaika-black">
      <CardHeader
        variant="gradient"
        color={options.color}
        className="h-[500px]"
      >
        {mutation.isSuccess && !mutation.isLoading && (
          <Chart {...options.chart} />
        )}
      </CardHeader>
      <CardBody className="p-6 md:flex flex-col lg:flex-row">
        <div>
          <Typography variant="h6" className="text-orange-200">
            {title}
          </Typography>
          <Typography variant="small" className="font-normal text-kaika-yellow">
            {description}
          </Typography>
        </div>
        <div className="lg:ml-auto flex flex-wrap items-center  lg:justify-center justify-evenly gap-4">
          <span className="bg-kaika-gray w-24 text-center p-2 rounded">
            {date}
          </span>
          <div className="relative w-12">
            <CalendarDaysIcon
              className="h-full text-white"
              onClick={handleInterviewDateClick}
            />
            <input
              ref={dateRef as LegacyRef<HTMLInputElement>}
              type="date"
              className="opacity-0 absolute right-full "
              onChange={(e) =>
                setDate(
                  e.target.value
                    ? new Date(e.target.value).toLocaleDateString()
                    : ""
                )
              }
            />
          </div>
          <div className="[&>div]:min-w-[100px]">
            <Select
              className=""
              label="Period"
              value={period}
              onChange={(e) => e && setPeriod(e)}
            >
              <Option value="day">Daily</Option>
              <Option value="week">Weekly</Option>
              <Option value="month">Monthly</Option>
              <Option value="year">Yearly</Option>
            </Select>
          </div>
          <Button
            onClick={() => mutation.mutate(`date=${date}&period=${period}`)}
            className="py-3 px-12 w-20 text-base flex justify-center items-stretch"
          >
            {mutation.isLoading ? (
              <div>
                <ClockLoader color="#fff" size={24} />
              </div>
            ) : (
              "Apply"
            )}
          </Button>
        </div>
      </CardBody>
    </Card>
  );
};

export default Top10Chart;
