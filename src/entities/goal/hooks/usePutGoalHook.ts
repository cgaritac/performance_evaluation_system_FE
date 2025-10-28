import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ApiClient, GLOBAL_CONSTANTS, useAuthTokenHook } from "~/shared";
import { GOAL_ENDPOINTS } from "../api";
import { GoalRequestModel } from "../model";

const usePutGoal = () => {
    const { getToken } = useAuthTokenHook();
    const queryClient = useQueryClient();
    
    const { data, mutate, isPending } = useMutation({
        mutationFn: async (goal: GoalRequestModel) => {
            const token = await getToken();
            if (!token) throw new Error(GLOBAL_CONSTANTS.TOKEN_ERROR_MESSAGE);
            return ApiClient.put(GOAL_ENDPOINTS.PUT_GOAL_URL(goal.id), token, goal);
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
}

export default usePutGoal;