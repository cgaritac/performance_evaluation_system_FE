import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ApiClient, GLOBAL_CONSTANTS, useAuthTokenHook } from "~/shared";
import { GOAL_ENDPOINTS } from "../api";

    const useDeleteGoal = () => {
    const { getToken } = useAuthTokenHook();
    const queryClient = useQueryClient();
    
    const { data, mutate, isPending } = useMutation({
        mutationFn: async (goalId: number) => {
            const token = await getToken();
            if (!token) throw new Error(GLOBAL_CONSTANTS.TOKEN_ERROR_MESSAGE);
            return ApiClient.delete(GOAL_ENDPOINTS.DELETE_GOAL_URL(goalId), token);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['evaluationWithGoals'] });
        },
    });

    return {
        data,
        mutate,
        isPending
    };
};

export default useDeleteGoal;