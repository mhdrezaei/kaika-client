import { useForm } from "react-hook-form";
import { loginUser } from "../service/api";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler } from "react-hook-form/dist/types/form";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Checkbox,
  Button,
  Typography,
} from "@material-tailwind/react";
import Input from "../components/common/Input";
import { Link } from "react-router-dom";
import { FiLock, FiMail } from "react-icons/fi";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../redux/store";
import { useMutation } from "react-query/types/react";
import { IauthLoginRequest, IauthLoginResponse } from "../types/api/api-types";
import useAuth from '../hooks/useAuth'
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
  const authMutation = useAuth({
    onSuccess: () => {
        console.log("success!!!!")
    },
});
  const onSubmit: SubmitHandler<FormSchemaType> = (values:IauthLoginRequest) => {
   authMutation.mutate(values)
  } 
  
  

   return (
    <>
      <img
        src="https://images.unsplash.com/photo-1497294815431-9365093b7331?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1950&q=80"
        className="absolute inset-0 z-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 z-0 h-full w-full  bg-kaika-black/50" />
      <div className="container mx-auto p-4">
        <Card className="absolute top-2/4 left-2/4 w-full max-w-[24rem] -translate-y-2/4 -translate-x-2/4 bg-kaika-black">
        <form
          method="post"
          onSubmit={handleSubmit(onSubmit)}
        >
          <CardHeader
            variant="gradient"
            color="yellow"
            className="mb-4 grid h-28 place-items-center bg-gradient-to-b from-kaika-yellow to-kaika-yellow-200 bg-kaika-yellow"
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
            <Button type="submit" variant="gradient" fullWidth>
              Sign In
            </Button>
            
            <Typography variant="small" className="mt-6 flex justify-center">
              Don't have an account?
              <Link to="/auth/sign-up">
                <Typography
                  as="span"
                  variant="small"
                  color="blue"
                  className="ml-1 font-bold"
                >
                  Sign up
                </Typography>
              </Link>
            </Typography>
          </CardFooter>
          </form>
        </Card>
      </div>
    </>
  );
};

export default Auth;
