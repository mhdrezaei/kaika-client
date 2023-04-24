import AllWorkersChart from "../../components/AllWorkersChart";
import { averageAllWorkers } from "../../service/api";

const UserFatigue = () => {
  return (
    <AllWorkersChart
      color="brown"
      requestFunc={averageAllWorkers}
      description="Workers who their last test is Highest"
      title="Top 10 high"
    />
  );
};

export default UserFatigue;
