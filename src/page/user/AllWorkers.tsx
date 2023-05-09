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
  CheckboxProps,
} from "@material-tailwind/react";
import { useQuery } from "react-query";
import {
  deleteWorkerListCurrentUserAdmin,
  getAllWorkerofCurrentUser,
} from "../../service/api";
import { BeatLoader } from "react-spinners";
import { AxiosError } from "axios";
import { alertActive } from "../../util/alertActive";
import {
  MagnifyingGlassIcon,
  PencilSquareIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import { IAdminGetAllWorkerOfCurrentUserResponse } from "../../types/api/api-types";
import { useAppDispatch } from "../../redux/hooks";
import { alertAction } from "../../redux/slice/alert-slice";
import { Link } from "react-router-dom";
import { find } from "../../util/find";
import { useNavigate } from "react-router-dom";
import { baseUrl } from "../../data/constants";

const AllWorkers = () => {
  const [filter, setFilter] = useState<
    IAdminGetAllWorkerOfCurrentUserResponse[]
  >([]);
  const [selectedWorkers, setSelectedWorkers] = useState<string[]>([]);
  const [isSearch, setIsSearch] = useState(false);

  const navigator = useNavigate();

  const {
    data: workersInfo,
    isSuccess,
    refetch,
  } = useQuery("allWorkersInfo", getAllWorkerofCurrentUser, {
    select: (data) => data.data,
    onError: (err: AxiosError<any>) =>
      alertActive({ message: err.response?.data.message, color: "red" }),
  });

  const serchHandler: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    setIsSearch(true);
    const key = event.target.value;
    key.length === 0 && setIsSearch(false);
    // let filterdData: IAdminGetAllWorkerOfCurrentUserResponse[] = [];
    const filterdData = workersInfo
      ? workersInfo?.filter((worker) =>
          find(worker.firstName + " " + worker.lastName, key)
        )
      : [];
    if (filterdData.length === 0) {
      alertActive({
        message: `${key} not found! Please try another keyword..`,
        color: "red",
      });
      setFilter([]);
    } else {
      const item = filterdData.length === 1 ? "item" : "items";
      alertActive({
        message: `${filterdData.length} ${item} founded!`,
        color: "green",
      });
    }
    setFilter(filterdData);
  };

  const selectWorkerHandler = (
    e: React.ChangeEvent<HTMLInputElement>,
    id: string
  ) => {
    if (e.target.checked) setSelectedWorkers((prev) => [...prev, id]);
    else
      setSelectedWorkers((prev) => prev.filter((workerId) => workerId !== id));
  };

  return (
    <div className="flex flex-col gap-7">
      <Card className="bg-kaika-black">
        <CardHeader variant="gradient" color="orange" className="p-6">
          <Typography variant="h6" color="white">
            All Workers Information
          </Typography>
        </CardHeader>
        <CardBody className=" px-0 pt-6 pb-2 overflow-y-auto h-[416px]">
          <table className="w-full min-w-[640px] table-auto">
            <thead>
              <tr>
                {["#", "Worker name", "job", "tel", "birthday", "Actions"].map(
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
            <tbody
              className={
                !isSuccess || !filter.length ? "relative h-40" : "relative"
              }
            >
              {isSuccess
                ? (filter.length ? filter : workersInfo).map(
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
                        <tr
                          className={isSearch && !filter.length ? "hidden" : ""}
                          key={_id}
                        >
                          <td className={className}>
                            <Checkbox
                              color="orange"
                              value={_id}
                              onChange={(e) => selectWorkerHandler(e, _id)}
                            />
                          </td>
                          <td className={className}>
                            <div className="flex items-center gap-4">
                              <Avatar
                                src={
                                  imageUrl
                                    ? baseUrl + imageUrl
                                    : "/assets/image/no-profile-photo.jpg"
                                }
                                alt={`${firstName} + ${lastName}`}
                                size="sm"
                              />
                              <div>
                                <Typography
                                  variant="small"
                                  color="blue-gray"
                                  className="font-semibold text-blue-gray-50"
                                >
                                  {`${firstName} ${lastName}`}
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
                              {new Date(birthDate).toLocaleDateString("fr")}
                            </Typography>
                          </td>
                          <td className={className}>
                            <div className="flex justify-start gap-2">
                              <Link
                                to={`/user/workers/worker-info/${_id}`}
                                className="inline text-xs font-semibold text-blue-gray-50"
                              >
                                <PencilSquareIcon
                                  strokeWidth={2.5}
                                  className="h-5 w-5"
                                />
                              </Link>
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
                : !isSearch &&
                  !filter.length && (
                    <tr className="absolute top-1/2 left-1/2 -translate-x-1/2 ">
                      <td>
                        <BeatLoader color="orange" size={25} className="" />
                      </td>
                    </tr>
                  )}
              {isSearch && filter.length === 0 ? (
                <tr className="absolute top-1/2 left-1/2 -translate-x-1/2 ">
                  <td>
                    <p className="text-lg text-red-600">No Items Founded !</p>
                  </td>
                </tr>
              ) : (
                ""
              )}
            </tbody>
          </table>
        </CardBody>
      </Card>
      {/* Toolbar */}
      <div className="w-full bg-kaika-black py-2 rounded-md ">
        <div className="flex justify-between items-center">
          <div className="relative p-2 flex items-center">
            <Input
              name="search"
              label="Search"
              type="text"
              disabled={false}
              onChange={serchHandler}
              className="w-full rounded-md border border-gray-300"
            />
            <MagnifyingGlassIcon
              color="white"
              className="absolute right-4 w-5 h-5"
            />
          </div>
          <div className="flex gap-3 ml-auto p-2">
            <Button
              onClick={() =>
                navigator("compare-workers", {
                  state: { selectedWorkers },
                })
              }
              disabled={selectedWorkers.length === 0}
            >
              {selectedWorkers.length > 1 ? "compare" : "result"}
            </Button>
            <Button
              type="button"
              color="red"
              disabled={selectedWorkers.length === 0}
              onClick={async () => {
                const result = await deleteWorkerListCurrentUserAdmin(
                  selectedWorkers
                );
                alertActive({ message: result.data, color: "green" });
                await refetch();
                setSelectedWorkers([]);
              }}
            >
              delete selected
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllWorkers;
