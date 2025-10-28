import { useMsal } from '@azure/msal-react';
import { toast } from '~/shared';

const useAuthTokenHook = () => {
  const { instance, accounts } = useMsal();
  const viteScope = import.meta.env.VITE_API_SCOPES as string;
  
  const accessTokenRequest = {
    scopes: [viteScope],
    account: accounts && accounts.length > 0 ? accounts[0] : undefined,
  };

  const currentUser = accounts && accounts.length > 0 ? accounts[0] : null;

  if (!currentUser) {
    toast.error('No authenticated. No user found');
  }

  const getToken = async () => {
    try {
      const response = await instance.acquireTokenSilent(accessTokenRequest);
      return response.accessToken;
    } catch (error) {
      console.error('Error while getting token:', error);
    }
  };

  return { getToken, currentUser };
};

export default useAuthTokenHook;
