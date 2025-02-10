import ContentLoader from '@components/ContentLoader';
import Flex from '@components/Flex';
import { Modal } from '@components/Modal/Modal';
import TextButton from '@components/TextButton';
import { Title } from '@components/Title';
import { useAppDispatch } from '@hooks/useAppDispatch';
import { institutionSelectors } from '@store/institution';
import { uiActions, uiSelectors } from '@store/ui';
import { useSelector } from 'react-redux';
import { AddingSubjectModal } from './AddingSubjectModal';
import { useEffectOnce } from '@hooks/useEffectOnce';
import { fetchAllSubjects } from '@store/institution/thunks';

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
          {shifts
            // .sort((a, b) => a.number - b.number)
            .map((item) => {
              return (
                <TextButton
                  key={item.id}
                  text={String(item.name)}
                  size="small"
                  openEditing={() =>
                    dispatch(
                      uiActions.openModal({
                        modalName: 'addSubject',
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

export default SubjectModule;
