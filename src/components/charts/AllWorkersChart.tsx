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
import FaEnDatePicker from "../datePicker/FaEnDatePicker";
import { useTranslation } from "react-i18next";
import { averageAllWorkers, averageAllWorkersYearFa } from "../../service/api";
import AllEmployeesExcelExport from "../excel/AllEmployeesExcelExport";

const AllWorkersChart: React.FC<IAllWorkersChart> = ({
  color,
  description,
  title,
}) => {
  const { i18n, t } = useTranslation();

  const [date, setDate] = useState({
    from: new Date().toDateString(),
    to: new Date(new Date().setDate(new Date().getDate() + 1)).toDateString(),
  });

  const [period, setPeriod] = useState("day");
  const [options, setOptions] = useState(
    allWorkersChartOptions({
      data: undefined,
      color,
      period,
      lang: i18n.language,
    })
  );

  // const dateRef = useRef<HTMLInputElement>();
  // const handleInterviewDateClick = () => {
  //   dateRef.current?.showPicker();
  // };

  const mutation = useMutation({
    mutationFn:
      period === "year" && i18n.language === "fa"
        ? averageAllWorkersYearFa
        : averageAllWorkers,
    mutationKey: title,
    onError: (err: AxiosError<any>) =>
      alertActive({ message: err.response?.data.message, color: "red" }),
    onSuccess: (data) => {
      setOptions(
        allWorkersChartOptions({
          data: data.data,
          color,
          period,
          lang: i18n.language,
        })
      );
    },
  });

  useEffect(() => {
    mutation.mutateAsync(`from=${date.from}&to=${date.to}&period=${period}`);
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
        <div
          className={`${
            i18n.language === "fa" ? "lg:mr-auto" : "lg:ml-auto"
          } flex flex-wrap items-center  lg:justify-center justify-evenly gap-4`}
        >
          {" "}
          <div className="">
            {/* <DatePickerEn period={period} setDate={setDate} /> */}
            <FaEnDatePicker period={period} setDate={setDate} />
          </div>
          <SelectPeriod
            period={period}
            setPeriod={setPeriod}
            setDate={setDate}
          />
          <AllEmployeesExcelExport data={mutation.data?.data} period={period} />
          <Button
            onClick={() =>
              mutation.mutate(
                `from=${date.from}&to=${date.to}&period=${period}`
              )
            }
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
