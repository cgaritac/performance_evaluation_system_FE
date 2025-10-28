# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config({
  extends: [
    // Remove ...tseslint.configs.recommended and replace with this
    ...tseslint.configs.recommendedTypeChecked,
    // Alternatively, use this for stricter rules
    ...tseslint.configs.strictTypeChecked,
    // Optionally, add this for stylistic rules
    ...tseslint.configs.stylisticTypeChecked,
  ],
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config({
  plugins: {
    // Add the react-x and react-dom plugins
    'react-x': reactX,
    'react-dom': reactDom,
  },
  rules: {
    // other rules...
    // Enable its recommended typescript rules
    ...reactX.configs['recommended-typescript'].rules,
    ...reactDom.configs.recommended.rules,
  },
})
```
Orden de carpetas en FSD:

app
pages
widgets
features
entities
shared


Revisar esta configuracion d seguridad al final:
{
    "navigationFallback": {
      "rewrite": "/index.html",
      "exclude": [
        "/api/*",
        "*.{css,scss,js,js.map,ts,tsx,json,png,gif,ico,jpg,svg,webp,woff,woff2,ttf,eot}",
        "/assets/*"
      ]
    },
    "routes": [
      {
        "route": "/login",
        "allowedRoles": ["anonymous"]
      },
      {
        "route": "/admin/*",
        "allowedRoles": ["AdminRol"]
      },
      {
        "route": "/user/*",
        "allowedRoles": ["UserRol"]
      }
    ],
    "responseOverrides": {
      "401": {
        "redirect": "/login",
        "statusCode": 302
      },
      "404": {
        "rewrite": "/404.html"
      }
    },
    "auth": {
      "identityProviders": {
        "azureActiveDirectory": {
          "registration": {
            "clientIdSettingName": "AZURE_CLIENT_ID",
            "clientSecretSettingName": "AZURE_CLIENT_SECRET"
          }
        }
      }
    },
    "globalHeaders": {
      "Content-Security-Policy": "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; font-src 'self' data:; connect-src 'self' https://login.microsoftonline.com;",
      "X-Frame-Options": "DENY",
      "X-Content-Type-Options": "nosniff",
      "Referrer-Policy": "strict-origin-when-cross-origin",
      "Permissions-Policy": "geolocation=(), microphone=(), camera=()"
    }
  }


  Instalaciones:
  yarn add --dev tailwindcss @tailwindcss/vite
  yarn add --dev @types/node
  yarn add react-modal
  yarn add --dev @types/react-modal
  yarn add -D @typescript-eslint/eslint-plugin @typescript-eslint/parser
  yarn add -D @types/react@19.0.10 @types/react-dom@19.0.4
  yarn add -D copyfiles
  yarn add --dev react-router
  yarn add react-router // Esta no todavia
  yarn --dev add react-router-dom@latest 
  yarn add --dev  @types/react-router // Esta no todavia
  yarn add sonner
  yarn add @tanstack/react-query
  yarn add @tanstack/react-table
  yarn add --dev typescript-eslint
  yarn add @tanstack/react-table
  yarn add react-loading-skeleton
  yarn add --dev @types/react@latest
  yarn add lodash
  yarn add --dev @types/lodash
  yarn add zustand
  yarn add react-hook-form
  yarn add zod
  yarn add @hookform/resolvers
  yarn add @hookform/resolvers --save
  yarn add -D eslint-import-resolver-typescript
   yarn add jwt-decode

  Para integrar en AppRouter a futuro:
  <BrowserRouter>
  <AuthenticatedTemplate>
    <Routes>
      {/* Layout principal */}
      <Route element={<AuthLayout />}> {/* Sin path */}
        <Route index element={<Home />} />
        <Route path="admin" element={<AdminPage />} />
      </Route>

      {/* Layout alternativo */}
      <Route element={<AlternateLayout />}>
        <Route path="dashboard" element={<Dashboard />} />
      </Route>
    </Routes>
  </AuthenticatedTemplate>

  <UnauthenticatedTemplate>
    <Routes>
      <Route path="*" element={<Login />} />
    </Routes>
  </UnauthenticatedTemplate>
</BrowserRouter>

    useEffect(() => {
        throw new Error("Simulated error from useEffect");
      }, []);


    const isDirectNavigation = !location.state?.fromApp;
    console.log('isDirectNavigation', isDirectNavigation);
    const currentId = isDirectNavigation ? Number(id) : idSelected ?? 0;

    return currentId;

    // import { jwtDecode } from 'jwt-decode';
// import { ReactNode, useEffect, useState } from 'react';
// import { Navigate, useLocation, useParams } from 'react-router-dom';
// import { useCurrentUser, useUser } from '~/entities';
// import type { UserRol } from '~/shared';
// import { GLOBAL_CONSTANTS, ROUTES, SpinLoader, toast, useAuthTokenHook, useLogout } from '~/shared';

// interface ProtectedRouteProps {
//     children: ReactNode;
// }

// const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
//     const { setUserData, userData } = useUser();
//     const { currentUser, getToken } = useAuthTokenHook();
//     const [userRole, setUserRole] = useState<string | null>(null);
//     const [isTokenProcessed, setIsTokenProcessed] = useState(false);
//     const { isLoggingOut } = useLogout();
//     const location = useLocation();
//     const { id } = useParams<{ id: string }>();
    
//     useEffect(() => {
//         const processToken = async () => {
//           const token = await getToken();
//           if (token) {
//             const decodedToken = jwtDecode(token);
//             const userRoles = JSON.parse(JSON.stringify(decodedToken)).roles;
    
//             if (userRoles.some((role: string) => role === GLOBAL_CONSTANTS.ADMIN_ROLE || role === GLOBAL_CONSTANTS.USER_ROLE)) {
//               const validRole = userRoles.find((role: string) =>
//                 role === GLOBAL_CONSTANTS.ADMIN_ROLE || role === GLOBAL_CONSTANTS.USER_ROLE
//               );
//               setUserRole(validRole);
//             } else {
//               toast.error('The token is invalid');
//             }
//           }
//           setIsTokenProcessed(true);
//         };
    
//         processToken();
//       }, [getToken]);

//       const queryResult = useCurrentUser(currentUser?.username ?? '');

//       useEffect(() => {
//         if (!queryResult.isLoading && queryResult.data && userRole) {
//           const userDataWithRole = {
//             ...queryResult.data,
//             role: userRole as UserRol
//           };
//           setUserData(userDataWithRole);
//         }
//       }, [queryResult.data, userRole, queryResult.isLoading, setUserData]);

//     if ( queryResult.isLoading || !isTokenProcessed) {
//         return <SpinLoader />;
//     }

//     if (isLoggingOut) {
//         return <SpinLoader message={GLOBAL_CONSTANTS.LOGOUT_MESSAGE} />;
//     }

//     if (!userData) {
//         return <Navigate to={ROUTES.LOGIN} state={{ from: location }} replace />;
//     }
    
//     if (userData?.role?.toLowerCase() === GLOBAL_CONSTANTS.USER_ROLE.toLowerCase() && 
//         location.pathname.startsWith('/employee/') && id && Number(id) !== userData?.id) {
//         return <Navigate to={ROUTES.ERROR} state={{ fromApp: true }} replace />;
//     }

//     if (userData?.role?.toLowerCase() === GLOBAL_CONSTANTS.USER_ROLE.toLowerCase() && 
//         location.pathname.startsWith('/goal/') && id) {
//         if (queryResult.isLoading) {
//             return <SpinLoader />;
//         }

//         // if (!evaluation) {
//         //     return <Navigate to={ROUTES.ERROR} state={{ fromApp: true }} replace />;
//         // }

//         // const goalExists = evaluation.goals.some(goal => goal.id === Number(id));
//         // if (!goalExists) {
//         //     return <Navigate to={ROUTES.ERROR} state={{ fromApp: true }} replace />;
//         // }
//     }

//     if (userData?.role?.toLowerCase() === GLOBAL_CONSTANTS.USER_ROLE.toLowerCase() && location.pathname === '/') {
//         if (queryResult.isLoading) {
//             return <SpinLoader />;
//         }
        
//         return <Navigate
//             to={ROUTES.GOALS.replace(':id', userData?.id.toString() ?? "0")}
//             replace
//             state={{ from: location }}
//         />;
//     }

//     if (userData?.role?.toLowerCase() !== GLOBAL_CONSTANTS.ADMIN_ROLE.toLowerCase() && 
//         userData?.role?.toLowerCase() !== GLOBAL_CONSTANTS.USER_ROLE.toLowerCase()) {
//         return <Navigate to={ROUTES.LOGIN} state={{ from: location }} replace />;
//     }

//     return <>{children}</>;
// };

// export default ProtectedRoute;









    // if (userData?.role?.toLowerCase() === GLOBAL_CONSTANTS.USER_ROLE.toLowerCase() && 
    //     location.pathname.startsWith('/goal/') && id) {
    //     // Let the GoalsPage component handle the evaluation loading and validation
    //     // Don't block navigation here as it prevents proper data loading
    // }