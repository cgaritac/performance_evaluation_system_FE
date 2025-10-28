import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ApiClient, GLOBAL_CONSTANTS, useAuthTokenHook } from "~/shared";
import { ACTIVITY_ENDPOINTS } from "../api";
import { ActivityRequestModel } from "../model";

interface DeleteActivityParams {
    id: number;
    activity: ActivityRequestModel;
}

const useDeleteActivity = () => {
    const { getToken } = useAuthTokenHook();
    const queryClient = useQueryClient();
    
    const { data, mutate, isPending } = useMutation({
        mutationFn: async ({ id }: DeleteActivityParams) => {
            const token = await getToken();
            if (!token) throw new Error(GLOBAL_CONSTANTS.TOKEN_ERROR_MESSAGE);
            return ApiClient.delete(ACTIVITY_ENDPOINTS.DELETE_ACTIVITY_URL(id), token);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['activities'] });
        },
    });

    return {
        data,
        mutate,
        isPending
    };
};

export default useDeleteActivity;