import { useMutation, useQuery, useQueryClient } from "react-query";

import {
  IauthLoginRequest,
  IauthLoginResponse,
  IuserInfo,
} from "../types/api/api-types";
import { getCurrentUser, loginUser } from "../service/api";
import { AxiosResponse, AxiosResponseHeaders } from "axios";

const useAuth = ({
  onSuccess,
}: {
  onSuccess?: () => void;
} = {}) => {
  const queryClient = useQueryClient();
  const authMutation = useMutation(
    async (authData: IauthLoginRequest) => {
      const { data, status } = await loginUser(authData);
      console.log(status);
      if (status === 200) {
        localStorage.setItem(
          "token",
          data.access_token ? data.access_token : ""
        );

        if (data.access_token) {
          const { data, status } = await getCurrentUser();
          console.log(status);
          if (status === 200) {
            localStorage.setItem("user", JSON.stringify(data));
            queryClient.setQueryData("user", data);
            return data;
          } else {
            console.log(data);
            queryClient.setQueryData("loginError", data);
            return data;
          }
        }
      } else {
        console.log(data);
        return data;
      }
    },
    {
      onSuccess: async () => {
        if (onSuccess) {
          onSuccess();
        }
      },
      onError(error: AxiosResponseHeaders, variables, context) {},
    }
  );

  return authMutation;
};

export default useAuth;
