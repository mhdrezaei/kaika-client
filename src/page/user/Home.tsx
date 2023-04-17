import React from "react";
import {
  ArrowUpIcon,
  CheckIcon,
  EllipsisVerticalIcon,
} from "@heroicons/react/24/outline";
import {
  Typography,
  Card,
  CardHeader,
  CardBody,
  IconButton,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Avatar,
  Progress,
} from "@material-tailwind/react";
import { useQuery } from "react-query";
import { getHseCurrentUserInfo } from "../../service/api";
import { BeatLoader } from "react-spinners";
import WorkerInfo from "../../components/worker/WorkerInfo";

const Home = () => {
  const { data: workersInfo, isSuccess } = useQuery(
    "workersInfo",
    getHseCurrentUserInfo,
    {
      select: (data) => data.data,
    }
  );
  if (isSuccess) {
    console.log(workersInfo);
  }
  return (
    <div className="w-full  flex justify-center  p-0 sm:p-12 md:px-0 md:pt-12   rounded-md">
      <div className="2-full md:w-3/4 mx-auto   ">
        <Card className="xl:col-span-2 mt-12 bg-kaika-black">
          <CardHeader
            variant="gradient"
            className="mb-8 grid h-28 place-items-center  bg-kaika-yellow shadow-kaika-yellow/50 shadow-md"
          >
            <Typography variant="h3" color="white">
              Last Tests Workers
            </Typography>
          </CardHeader>
          <CardBody className=" px-0 pt-0 pb-2">
            <table className="w-full min-w-[640px] table-auto">
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
                          className="text-[11px] font-medium text-sm uppercase text-blue-gray-50"
                        >
                          {el}
                        </Typography>
                      </th>
                    )
                  )}
                </tr>
              </thead>
              <tbody className={!isSuccess ? "relative h-40" : ""}>
                {isSuccess ? (
                  workersInfo.map(
                    ({ workerId, blinkFrequency, blinkDuration, kss }, key) => {
                      const className = `py-3 px-5 ${
                        key === workersInfo.length - 1
                          ? ""
                          : "border-b border-blue-gray-50"
                      }`;

                      return (
                        <tr key={workerId}>
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
                            <div className="w-10/12">
                              <Typography
                                variant="small"
                                className="mb-1 block text-sm text-center font-medium text-blue-gray-50"
                              >
                                {kss}%
                              </Typography>
                              <Progress
                                value={kss}
                                variant="gradient"
                                color={kss === 100 ? "green" : "blue"}
                                className="h-1"
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
    </div>
  );
};

export default Home;
