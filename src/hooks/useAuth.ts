
import { useMutation, useQueryClient } from "react-query";


import { IauthLoginRequest, IauthLoginResponse } from "../types/api/api-types";
import { loginUser } from "../service/api";

const useAuth = ({
    onSuccess,
}: {
    onSuccess?: () => void;
} = {}) => {
    const queryClient = useQueryClient();
    const authMutation = useMutation(
        async (authData: IauthLoginRequest) => {
            const {data} = await loginUser(authData);
            localStorage.setItem('token' , data.access_token)
            return data;
        },
        {
            onSuccess: async () => {
                if (onSuccess) {
                    onSuccess();
                }
            },
        }
    );

    return authMutation;
};

export default useAuth;
