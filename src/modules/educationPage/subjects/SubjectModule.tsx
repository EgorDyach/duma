import ContentLoader from '@components/ContentLoader';
import Flex from '@components/Flex';
import { Modal } from '@components/Modal/Modal';
import Button from '@components/Button';
import { Title } from '@components/Title';
import { useAppDispatch } from '@hooks/useAppDispatch';
import { institutionSelectors } from '@store/institution';
import { uiActions, uiSelectors } from '@store/ui';
import { useSelector } from 'react-redux';
import { AddingSubjectModal } from './AddingSubjectModal';
import { useEffectOnce } from '@hooks/useEffectOnce';
import { fetchAllSubjects } from '@store/institution/thunks';
import { Text } from '@components/Typography';

export const MODAL_NAME = 'addSubject';

const SubjectModule = () => {
  const shifts = useSelector(institutionSelectors.getSubjects);
  const requests = useSelector(uiSelectors.getRequests);
  const dispatch = useAppDispatch();
  useEffectOnce(() => {
    dispatch(fetchAllSubjects());
  });
  return (
    <Flex flex="2" direction="column" gap="8px" align="start">
      <Modal modalName={MODAL_NAME}>
        <AddingSubjectModal />
      </Modal>
      <Title
        action={() =>
          dispatch(
            uiActions.openModal({
              modalName: 'addSubject',
              isEditing: false,
              value: null,
            }),
          )
        }
      >
        Предметы
      </Title>
      {requests['shifts'] === 'pending' && <ContentLoader size={32} />}
      {requests['shifts'] !== 'pending' && (
        <Flex wrap="wrap" gap="11px">
          {[...shifts]
            .sort((a, b) => a.name.localeCompare(b.name))
            .map((item) => {
              return (
                <Button
                  key={item.id}
                  size="small"
                  onClick={() =>
                    dispatch(
                      uiActions.openModal({
                        modalName: 'addSubject',
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

export default SubjectModule;
