import {
  Card,
  CardHeader,
  Typography,
  CardBody,
} from "@material-tailwind/react";
import { useQuery } from "react-query";
import { BeatLoader } from "react-spinners";
import { last10Caution } from "../service/api";
import TestTable from "./table/TestTable";
import { alertActive } from "../util/alertActive";
import { AxiosError } from "axios";

const Top10Table = () => {
  const heaeders = ["Worker", "job", "date", "KSS"];
  const { data, isSuccess } = useQuery("last10caution", last10Caution, {
    select: (data) => data.data,
    onError: (err: AxiosError<any>) =>
      alertActive({ message: err.response?.data.message, color: "red" }),
  });

  return (
    <Card className="w-full bg-kaika-black p-4">
      <CardHeader
        variant="gradient"
        className=" grid py-4 place-items-center  bg-kaika-yellow shadow-kaika-yellow/50 shadow-md"
      >
        <Typography color="white">Last Tests Workers</Typography>
      </CardHeader>
      <CardBody className="relative w-full p-0 overflow-x-auto">
        {!isSuccess ? (
          <div className="absolute h-6 top-1/2 right-1/2 translate-x-1/3">
            <BeatLoader color="orange" size={25} />
          </div>
        ) : (
          <TestTable headers={heaeders} data={data} />
        )}
      </CardBody>
    </Card>
  );
};

export default Top10Table;
