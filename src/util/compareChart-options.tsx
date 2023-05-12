import { renderToString } from "react-dom/server";
import { IAverageWorkersListRes } from "../types/api/api-types";
import { Props } from "react-apexcharts";
import { colors } from "@material-tailwind/react/types/generic";
import { chartsConfig } from "../data/chart-config";

const dayOfWeek = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
const monthOfYear = [
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

const createSeries = ({
  data,
  period,
}: {
  data: IAverageWorkersListRes[] | undefined;
  period: string;
}) => {
  let series: any = [],
    time: any = [];

  if (!data || data.length <= 0) return { series, time };

  series = data.map((workerData) => {
    return {
      data: workerData.avgList.map((avg) => {
        return {
          x: new Date(avg.date),
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
          monthOfYear[new Date(avg.date).getMonth()]
        : period === "day"
        ? new Date(avg.date).toLocaleString("fr")
        : avg.date
    )
  );

  return { series, time };
};

export const compareWorkersOptions = ({
  data,
  color,
  period,
}: {
  data: IAverageWorkersListRes[] | undefined;
  color: colors;
  period: string;
}) => {
  const { series, time } = createSeries({ data, period });

  const className = "md:font-medium md:text-base";

  const compareChart: Props = {
    type: "line",
    height: 500,
    series,
    options: {
      ...chartsConfig,
      chart: {
        // foreColor: "#fff",
      },
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
        tickPlacement: "between",
        type: "datetime",

        // type: period === "day" ? "datetime" : "category",
        labels: {
          // rotateAlways: true,
          // rotate: -90,

          format:
            period === "year"
              ? "MMMM"
              : period === "month"
              ? "dd"
              : period === "week"
              ? "dddd"
              : "HH:mm",
          style: {
            colors: "#fff",
            cssClass: className,
          },
          // formatter(value, timestamp, opts) {
          //   return dayOfWeek[new Date(value).getDay()];
          // },
        },
        tooltip: { enabled: false },
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
