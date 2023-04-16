import { renderToString } from "react-dom/server";
import { ITop10LowCautios } from "../types/api/api-types";
import { ApexOptions } from "apexcharts";

const chartsConfig = {
  chart: {
    toolbar: {
      show: false,
    },
  },
  title: {
    show: "",
  },
  dataLabels: {
    enabled: false,
  },
  xaxis: {
    axisTicks: {
      show: false,
    },
    axisBorder: {
      show: false,
    },
    labels: {
      style: {
        colors: "#fff",
        fontSize: "13px",
        fontFamily: "inherit",
        fontWeight: 300,
      },
    },
  },
  yaxis: {
    labels: {
      style: {
        colors: "#fff",
        fontSize: "13px",
        fontFamily: "inherit",
        fontWeight: 300,
      },
    },
    max: 100,
    logBase: 5,
    tickAmount: 5,
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
      right: 20,
    },
  },
  fill: {
    opacity: 0.8,
  },
};

export const top10chartOptions = ({
  data,
  color,
}: {
  data: ITop10LowCautios[] | undefined;
  color: string;
}) => {
  let x: any = [],
    y: any = [],
    time: any = [],
    config: any = {
      grid: { show: false },
      xaxis: {},
      noData: {
        text: "Chart is Loading...",
        align: "center",
        verticalAlign: "middle",
        offsetX: 0,
        offsetY: 0,
        style: {
          color: "#fff",
          fontSize: "22px",
          fontFamily: "snad-serif",
        },
      },
    };

  if (data) {
    x = data.map(
      (hseInfo) => `${hseInfo.worker.firstName} ${hseInfo.worker.lastName}`
    );
    y = data.map((hseInfo) => 100 - hseInfo.kss);
    time = data.map((hseIfdo) => new Date(hseIfdo.createdAt).toLocaleString());
    config = chartsConfig;
  }

  const top10: { options: ApexOptions; [key: string]: any } = {
    type: "bar",
    height: 500,
    series: [
      {
        name: "Views",
        data: y,
      },
    ],
    options: {
      ...config,
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
          borderRadius: 3,
        },
      },
      xaxis: {
        ...config.xaxis,
        categories: x,
      },
      tooltip: {
        theme: false,
        custom: function ({ series, seriesIndex, dataPointIndex, w }) {
          return renderToString(
            <div className="bg-black p-2 flex flex-col bg-opacity-20 backdrop-blur-lg rounded drop-shadow-lg">
              <span>{series[seriesIndex][dataPointIndex]}</span>
              <span>{time[dataPointIndex]}</span>
            </div>
          );
        },
      },
    },
  };

  return {
    color: color,
    title: "Last Test Top 10 Low Caution",
    description: "Persons whose test was low than other.",
    chart: top10,
  };
};
