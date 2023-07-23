import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Button,
  Avatar,
} from "@material-tailwind/react";
import Chart from "react-apexcharts";
import { useMutation } from "react-query";
import React, { useEffect, useState } from "react";
import { ClockLoader } from "react-spinners";
import { ICompareChart } from "../../types/components/compareChart-types";
import { compareWorkersOptions } from "../../util/compareChart-options";
import { AxiosError } from "axios";
import { alertActive } from "../../util/alertActive";
import { useLocation } from "react-router-dom";
import SelectPeriod from "../datePicker/SelectPeriod";
import { baseUrl } from "../../data/constants";
import FaEnDatePicker from "../datePicker/FaEnDatePicker";
import { useTranslation } from "react-i18next";
import {
  averageWorkersList,
  averageWorkersListYearFa,
} from "../../service/api";
import EmployeeExcelExport from "../excel/EmployeeExcelExport";

const CompareChart: React.FC<ICompareChart> = ({ color }) => {
  const workersId = useLocation().state.selectedWorkers;
  const { i18n, t } = useTranslation();

  const [date, setDate] = useState({
    from: new Date().toDateString(),
    to: new Date(new Date().setDate(new Date().getDate() + 1)).toDateString(),
  });
  const [options, setOptions] = useState(
    compareWorkersOptions({
      data: undefined,
      color: "indigo",
      period: "day",
      lang: i18n.language,
    })
  );
  const [period, setPeriod] = useState("day");

  const mutation = useMutation({
    mutationFn:
      i18n.language === "fa" && period === "year"
        ? averageWorkersListYearFa
        : averageWorkersList,
    onError: (err: AxiosError<any>) =>
      alertActive({ message: err.response?.data.message, color: "red" }),
    onSuccess: (data) => {
      setOptions(
        compareWorkersOptions({
          data: data.data,
          color,
          period,
          lang: i18n.language,
        })
      );
    },
  });

  useEffect(() => {
    mutation.mutateAsync({
      data: {
        workerIdList: workersId,
      },
      query: `from=${date.from}&to=${date.to}&period=${period}`,
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
          <Chart {...options.chart} dir="ltr" />
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
              id="imageid"
              crossOrigin="anonymous"
            />
            <div>
              <Typography variant="h6" className="text-orange-200">
                {mutation.data?.data[0].worker.firstName +
                  " " +
                  mutation.data?.data[0].worker.lastName}
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
              {t("Comparison")}
            </Typography>
            <Typography
              variant="small"
              className="font-normal text-kaika-yellow"
            >
              {t("Compare betweens employees")}
            </Typography>
          </div>
        )}
        <div
          className={`${
            i18n.language === "fa" ? "lg:mr-auto" : "lg:ml-auto"
          } flex flex-wrap items-center  lg:justify-center justify-evenly gap-4`}
        >
          <div className="">
            {/* <CalendarDaysIcon
                  className="w-12 text-white"
                  onClick={handleInterviewDateClick}
                /> */}
            {/* <DatePickerEn period={period} setDate={setDate} /> */}
            <FaEnDatePicker period={period} setDate={setDate} />
          </div>
          <SelectPeriod
            period={period}
            setPeriod={setPeriod}
            setDate={setDate}
          />
          <EmployeeExcelExport
            data={mutation.data?.data[0].avgList}
            period={period}
            employee={mutation.data?.data[0].worker}
          />
          <Button
            onClick={() => {
              mutation.mutate({
                data: {
                  workerIdList: workersId,
                },
                query: `from=${date.from}&to=${date.to}&period=${period}`,
              });
            }}
            className="py-3 px-12 w-20 text-base flex justify-center items-stretch"
          >
            {mutation.isLoading ? (
              <div>
                <ClockLoader color="#fff" size={24} />
              </div>
            ) : (
              t("Apply")
            )}
          </Button>
        </div>
      </CardBody>
    </Card>
  );
};

export default CompareChart;
