import ContentLoader from '@components/ContentLoader';
import { isAdmin } from '@lib/utils/isAdmin';
import { uiSelectors } from '@store/ui';
import { lazy, Suspense } from 'react';
import { useSelector } from 'react-redux';

const LazyAdminPage = lazy(() => import('../adminPage/AdminPage'));
const LazyEducationPage = lazy(() => import('../educationPage/EducationPage'));

export const RootPage = () => {
    const user = useSelector(uiSelectors.getUser);
    return (
        <Suspense fallback={<ContentLoader />}>
            {isAdmin(user) ? <LazyAdminPage /> : <LazyEducationPage />}
        </Suspense>
    );
};
