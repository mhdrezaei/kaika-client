import { renderToString } from "react-dom/server";
import { IAverageWorkersListRes } from "../types/api/api-types";
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
  data: IAverageWorkersListRes[] | undefined;
  period: string;
  lang: string;
}) => {
  let series: any = [],
    time: any = [];

  if (!data || data.length <= 0) return { series, time };

  series = data.map((workerData) => {
    return {
      data: workerData.avgList.map((avg) => {
        return {
          x:
            period === "year"
              ? lang === "en"
                ? monthOfYearEn[new Date(avg.date).getMonth()]
                : monthOfYearFa[+avg.date.split("-")[1] - 1]
              : period === "week"
              ? lang === "en"
                ? dayOfWeekEn[new Date(avg.date).getDay()]
                : dayOfWeekFa[new Date(avg.date).getDay()]
              : period === "month"
              ? lang === "fa"
                ? new Date(avg.date)
                    .toLocaleDateString("fa-IR-u-nu-latn")
                    .split("/")
                    .join("-")
                : new Date(avg.date)
                    .toLocaleDateString("fr")
                    .split("/")
                    .join("-")
              : avg.date,
          y: avg.avg,
        };
      }),
      name: `${workerData.worker.firstName} ${workerData.worker.lastName}`,
    };
  });

  time = data.map((workerData) =>
    workerData.avgList.map((avg) =>
      period === "year"
        ? new Date(avg.date).getFullYear() +
          "-" +
          (lang === "en"
            ? monthOfYearEn[new Date(avg.date).getMonth()]
            : monthOfYearFa[new Date(avg.date).getMonth()])
        : period === "day"
        ? new Date(avg.date).toLocaleString(lang === "en" ? "fr" : "fa")
        : lang === "en"
        ? new Date(avg.date).toLocaleDateString("fr")
        : new Date(avg.date).toLocaleDateString("fa")
    )
  );

  return { series, time };
};

export const compareWorkersOptions = ({
  data,
  color,
  period,
  lang,
}: {
  data: IAverageWorkersListRes[] | undefined;
  color: colors;
  period: string;
  lang: string;
}) => {
  const { series, time } = createSeries({ data, period, lang });

  const className = "md:font-medium md:text-base";

  const compareChart: Props = {
    type: "line",
    height: 500,
    series,
    options: {
      ...chartsConfig,
      legend: {
        fontSize: "19px",
        fontWeight: 400,
        fontFamily: "Helvetica, Arial",
        labels: {
          colors: "#FFCC80",
        },
        itemMargin: {
          horizontal: 20,
        },
      },
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

        // type: period === "day" ? "datetime" : "category",
        // labels: {
        //   style: {
        //     colors: "#fff",
        //     cssClass: className,
        //   },
        // },
        tooltip: { enabled: false },
      },
      grid: {
        show: true,
        borderColor: "#ffffff40",
        strokeDashArray: 5,
        xaxis: {
          lines: {
            show: true,
          },
        },
        padding: {
          top: 5,
          right: period === "month" ? 30 : 50,
          left: 10,
          bottom: 20,
        },
      },
      tooltip: {
        enabled: true,
        shared: true,
        theme: "",
        custom: function ({ series, seriesIndex, dataPointIndex, w }) {
          return renderToString(
            <div className="bg-black py-2 px-5 flex flex-col bg-opacity-20 backdrop-blur-lg rounded drop-shadow-lg">
              <span>{series[seriesIndex][dataPointIndex]}</span>
              {time && <span>{time[seriesIndex][dataPointIndex]}</span>}
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
