import { AuthError } from "@azure/msal-browser";
import { useMsal } from "@azure/msal-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { LOGIN_TEXTS } from "../constants";

export const useLogin = () => {
  const { instance } = useMsal();
  const navigate = useNavigate();

  const login = async () => {
    try {
      await instance.loginPopup({
        scopes: [import.meta.env.VITE_API_SCOPES],
      });
      navigate('/');
    } catch (error: unknown) {
      if (error instanceof AuthError) {
        toast.error(LOGIN_TEXTS.ERROR_LOGIN, {
          description: error.message
        });
      } else {
        toast.error(LOGIN_TEXTS.ERROR_LOGIN, {
          description: LOGIN_TEXTS.ERROR_LOGIN_DESCRIPTION
        });
      }
    }
  };

  return { login };
};