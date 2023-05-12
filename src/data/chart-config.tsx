import { ApexOptions } from "apexcharts";

export const chartsConfig: ApexOptions = {
  chart: {
    toolbar: {
      show: false,
    },
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
        fontSize: "17px",
        fontFamily: "inherit",
        fontWeight: 500,
      },
    },

    max: 100,
    min: 0,
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
      right: 50,
      left: 10,
      bottom: 20,
    },
  },
  fill: {
    opacity: 1,
  },
};
