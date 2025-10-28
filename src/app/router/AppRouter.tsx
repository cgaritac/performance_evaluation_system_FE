import { AuthenticatedTemplate, UnauthenticatedTemplate } from '@azure/msal-react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { ActivitiesPage, ActivityCreatePage, ErrorPage, GoalCreatePage, GoalsPage, HomePage, LoginPage } from '~/pages';
import { GLOBAL_CONSTANTS, ROUTES, SpinLoader, useLogout } from '~/shared';
import { Layout } from '../layout';
import ProtectedRoute from './ProtectedRoute';

const AppRouter = () => {
    const { isLoggingOut } = useLogout();

    if (isLoggingOut) {
        return <SpinLoader message={GLOBAL_CONSTANTS.LOGOUT_MESSAGE} />;
    }
    
    return (
        <>
            <AuthenticatedTemplate>
                <Routes>
                    <Route element={<Layout />}>
                        <Route index element={
                            <ProtectedRoute>
                                <HomePage />
                            </ProtectedRoute>
                        } />
                        <Route path={ROUTES.GOALS} element={
                            <ProtectedRoute>
                                <GoalsPage />
                            </ProtectedRoute>
                        } />
                        <Route path={ROUTES.ACTIVITIES} element={
                            <ProtectedRoute>
                                <ActivitiesPage />
                            </ProtectedRoute>
                        } />
                        <Route path={ROUTES.GOAL_CREATE} element={
                            <ProtectedRoute>
                                <GoalCreatePage />
                            </ProtectedRoute>
                        } />
                        <Route path={ROUTES.ACTIVITY_CREATE} element={
                            <ProtectedRoute>
                                <ActivityCreatePage />
                            </ProtectedRoute>
                        } />
                        <Route path={ROUTES.LOGIN} element={<Navigate to="/" replace />} />
                        <Route path="*" element={<ErrorPage />} />
                    </Route>
                </Routes>
            </AuthenticatedTemplate>

            <UnauthenticatedTemplate>
                <Routes>
                    <Route path={ROUTES.LOGIN} element={<LoginPage />} />
                    <Route path="*" element={<Navigate to={ROUTES.LOGIN} replace />} />
                </Routes>
            </UnauthenticatedTemplate>
        </>
    );
};

export default AppRouter;