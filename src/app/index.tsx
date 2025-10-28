import { MsalProvider } from '@azure/msal-react';
import { Toaster } from "sonner";
import { UserProvider } from "~/entities";
import { initializeMsal, LogoutProvider, msalInstance } from "~/shared";
import { ErrorBoundary } from "./boundaries";
import { QueryProvider, RouterProvider } from "./providers";
import { AppRouter } from "./router";

initializeMsal();

const App: React.FC = () => {
  return (
    <MsalProvider instance={msalInstance}>
      <LogoutProvider>
        <ErrorBoundary>
          <QueryProvider>
            <UserProvider>
            <RouterProvider>
            <Toaster position="bottom-right" richColors/>
            <AppRouter/>
            </RouterProvider>
            </UserProvider>
          </QueryProvider>
        </ErrorBoundary>
      </LogoutProvider>
    </MsalProvider>
  )
}

export default App;