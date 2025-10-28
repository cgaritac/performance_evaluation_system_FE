import { useQuery } from "@tanstack/react-query";
import { ApiClient, GLOBAL_CONSTANTS, useAuthTokenHook } from "~/shared";
import { USER_ENDPOINTS } from "../api";
import { UserModel } from "../model";

const useCurrentUser = (userName: string) => {
  const { getToken } = useAuthTokenHook();

  return useQuery<UserModel>({
    queryKey: ["currentUser", userName],
    queryFn: async () => {
      const token = await getToken();
      if (!token) throw new Error(GLOBAL_CONSTANTS.TOKEN_ERROR_MESSAGE);
      return ApiClient.get<UserModel>(USER_ENDPOINTS.GET_EMPLOYEE_URL(userName), token);
    },
    retry: false,
    enabled: !!userName,
  });
};

export default useCurrentUser;