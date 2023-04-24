import Top10Chart from "../../components/Top10Chart";
import { top10highCaution, top10lowCaution } from "../../service/api";
import Top10Table from "../../components/Top10Table";

const Home = () => {
  return (
    <div className="grid  grid-cols-1 gap-10 mt-10">
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
      <Top10Table />
    </div>
  );
};

export default Home;
