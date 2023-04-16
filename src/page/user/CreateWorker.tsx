import React from "react";
import InputBox from "../../components/common/InputBox";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler } from "react-hook-form/dist/types/form";
import { BeatLoader } from "react-spinners";
import { useMutation, useQuery } from "react-query";
import { WorkerFormSchema } from "../../schema/newWorkerFormSchema";
import { IcreateWorkerCurrentUserRequest } from "../../types/api/api-types";
import { AxiosResponseHeaders } from "axios";
import {
  Alert,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Typography,
} from "@material-tailwind/react";
import { createWorkerCurrentUser } from "../../service/api";
import {
  CheckCircleIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/24/outline";
type WorkerFormSchemaType = z.infer<typeof WorkerFormSchema>;
const CreateWorker = () => {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<WorkerFormSchemaType>({
    resolver: zodResolver(WorkerFormSchema),
  });

  const { data, isError, error, isLoading, isSuccess, mutate } = useMutation({
    mutationFn: createWorkerCurrentUser,
    onError(error: AxiosResponseHeaders) {},
    onSuccess() {
      reset();
    },
  });

  const onSubmit: SubmitHandler<WorkerFormSchemaType> = (
    values: IcreateWorkerCurrentUserRequest
  ) => {
    mutate(values);
  };
  return (
    <>
      <div className="w-full  flex justify-center  p-0 sm:p-12 md:px-0 md:pt-12   rounded-md">
        <div className="2-full md:w-3/4 mx-auto   ">
          <Card className=" border border-1 border-gray-200 rounded-md mt-6 bg-kaika-black shadow-sm  shadow-gray-300 hover:shadow-md hover:shadow-kaika-yellow">
            <CardHeader
              variant="gradient"
              className="mb-8 grid h-28 place-items-center  bg-kaika-yellow shadow-kaika-yellow/50 shadow-md"
            >
              <Typography variant="h3" color="white">
                Create new Worker
              </Typography>
            </CardHeader>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="w-full max-w-full"
            >
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
                  <div className="w-full px-3">
                    <InputBox
                      name="email"
                      label="Email"
                      type="text"
                      register={register}
                      error={errors?.email?.message}
                      disabled={isSubmitting}
                    />
                  </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-2">
                  <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
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
      <div className="fixed z-40 top-5 right-5 flex flex-col items-end justify-center w-96">
        <Alert
          show={isSuccess}
          color="green"
          className="max-w-screen-md"
          icon={<CheckCircleIcon className="mt-px h-6 w-6" />}
          dismissible={{
            onClose: () => console.log("close"),
          }}
        >
          <Typography variant="h5" color="white">
            Success
          </Typography>
          <Typography color="white" className="mt-2 font-normal">
            the worker created successfully...
          </Typography>
        </Alert>

        <Alert
          show={isError}
          color="red"
          className="max-w-screen-md"
          icon={<ExclamationTriangleIcon className="mt-px h-6 w-6" />}
        >
          <Typography variant="h5" color="white">
            Failed
          </Typography>
          <Typography color="white" className="mt-2 font-normal">
            {isError ? error.response.data.message : "somthing went wrong"}
          </Typography>
        </Alert>
      </div>
    </>
  );
};

export default CreateWorker;
