import { useEffectOnce } from '@hooks/useEffectOnce';
import { uiSelectors } from '@store/ui';
import { fetchUser } from '@store/ui/thunks';
import { FC, PropsWithChildren } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Flex from './Flex';
import { useAppDispatch } from '@hooks/useAppDispatch';
import { useRequestFetched } from '@hooks/useRequestFetching';

export const ProtectedRoute: FC<PropsWithChildren> = ({ children }) => {
    const user = useSelector(uiSelectors.getUser);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const userIsFetched = useRequestFetched('getUser');

    useEffectOnce(() => {
        if (!user) dispatch(fetchUser(navigate));
    });

    if (!userIsFetched)
        return (
            <Flex align="center" justify="center" style={{ height: '100vh' }}>
                <h2>Загрузка...</h2>
            </Flex>
        );

    return children;
};
