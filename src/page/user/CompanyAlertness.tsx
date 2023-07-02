import AllWorkersChart from "../../components/charts/AllWorkersChart";
import { averageAllWorkers } from "../../service/api";

const CompanyAlertness = () => {
  return (
    <AllWorkersChart
      color="brown"
      description="Average of all employees"
      title="Company Mental Alertness"

    />
  );
};

export default CompanyAlertness;
