import React, { useState } from "react";
import InputBox from "../../components/common/InputBox";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { BeatLoader } from "react-spinners";
import { useMutation, useQuery } from "react-query";
import { WorkerFormSchema } from "../../schema/newWorkerFormSchema";
import { AxiosError } from "axios";
import { IAdminUpdateAWorkerCurrentUserRequest, IAdminUpdateUserRequest } from "../../types/api/api-types";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Typography,
} from "@material-tailwind/react";
import {
  getAWorkerCurrentUserAdmin,
  updateAWorkerCurrentUserAdmin,
  uploadImageWorker,
} from "../../service/api";
import { alertAction } from "../../redux/slice/alert-slice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { useParams } from "react-router-dom";
import { DocumentIcon } from "@heroicons/react/24/outline";
import formatDate from "../../util/formatDate";

type WorkerFormSchemaType = z.infer<typeof WorkerFormSchema>;

interface WorkerPageRouteParams {
  id: string
}

const WorkerInfo = () => {
  const { id } = useParams()
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user);
  let userImg = new FormData();
  const [image, setImage] = useState<FormData>(userImg);
  const [preview, setPreview] = useState("");
  const [workerData, setWorkerData] = useState<IAdminUpdateAWorkerCurrentUserRequest>({
    firstName: "",
    lastName: "",
    birthDate: "",
    job: "",
    tel: "",
    email: "",
  });
  const birthDate = formatDate(workerData.birthDate);
  
  const imgFilehandler: React.ChangeEventHandler<HTMLInputElement> = async (
    event
  ) => {
    const target = event.target as HTMLInputElement;
    if (target.files) {
      userImg.append("file", target.files[0] as Blob);
      setPreview(URL.createObjectURL(target.files[0]));
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<WorkerFormSchemaType>({
    resolver: zodResolver(WorkerFormSchema),
  });

  const uploadImg = useMutation(() => uploadImageWorker(id! ,preview), {
    onSuccess(response) {
      console.log("success!!!!");
    },
  });
  const { data, isError, error, isLoading, isSuccess, mutate } = useMutation({
    mutationFn : (value : IAdminUpdateAWorkerCurrentUserRequest) => updateAWorkerCurrentUserAdmin(id! , value) ,
    onError(error: AxiosError) {
      dispatch(
        alertAction.open({
          message: error.message,
          color: "red",
        })
      );
    },
    onSuccess(data) {
      uploadImg.mutate();
      dispatch(
        alertAction.open({
          message: "worker information updated successfully",
          color: "green",
        })
      );
      setTimeout(() => dispatch(alertAction.close()), 2000);
    },
  });

  const {
    data: currentWorker,
    isSuccess: successData,
    isStale,
  } = useQuery(["currentWorkerInfo", id], () => getAWorkerCurrentUserAdmin(id), {
    select: (data) => data.data,
    onSuccess(data) {
      setWorkerData({...data})
    },
    retry:1
  });
  const onChangeHandler: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setWorkerData((prevState) => {
      return {
        ...prevState,
        [e.target.id]: e.target.value,
      };
    });
  };

  const onSubmit = (values: IAdminUpdateAWorkerCurrentUserRequest) => {
    mutate(values);
  };

  return (
    <div className="w-full  flex justify-center  p-0 sm:p-12 md:px-0 md:pt-12   rounded-md">
      <div className="2-full md:w-3/4 mx-auto   ">
        <Card className=" border border-1 border-gray-200 rounded-md mt-6 bg-kaika-black shadow-sm  shadow-gray-300 hover:shadow-md hover:shadow-kaika-yellow">
          <CardHeader
            variant="gradient"
            color="orange"
            className="mb-8 p-6 text-center"
          >
            <Typography variant="h6" color="white">
              Worker Information
            </Typography>
          </CardHeader>
          {!successData ? (
            <div className="w-full h-12 text-center ">
              <BeatLoader color="orange" size={25} className="mx-auto " />
            </div>
          ) : (
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="w-full max-w-full"
            >
              <CardBody className="flex flex-col gap-5">
                <div className="flex flex-wrap -mx-3 mb-6">
                  <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                    <InputBox
                      name="firstName"
                      id="firstName"
                      label="First Name"
                      type="text"
                      register={register}
                      error={errors?.firstName?.message}
                      disabled={isSubmitting}
                      value={workerData.firstName}
                      onChange={onChangeHandler}
                    />
                  </div>
                  <div className="w-full md:w-1/2 px-3">
                    <InputBox
                      name="lastName"
                      id="lastName"
                      label="Last Name"
                      type="text"
                      register={register}
                      error={errors?.lastName?.message}
                      disabled={isSubmitting}
                      value={workerData.lastName}
                      onChange={onChangeHandler}
                    />
                  </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-6">
                  <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                    <InputBox
                      name="email"
                      id="email"
                      label="Email"
                      type="text"
                      register={register}
                      error={errors?.email?.message}
                      disabled={isSubmitting}
                      value={workerData.email}
                      onChange={onChangeHandler}
                    />
                  </div>
                  <div className="w-full relative md:w-1/2 px-3 mb-6 md:mb-0">
                  <div className="w-full  border border-gray-300 rounded-[8px] p-2">
                    <label
                      htmlFor="file"
                      className="flex justify-start gap-4 items-center"
                    >
                      <DocumentIcon
                        color="white"
                        strokeWidth={3}
                        className="h-6 w-6 text-blue-gray-500"
                      />
                      <span>Choose an image</span>
                    </label>
                    <input
                      id="file"
                      name="file"
                      type="file"
                      className="hidden"
                      disabled={isSubmitting}
                      onChange={imgFilehandler}
                    />
                    {preview ? (
                      <img
                        src={preview}
                        className="absolute top-1 right-5 rounded-full w-8 h-8"
                      />
                    ) : (
                      ""
                    )}
                  </div>
                </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-2">
                <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0 ">
                  <InputBox
                    name="birthDate"
                    id="birthDate"
                    label="Birth Date"
                    type="date"
                    register={register}
                    error={errors?.birthDate?.message}
                    disabled={isSubmitting}
                    value={birthDate}
                    onChange={onChangeHandler}
                  />
                </div>
                <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                  <InputBox
                    name="job"
                    id="job"
                    label="Job"
                    type="text"
                    register={register}
                    error={errors?.job?.message}
                    disabled={isSubmitting}
                    value={workerData.job}
                    onChange={onChangeHandler}
                  />
                </div>
                <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                  <InputBox
                    name="tel"
                    id="tel"
                    label="Tel"
                    type="text"
                    register={register}
                    error={errors?.tel?.message}
                    disabled={isSubmitting}
                    value={workerData.tel}
                    onChange={onChangeHandler}
                  />
                </div>
              </div>
              </CardBody>
              <CardFooter className="pt-0 pb-8 text-center">
                <Button
                  variant="gradient"
                  type="submit"
                  color="orange"
                  ripple={true}
                  size="md"
                  className="relative  inline-flex items-center justify-center px-8 py-3 mt-4 overflow-hidden font-semibold text-base bg-kaika-yellow transition duration-300 ease-out border-2 rounded-md group"
                  fullWidth
                >
                  {isLoading ? <BeatLoader color="#fff" size={17} /> : "Submit"}
                </Button>
              </CardFooter>
            </form>
          )}
        </Card>
      </div>
    </div>
  );
};

export default WorkerInfo;
