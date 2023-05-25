import Top10Chart from "../../components/charts/Top10Chart";
import { top10highCaution, top10lowCaution } from "../../service/api";
import Top10Table from "../../components/table/Top10Table";

const Home = () => {
  return (
    <div className="grid  grid-cols-1 gap-10">
      <Top10Chart
        color="deep-orange"
        requestFunc={top10lowCaution}
        description="Employees who their last test is Lowest"
        title="Lowest"
      />
      <Top10Chart
        color="light-green"
        requestFunc={top10highCaution}
        description="Employees who their last test is Highest"
        title="Highest"
      />
      <Top10Table />
    </div>
  );
};

export default Home;
