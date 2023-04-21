import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Avatar,
  Input,
  Button,
  Checkbox,
} from "@material-tailwind/react";
import { useQuery } from "react-query";
import { getAllWorkerofCurrentUser } from "../../service/api";
import { BeatLoader } from "react-spinners";
import { MagnifyingGlassIcon, PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
import InputBox from "../../components/common/InputBox";
import { IAdminGetAllWorkerOfCurrentUserResponse } from "../../types/api/api-types";
import { useAppDispatch } from "../../redux/hooks";
import { alertAction } from "../../redux/slice/alert-slice";

const AllWorkers = () => {
  const dispatch = useAppDispatch()
  const [filter , setFilter] = useState<IAdminGetAllWorkerOfCurrentUserResponse[]>([])
  const [isSearch , setIsSearch] = useState(false);
  const { data: workersInfo, isSuccess } = useQuery(
    "allWorkersInfo",
    getAllWorkerofCurrentUser,
    {
      select: (data) => data.data,
    }
  );
  const serchHandler : React.ChangeEventHandler<HTMLInputElement> = (event)=>{
    setIsSearch(true)
    const key = event.target.value
    key.length === 0 && setIsSearch(false)
    let filterdData : IAdminGetAllWorkerOfCurrentUserResponse[]  = []
    workersInfo?.filter((worker) => {
      if(worker.firstName.includes(key) || worker.firstName.includes(key)){
        filterdData.push(worker)
      }
    })
    if(filterdData.length === 0){
      dispatch(alertAction.open({message :`${key} not found! Please try another keyword..` , color:"red"}))
      setTimeout(()=> { dispatch(alertAction.close()) },5000)
      setFilter([])
    }else{
      const item = filterdData.length === 1 ? 'item' : 'items' 
      dispatch(alertAction.open({message :`${filterdData.length} ${item} founded!` , color:"green"}))
      setTimeout(()=> { dispatch(alertAction.close()) },2000)
    }
    setFilter(filterdData)
  }
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
                {["#" ,"Worker name", "job", "tel", "birthday", "Actions"].map(
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
            <tbody className={!isSuccess || !filter.length ? "relative h-40" : "relative"}>
              {isSuccess ?  (
                (filter.length ? filter : workersInfo).map(
                  (
                    {
                      firstName,
                      lastName,
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
                      <tr className={isSearch && !filter.length ? "hidden" : ''} key={_id}>
                        <td className={className}>
                        <Checkbox color="orange" value={_id}  />
                        </td>
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
                              {/* <Typography className="text-xs font-normal text-blue-gray-500">
                                {email}
                              </Typography> */}
                            </div>
                          </div>
                        </td>
                        <td className={className}>
                          <Typography className="text-xs font-semibold text-blue-gray-50">
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
                !isSearch && !filter.length && <tr className="absolute top-1/2 left-1/2 -translate-x-1/2 ">
                  <td>
                  <BeatLoader color="orange" size={25} className="" />
                  </td>
                </tr>
                
              )}
              {isSearch && filter.length === 0 ? 
              <tr className="absolute top-1/2 left-1/2 -translate-x-1/2 ">
                  <td>
                  <p className="text-lg text-red-600">No Items Founded !</p>
                  </td>
                </tr> : '' }
            </tbody>
          </table>
        </CardBody>
      </Card>
      {/* Toolbar */}
      <div className="w-full bg-kaika-black py-2 rounded-md hover:shadow-md hover:shadow-kaika-yellow ">
        <div className="flex justify-between items-center" >
          <div className="relative p-2 flex items-center" >
            <Input name="search" label="Search" type="text" disabled={false} onChange={serchHandler} className="w-full rounded-md border border-gray-300"  />
            <MagnifyingGlassIcon color="white" className="absolute right-4 w-5 h-5"/>
          </div>
          <div className="flex gap-3 ml-auto p-2" >
            <Button type="button" >
              resoult
            </Button>
            <Button type="button" color="red" disabled={true} >
              delete selected
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllWorkers;
