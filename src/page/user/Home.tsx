import React, { useRef } from "react";
import Top10Chart from "../../components/Top10Chart";
import { statisticsChartsData } from "../../data/chart-data";
import { Typography } from "@material-tailwind/react";
import { ClockIcon } from "@heroicons/react/24/outline";
import { useQuery, useQueries } from "react-query";
import { top10highCaution, top10lowCaution } from "../../service/api";
import { top10chartOptions } from "../../util/top10chart-options";

const Home = () => {
  // const low = useQuery("top10low", top10lowCaution);
  // const high = useQuery("top10high", top10highCaution);

  // const lowOptions = top10chartOptions({
  //   data: low.data?.data,
  //   color: "pink",
  // });
  // const highOptions = top10chartOptions({
  //   data: high.data?.data,
  //   color: "green",
  // });
  return (
    <div className="grid xl:grid-cols-2 grid-cols-1 gap-10 mt-7 px-4">
      <Top10Chart
        color="deep-orange"
        requestFunc={top10lowCaution}
        description="Workers who their last test is Lowest"
        title="Top 10 low"
      />
      <Top10Chart
        color="light-green"
        requestFunc={top10highCaution}
        description="Workers who their last test is Highest"
        title="Top 10 high"
      />
    </div>
  );
};

export default Home;
