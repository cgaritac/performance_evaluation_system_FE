import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ApiClient, GLOBAL_CONSTANTS, useAuthTokenHook } from "~/shared";
import { EVALUATION_ENDPOINTS } from "../api";
import { EvaluationRequestModel } from "../model";

const usePostEvaluations = () => {
    const { getToken } = useAuthTokenHook();
    const queryClient = useQueryClient();
    
    const { data, mutate, isPending } = useMutation({
        mutationFn: async (evaluation: EvaluationRequestModel) => {
            const token = await getToken();
            if (!token) throw new Error(GLOBAL_CONSTANTS.TOKEN_ERROR_MESSAGE);
            return ApiClient.post(EVALUATION_ENDPOINTS.POST_EVALUATIONS_URL, token, evaluation);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['evaluations'] });
        },
    });

    return {
        data,
        mutate,
        isPending
    };
};

export default usePostEvaluations;