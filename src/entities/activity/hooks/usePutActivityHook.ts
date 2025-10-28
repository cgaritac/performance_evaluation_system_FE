import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ApiClient, GLOBAL_CONSTANTS, useAuthTokenHook } from "~/shared";
import { ACTIVITY_ENDPOINTS } from "../api";
import { ActivityRequestModel } from "../model";

interface UpdateActivityParams {
    id: number;
    activity: ActivityRequestModel;
}

const usePutActivity = () => {
    const { getToken } = useAuthTokenHook();
    const queryClient = useQueryClient();
    
    const { data, mutate, isPending } = useMutation({
        mutationFn: async ({ id, activity }: UpdateActivityParams) => {
            const token = await getToken();
            if (!token) throw new Error(GLOBAL_CONSTANTS.TOKEN_ERROR_MESSAGE);
            return ApiClient.put(ACTIVITY_ENDPOINTS.PUT_ACTIVITY_URL(id), token, activity);
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

export default usePutActivity; 