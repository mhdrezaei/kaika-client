import React, { useState } from "react";
import InputBox from "../../components/common/InputBox";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { BeatLoader } from "react-spinners";
import { useMutation } from "react-query";
import { WorkerFormSchema } from "../../schema/newWorkerFormSchema";
import { AxiosError } from "axios";
import {
  IcreateWorkerCurrentUserRequest,
  IuploadImageWorker,
} from "../../types/api/api-types";
import { AxiosResponse, AxiosResponseHeaders } from "axios";
import {
  Alert,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Input,
  Typography,
} from "@material-tailwind/react";
import { createWorkerCurrentUser, uploadImageWorker } from "../../service/api";

import { DocumentIcon } from "@heroicons/react/24/solid";
type WorkerFormSchemaType = z.infer<typeof WorkerFormSchema>;
const CreateWorker = () => {
  let workerImg = new FormData();
  const [image, setImage] = useState<FormData>(workerImg);
  const [preview, setPreview] = useState("");
  const [workerId, setWorkerId] = useState("");

  const imgFilehandler: React.ChangeEventHandler<HTMLInputElement> = async (
    event
  ) => {
    const target = event.target as HTMLInputElement;
    if (target.files) {
      workerImg.append("file", target.files[0] as Blob);
      setPreview(URL.createObjectURL(target.files[0]));
      setImage(workerImg);
    }
  };

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<WorkerFormSchemaType>({
    resolver: zodResolver(WorkerFormSchema),
  });

  const uploadImg = useMutation(
    (workerId: string) => uploadImageWorker(workerId, preview),
    {
      onSuccess(response) {
        console.log("success!!!!");
      },
    }
  );
  const { data, isError, error, isLoading, isSuccess, mutate } = useMutation({
    mutationFn: createWorkerCurrentUser,
    onError(error: AxiosError) {},
    onSuccess(data) {
      setWorkerId(data.data._id);
      uploadImg.mutate(data.data._id);

      reset();
    },
  });

  isSuccess && reset();

  const onSubmit = (values: IcreateWorkerCurrentUserRequest) => {
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
              Create new Worker
            </Typography>
          </CardHeader>
          <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-full">
            <CardBody className="flex flex-col gap-5">
              <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                  <InputBox
                    name="firstName"
                    label="First Name"
                    type="text"
                    register={register}
                    error={errors?.firstName?.message}
                    disabled={isSubmitting}
                  />
                </div>
                <div className="w-full md:w-1/2 px-3">
                  <InputBox
                    name="lastName"
                    label="Last Name"
                    type="text"
                    register={register}
                    error={errors?.lastName?.message}
                    disabled={isSubmitting}
                  />
                </div>
              </div>
              <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                  <InputBox
                    name="email"
                    label="Email"
                    type="text"
                    register={register}
                    error={errors?.email?.message}
                    disabled={isSubmitting}
                  />
                </div>
                <div className="w-full relative md:w-1/2 px-3 mb-6 md:mb-0">
                  <div className="w-full  border border-gray-300 rounded-[8px] p-2">
                    <label
                      htmlFor="upload"
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
                      id="upload"
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
                    label="Birth Date"
                    type="date"
                    register={register}
                    error={errors?.birthDate?.message}
                    disabled={isSubmitting}
                  />
                </div>
                <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                  <InputBox
                    name="job"
                    label="Job"
                    type="text"
                    register={register}
                    error={errors?.job?.message}
                    disabled={isSubmitting}
                  />
                </div>
                <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                  <InputBox
                    name="tel"
                    label="Tel"
                    type="text"
                    register={register}
                    error={errors?.tel?.message}
                    disabled={isSubmitting}
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
        </Card>
      </div>
    </div>
  );
};

export default CreateWorker;
