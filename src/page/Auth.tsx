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
} from "@material-tailwind/react";
import Input from "../components/common/Input";
import { Link } from "react-router-dom";
import { FiLock, FiMail } from "react-icons/fi";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../redux/store";
import { useQueryClient } from "react-query";
import { IauthLoginRequest, IauthLoginResponse } from "../types/api/api-types";
import useAuth from "../hooks/useAuth";
import { userAction } from "../redux/slice/user-slice";
import SlideButton from "../components/common/SlideButton";
import {
  CheckCircleIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/24/outline";

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
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isLoading },
  } = useForm<FormSchemaType>({
    resolver: zodResolver(FormSchema),
  });
  console.log(isSubmitting);
  const authMutation = useAuth({
    onSuccess: () => {
      const user = queryClient.getQueryData("user");
      dispatch(userAction.setUser(user));
    },
  });

  const onSubmit: SubmitHandler<FormSchemaType> = (
    values: IauthLoginRequest
  ) => {
    authMutation.mutate(values);
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
              <Input
                name="email"
                label="Email address"
                type="text"
                icon={<FiMail />}
                placeholder="example@emaple.com"
                register={register}
                error={errors?.email?.message}
                disabled={isSubmitting}
              />

              <Input
                name="password"
                label="Password"
                type="password"
                icon={<FiLock />}
                placeholder="***********"
                register={register}
                error={errors?.password?.message}
                disabled={isSubmitting}
              />
              <div className="-ml-2.5">
                <Checkbox label="Remember Me" />
              </div>
            </CardBody>
            <CardFooter className="pt-0">
              <SlideButton
                type="submit"
                text="Sign in"
                slide_text="Secure sign in"
                icon={<FiLock />}
                disabled={authMutation.isLoading}
              />

              <Typography variant="small" className="mt-6 flex justify-center">
                Forgot your password?
                <Link to="/auth/sign-up">
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
          show={authMutation.isSuccess}
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
            singin was successfully. wellcome
          </Typography>
        </Alert>

        <Alert
          show={authMutation.isError}
          color="red"
          className="max-w-screen-md"
          icon={<ExclamationTriangleIcon className="mt-px h-6 w-6" />}
        >
          <Typography variant="h5" color="white">
            Failed
          </Typography>
          <Typography color="white" className="mt-2 font-normal">
            {authMutation.isError
              ? authMutation.error.response.data.message
              : "somthing went wrong"}
          </Typography>
        </Alert>
      </div>
    </>
  );
};

export default Auth;
