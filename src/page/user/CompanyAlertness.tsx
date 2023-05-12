import AllWorkersChart from "../../components/charts/AllWorkersChart";
import { averageAllWorkers } from "../../service/api";

const CompanyAlertness = () => {
  return (
    <AllWorkersChart
      color="brown"
      requestFunc={averageAllWorkers}
      description="Workers who their last test is Highest"
      title="Top 10 high"
    />
  );
};

export default CompanyAlertness;
