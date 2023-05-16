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
  alertUnderThreshold,
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
import DialogWin from "../../components/common/DialogWin";
import {
  CheckCircleIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/24/solid";
import ThresholdAlert from "../../components/ThresholdAlert";
import AllWorkersRow from "../../components/table/all-workers/AllWorkersRow";

const AllWorkers = () => {
  const [filter, setFilter] = useState<
    IAdminGetAllWorkerOfCurrentUserResponse[]
  >([]);
  const [selectedWorkers, setSelectedWorkers] = useState<string[]>([]);
  const [isSearch, setIsSearch] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isShowJustAlertEmployees, setIsShowJustAlertEmployees] =
    useState(false);

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
    <div className="flex flex-col justify-between gap-7">
      <Card className="bg-kaika-black rounded-md">
        <CardHeader variant="gradient" color="orange" className="p-6">
          <Typography variant="h6" color="white">
            All Workers Information
          </Typography>
        </CardHeader>
        <CardBody className=" px-0 pt-6 pb-2 overflow-y-auto h-[416px]">
          <table className="w-full min-w-[640px] table-auto">
            <thead>
              <tr>
                {[
                  <CheckCircleIcon className="w-5" />,
                  "Worker name",
                  "job",
                  "tel",
                  "birthday",
                  "Actions",
                ].map((el) => (
                  <th
                    key={el.toString()}
                    className="border-b border-blue-gray-50 py-3 px-5 text-left"
                  >
                    <Typography
                      variant="small"
                      className="text-[11px] font-bold uppercase text-blue-gray-50"
                    >
                      {el}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody
              className={!isSuccess || !filter.length ? "relative" : "relative"}
            >
              {isSuccess
                ? (filter.length ? filter : workersInfo).map(
                    (workerData, key) => {
                      const className = `py-3 px-5 ${
                        key === workersInfo.length - 1
                          ? ""
                          : "border-b border-blue-gray-50"
                      }`;

                      return (
                        <AllWorkersRow
                          {...workerData}
                          className={className}
                          isSearch={isSearch}
                          filter={filter}
                          isShowJustAlertEmployees={isShowJustAlertEmployees}
                          selectWorkerHandler={selectWorkerHandler}
                        />
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
      <div className="w-full bg-kaika-black p-4 rounded-md ">
        <div className="flex flex-col md:flex-row justify-between md:items-center">
          <div className="relative flex items-center">
            <Input
              name="search"
              label="Search"
              type="text"
              onChange={serchHandler}
              className="w-96 rounded-md border border-gray-300"
            />
            <MagnifyingGlassIcon
              color="white"
              className="absolute right-4 top-3 w-5 h-5"
            />
          </div>
          <div className="flex gap-3 ml-auto mt-3 md:mt-0">
            <Button
              variant="gradient"
              onClick={() =>
                navigator("compare-workers", {
                  state: { selectedWorkers },
                })
              }
              disabled={selectedWorkers.length === 0}
              // className="w-40"
            >
              {selectedWorkers.length > 1 ? "compare" : "result"}
            </Button>
            <Button
              variant="gradient"
              type="button"
              color="amber"
              onClick={() => setIsShowJustAlertEmployees((prev) => !prev)}
            >
              {isShowJustAlertEmployees ? "All Employees" : "Low Alertness"}
            </Button>
            <Button
              variant="gradient"
              type="button"
              color="red"
              disabled={selectedWorkers.length === 0}
              onClick={() => setIsDialogOpen(true)}
            >
              delete selected
            </Button>
            <DialogWin
              isOpen={isDialogOpen}
              setIsOpen={setIsDialogOpen}
              handle={async () => {
                const result = await deleteWorkerListCurrentUserAdmin(
                  selectedWorkers
                );
                alertActive({ message: result.data, color: "green" });
                await refetch();
                setSelectedWorkers([]);
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllWorkers;
