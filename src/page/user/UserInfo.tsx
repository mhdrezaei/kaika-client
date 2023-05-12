import React, { useState } from "react";
import InputBox from "../../components/common/InputBox";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { BeatLoader } from "react-spinners";
import { useMutation, useQuery } from "react-query";
import { WorkerFormSchema } from "../../schema/newWorkerFormSchema";
import { AxiosError } from "axios";
import { IAdminUpdateUserRequest } from "../../types/api/api-types";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Typography,
} from "@material-tailwind/react";
import {
  getCurrentUser,
  updateCurrentUser,
  updateUserFile,
} from "../../service/api";
import { UserInfoSchema } from "../../schema/userInfoSchema";
import { alertAction } from "../../redux/slice/alert-slice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { userAction } from "../../redux/slice/user-slice";
import { alertActive } from "../../util/alertActive";
import { DocumentIcon } from "@heroicons/react/24/outline";

type UserFormSchemaType = z.infer<typeof UserInfoSchema>;

const UserInfo = () => {
  const user = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const [image, setImage] = useState<File>();
  const [fetchData, setFetchData] = useState({ ...user });

  const imgFilehandler: React.ChangeEventHandler<HTMLInputElement> = async (
    event
  ) => {
    if (event.target.files) {
      setImage(event.target.files[0]);
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<UserFormSchemaType>({
    resolver: zodResolver(UserInfoSchema),
  });

  const uploadImg = useMutation({
    mutationFn: updateUserFile,
    onSuccess(response) {
      dispatch(userAction.setUser(null));
      alertActive({ message: "Company Information Updated", color: "green" });
      dispatch(userAction.setUser(response.data));
    },
    onError: (err: AxiosError<any>) =>
      alertActive({ message: err.response?.data.message, color: "red" }),
  });

  const { isLoading, mutate } = useMutation({
    mutationFn: updateCurrentUser,
    onSuccess(data) {
      const formData = new FormData();
      image && formData.append("file", image);
      image && uploadImg.mutate(formData);
      dispatch(userAction.setUser(data.data));
    },
    onError: (err: AxiosError<any>) =>
      alertActive({ message: err.response?.data.message, color: "red" }),
  });

  const onChangeHandler: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setFetchData((prevState) => {
      return {
        ...prevState,
        [e.target.id]: e.target.value,
      };
    });
  };

  const onSubmit = (values: IAdminUpdateUserRequest) => {
    mutate(values);
  };

  return (
    <div className="w-full flex justify-center items-center rounded-md">
      <div className="2-full md:w-3/4 mx-auto   ">
        <Card className=" border border-1 border-gray-200 rounded-md bg-kaika-black shadow-sm  shadow-gray-300">
          <CardHeader
            variant="gradient"
            color="orange"
            className="p-6 text-center"
          >
            <Typography variant="h6" color="white">
              User Information
            </Typography>
          </CardHeader>

          <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-full">
            <CardBody className="flex flex-col md:gap-5 pt-8">
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
                    value={fetchData.firstName}
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
                    value={fetchData.lastName}
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
                    value={fetchData.email}
                    onChange={onChangeHandler}
                  />
                </div>

                <div className="w-full relative md:w-1/2 px-3 md:mb-0">
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
                    {image && (
                      <img
                        src={URL.createObjectURL(image)}
                        className="absolute top-1 right-5 rounded-full w-8 h-8"
                      />
                    )}
                  </div>
                </div>
              </div>
              <div className="flex flex-wrap -mx-3 mb-2">
                <div className="w-full px-3 mb-6 md:mb-0">
                  <InputBox
                    name="address"
                    id="address"
                    label="Address"
                    type="text"
                    register={register}
                    error={errors?.address?.message}
                    disabled={isSubmitting}
                    value={fetchData.address}
                    onChange={onChangeHandler}
                  />
                </div>
              </div>
              <div className="flex flex-wrap -mx-3 mb-2">
                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                  <InputBox
                    name="officialName"
                    id="officialName"
                    label="Official Name"
                    type="text"
                    register={register}
                    error={errors?.officialName?.message}
                    disabled={isSubmitting}
                    value={fetchData.officialName}
                    onChange={onChangeHandler}
                  />
                </div>

                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                  <InputBox
                    name="tel"
                    id="tel"
                    label="Tel"
                    type="text"
                    register={register}
                    error={errors?.tel?.message}
                    disabled={isSubmitting}
                    value={fetchData.tel}
                    onChange={onChangeHandler}
                  />
                </div>
              </div>
              <div className="flex flex-wrap -mx-3 mb-2">
                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                  <InputBox
                    name="password"
                    id="password"
                    label="Current Password"
                    type="password"
                    register={register}
                    error={errors?.password?.message}
                    disabled={isSubmitting}
                    onChange={onChangeHandler}
                  />
                </div>
                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                  <InputBox
                    name="newPassword"
                    id="newPassword"
                    label="New Password"
                    type="password"
                    register={register}
                    error={errors?.newPassword?.message}
                    disabled={isSubmitting}
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
                className="relative  inline-flex items-center justify-center px-8 py-3 md:mt-4 overflow-hidden font-semibold text-base bg-kaika-yellow transition duration-300 ease-out border-2 rounded-md group"
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

export default UserInfo;
