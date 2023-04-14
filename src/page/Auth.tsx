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
import { useDispatch } from "react-redux";
import { AppDispatch } from "../redux/store";
import { useMutation, useQuery } from "react-query";
import { IauthLoginRequest } from "../types/api/api-types";
import { userAction } from "../redux/slice/user-slice";
import {
  CheckCircleIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/24/outline";
import { getCurrentUser, loginUser } from "../service/api";
import { AxiosResponseHeaders } from "axios";
import InputBox from "../components/common/InputBox";

const FormSchema = z.object({
  email: z.string().email("Please enter a valid email adress."),
  password: z
    .string()
    .min(3, "Password must be atleast 3 characters.")
    .max(52, "Password must be less than 52 characters."),
});

type FormSchemaType = z.infer<typeof FormSchema>;

const Auth = () => {
  const dispatch = useDispatch<AppDispatch>();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
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
  });

  const { data, isError, error, isLoading, isSuccess, mutate } = useMutation({
    mutationFn: loginUser,
    onError(error: AxiosResponseHeaders) {},
    onSuccess({ data }) {
      localStorage.setItem("token", data.access_token);
      query.refetch();
    },
  });

  const onSubmit: SubmitHandler<FormSchemaType> = (
    values: IauthLoginRequest
  ) => {
    mutate(values);
  };

  return (
    <>
      <div className="absolute inset-0 z-0 h-full w-full  bg-kaika-gray" />
      <div className="container mx-auto p-4 ">
        <Card className="absolute top-2/4 left-2/4 w-full max-w-[24rem] -translate-y-2/4 -translate-x-2/4 bg-kaika-black shadow-sm  shadow-kaika-yellow hover:shadow-md hover:shadow-kaika-yellow">
          <form method="post" onSubmit={handleSubmit(onSubmit)}>
            <CardHeader
              variant="gradient"
              className="mb-4 grid h-28 place-items-center  bg-kaika-yellow shadow-xl"
            >
              <Typography variant="h3" color="white">
                Sign In
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
              />

              <InputBox
                name="password"
                label="Password"
                type="password"
                register={register}
                error={errors?.password?.message}
                disabled={isSubmitting}
              />
              <div className="-ml-2.5">
                <Checkbox label="Remember Me" />
              </div>
            </CardBody>
            <CardFooter className="pt-0">
              <Button
                variant="gradient"
                type="submit"
                ripple={true}
                size="md"
                fullWidth
              >
                {isLoading ? <BeatLoader color="#fff" size={13} /> : "Sign in"}
              </Button>

              <Typography variant="small" className="mt-6 flex justify-center">
                Forgot your password?
                <Link to="/auth/reset">
                  <Typography
                    as="span"
                    variant="small"
                    color="blue"
                    className="ml-1 font-bold"
                  >
                    Reset Password
                  </Typography>
                </Link>
              </Typography>
            </CardFooter>
          </form>
        </Card>
      </div>
      <div className="absolute bottom-5 w-full flex flex-col items-center justify-center mx-auto">
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
            singin was successfully...
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

export default Auth;
