import { renderToString } from "react-dom/server";
import {
  IAverageAllWorkersRes,
  IAverageWorkersListRes,
} from "../types/api/api-types";
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
  data: IAverageAllWorkersRes[] | undefined;
  period: string;
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
              ? monthOfYear[new Date(dataPerDate.date).getMonth()]
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
        monthOfYear[new Date(dataPerDate.date).getMonth()]
      : dataPerDate.date
  );

  return { series, time };
};

export const allWorkersChartOptions = ({
  data,
  color,
  period,
}: {
  data: IAverageAllWorkersRes[] | undefined;
  color: colors;
  period: string;
}) => {
  const { series, time } = createSeries({ data, period });

  const compareChart: Props = {
    type: "line",
    height: 500,
    series,
    options: {
      ...chartsConfig,
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
