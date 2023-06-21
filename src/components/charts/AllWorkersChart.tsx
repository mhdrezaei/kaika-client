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
import { alertActive } from "../../util/alertActive";
import { IAllWorkersChart } from "../../types/components/allWorkersChart-types";
import { allWorkersChartOptions } from "../../util/allWorkersChart";
import DatePickerEn from "../datePicker/DatePicker-en";
import SelectPeriod from "../datePicker/SelectPeriod";
import { useTranslation } from "react-i18next";

const AllWorkersChart: React.FC<IAllWorkersChart> = ({
  requestFunc,
  color,
  description,
  title,
}) => {
  const { t } = useTranslation()
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
            {t(title)}
          </Typography>
          <Typography variant="small" className="font-normal text-kaika-yellow">
            {t(description)}
          </Typography>
        </div>
        <div className="lg:ml-auto flex flex-wrap items-center  lg:justify-center justify-evenly gap-4">
          <div className="">
            <DatePickerEn period={period} setDate={setDate} />
          </div>
          <SelectPeriod
            period={period}
            setPeriod={setPeriod}
            setDate={setDate}
          />
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
