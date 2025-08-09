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
import { fetchAllFaculty } from '@store/institution/thunks';
import { Text } from '@components/Typography';
import {
  AddingFacultyModal,
  MODAL_NAME as MODAL_FACULTY_NAME,
} from './AddingFacultyModal';
import {
  AddingDepartmentModal,
  MODAL_NAME as MODAL_DEPARTMENT_NAME,
} from './AddingDepartmentModal';

export const MODAL_NAME = 'addProfile';

const ProfileModule = () => {
  const profiles = useSelector(institutionSelectors.getProfiles);
  const faculties = useSelector(institutionSelectors.getFaculties);
  const departments = useSelector(institutionSelectors.getDepartments);
  const user = useSelector(uiSelectors.getUser);
  const requests = useSelector(uiSelectors.getRequests);
  const dispatch = useAppDispatch();
  useEffectOnce(() => {
    dispatch(fetchAllFaculty());
  });
  return (
    <Flex flex="2" direction="column" gap="8px" align="start">
      <Modal modalName={MODAL_NAME}>
        <AddingProfileModal />
      </Modal>
      <Modal modalName={MODAL_FACULTY_NAME}>
        <AddingFacultyModal />
      </Modal>
      <Modal modalName={MODAL_DEPARTMENT_NAME}>
        <AddingDepartmentModal />
      </Modal>
      {
        // @ts-ignore
        user['Institution']?.institution_type !== 'school' ? (
          <>
            <Title
              action={() =>
                dispatch(
                  uiActions.openModal({
                    modalName: MODAL_FACULTY_NAME,
                    isEditing: false,
                    value: null,
                  }),
                )
              }
            >
              Факультеты
            </Title>
            {requests['faculties'] === 'pending' && <ContentLoader size={32} />}
            {requests['faculties'] !== 'pending' && (
              <Flex wrap="wrap" gap="11px">
                {[...faculties]
                  .sort((a, b) => a.name.localeCompare(b.name))
                  .map((el) => (
                    <Button
                      key={el.id}
                      size="large"
                      onClick={() =>
                        dispatch(
                          uiActions.openModal({
                            modalName: MODAL_FACULTY_NAME,
                            isEditing: true,
                            value: el,
                          }),
                        )
                      }
                    >
                      <Text>{el.name}</Text>
                    </Button>
                  ))}
              </Flex>
            )}
            <Title
              action={() =>
                dispatch(
                  uiActions.openModal({
                    modalName: MODAL_DEPARTMENT_NAME,
                    isEditing: false,
                    value: null,
                  }),
                )
              }
            >
              Кафедры
            </Title>
            {requests['departments'] === 'pending' && (
              <ContentLoader size={32} />
            )}
            {requests['departments'] !== 'pending' && (
              <Flex direction="column" gap="16px">
                {[...faculties]
                  .sort((a, b) => a.name.localeCompare(b.name))
                  .map((fac) => {
                    const facDepartments = departments
                      .filter((d) => d.faculty_id === fac.id)
                      .sort((a, b) => a.name.localeCompare(b.name));
                    if (facDepartments.length === 0) return null;
                    return (
                      <Flex key={fac.id} direction="column" gap="8px">
                        <Text $size="medium">{fac.name}</Text>
                        <Flex wrap="wrap" gap="11px">
                          {facDepartments.map((el) => (
                            <Button
                              key={el.id}
                              size="large"
                              onClick={() =>
                                dispatch(
                                  uiActions.openModal({
                                    modalName: MODAL_DEPARTMENT_NAME,
                                    isEditing: true,
                                    value: el,
                                  }),
                                )
                              }
                            >
                              <Text>{el.name}</Text>
                            </Button>
                          ))}
                        </Flex>
                      </Flex>
                    );
                  })}
              </Flex>
            )}
          </>
        ) : null
      }
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
        <Flex direction="column" gap="16px">
          {[...departments]
            .sort((a, b) => a.name.localeCompare(b.name))
            .map((dep) => {
              const depProfiles = profiles
                .filter((p) => p.department_id === dep.id)
                .sort((a, b) => a.name.localeCompare(b.name));
              if (depProfiles.length === 0) return null;
              return (
                <Flex key={dep.id} direction="column" gap="8px">
                  <Text $size="medium">{dep.name}</Text>
                  <Flex wrap="wrap" gap="11px">
                    {depProfiles.map((item) => (
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
                    ))}
                  </Flex>
                </Flex>
              );
            })}
        </Flex>
      )}
    </Flex>
  );
};

export default ProfileModule;
