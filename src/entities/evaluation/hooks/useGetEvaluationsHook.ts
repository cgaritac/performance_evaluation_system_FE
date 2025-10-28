import { useQuery } from "@tanstack/react-query";
import { ApiClient, GLOBAL_CONSTANTS, PageRequestModel, PageResponseModel, useAuthTokenHook } from "~/shared";
import { EVALUATION_ENDPOINTS } from "../api";
import { EVALUATION_CONST } from "../constants";
import { EvaluationResponseModel } from "../model";

const useGetEvaluations = (params: PageRequestModel) => {
  const { getToken } = useAuthTokenHook();
  const queryString = params.toQueryString();

  return useQuery<PageResponseModel<EvaluationResponseModel>>({
    queryKey: ["evaluations", params],
    queryFn: async () => {
      const token = await getToken();
      if (!token) throw new Error(GLOBAL_CONSTANTS.TOKEN_ERROR_MESSAGE);
      return ApiClient.get<PageResponseModel<EvaluationResponseModel>>(
        `${EVALUATION_ENDPOINTS.GET_EVALUATIONS_URL}?${queryString}`,
        token
      );
    },
    staleTime: EVALUATION_CONST.THIRTY_MINUTES,
    refetchOnWindowFocus: false,
  });
};
  
export default useGetEvaluations;