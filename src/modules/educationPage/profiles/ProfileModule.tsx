import ContentLoader from '@components/ContentLoader';
import Flex from '@components/Flex';
import { Modal } from '@components/Modal/Modal';
import Button from '@components/Button';
import { Title } from '@components/Title';
import { useAppDispatch } from '@hooks/useAppDispatch';
import { institutionSelectors } from '@store/institution';
import { uiActions, uiSelectors } from '@store/ui';
import { useSelector } from 'react-redux';
import { AddingProfileModal } from './AddingProfileModal';
import { useEffectOnce } from '@hooks/useEffectOnce';
import { fetchAllProfiles } from '@store/institution/thunks';
import { Text } from '@components/Typography';

export const MODAL_NAME = 'addProfile';

const ProfileModule = () => {
  const profiles = useSelector(institutionSelectors.getProfiles);
  const requests = useSelector(uiSelectors.getRequests);
  const dispatch = useAppDispatch();
  useEffectOnce(() => {
    dispatch(fetchAllProfiles());
  });
  return (
    <Flex flex="2" direction="column" gap="8px" align="start">
      <Modal modalName={MODAL_NAME}>
        <AddingProfileModal />
      </Modal>
      <Title
        action={() =>
          dispatch(
            uiActions.openModal({
              modalName: MODAL_NAME,
              isEditing: false,
              value: null,
            }),
          )
        }
      >
        Профили
      </Title>
      {requests['profiles'] === 'pending' && <ContentLoader size={32} />}
      {requests['profiles'] !== 'pending' && (
        <Flex wrap="wrap" gap="11px">
          {[...profiles]
            .sort((a, b) => a.name.localeCompare(b.name))
            .map((item) => {
              return (
                <Button
                  key={item.id}
                  size="large"
                  onClick={() =>
                    dispatch(
                      uiActions.openModal({
                        modalName: MODAL_NAME,
                        isEditing: true,
                        value: item,
                      }),
                    )
                  }
                >
                  <Text>{item.name}</Text>
                </Button>
              );
            })}
        </Flex>
      )}
    </Flex>
  );
};

export default ProfileModule;
