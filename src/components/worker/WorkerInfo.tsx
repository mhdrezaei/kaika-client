import { Avatar, Typography } from "@material-tailwind/react";
import * as React from "react";
import { useQuery } from "react-query";
import { getAWorkerCurrentUserAdmin } from "../../service/api";
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
    }
  );
  return (
    <div className="flex items-center gap-4">
      <Avatar
        src={workerInfo?.imageUrl}
        alt={`${workerInfo?.firstName} + ${workerInfo?.lastName}`}
        size="sm"
      />
      <Typography variant="small" className="font-bold text-blue-gray-50">
        {workerInfo?.firstName} {workerInfo?.lastName}
      </Typography>
    </div>
  );
};

export default WorkerInfo;
