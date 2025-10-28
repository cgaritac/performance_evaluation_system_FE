import { AuthError } from "@azure/msal-browser";
import { useMsal } from "@azure/msal-react";
import { toast } from "sonner";
import { GLOBAL_CONSTANTS, useLogout } from "~/shared";

const useHandleLogoutHook = () => {
    const { instance } = useMsal();
    const { setIsLoggingOut } = useLogout();

    const handleLogout = async () => {
        try {
            setIsLoggingOut(true);
            
            await instance.logoutRedirect({
                postLogoutRedirectUri: import.meta.env.VITE_REDIRECT_URI,
                authority: import.meta.env.VITE_AUTHORITY
            });
        } catch (error: unknown) {
            setIsLoggingOut(false);
            
            if (error instanceof AuthError) {
                toast.error(GLOBAL_CONSTANTS.LOGOUT_ERROR_MESSAGE, {
                    description: error.message
                });
            } else {
                toast.error(GLOBAL_CONSTANTS.LOGOUT_ERROR_MESSAGE, {
                    description: GLOBAL_CONSTANTS.LOGOUT_ERROR_MESSAGE_DESCRIPTION
                });
            }
        }
    }

    return {
        handleLogout
    }
}

export default useHandleLogoutHook;