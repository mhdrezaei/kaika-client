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
import WorkerInfo from "./worker/WorkerInfo";

const Top10Table = () => {
  const { data: workersInfo, isSuccess } = useQuery(
    "workersInfo",
    last10Caution,
    {
      select: (data) => data.data,
    }
  );

  return (
    <div className="w-full flex justify-center rounded-md">
      <Card className="xl:col-span-2 w-full bg-kaika-black">
        <CardHeader
          variant="gradient"
          className=" grid py-4 place-items-center  bg-kaika-yellow shadow-kaika-yellow/50 shadow-md"
        >
          <Typography variant="h3" color="white">
            Last Tests Workers
          </Typography>
        </CardHeader>
        <CardBody className="w-full md:overflow-auto overflow-x-scroll px-0 pt-0 pb-2">
          <table className="w-full table-auto  ">
            <thead>
              <tr>
                {["Worker", "Blink Frequency", "Blink Duration", "KSS"].map(
                  (el) => (
                    <th
                      key={el}
                      className="border-b border-blue-gray-50 py-3 px-6 text-left"
                    >
                      <Typography
                        variant="small"
                        className="text-[11px] font-medium uppercase text-blue-gray-50"
                      >
                        {el}
                      </Typography>
                    </th>
                  )
                )}
              </tr>
            </thead>
            <tbody>
              {isSuccess ? (
                workersInfo.map(
                  (
                    { _id, workerId, blinkFrequency, blinkDuration, kss },
                    key
                  ) => {
                    const className = `py-3 px-5 ${
                      key === workersInfo.length - 1
                        ? ""
                        : "border-b border-blue-gray-50"
                    }`;

                    return (
                      <tr key={_id}>
                        <td className={className}>
                          <WorkerInfo workerId={workerId} />
                        </td>
                        <td className={className}>
                          <Typography
                            variant="small"
                            className="text-sm text-center font-medium text-blue-gray-50"
                          >
                            {blinkFrequency}
                          </Typography>
                        </td>
                        <td className={className}>
                          <Typography
                            variant="small"
                            className="text-sm text-center font-medium text-blue-gray-50"
                          >
                            {blinkDuration}
                          </Typography>
                        </td>
                        <td className={className}>
                          <div>
                            <Typography
                              variant="small"
                              className=" block text-sm text-center font-medium text-blue-gray-50"
                            >
                              {kss}%
                            </Typography>
                            <Progress
                              value={kss}
                              variant="gradient"
                              color={kss === 100 ? "green" : "blue"}
                            />
                          </div>
                        </td>
                      </tr>
                    );
                  }
                )
              ) : (
                <div className="absolute top-1/2 right-1/2 translate-x-1/3">
                  <BeatLoader color="orange" size={25} />
                </div>
              )}
            </tbody>
          </table>
        </CardBody>
      </Card>
    </div>
  );
};

export default Top10Table;
