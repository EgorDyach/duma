import Flex from '@components/Flex';
import Button from '@components/Button';
import { Title } from '@components/Title';
import { useAppDispatch } from '@hooks/useAppDispatch';
import { adminSelectors } from '@store/admin';
import { uiActions, uiSelectors } from '@store/ui';
import { useSelector } from 'react-redux';
import { Modal } from '@components/Modal/Modal';
import PenIcon from '@components/icons/PenIcon';
import { Text } from '@components/Typography';
import { AddingAdminModal } from './AddingAdminModal';

export const MODAL_NAME = 'addAdmin';

const AdminManagementModule = () => {
  const dispatch = useAppDispatch();
  const requests = useSelector(uiSelectors.getRequests);
  const admins = useSelector(adminSelectors.getAdmins);

  return (
    <>
      <Modal modalName={MODAL_NAME}>
        <AddingAdminModal />
      </Modal>
      <Flex direction="column">
        <Title
          action={() => {
            dispatch(
              uiActions.openModal({
                modalName: MODAL_NAME,
                isEditing: false,
                value: null,
              }),
            );
          }}
        >
          Администраторы
        </Title>
        {requests['educations'] === 'fetched' && (
          <>
            <Flex
              style={{
                marginBottom: 11,
                display: 'flex',
                flexDirection: 'column',
                alignContent: 'start',
                justifyContent: 'center',
              }}
              justify="center"
              basis="100%"
              gap="11px"
            >
              {[...admins]
                .sort((a, b) => a.fullname.localeCompare(b.fullname))
                .map((item, index) => (
                  <Flex gap="16px" align="center" key={index}>
                    <button
                      onClick={() =>
                        dispatch(
                          uiActions.openModal({
                            modalName: MODAL_NAME,
                            isEditing: true,
                            value: item,
                          }),
                        )
                      }
                      style={{
                        alignItems: 'center',
                        display: 'flex',
                        justifyContent: 'center',
                        background: 'white',
                        borderRadius: 8,
                        width: 32,
                        height: 32,
                        cursor: 'pointer',
                      }}
                    >
                      <PenIcon width="24px" height="24px" />
                    </button>
                    <Button
                      key={item.id}
                      // @ts-ignore
                      size="full"
                      style={{ width: '100%' }}
                    >
                      <Text>{item.fullname}</Text>
                    </Button>
                  </Flex>
                ))}
            </Flex>
          </>
        )}
      </Flex>
    </>
  );
};

export default AdminManagementModule;
