import { createBrowserRouter } from 'react-router-dom';
import PageNotFound from '@modules/pageNotFound/PageNotFound';
import { RootPage } from '@modules/rootPage/RootPage';
import { MainLayout } from '@layouts/mainLayout/MainLayout';
import { ProtectedRoute } from '@components/ProtectedRoute';
import AuthLayout from '@layouts/AuthLayout/AuthLayout';
import { AuthPage } from '@modules/authPage/AuthPage';
import AppRoutes from './routes';

export const appRoutersConfig = createBrowserRouter([
    {
        path: AppRoutes.login,
        errorElement: (
            <MainLayout>
                <PageNotFound />
            </MainLayout>
        ),
        element: <AuthLayout />,
        children: [
            {
                path: '',
                element: <AuthPage />,
            },
            {
                path: 'admin',
                element: <AuthPage isAdmin />,
            },
        ],
    },
    {
        path: '/',
        errorElement: (
            <ProtectedRoute>
                <MainLayout>
                    <PageNotFound />
                </MainLayout>
            </ProtectedRoute>
        ),
        element: (
            <ProtectedRoute>
                <MainLayout />
            </ProtectedRoute>
        ),
        children: [
            {
                path: '',
                element: <RootPage />,
            },
        ],
    },
]);
