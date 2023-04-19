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
    <>
      <div className="md:hidden flex justify-between items-center bg-kaika-gray  rounded-md p-2 text-white">
        {workerInfo?.firstName} {workerInfo?.lastName}
         <Avatar
        src={workerInfo?.imageUrl}
        alt={`${workerInfo?.firstName} + ${workerInfo?.lastName}`}
        size="sm"
      />
      </div>
     <div className='md:flex md:flex-grow-0 py-2 px-4 flex-grow overflow-hidden hidden list-none '>
      <Avatar
        src={workerInfo?.imageUrl}
        alt={`${workerInfo?.firstName} + ${workerInfo?.lastName}`}
        size="sm"
      />
      <Typography variant="small" className="font-semibold text-blue-gray-50">
        {workerInfo?.firstName} {workerInfo?.lastName}
      </Typography>
    </div>
    <div className='md:flex-grow-0 flex-grow  flex justify-start gap-3 items-center py-2 px-4 overflow-hidden list-none '>
      <div className="md:hidden text-kaika-yellow" >Job </div>
    <Typography variant="small" className="font-semibold text-blue-gray-50">
        {workerInfo?.job}
      </Typography>
      </div>
    </>
  );
};

export default WorkerInfo;
