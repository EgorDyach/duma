import ContentLoader from '@components/ContentLoader';
import Flex from '@components/Flex';
import { Modal } from '@components/Modal/Modal';
import TextButton from '@components/TextButton';
import { Title } from '@components/Title';
import { useAppDispatch } from '@hooks/useAppDispatch';
import { institutionSelectors } from '@store/institution';
import { uiActions, uiSelectors } from '@store/ui';
import { useSelector } from 'react-redux';
import { AddingProfileModal } from './AddingProfileModal';
import { useEffectOnce } from '@hooks/useEffectOnce';
import { fetchAllProfiles } from '@store/institution/thunks';

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
        <Flex
          wrap="wrap"
          style={{
            display: 'flex',
            flexDirection: 'column',
            maxHeight: 'calc(1 * 42px)',
            overflowX: 'auto',
            alignContent: 'start',
            width: '100%',
          }}
          justify="start"
          basis="24%"
          gap="11px"
        >
          {profiles.map((item) => {
            return (
              <TextButton
                key={item.id}
                text={String(item.name)}
                size="large"
                openEditing={() =>
                  dispatch(
                    uiActions.openModal({
                      modalName: MODAL_NAME,
                      isEditing: true,
                      value: item,
                    }),
                  )
                }
              />
            );
          })}
        </Flex>
      )}
    </Flex>
  );
};

export default ProfileModule;
