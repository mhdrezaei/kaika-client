import React from "react";
import Top10Chart from "../../components/charts/Top10Chart";
import CompareChart from "../../components/charts/compareChart";
import { averageWorkersList } from "../../service/api";
import { compareWorkersOptions } from "../../util/compareChart-options";

const CompareWorkers = () => {
  return <CompareChart color="indigo" requestFunc={averageWorkersList} />;
};

export default CompareWorkers;
