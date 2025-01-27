import Flex from '@components/Flex';
import { AddingSchoolModal } from '@modules/adminPage/school/AddingSchoolModal';
import TextButton from '@components/TextButton';
import { Title } from '@components/Title';
import { useAppDispatch } from '@hooks/useAppDispatch';
import { adminSelectors } from '@store/admin';
import { uiActions, uiSelectors } from '@store/ui';
import { useSelector } from 'react-redux';
import { Modal } from '@components/Modal/Modal';
import PenIcon from '@components/icons/PenIcon';

export const MODAL_NAME = 'addSchool';

const SchoolModule = () => {
  const dispatch = useAppDispatch();
  const requests = useSelector(uiSelectors.getRequests);
  const schools = useSelector(adminSelectors.getSchools);

  return (
    <>
      <Modal modalName={MODAL_NAME}>
        <AddingSchoolModal />
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
          Школы
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
              {schools.map((item) => (
                <Flex gap="16px" align="center">
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
                  <TextButton
                    key={item.Education.ID}
                    text={item.Education.name}
                    // @ts-ignore
                    size="full"
                    openEditing={() => {}}
                  />
                  <TextButton
                    key={item.Education.ID}
                    text={item.fullname}
                    // @ts-ignore
                    size="full"
                    openEditing={() => {}}
                  />
                </Flex>
              ))}
            </Flex>
          </>
        )}
      </Flex>
    </>
  );
};

export default SchoolModule;
