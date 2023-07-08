import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler } from "react-hook-form/dist/types/form";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Checkbox,
  Typography,
  Alert,
  Button,
} from "@material-tailwind/react";
import { BeatLoader } from "react-spinners";
import { Link } from "react-router-dom";
import { useMutation, useQuery } from "react-query";
import { IauthLoginRequest } from "../types/api/api-types";
import { userAction } from "../redux/slice/user-slice";
import {
  CheckCircleIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/24/outline";
import { getCurrentUser, loginUser } from "../service/api";
import { AxiosError, AxiosResponseHeaders } from "axios";
import InputBox from "../components/common/InputBox";
import { FormSchema } from "../schema/authFormSchema";
import { useAppDispatch } from "../redux/hooks";
import { alertAction } from "../redux/slice/alert-slice";
import { useEffect, useTransition } from "react";
import { alertActive } from "../util/alertActive";
import { useTranslation } from "react-i18next";

type FormSchemaType = z.infer<typeof FormSchema>;

const Auth = () => {
  const {t} = useTranslation()
  const dispatch = useAppDispatch();
  
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    getValues,
  } = useForm<FormSchemaType>({
    resolver: zodResolver(FormSchema),
  });

  const query = useQuery("user", getCurrentUser, {
    enabled: false,
    select: (data) => data.data,
    retry: 1,
    onSuccess: (data) => {
      localStorage.setItem("user", JSON.stringify(data));
      dispatch(userAction.setUser(data));
    },
    onError: (err: AxiosError<any>) =>
      alertActive({ message: err.response?.data.message, color: "red" }),
  });

  const { isError, error, isLoading, mutate } = useMutation({
    mutationFn: loginUser,
    onSuccess({ data }) {
      localStorage.setItem("token", data.access_token);
      // dispatch(
      //   userAction.setUser(JSON.parse(atob(data.access_token.split(".")[1])))
      // );
      query.refetch();
    },
    onError: (err: AxiosError<any>) =>
      alertActive({ message: err.response?.data.message, color: "red" }),
  });

  const onSubmit: SubmitHandler<FormSchemaType> = (
    values: IauthLoginRequest
  ) => {
    mutate(values);
  };

  return (
    <div className="absolute inset-0 z-0 h-full w-full  bg-kaika-gray">
      <div className="container mx-auto p-4 ">
        <Card className="absolute top-2/4 left-2/4 w-full max-w-[24rem] -translate-y-2/4 -translate-x-2/4 bg-kaika-black shadow-sm ">
          <form method="post" onSubmit={handleSubmit(onSubmit)}>
            <CardHeader
              variant="gradient"
              className="mb-4 grid h-28 place-items-center  bg-kaika-yellow shadow-xl"
            >
              <Typography variant="h3" color="white">
                {t("Sign In")}
              </Typography>
            </CardHeader>
            <CardBody className="flex flex-col gap-4">
              <InputBox
                name="email"
                label="Email"
                type="text"
                register={register}
                error={errors?.email?.message}
                disabled={isSubmitting}
                // value={getValues("email")}
              />

              <InputBox
                name="password"
                label="Password"
                type="password"
                register={register}
                error={errors?.password?.message}
                disabled={isSubmitting}
                // value={getValues("password")}
              />
              <div className="-ml-2.5">
                <Checkbox label={t("Remember Me")} />
              </div>
            </CardBody>
            <CardFooter className="pt-0">
              <Button
                variant="gradient"
                type="submit"
                color="orange"
                ripple={true}
                size="md"
                className="relative w-full inline-flex items-center justify-center px-8 py-3 mt-4 overflow-hidden font-medium bg-kaika-yellow transition duration-300 ease-out border-2 rounded-md group"
                fullWidth
              >
                {isLoading ? <BeatLoader color="#fff" size={13} /> : t("Sign In")}
              </Button>

              <Typography variant="small" className="mt-6 flex justify-center">
                {t("Forgot your password")}
                <Link to="/auth/reset">
                  <Typography
                    as="span"
                    variant="small"
                    color="blue"
                    className="ml-1 font-bold"
                  >
                    {t("Reset Password")}
                  </Typography>
                </Link>
              </Typography>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default Auth;
