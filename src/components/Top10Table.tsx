import {
  Card,
  CardHeader,
  Typography,
  CardBody,
  Progress,
} from "@material-tailwind/react";
import React from "react";
import { useQuery } from "react-query";
import { BeatLoader } from "react-spinners";
import { last10Caution } from "../service/api";
import TestTable from "./table/TestTable";
import { alertActive } from "../util/alertActive";
import { AxiosError } from "axios";

const Top10Table = () => {
  const heaeders = ["Worker", "job", "date", "KSS"];
  const { data, isSuccess } = useQuery("workersInfo", last10Caution, {
    select: (data) => data.data,
    onError: (err: AxiosError) =>
      alertActive({ message: err.message, color: "red" }),
  });

  return (
    <div className="w-full flex justify-center rounded-md">
      <Card className="xl:col-span-2 w-full bg-kaika-black">
        <CardHeader
          variant="gradient"
          className=" grid py-4 place-items-center  bg-kaika-yellow shadow-kaika-yellow/50 shadow-md"
        >
          <Typography color="white">Last Tests Workers</Typography>
        </CardHeader>
        <CardBody className="relative w-full md:overflow-auto overflow-x-scroll px-0 pt-0 pb-2">
          {!isSuccess ? (
            <div className="absolute h-6 top-1/2 right-1/2 translate-x-1/3">
              <BeatLoader color="orange" size={25} />
            </div>
          ) : (
            <TestTable headers={heaeders} data={data} />
          )}
        </CardBody>
      </Card>
    </div>
  );
};

export default Top10Table;
