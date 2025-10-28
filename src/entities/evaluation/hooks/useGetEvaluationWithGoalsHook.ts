import { useQuery } from "@tanstack/react-query";
import { ApiClient, GLOBAL_CONSTANTS, useAuthTokenHook } from "~/shared";
import { EVALUATION_ENDPOINTS } from "../api";
import { EvaluationRequestModel, EvaluationWithGoalsResponseModel } from "../model";
import { EVALUATION_CONST } from "../constants";

const useGetEvaluationWithGoals = (employeeId: number, params: EvaluationRequestModel) => {
    const { getToken } = useAuthTokenHook();
    const queryString = params.toQueryString();

    return useQuery<EvaluationWithGoalsResponseModel>({
      queryKey: ["evaluationWithGoals", params],
      queryFn: async () => {
        const token = await getToken();
        if (!token) throw new Error(GLOBAL_CONSTANTS.TOKEN_ERROR_MESSAGE);
        return ApiClient.get<EvaluationWithGoalsResponseModel>(
          `${EVALUATION_ENDPOINTS.GET_EVALUATION_GOALS_URL(employeeId)}?${queryString}`,
          token
        );
      },
      staleTime: EVALUATION_CONST.THIRTY_MINUTES,
      refetchOnWindowFocus: false,
      retry: false
    });
  };
  
  export default useGetEvaluationWithGoals;