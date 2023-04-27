import React from "react";
import Top10Chart from "../../components/Top10Chart";
import CompareChart from "../../components/compareChart";
import { averageWorkersList } from "../../service/api";
import { compareWorkersOptions } from "../../util/compareChart-options";

const CompareWorkers = () => {
  return (
    <CompareChart
      color="indigo"
      requestFunc={averageWorkersList}
      description="Workers who their last test is Highest"
      title="Top 10 high"
    />
  );
};

export default CompareWorkers;
