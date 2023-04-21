import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Avatar,
} from "@material-tailwind/react";
import { useQuery } from "react-query";
import { getAllWorkerofCurrentUser } from "../../service/api";
import { BeatLoader } from "react-spinners";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";

const AllWorkers = () => {
  const { data: workersInfo, isSuccess } = useQuery(
    "workersInfo",
    getAllWorkerofCurrentUser,
    {
      select: (data) => data.data,
    }
  );
  return (
    <div className="mt-12 mb-8 flex flex-col gap-12">
      <Card className="bg-kaika-black">
        <CardHeader variant="gradient" color="orange" className="mb-8 p-6">
          <Typography variant="h6" color="white">
            All Workers Information
          </Typography>
        </CardHeader>
        <CardBody className=" px-0 pt-0 pb-2">
          <table className="w-full min-w-[640px] table-auto">
            <thead>
              <tr>
                {["Worker name", "job", "tel", "birthday", "Actions"].map(
                  (el) => (
                    <th
                      key={el}
                      className="border-b border-blue-gray-50 py-3 px-5 text-left"
                    >
                      <Typography
                        variant="small"
                        className="text-[11px] font-bold uppercase text-blue-gray-50"
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
                  (
                    {
                      firstName,
                      lastName,
                      email,
                      tel,
                      job,
                      imageUrl,
                      birthDate,
                      _id,
                    },
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
                          <div className="flex items-center gap-4">
                            <Avatar
                              src={imageUrl}
                              alt={`${firstName} + ${lastName}`}
                              size="sm"
                            />
                            <div>
                              <Typography
                                variant="small"
                                color="blue-gray"
                                className="font-semibold text-blue-gray-50"
                              >
                                {firstName + lastName}
                              </Typography>
                              <Typography className="text-xs font-normal text-blue-gray-500">
                                {email}
                              </Typography>
                            </div>
                          </div>
                        </td>
                        <td className={className}>
                          <Typography className="text-xs font-semibold text-blue-gray-50">
                            {job}
                          </Typography>
                          <Typography className="text-xs font-normal text-blue-gray-500">
                            {job}
                          </Typography>
                        </td>
                        <td className={className}>
                          <Typography className="text-xs font-semibold text-blue-gray-50">
                            {tel}
                          </Typography>
                        </td>
                        <td className={className}>
                          <Typography className="text-xs font-semibold text-blue-gray-50">
                            {birthDate}
                          </Typography>
                        </td>
                        <td className={className}>
                          <div className="flex justify-start gap-2">
                            <Typography
                              as="a"
                              href="#"
                              className="inline text-xs font-semibold text-blue-gray-50"
                            >
                              <PencilSquareIcon
                                strokeWidth={2.5}
                                className="h-5 w-5"
                              />
                            </Typography>
                            <Typography
                              as="a"
                              href="#"
                              className="inline text-xs font-semibold text-blue-gray-50"
                            >
                              <TrashIcon
                                strokeWidth={2.5}
                                className="h-5 w-5"
                              />
                            </Typography>
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

export default AllWorkers;
