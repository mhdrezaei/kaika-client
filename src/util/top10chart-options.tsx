import { renderToString } from "react-dom/server";
import { ITop10LowCautios } from "../types/api/api-types";
import { Props } from "react-apexcharts";
import { colors } from "@material-tailwind/react/types/generic";
import { chartsConfig } from "../data/chart-config";

export const top10chartOptions = ({
  data,
  color,
}: {
  data: ITop10LowCautios[] | undefined;
  color: colors;
}) => {
  let x: any = [],
    y: any = [],
    time: any = [];

  if (data && data.length > 0) {
    x = data.map(
      (hseInfo) => `${hseInfo.worker.firstName} ${hseInfo.worker.lastName}`
    );
    y = data.map((hseInfo) => 100 - hseInfo.average);
    time = data[0].date
      ? data.map(
          (hseIfdo) => hseIfdo.date && new Date(hseIfdo.date).toLocaleString()
        )
      : null;
  }

  const top10: Props = {
    type: "bar",
    height: 500,
    series: [
      {
        name: "Views",
        data: y,
      },
    ],
    options: {
      ...chartsConfig,
      colors: [
        function (props: any) {
          return (
            (props.value >= 66 && "#2d884d") ||
            (props.value >= 33 && "#fecf6d") ||
            "#b34045"
          );
        },
      ],
      plotOptions: {
        bar: {
          columnWidth: "21%",
          borderRadius: 7,
        },
      },
      xaxis: {
        ...chartsConfig.xaxis,
        categories: x,
      },
      tooltip: {
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
    chart: top10,
  };
};
