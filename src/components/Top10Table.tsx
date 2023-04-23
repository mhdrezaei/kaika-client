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
import { getHseCurrentUserInfo } from "../service/api";
import WorkerInfo from "./worker/WorkerInfo";
import TestTable from "./table/TestTable";

const Top10Table = () => {
  const heaeders = ["Worker", "job", "date", "KSS"];
  const { data: workersInfo, isSuccess } = useQuery(
    "workersInfo",
    getHseCurrentUserInfo,
    {
      select: (data) => data.data,
    }
  );
  console.log(workersInfo)
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
            <TestTable headers={heaeders} data={workersInfo} />
          )}
        </CardBody>
      </Card>
    </div>
  );
};

export default Top10Table;
