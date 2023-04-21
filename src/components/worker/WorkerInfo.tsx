import { Avatar, Typography } from "@material-tailwind/react";
import * as React from "react";
import { useQuery } from "react-query";
import { getAWorkerCurrentUserAdmin } from "../../service/api";
import { AxiosError } from "axios";
import { alertActive } from "../../util/alertActive";
export interface IworkerInfoProps {
  workerId: string;
}
const WorkerInfo: React.FunctionComponent<IworkerInfoProps> = ({
  workerId,
}) => {
  const { data: workerInfo } = useQuery(
    "workerInfo",
    () => getAWorkerCurrentUserAdmin(workerId),
    {
      select: (data) => data.data,
      onError: (err: AxiosError) =>
        alertActive({ message: err.message, color: "red" }),
    }
  );
  return (
    <>
      <div className="md:hidden flex justify-between items-center bg-kaika-gray  rounded-md p-2 text-white">
        {workerInfo?.firstName} {workerInfo?.lastName}
        <Avatar
          src={workerInfo?.imageUrl}
          alt={`${workerInfo?.firstName} + ${workerInfo?.lastName}`}
          size="sm"
        />
      </div>
      <div className="md:w-1/4 md:flex md:flex-grow-1 py-2 px-4 flex-grow overflow-hidden hidden list-none ">
        <Avatar
          src={workerInfo?.imageUrl}
          alt={`${workerInfo?.firstName} + ${workerInfo?.lastName}`}
          size="sm"
        />
        <Typography variant="small" className="font-semibold text-blue-gray-50">
          {workerInfo?.firstName} {workerInfo?.lastName}
        </Typography>
      </div>
      <div className="md:w-1/4 md:flex-grow-1 flex-grow  flex justify-start items-center py-2 px-4 overflow-hidden list-none ">
        <div className="md:hidden text-kaika-yellow pr-3">Job </div>
        <Typography variant="small" className="font-semibold text-blue-gray-50">
          {workerInfo?.job}
        </Typography>
      </div>
    </>
  );
};

export default WorkerInfo;
