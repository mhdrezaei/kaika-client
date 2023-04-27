import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Button,
  Option,
  Select,
} from "@material-tailwind/react";
import Chart from "react-apexcharts";
import { useMutation } from "react-query";
import React, { LegacyRef, useEffect, useRef, useState } from "react";
import { ClockLoader } from "react-spinners";
import { CalendarDaysIcon } from "@heroicons/react/24/solid";
import { AxiosError } from "axios";
import { alertActive } from "../util/alertActive";
import { IAllWorkersChart } from "../types/components/allWorkersChart-types";
import { allWorkersChartOptions } from "../util/allWorkersChart";
import DatePickerEn from "./datePicker/DatePicker-en";

const AllWorkersChart: React.FC<IAllWorkersChart> = ({
  requestFunc,
  color,
  description,
  title,
}) => {
  const [date, setDate] = useState(new Date().toLocaleDateString());
  const [period, setPeriod] = useState("day");
  const [options, setOptions] = useState(
    allWorkersChartOptions({
      data: undefined,
      color,
      period,
    })
  );
  // const dateRef = useRef<HTMLInputElement>();
  // const handleInterviewDateClick = () => {
  //   dateRef.current?.showPicker();
  // };

  const mutation = useMutation({
    mutationFn: requestFunc,
    mutationKey: title,
    onError: (err: AxiosError<any>) =>
      alertActive({ message: err.response?.data.message, color: "red" }),
    onSuccess: (data) => {
      setOptions(
        allWorkersChartOptions({
          data: data.data,
          color,
          period,
        })
      );
    },
  });

  useEffect(() => {
    mutation.mutateAsync(`date=${date}&period=${period}`);
  }, []);

  return (
    <Card className="h-fit w-full bg-kaika-black mt-10">
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
          <div className="">
            <DatePickerEn period={period} setDate={setDate} />
          </div>
          <div className="[&>div]:min-w-[100px]">
            <Select
              className=""
              label="Period"
              value={period}
              onChange={(e) => {
                if (e) setPeriod(e);
              }}
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

export default AllWorkersChart;
