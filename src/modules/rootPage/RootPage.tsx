import ContentLoader from '@components/ContentLoader';
import AppRoutes from '@lib/configs/routes';
import { isAdmin } from '@lib/utils/isAdmin';
import { uiSelectors } from '@store/ui';
import { lazy, Suspense } from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const LazyAdminPage = lazy(() => import('../adminPage/AdminPage'));
const LazyEducationPage = lazy(() => import('../educationPage/EducationPage'));

export const RootPage = () => {
    const user = useSelector(uiSelectors.getUser);
    if (!user) return <Navigate to={AppRoutes.login} />;
    return (
        <Suspense fallback={<ContentLoader />}>
            {isAdmin(user) ? <LazyAdminPage /> : <LazyEducationPage />}
        </Suspense>
    );
};
