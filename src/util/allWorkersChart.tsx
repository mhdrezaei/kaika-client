import { renderToString } from "react-dom/server";
import {
  IAverageAllWorkersRes,
  IAverageWorkersListRes,
} from "../types/api/api-types";
import { Props } from "react-apexcharts";
import { colors } from "@material-tailwind/react/types/generic";
import { chartsConfig } from "../data/chart-config";

const dayOfWeekEn = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
const dayOfWeekFa = [
  "یکشنبه",
  "دوشنبه",
  "سه‌شنبه",
  "چهارشنبه",
  "پنچشنبه",
  "جمعه",
  "شنبه",
];

const monthOfYearEn = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const monthOfYearFa = [
  "فروردین",
  "اردیبهشت",
  "خرداد",
  "تیر",
  "مرداد",
  "شهریور",
  "مهر",
  "آبان",
  "آذر",
  "دی",
  "بهمن",
  "اسفند",
];

const createSeries = ({
  data,
  period,
  lang,
}: {
  data: IAverageAllWorkersRes[] | undefined;
  period: string;
  lang: string;
}) => {
  let series: any = [],
    time: any = [];

  if (!data || data.length <= 0) return { series, time };

  series = [
    {
      data: data.map((dataPerDate) => {
        return {
          x:
            period === "year"
              ? lang === "en"
                ? monthOfYearEn[new Date(dataPerDate.date).getMonth()]
                : monthOfYearFa[+dataPerDate.date.split("-")[1] - 1]
              : period === "week"
              ? lang === "en"
                ? dayOfWeekEn[new Date(dataPerDate.date).getDay()]
                : dayOfWeekFa[new Date(dataPerDate.date).getDay()]
              : period === "month"
              ? lang === "fa"
                ? new Date(dataPerDate.date)
                    .toLocaleDateString("fa-IR-u-nu-latn")
                    .split("/")
                    .join("-")
                : new Date(dataPerDate.date)
                    .toLocaleDateString("fr")
                    .split("/")
                    .join("-")
              : dataPerDate.date,
          y: dataPerDate.average,
        };
      }),
      name: "All Workers",
    },
  ];

  time = data.map((dataPerDate) =>
    period === "year"
      ? new Date(dataPerDate.date).getFullYear() +
        "-" +
        (lang === "en"
          ? monthOfYearEn[new Date(dataPerDate.date).getMonth()]
          : monthOfYearFa[new Date(dataPerDate.date).getMonth()])
      : period === "day"
      ? new Date(dataPerDate.date).toLocaleString(lang === "en" ? "fr" : "fa")
      : lang === "en"
      ? dataPerDate.date
      : new Date(dataPerDate.date).toLocaleDateString("fa")
  );

  return { series, time };
};

export const allWorkersChartOptions = ({
  data,
  color,
  period,
  lang,
}: {
  data: IAverageAllWorkersRes[] | undefined;
  color: colors;
  period: string;
  lang: string;
}) => {
  const { series, time } = createSeries({ data, period, lang });

  const compareChart: Props = {
    type: "line",
    height: 500,
    series,

    options: {
      ...chartsConfig,
      // chart: { locales: [fa], defaultLocale: "fa" },
      plotOptions: {
        bar: {
          columnWidth: "21%",
          borderRadius: 7,
        },
      },
      stroke: {
        lineCap: "round",
      },
      markers: {
        size: 5,
      },
      xaxis: {
        ...chartsConfig.xaxis,
        type: period === "day" ? "datetime" : "category",
        tooltip: { enabled: false },
        group: { groups: [] },
      },

      tooltip: {
        enabled: true,
        shared: true,
        theme: "",
        custom: function ({ series, seriesIndex, dataPointIndex, w }) {
          return renderToString(
            <div className="bg-black py-2 px-5 flex flex-col bg-opacity-20 backdrop-blur-lg rounded drop-shadow-lg">
              <span>{series[seriesIndex][dataPointIndex]}</span>
              {time && <span>{time[dataPointIndex]}</span>}
            </div>
          );
        },
      },
    },
  };

  return {
    color: color,
    chart: compareChart,
  };
};
