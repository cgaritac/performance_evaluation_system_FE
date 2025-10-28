import { useQuery } from "@tanstack/react-query";
import { ApiClient, GLOBAL_CONSTANTS, useAuthTokenHook } from "~/shared";
import { ACTIVITY_ENDPOINTS } from "../api";
import { ActivityResponseModel } from "../model";
import { ACTIVITY_CONST } from "../constants";

const useGetActivities = (goalId: number) => {
  const { getToken } = useAuthTokenHook();
  
  return useQuery<ActivityResponseModel[]>({
    queryKey: ["activities", goalId],
    queryFn: async () => {
      const token = await getToken();
      if (!token) throw new Error(GLOBAL_CONSTANTS.TOKEN_ERROR_MESSAGE);
      return ApiClient.get<ActivityResponseModel[]>(ACTIVITY_ENDPOINTS.GET_ACTIVITIES_URL(goalId), token);
    },
    retry: false,
    staleTime: ACTIVITY_CONST.FIVE_MINUTES,
    refetchOnWindowFocus: false,
  }); 
};

export default useGetActivities;