import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ApiClient, GLOBAL_CONSTANTS, useAuthTokenHook } from "~/shared";
import { EVALUATION_ENDPOINTS } from "../api";
import { EvaluationRequestModel } from "../model";

const usePutEvaluationWithGoals = () => {
    const { getToken } = useAuthTokenHook();
    const queryClient = useQueryClient();
    
    const { data, mutate, isPending } = useMutation({
        mutationFn: async (evaluation: EvaluationRequestModel) => {
            const token = await getToken();
            if (!token) throw new Error(GLOBAL_CONSTANTS.TOKEN_ERROR_MESSAGE);
            return ApiClient.put(EVALUATION_ENDPOINTS.PUT_EVALUATION_URL(evaluation.employeeId!), token, evaluation);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ 
                predicate: (query) => 
                    query.queryKey[0] === 'evaluationWithGoals' || 
                    query.queryKey[0] === 'evaluations'
            });
        },
    });

    return {
        data,
        mutate,
        isPending
    };
}

export default usePutEvaluationWithGoals;