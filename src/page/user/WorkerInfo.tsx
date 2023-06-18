import React, { useState } from "react";
import InputBox from "../../components/common/InputBox";
import { useForm } from "react-hook-form";
import { date, z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { BeatLoader } from "react-spinners";
import { useMutation, useQuery } from "react-query";
import { WorkerFormSchema } from "../../schema/newWorkerFormSchema";
import { AxiosError } from "axios";
import { IAdminUpdateAWorkerCurrentUserRequest } from "../../types/api/api-types";
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
import { useParams } from "react-router-dom";
import { DocumentIcon } from "@heroicons/react/24/outline";
import { alertActive } from "../../util/alertActive";
import { useAppDispatch } from "../../redux/hooks";
import CropImage from "../../components/common/CropImage";
import FingerImage from "../../components/common/FingerImage";

type WorkerFormSchemaType = z.infer<typeof WorkerFormSchema>;

const WorkerInfo = () => {
  const { id } = useParams();
  const [image, setImage] = useState<File>();
  const [workerData, setWorkerData] =
    useState<IAdminUpdateAWorkerCurrentUserRequest>({
      firstName: "",
      lastName: "",
      birthDate: "",
      job: "",
      tel: "",
      email: "",
    });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<WorkerFormSchemaType>({
    resolver: zodResolver(WorkerFormSchema),
    values: { ...workerData },
  });

  const { isSuccess: successData } = useQuery(
    ["currentWorkerInfo", id],
    () => getAWorkerCurrentUserAdmin(id!),
    {
      select: (data) => data.data,
      onSuccess(data) {
        const birthDate = new Date(data.birthDate)
          .toLocaleDateString("fr")
          .split("/")
          .reverse()
          .join("-");
        setWorkerData({ ...data, birthDate });
      },
    }
  );

  const uploadImg = useMutation({
    mutationFn: uploadImageWorker,
  });

  const { isLoading, mutate } = useMutation({
    mutationFn: (value: IAdminUpdateAWorkerCurrentUserRequest) =>
      updateAWorkerCurrentUserAdmin(id!, value),
    onError: (err: AxiosError<any>) =>
      alertActive({ message: err.response?.data.message, color: "red" }),
    onSuccess: (data) => {
      const birthDate = new Date(data.data.birthDate)
        .toLocaleDateString("fr")
        .split("/")
        .reverse()
        .join("-");
      setWorkerData({ ...data.data, birthDate });
      alertActive({ message: "Employee Updated!", color: "green" });
      const formData = new FormData();
      image && formData.append("file", image);
      image && uploadImg.mutate({ workerId: data.data._id, file: formData });
    },
  });

  const imgFilehandler: React.ChangeEventHandler<HTMLInputElement> = async (
    event
  ) => {
    if (event.target.files) {
      setImage(event.target.files[0]);
    }
  };

  const imageCropedHandler = (
    image: React.SetStateAction<File | undefined>
  ) => {
    setImage(image);
  };
  const removeImage = () => {
    setImage(undefined);
  };

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
        <Card className=" border border-1 border-gray-200 rounded-md mt-6 bg-kaika-black shadow-sm  shadow-gray-300">
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
                <div className="flex flex-wrap -mx-3 xl:mb-6">
                  <div className="w-full xl:w-1/2 px-3 mb-6 xl:mb-0">
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
                  <div className="w-full xl:w-1/2 px-3">
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
                <div className="flex flex-wrap -mx-3 xl:mb-3">
                  <div className="w-full xl:w-1/2 px-3 mb-6 xl:mb-0">
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
                  <div className="w-full relative xl:w-1/2 px-3 xl:mb-0">
                    <div className="w-full flex justify-between items-center  border border-gray-300 rounded-[8px] p-2">
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
                      {image ? (
                        <CropImage
                          img={URL.createObjectURL(image)}
                          onCroped={imageCropedHandler}
                          onRemove={removeImage}
                        />
                      ) : (
                        ""
                      )}
                      {image && (
                        <FingerImage image={image} onRemove={removeImage} />
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-2">
                  <div className="w-full xl:w-1/2 px-3 mb-6 xl:mb-0 ">
                    <InputBox
                      name="birthDate"
                      id="birthDate"
                      label="Birth Date"
                      type="date"
                      register={register}
                      error={errors?.birthDate?.message}
                      disabled={isSubmitting}
                      value={workerData.birthDate}
                      onChange={onChangeHandler}
                    />
                  </div>
                  <div className="w-full xl:w-1/2 px-3 mb-6 xl:mb-0">
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
                  <div className="w-full xl:w-1/2 px-3 mb-6 xl:mb-0 xl:mt-6">
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
