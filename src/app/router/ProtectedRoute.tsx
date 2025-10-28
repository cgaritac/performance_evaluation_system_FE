import { jwtDecode } from 'jwt-decode';
import { ReactNode, useEffect, useState } from 'react';
import { Navigate, useLocation, useParams } from 'react-router-dom';
import { useCurrentUser, useUser } from '~/entities';
import type { UserRol } from '~/shared';
import { GLOBAL_CONSTANTS, ROUTES, SpinLoader, toast, useAppStore, useAuthTokenHook, useLogout } from '~/shared';

interface ProtectedRouteProps {
    children: ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
    const { setUserData, userData } = useUser();
    const { evaluationSelected } = useAppStore();
    const { currentUser, getToken } = useAuthTokenHook();
    const [userRole, setUserRole] = useState<string | null>(null);
    const [isTokenProcessed, setIsTokenProcessed] = useState(false);
    const { isLoggingOut } = useLogout();
    const location = useLocation();
    const { id } = useParams<{ id: string }>();
    
    useEffect(() => {
        const processToken = async () => {
          const token = await getToken();
          if (token) {
            const decodedToken = jwtDecode(token);
            const userRoles = JSON.parse(JSON.stringify(decodedToken)).roles;
    
            if (userRoles.some((role: string) => role === GLOBAL_CONSTANTS.ADMIN_ROLE || role === GLOBAL_CONSTANTS.USER_ROLE)) {
              const validRole = userRoles.find((role: string) =>
                role === GLOBAL_CONSTANTS.ADMIN_ROLE || role === GLOBAL_CONSTANTS.USER_ROLE
              );
              setUserRole(validRole);
            } else {
              toast.error('The token is invalid');
            }
          }
          setIsTokenProcessed(true);
        };
    
        processToken();
      }, [getToken]);

      const queryResult = useCurrentUser(currentUser?.username ?? '');

      useEffect(() => {
        if (!queryResult.isLoading && queryResult.data && userRole) {
          const userDataWithRole = {
            ...queryResult.data,
            role: userRole as UserRol
          };
          setUserData(userDataWithRole);
        }
      }, [queryResult.data, userRole, queryResult.isLoading, setUserData]);

    if ( queryResult.isLoading || !isTokenProcessed || !userData 
        || (userData?.role?.toLowerCase() !== GLOBAL_CONSTANTS.ADMIN_ROLE.toLowerCase() 
        && userData?.role?.toLowerCase() !== GLOBAL_CONSTANTS.USER_ROLE.toLowerCase())) {
        return <SpinLoader />;
    }

    if (isLoggingOut) {
        return <SpinLoader message={GLOBAL_CONSTANTS.LOGOUT_MESSAGE} />;
    }

    if (userData?.role?.toLowerCase() === GLOBAL_CONSTANTS.USER_ROLE.toLowerCase() && 
        location.pathname.startsWith('/employee/') && id && Number(id) !== userData?.id) {
        return <Navigate to={ROUTES.ERROR} state={{ fromApp: true }} replace />;
    }

    if (userData?.role?.toLowerCase() === GLOBAL_CONSTANTS.USER_ROLE.toLowerCase() && 
        location.pathname === ROUTES.HOME) {
        return <Navigate
            to={ROUTES.GOALS.replace(':id', userData?.id.toString() ?? "0")}
            replace
            state={{ from: location }}
        />;
    }

    if (userData?.role?.toLowerCase() === GLOBAL_CONSTANTS.USER_ROLE.toLowerCase() && 
        location.pathname.startsWith('/goal/') && !evaluationSelected) {
          
        return <Navigate to={ROUTES.HOME} state={{ fromApp: true }} replace />;
    }

    if (userData?.role?.toLowerCase() === GLOBAL_CONSTANTS.ADMIN_ROLE.toLowerCase() && 
        location.pathname.startsWith('/goal/') && !evaluationSelected) {
          
        return <Navigate to={ROUTES.HOME} state={{ fromApp: true }} replace />;
    }

    return <>{children}</>;
};

export default ProtectedRoute;