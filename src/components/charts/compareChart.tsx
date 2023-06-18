import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Button,
  Option,
  Select,
  Input,
  Avatar,
} from "@material-tailwind/react";
import Chart from "react-apexcharts";
import { useMutation } from "react-query";
import React, {
  LegacyRef,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { ClockLoader } from "react-spinners";
import { CalendarDaysIcon } from "@heroicons/react/24/solid";
import { ICompareChart } from "../../types/components/compareChart-types";
import { compareWorkersOptions } from "../../util/compareChart-options";
import { AxiosError } from "axios";
import { alertActive } from "../../util/alertActive";
import { useLocation } from "react-router-dom";
import DatePickerEn from "../datePicker/DatePicker-en";
import SelectPeriod from "../datePicker/SelectPeriod";
import { baseUrl } from "../../data/constants";

const CompareChart: React.FC<ICompareChart> = ({ requestFunc, color }) => {
  const workersId = useLocation().state.selectedWorkers;

  const [date, setDate] = useState(new Date().toLocaleDateString());
  const [options, setOptions] = useState(
    compareWorkersOptions({
      data: undefined,
      color: "indigo",
      period: "day",
    })
  );
  const [period, setPeriod] = useState("day");
  // const dateRef = useRef<HTMLInputElement>();
  // const handleInterviewDateClick = () => {
  //   dateRef.current?.showPicker();
  // };
  // (dateRef.current)&&dateRef.current.datepicker({dateFormat: 'yy'})
  // console.log(dateRef.current && dateRef.current.);
  const mutation = useMutation({
    mutationFn: requestFunc,
    onError: (err: AxiosError<any>) =>
      alertActive({ message: err.response?.data.message, color: "red" }),
    onSuccess: (data) => {
      setOptions(
        compareWorkersOptions({
          data: data.data,
          color,
          period,
        })
      );
    },
  });

  useEffect(() => {
    mutation.mutateAsync({
      data: {
        workerIdList: workersId,
      },
      query: `date=${date}&period=${period}`,
    });
  }, []);

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
        {mutation.data?.data.length === 1 ? (
          <div
            className="flex items-center gap-2
          "
          >
            <Avatar
              src={
                mutation.data?.data[0].worker.imageUrl
                  ? baseUrl + mutation.data?.data[0].worker.imageUrl
                  : "/assets/image/no-profile-photo.jpg"
              }
              alt={`${mutation.data?.data[0].worker.firstName} + ${mutation.data?.data[0].worker.lastName}`}
              className="w-16 h-16"
            />
            <div>
              <Typography variant="h6" className="text-orange-200">
                {mutation.data?.data[0].worker.firstName +
                  " " +
                  mutation.data?.data[0].worker.firstName}
              </Typography>
              <Typography
                variant="small"
                className="font-normal text-kaika-yellow"
              >
                {mutation.data?.data[0].worker.job}
              </Typography>
            </div>
          </div>
        ) : (
          <div className="flex flex-col">
            <Typography variant="h6" className="text-orange-200">
              Comparison
            </Typography>
            <Typography
              variant="small"
              className="font-normal text-kaika-yellow"
            >
              Compare betweens employees
            </Typography>
          </div>
        )}
        <div className="lg:ml-auto flex flex-wrap items-center  lg:justify-center justify-evenly gap-4">
          <div className="">
            {/* <CalendarDaysIcon
                  className="w-12 text-white"
                  onClick={handleInterviewDateClick}
                /> */}
            <DatePickerEn period={period} setDate={setDate} />
          </div>
          <SelectPeriod
            period={period}
            setPeriod={setPeriod}
            setDate={setDate}
          />

          <Button
            onClick={() => {
              mutation.mutate({
                data: {
                  workerIdList: workersId,
                },
                query: `date=${date}&period=${period}`,
              });
            }}
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

export default CompareChart;
