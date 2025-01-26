import Flex from '@components/Flex';
import TextButton from '@components/TextButton';
import { Title } from '@components/Title';
import React, { useEffect, useState } from 'react';
import Portal from '@components/Portal';
import { AddingTeacherModal } from '@components/Modal/ModalViews/AddingTeacherModal';
import { Backdrop } from '@components/Modal/ModalStyles';
import { AddingClassModal } from '@components/Modal/ModalViews/AddingClassModal';
import ActionButton from '@components/ActionButton';
import AccountButton from '@components/AccountButton';
import { AddingAuditoryModal } from '@components/Modal/ModalViews/AddingAuditoryModal';
import StudyPlanButton from '@components/StudyPlanButton';
import { AddingSubjectModal } from '@components/Modal/ModalViews/AddingSubjectModal';
import TextButtonWithLabel from '@components/TextButtonWithLabel';
import {
  requestAllRoom,
  requestAllCoaches,
  requestAllGroups,
  requestAllSubjects,
  requestAllTeacher,
  requestCreateRoom,
  requestCreateCoach,
  requestCreateCoachLessons,
  requestCreateGroup,
  requestCreateSubjects,
  requestCreateTeacher,
  requestUpdateRoom,
  requestUpdateCoach,
  requestUpdateGroup,
  requestUpdateSubjects,
  requestUpdateTeacher,
  requestAllCoachLessons,
  requestAllAccounts,
  requestCreateAccounts,
  requestUpdateAccounts,
  requestDeleteTeacher,
  requestDeleteCoachLessons,
  requestDeleteSubjects,
  requestDeleteCoach,
  requestDeleteRoom,
  requestDeleteGroup,
  requestDeleteAccounts,
  requestAllLessonTimes,
  requestCreateLessonTimes,
  requestDeleteLessonTimes,
  requestUpdateLessonTimes,
} from '@lib/api';
import { formatAuditories } from '@lib/utils/data/formatAuditories';
import { formatTeachers } from '@lib/utils/data/formatTeacher';
import { formatGroups } from '@lib/utils/data/formatGroup';
import { formatSubjects } from '@lib/utils/data/formatSubjects';
import { formatCoachings } from '@lib/utils/data/formatCoachings';
import { formatCoachLessons } from '@lib/utils/data/formatCoachLessons';
import ContentLoader from '@components/ContentLoader';
import { removeDuplicates } from '@lib/utils/removeDublicates';
import { formatAccounts } from '@lib/utils/data/formatAccounts';
import { formatCoachingsUpdate } from '@lib/utils/data/formatCoachingsUpdate';
import styled from 'styled-components';
import { formatFullName } from '@lib/utils/formatFullName';
import toast from 'react-hot-toast';
import axios from 'axios';
import { GenerateModal } from '@components/Modal/ModalViews/GenerateModal';
import { AddingLessonTimesModal } from '@components/Modal/ModalViews/AddingLessonTimesModal';
import { convertUtcToMsk } from '@lib/utils/convertTime';
import {
  TeacherItem,
  ClassItem,
  AuditoryItem,
  SubjectItem,
  LessonTime,
  Item,
  StudyPlan,
} from '../../type/studyPlan';
import { Navigate, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { uiSelectors } from '@store/ui';
import { showErrorNotification } from '@lib/utils/notification';

const Wrapper = styled(Flex)`
  background-color: #fff;
  flex-direction: column;
  border-radius: 10px;
  padding: 40px 35px;
`;

export const StyledButton = styled.button<{
  $isActive?: boolean;
}>`
  background: ${(props) => (props.$isActive ? '#8348F1' : '#641aee')};
  border: 2px solid ${(props) => (props.$isActive ? '#8348F1' : '#641aee')};
  color: #fff;
  padding: 10px 47px;
  border-radius: 12px;
  font-size: 18px;
  cursor: pointer;
`;

const EducationPage: React.FC = () => {
  const user = useSelector(uiSelectors.getUser);
  const navigate = useNavigate();
  const [isServerLive, setIsServerLive] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isTeacherModalOpen, setIsTeacherModalOpen] = useState(false);
  const [isLessonTimeModalOpen, setIsLessonTimeModalOpen] = useState(false);
  const [isClassModalOpen, setIsClassModalOpen] = useState(false);
  const [isAuditoryModalOpen, setIsAuditoryModalOpen] = useState(false);
  const [isSubjectModalOpen, setIsSubjectModalOpen] = useState(false);
  const [isGeneratingModalOpen, setIsGeneratingModalOpen] = useState(false);
  const [areLessonTimesLoading, setAreLessonTimesLoading] = useState(false);
  const [areTeachersLoading, setAreTeachersLoading] = useState(false);
  const [areClassesLoading, setAreClassesLoading] = useState(false);
  const [areAuditoriesLoading, setAreAuditoriesLoading] = useState(false);
  const [areSubjectsLoading, setAreSubjectsLoading] = useState(false);
  const [areAccountsLoading, setAreAccountsLoading] = useState(false);
  const [teacherEditValue, setTeacherEditValue] = useState<null | TeacherItem>(
    null,
  );
  const [classEditValue, setClassEditValue] = useState<null | ClassItem>(null);
  const [auditoryEditValue, setAuditoryEditValue] =
    useState<null | AuditoryItem>(null);
  const [subjectEditValue, setSubjectEditValue] = useState<null | SubjectItem>(
    null,
  );
  const [lessonTimeEditValue, setLessonTimeEditValue] =
    useState<null | LessonTime>(null);
  const [initialTeachers, setInitialTeachers] = useState<TeacherItem[]>([]);
  const [teachers, setTeachers] = useState<TeacherItem[]>([]);
  const [initialClasses, setInitialClasses] = useState<ClassItem[]>([]);
  const [classes, setClasses] = useState<ClassItem[]>([]);
  const [initialAuditories, setInitialAuditories] = useState<AuditoryItem[]>(
    [],
  );
  const [auditories, setAuditories] = useState<AuditoryItem[]>([]);
  const [initialAccounts, setInitialAccounts] = useState<Item[]>([]);
  const [accounts, setAccounts] = useState<Item[]>([]);
  const [initialLessonTimes, setInitialLessonTimes] = useState<LessonTime[]>(
    [],
  );
  const [lessonTimes, setLessonTimes] = useState<LessonTime[]>([]);

  const [initialSubjects, setInitialSubjects] = useState<SubjectItem[]>([]);
  const [subjects, setSubjects] = useState<SubjectItem[]>([]);

  const [serverCoachLessons, setServerCoachLessons] = useState<
    {
      ID: number;
      CreatedAt: string;
      UpdatedAt: string;
      TeacherID: number;
      CoachingID: number;
    }[]
  >([]);

  const [serverCoach, setServerCoach] = useState<
    {
      CreatedAt: string;
      UpdatedAt: string;
      DeletedAt: null;
      ID: number;
      SubjectID: number;
      Hours: number;
      depends_on: [];
      RoomID: number;
      GroupID: number;
    }[]
  >([]);

  const [serverStudyPlan, setServerStudyPlan] = useState<StudyPlan[]>([]);
  const [initialStudyPlan, setInitialStudyPlan] = useState<StudyPlan[]>([
    ...(() => {
      const initSubjects: StudyPlan[][] = [];
      subjects.forEach((subject, index) => {
        initSubjects.push(
          classes.map((classItem, index2) => ({
            classId: classItem.id,
            subjectId: subject.id,
            value: 0,
            id: index + 1 + (index2 + index + 1),
          })),
        );
      });
      return initSubjects.flat();
    })(),
  ]);
  const [studyPlan, setStudyPlan] = useState<StudyPlan[]>([
    ...(() => {
      const initSubjects: StudyPlan[][] = [];
      subjects.forEach((subject, index) => {
        initSubjects.push(
          classes.map((classItem, index2) => ({
            classId: classItem.id,
            subjectId: subject.id,
            value: 0,
            id: index + 1 + (index2 + index + 1),
          })),
        );
      });
      return initSubjects.flat();
    })(),
  ]);

  useEffect(() => {
    const getStatus = async () => {
      try {
        const res = await axios.get(
          'https://puzzlesignlanguage.online/status',
          {
            headers: {
              'Content-Type': 'application/json',
            },
          },
        );
        if (
          Math.floor(res.status / 100) === 2 ||
          Math.floor(res.status / 100) === 3
        ) {
          setIsServerLive(true);
        } else {
          setIsServerLive(false);
        }
      } catch (e) {
        setIsServerLive(false);
      }
    };
    (async () => await getStatus())();
    const inter = setInterval(getStatus, 10000);
    return () => clearInterval(inter);
  }, []);

  useEffect(() => {
    (async () => {
      setAreTeachersLoading(true);
      setAreClassesLoading(true);
      setAreSubjectsLoading(true);
      setAreAuditoriesLoading(true);
      setAreAccountsLoading(true);
      setAreLessonTimesLoading(true);
      try {
        const res = await requestAllAccounts();
        const newAccounts = res.message.map((el) => ({
          id: el.ID,
          name: el.name,
        }));
        setAccounts(newAccounts);
        setInitialAccounts(newAccounts);
        setAreAccountsLoading(false);
        const resAuditories = await requestAllRoom();
        const newAuditories = resAuditories.message
          .filter((el) => el.ID !== 666)
          .map((el) => ({
            id: el.ID,
            capacity: el.Capacity,
            name: el.Name,
            accounts: newAccounts.filter((acc) => acc.id === el.profileID),
          }))
          .filter((el) => el.id !== 666);
        setAuditories(newAuditories);
        setInitialAuditories(newAuditories);
        setAreAuditoriesLoading(false);

        const resGroups = await requestAllGroups();
        const newClasses = resGroups.message.map((el) => ({
          id: el.ID,
          name: el.Name,
          shift: el.Shift as 1 | 2,
          schoolWeek: 5 as 5 | 6,
          count: el.Count,
          account: newAccounts.find((acc) => acc.id === el.ProfileID) || null,
        }));
        setClasses(newClasses);
        setInitialClasses(newClasses);
        setAreClassesLoading(false);
        const resLessonTimes = await requestAllLessonTimes();
        setLessonTimes(
          resLessonTimes.message.map(({ ID, StartTime, EndTime }) => ({
            ID,
            StartTime,
            EndTime,
          })),
        );
        setInitialLessonTimes(
          resLessonTimes.message.map(({ ID, StartTime, EndTime }) => ({
            ID,
            StartTime,
            EndTime,
          })),
        );
        const resTeachers = await requestAllTeacher();
        const resSubjects = await requestAllSubjects();
        const resCoaches = await requestAllCoaches();
        setServerCoach(resCoaches.message);
        const resCoachLessons = await requestAllCoachLessons();
        setServerCoachLessons(resCoachLessons.message);
        const newTeachers = resTeachers.message.map((el) => ({
          id: el.ID,
          surName: el.Fullname.split(' ')[0] || '',
          firstName: el.Fullname.split(' ')[1] || '',
          lastName: el.Fullname.split(' ')[2] || '',
          name: el.Fullname,
          hours: 0,
          subjects: [],
        }));
        const newSubjects = resSubjects.message.map((subject) => ({
          id: subject.ID,
          name: subject.Name,
          room: (() => {
            const room = newAuditories.find((item) =>
              resCoaches.message.find((coach) => coach.RoomID === item.id),
            );
            if (!room) return null;
            return {
              name: room.name,
              id: room.id,
              capacity: room.capacity,
              accounts: [],
            };
          })(),
          time:
            resCoaches.message.find((coach) => coach.SubjectID === subject.ID)
              ?.Hours || 0,
          teacher: removeDuplicates(
            resCoachLessons.message
              .filter((cl) => {
                return resCoaches.message.find(
                  (coach) =>
                    subject.ID === coach.SubjectID &&
                    cl.CoachingID === coach.ID,
                );
              })
              .map((cl) => cl.TeacherID)
              .map((el) => newTeachers.find((item) => item.id === el))
              .flat()
              .filter((t) => !!t),
          ),
          type: 'practice' as 'practice' | 'lecture',
          dependsOn: [] as [],
        }));
        setSubjects(newSubjects);
        setInitialSubjects(newSubjects);
        const updatedTeachers = newTeachers.map((teacher) => ({
          ...teacher,
          subjects: newSubjects.filter((subject) =>
            subject.teacher.find((t) => t.id === teacher.id),
          ),
        }));
        setTeachers(updatedTeachers);
        setInitialTeachers(updatedTeachers);
        setAreTeachersLoading(false);
        setServerStudyPlan(
          resCoaches.message.map((coach) => ({
            subjectId: coach.SubjectID,
            classId: coach.GroupID,
            id: coach.ID,
            value: coach.Hours,
          })),
        );
        const studyPlan = resSubjects.message
          .map((subject, index2) => {
            const res: StudyPlan[] = [];
            resGroups.message.forEach((group, index1) =>
              res.push({
                subjectId: subject.ID,
                classId: group.ID,
                id:
                  resCoaches.message.find(
                    (coach) =>
                      coach.GroupID === group.ID &&
                      coach.SubjectID === subject.ID,
                  )?.ID || new Date().getTime() + index1 + index2 + index1 + 2,
                value:
                  resCoaches.message.find(
                    (coach) =>
                      coach.GroupID === group.ID &&
                      coach.SubjectID === subject.ID,
                  )?.Hours || 0,
              }),
            );
            return res;
          })
          .flat();

        setStudyPlan(studyPlan);
        setInitialStudyPlan(studyPlan);
      } catch (e) {
        toast.error(e as string);
      } finally {
        setAreLessonTimesLoading(false);
        setAreSubjectsLoading(false);
        setAreTeachersLoading(false);
        setAreAuditoriesLoading(false);
        setAreAccountsLoading(false);
        setAreClassesLoading(false);
      }
    })();
  }, []);

  const closeAllModals = () => {
    setTeacherEditValue(null);
    setClassEditValue(null);
    setAuditoryEditValue(null);
    setSubjectEditValue(null);
    setLessonTimeEditValue(null);
    setIsTeacherModalOpen(false);
    setIsClassModalOpen(false);
    setIsAuditoryModalOpen(false);
    setIsSubjectModalOpen(false);
    setIsGeneratingModalOpen(false);
    setIsLessonTimeModalOpen(false);
  };

  const handleAddTeacher = async (newItem: TeacherItem) => {
    setTeacherEditValue(null);
    setTeachers((prevItems) => [
      ...prevItems.filter((el) => el.id !== newItem.id),
      {
        ...newItem,
        name: formatFullName(
          newItem.surName,
          newItem.firstName,
          newItem.lastName,
        ),
      },
    ]);
    const formattedSubjects = removeDuplicates([
      ...subjects.filter(
        (subject) => !(subject.teacher && newItem.id === subject.teacher[0].id),
      ),
      ...newItem.subjects.map((subject) => ({
        ...subject,
        teacher: [
          {
            ...newItem,
            subjects: [],
            name: formatFullName(
              newItem.surName,
              newItem.firstName,
              newItem.lastName,
            ),
          },
        ],
        dependsOn: [] as [],
      })),
    ]);
    setSubjects(formattedSubjects);

    setStudyPlan((prev) => [
      ...prev.filter((studyItem) =>
        formattedSubjects.map((el) => el.id).includes(studyItem.subjectId),
      ),
    ]);

    setStudyPlan((prev) => [
      ...prev,
      ...newItem.subjects
        .filter((el) => !studyPlan.map((i) => i.subjectId).includes(el.id))
        .map((subject, index2) => {
          const items: StudyPlan[] = [];
          items.push(
            ...classes.map((el, index) => ({
              classId: el.id,
              subjectId: subject.id,
              value: 0,
              id: new Date().getTime() + index + index2 + index2 + 2,
            })),
          );
          return items;
        })
        .flat(),
    ]);
    closeAllModals();
  };

  const handleAddClass = async (newItem: ClassItem) => {
    if (!newItem.account) {
      toast('Введите профиль!');
      return;
    }
    if (classEditValue) {
      setClasses((prevItems) => [
        ...prevItems.filter((el) => el.id !== newItem.id),
      ]);
      setClassEditValue(null);
    }
    setClasses((prevItems) => [...prevItems, newItem]);
    if (!classEditValue)
      setStudyPlan((prev) => [
        ...prev,
        ...subjects.map((subject, index) => ({
          classId: newItem.id,
          subjectId: subject.id,
          value: 0,
          id: new Date().getTime() + index,
        })),
      ]);
    closeAllModals();
  };

  const handleAddAuditory = async (newItem: AuditoryItem) => {
    if (auditoryEditValue) {
      setAuditories((prevItems) => [
        ...prevItems.filter((el) => el.id !== newItem.id),
      ]);
      setAuditoryEditValue(null);
    }

    setAuditories((prevItems) => [...prevItems, newItem]);
    closeAllModals();
  };

  const handleAddLessonTime = async (newItem: LessonTime) => {
    if (lessonTimeEditValue) {
      setLessonTimes((prevItems) => [
        ...prevItems.filter((el) => el.ID !== newItem.ID),
      ]);
      setLessonTimeEditValue(null);
    }

    setLessonTimes((prevItems) => [...prevItems, newItem]);
    closeAllModals();
  };

  const handleAddSubject = (newItem: SubjectItem) => {
    setTeachers((prev) =>
      prev.map((el) =>
        !newItem.teacher || newItem.teacher[0].id !== el.id
          ? el
          : {
              ...el,
              subjects: [
                ...el.subjects.filter((sub) => sub.id !== newItem.id),
                newItem,
              ],
            },
      ),
    );
    setSubjects((prevItems) => [
      ...prevItems.filter((el) => el.id !== newItem.id),
      newItem,
    ]);
    if (!subjectEditValue) {
      setStudyPlan((prev) => [
        ...prev,
        ...classes.map((el, index) => ({
          classId: el.id,
          subjectId: newItem.id,
          value: 0,
          id: new Date().getTime() + index,
        })),
      ]);
    }
    closeAllModals();
  };

  if (!user) {
    sessionStorage.removeItem('token');
    return <Navigate to={'/login'} />;
  }

  return (
    <Wrapper>
      <h1 style={{ fontSize: 32 }}></h1>
      {isTeacherModalOpen && (
        <Portal elementId="overlay">
          <Backdrop />
          <AddingTeacherModal
            handleDelete={(id) => {
              setTeachers((prev) => prev.filter((el) => el.id !== id));
              setSubjects((prev) =>
                prev.filter(
                  (el) =>
                    !el.teacher ||
                    !el.teacher.length ||
                    el.teacher[0].id !== id,
                ),
              );

              setStudyPlan((prev) =>
                prev.filter(
                  (el) =>
                    !subjects
                      .filter(
                        (sub) =>
                          sub.teacher &&
                          sub.teacher.length &&
                          sub.teacher[0].id === id,
                      )
                      .find((item) => item.id === el.subjectId),
                ),
              );
              closeAllModals();
            }}
            initValue={teacherEditValue}
            onConfirm={handleAddTeacher}
            hideModal={closeAllModals}
            auditories={auditories.filter((el) => el.id !== 666)}
          />
        </Portal>
      )}
      {isClassModalOpen && (
        <Portal elementId="overlay">
          <Backdrop />
          <AddingClassModal
            handleDelete={(id) => {
              setClasses((prev) => prev.filter((el) => el.id !== id));
              setStudyPlan((prev) => prev.filter((el) => el.classId !== id));
              closeAllModals();
            }}
            accounts={accounts}
            initValue={classEditValue}
            onConfirm={handleAddClass}
            hideModal={closeAllModals}
          />
        </Portal>
      )}
      {isAuditoryModalOpen && (
        <Portal elementId="overlay">
          <Backdrop />
          <AddingAuditoryModal
            handleDelete={(id) => {
              setAuditories((prev) => prev.filter((el) => el.id !== id));
              setSubjects((prev) => [
                ...prev.filter((el) => el.room?.id !== id),
                ...prev
                  .filter((el) => el.room && el.room.id === id)
                  .map((el) => ({
                    ...el,
                    room: null,
                  })),
              ]);
              closeAllModals();
            }}
            accounts={accounts}
            initValue={auditoryEditValue}
            onConfirm={handleAddAuditory}
            hideModal={closeAllModals}
          />
        </Portal>
      )}
      {isSubjectModalOpen && (
        <Portal elementId="overlay">
          <Backdrop />
          <AddingSubjectModal
            auditories={auditories.filter((el) => el.id !== 666)}
            handleDelete={(id) => {
              setSubjects((prev) => prev.filter((el) => el.id !== id));
              setTeachers((prev) =>
                prev.map((el) => ({
                  ...el,
                  subjects: el.subjects.filter((sub) => sub.id !== id),
                })),
              );
              setStudyPlan((prev) => prev.filter((el) => el.subjectId !== id));
              closeAllModals();
            }}
            teachers={teachers}
            initValue={subjectEditValue}
            onConfirm={handleAddSubject}
            hideModal={closeAllModals}
          />
        </Portal>
      )}
      {isLessonTimeModalOpen && (
        <Portal elementId="overlay">
          <Backdrop />
          <AddingLessonTimesModal
            handleDelete={(id) => {
              setLessonTimes((prev) => prev.filter((el) => el.ID !== id));
              closeAllModals();
            }}
            initValue={lessonTimeEditValue}
            onConfirm={handleAddLessonTime}
            hideModal={closeAllModals}
          />
        </Portal>
      )}
      {isGeneratingModalOpen && (
        <Portal elementId="overlay">
          <Backdrop />
          <GenerateModal
            handleGenerate={async (start, end) => {
              if (!start || !end) {
                toast.error('Необходимо ввести начальную и конечную даты.');
                return;
              }
              try {
                await fetch('https://puzzlesignlanguage.online/generate', {
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  method: 'POST',
                  body: JSON.stringify({
                    start_date: convertUtcToMsk(start.toISOString()),
                    end_date: convertUtcToMsk(end.toISOString()),
                  }),
                });
                toast.success('Расписание сгенерировано успешно!');
                closeAllModals();
              } catch (error) {
                toast.error('Не удалось сгенерировать ' + `(${error})`);
              }
            }}
            hideModal={() => setIsGeneratingModalOpen(false)}
          />
        </Portal>
      )}
      <Flex>
        <Flex flex="1" direction="column">
          <Title>Профили {accounts.length ? `(${accounts.length})` : ''}</Title>
          {areAccountsLoading && <ContentLoader size={32} />}
          {!areAccountsLoading && (
            <>
              <Flex
                style={{
                  marginBottom: 11,
                  display: 'flex',
                  flexDirection: 'column',
                  maxHeight: 'calc(2.5 * 42px + 2 * 11px)',
                  overflowY: 'auto',
                  alignContent: 'start',
                }}
                justify="start"
                basis="100%"
                gap="11px"
              >
                {accounts
                  .sort((a, b) => a.id - b.id)
                  .map((item) => (
                    <AccountButton
                      handleDelete={() => {
                        setAccounts((prev) =>
                          prev.filter((el) => el.id !== item.id),
                        );
                        setClasses((prev) =>
                          prev.map((el) => ({
                            ...el,
                            account:
                              el.account?.id === item.id ? null : el.account,
                          })),
                        );
                        setAuditories((prev) =>
                          prev.map((el) => ({
                            ...el,
                            accounts: el.accounts
                              .map((acc) => (acc.id === item.id ? null : acc))
                              .filter((el) => !!el),
                          })),
                        );
                      }}
                      key={item.id}
                      text={item.name}
                      size="large"
                      setText={(newText) =>
                        setAccounts((prev) => [
                          ...prev.filter((el) => el.id !== item.id),
                          { ...item, name: newText },
                        ])
                      }
                    />
                  ))}
              </Flex>
              <ActionButton
                size="large"
                handleClick={() =>
                  setAccounts((prev) => [
                    ...prev,
                    { name: 'Название', id: new Date().getTime() },
                  ])
                }
              />
            </>
          )}
        </Flex>
        <Flex flex="2" direction="column" gap="8px" align="start">
          <Title action={() => setIsAuditoryModalOpen(true)}>Аудитории</Title>
          {areAuditoriesLoading && <ContentLoader size={32} />}
          {!areAuditoriesLoading && (
            <Flex
              wrap="wrap"
              style={{
                display: 'flex',
                flexDirection: 'column',
                maxHeight: 'calc(2 * 42px + 1 * 11px)',
                overflowX: 'auto',
                alignContent: 'start',
                width: '100%',
              }}
              justify="start"
              basis="24%"
              gap="11px"
            >
              {auditories
                .sort((a, b) => a.id - b.id)
                .filter((el) => el.id !== 666)
                .map((item) => (
                  <TextButton
                    key={item.id}
                    text={item.name}
                    size="large"
                    openEditing={() => {
                      setIsAuditoryModalOpen(true);
                      setAuditoryEditValue(item);
                    }}
                  />
                ))}
            </Flex>
          )}
        </Flex>
      </Flex>
      <Title action={() => setIsClassModalOpen(true)}>Классы</Title>
      {areClassesLoading && (
        <Flex align="start">
          <ContentLoader size={32} />
        </Flex>
      )}
      {!areClassesLoading && (
        <Flex
          wrap="wrap"
          style={{
            display: 'flex',
            flexDirection: 'column',
            maxHeight: 'calc(3 * 42px + 2 * 11px)',
            overflowX: 'auto',
            alignContent: 'start',
          }}
          justify="start"
          basis="24%"
          gap="11px"
        >
          {classes
            .sort((a, b) => a.id - b.id)

            .map((item) => (
              <TextButton
                key={item.id}
                text={item.name}
                size="small"
                openEditing={() => {
                  setIsClassModalOpen(true);
                  setClassEditValue(item);
                }}
              />
            ))}
        </Flex>
      )}

      <Title action={() => setIsTeacherModalOpen(true)}>Учителя</Title>
      {areTeachersLoading && (
        <Flex align="start">
          <ContentLoader size={32} />
        </Flex>
      )}
      {!areTeachersLoading && (
        <Flex
          wrap="wrap"
          style={{
            display: 'flex',
            flexDirection: 'column',
            maxHeight: 'calc(4 * 42px + 3 * 11px)',
            overflowX: 'auto',
            alignContent: 'start',
          }}
          justify="start"
          basis="24%"
          gap="11px"
        >
          {teachers
            .sort((a, b) => a.id - b.id)
            .map((item) => (
              <TextButton
                key={item.id}
                text={item.name}
                size="large"
                openEditing={() => {
                  setIsTeacherModalOpen(true);
                  setTeacherEditValue(item);
                }}
              />
            ))}
        </Flex>
      )}

      <Title>Учебный план</Title>

      {!areSubjectsLoading && (
        <>
          <Flex
            direction="column"
            gap="7px"
            style={{ width: 'fit-content', position: 'relative' }}
          >
            <Flex gap="7px">
              <StudyPlanButton
                text={'Дисциплина\\Класс'}
                size="large"
                isActive
              />
              {classes.map((el) => (
                <TextButton
                  isActive
                  style={{ flex: 1 }}
                  text={el.name}
                  size="fullSize"
                  openEditing={() => {
                    setIsClassModalOpen(true);
                    setClassEditValue(el);
                  }}
                />
              ))}
            </Flex>
            <Flex direction="column" gap="7px">
              {subjects
                .sort((a, b) => a.id - b.id)
                .map((subject) => (
                  <Flex gap="7px" key={subject.id}>
                    <TextButton
                      textSize="small"
                      isActive
                      style={{
                        flex: 10,
                        backgroundColor:
                          subject.type === 'practice' ? '#8348F1' : '#641AEE',
                      }}
                      text={
                        subject.name +
                        (() => {
                          const teacher = teachers.find((teacher) =>
                            teacher.subjects
                              .map((el) => el.id)
                              .includes(
                                (studyPlan.find(
                                  (item) => item.subjectId === subject.id,
                                )?.subjectId as number) || 0,
                              ),
                          );
                          return ` (${teacher?.name || 'Не выбран'})`;
                        })()
                      }
                      size="large"
                      openEditing={() => {
                        setIsSubjectModalOpen(true);
                        setSubjectEditValue(subject);
                      }}
                    />
                    {classes
                      .sort((a, b) => a.id - b.id)
                      .map((el) => (
                        <TextButtonWithLabel
                          id={(() => {
                            const val = studyPlan.find(
                              (item) =>
                                item.classId === el.id &&
                                item.subjectId === subject.id,
                            );
                            if (!val) return undefined;
                            return val.id;
                          })()}
                          key={el.id}
                          label="ак. ч"
                          setText={(n) => {
                            const val = studyPlan.find(
                              (item) =>
                                item.classId === el.id &&
                                item.subjectId === subject.id,
                            );
                            if (!val) {
                              setStudyPlan((prev) => [
                                ...prev,
                                {
                                  classId: el.id,
                                  subjectId: subject.id,
                                  value: 0,
                                  isActive: false,
                                  id: new Date().getTime(),
                                },
                              ]);
                              return;
                            }
                            let newVal = 0;
                            if (n === '' || /^[0-9]*$/.test(n)) {
                              newVal = n === '' ? 0 : Number(n);
                            } else {
                              return;
                            }
                            setStudyPlan((prev) => [
                              ...prev.filter(
                                (p) =>
                                  !(
                                    p.classId === val.classId &&
                                    p.subjectId === val.subjectId
                                  ),
                              ),
                              { ...val, value: newVal },
                            ]);
                          }}
                          text={
                            studyPlan.find(
                              (item) =>
                                item.classId === el.id &&
                                item.subjectId === subject.id,
                            )?.value + ''
                          }
                        />
                      ))}
                  </Flex>
                ))}
              <Flex gap="7px">
                <StudyPlanButton
                  textSize="small"
                  text={`Все дисциплины (${subjects.length})`}
                  size="large"
                  isActive
                />
                {classes.map((el) => (
                  <TextButton
                    textSize="small"
                    style={{ flex: 1 }}
                    key={el.id}
                    text={
                      studyPlan
                        .filter((item) => item.classId === el.id)
                        .reduce((prev, cur) => prev + cur.value, 0) + ' ак. ч'
                    }
                    size="fullSize"
                    openEditing={() => {}}
                  />
                ))}
              </Flex>
            </Flex>
          </Flex>
          <ActionButton
            style={{ marginTop: 7 }}
            size="large"
            handleClick={() => setIsSubjectModalOpen(true)}
          />
        </>
      )}
      <Flex flex="2" direction="column" gap="8px" align="start">
        <Title action={() => setIsLessonTimeModalOpen(true)}>Время урока</Title>
        {areLessonTimesLoading && <ContentLoader size={32} />}
        {!areLessonTimesLoading && (
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
            {lessonTimes
              .sort(
                (a, b) =>
                  Number(a.StartTime.split(':')[0]) * 60 +
                  Number(a.StartTime.split(':')[1]) -
                  Number(b.StartTime.split(':')[0]) * 60 +
                  Number(b.StartTime.split(':')[1]),
              )
              .filter((el) => el.ID !== 666)
              .map((item) => {
                console.log(item);
                return (
                  <TextButton
                    key={item.ID}
                    text={`${item.StartTime} – ${item.EndTime}`}
                    size="large"
                    openEditing={() => {
                      setIsLessonTimeModalOpen(true);
                      setLessonTimeEditValue(item);
                    }}
                  />
                );
              })}
          </Flex>
        )}
      </Flex>
      <Flex gap="16px" justify="end" align="center" $top="large">
        <StyledButton
          $isActive
          disabled={!isServerLive}
          style={
            isServerLive
              ? { backgroundColor: '#35c452', borderColor: '#35c452' }
              : {
                  backgroundColor: '#f0414c',
                  borderColor: '#f0414c',
                  cursor: 'default',
                }
          }
          onClick={async () => {
            try {
              await fetch('https://puzzlesignlanguage.online/xlsx_download', {
                headers: {
                  'Content-Type': 'application/json',
                },
                method: 'GET',
              })
                .then((resp) =>
                  resp.status === 200
                    ? resp.blob()
                    : Promise.reject('Возникла неизвестная ошибка...'),
                )
                .then((blob) => {
                  const url = window.URL.createObjectURL(blob);
                  const a = document.createElement('a');
                  a.style.display = 'none';
                  a.href = url;
                  a.download = 'Расписание.xlsx';
                  document.body.appendChild(a);
                  a.click();
                  window.URL.revokeObjectURL(url);
                  toast.success('Файл успешно скачен!');
                })
                .catch(() => toast.error('Не удалось скачать!'));
            } catch (error) {
              toast.error('Не удалось скачать ' + `(${error})`);
            }
          }}
        >
          Скачать
        </StyledButton>
        <StyledButton
          disabled={!isServerLive}
          style={
            isServerLive
              ? { backgroundColor: '#35c452', borderColor: '#35c452' }
              : {
                  backgroundColor: '#f0414c',
                  borderColor: '#f0414c',
                  cursor: 'default',
                }
          }
          $isActive
          onClick={() => setIsGeneratingModalOpen(true)}
        >
          Сгенерировать
        </StyledButton>
        <StyledButton
          $isActive={false}
          onClick={async () => {
            setIsLoading(true);
            const subjectsErrors: SubjectItem[] = [];
            const groupsErrors: ClassItem[] = [];
            subjects.forEach((el) => {
              if (!el.teacher || !el.teacher.length) subjectsErrors.push(el);
            });
            if (subjectsErrors.length) {
              toast.error(
                `Необходимо прикрепить учителя к следующим предметам: ${subjectsErrors.map((el) => el.name).join(', ')}`,
                {
                  duration: 6500,
                },
              );
              setIsLoading(false);
              return;
            }

            classes.forEach((el) => {
              if (!el.account) groupsErrors.push(el);
            });
            if (groupsErrors.length) {
              toast.error(
                `Необходимо прикрепить профиль к следующим группам: ${groupsErrors.map((el) => el.name).join(', ')}`,
              );
              setIsLoading(false);

              return;
            }

            if (!user) {
              showErrorNotification('Вы не авторизованы!');
              return navigate('/login');
            }

            if (!('education_id' in user)) {
              showErrorNotification('У вас другая категория аккаунтов!');
              return navigate('/login');
            }

            if (!user.education_id) {
              showErrorNotification('Неизвестная ошибка!');
              return navigate('/login');
            }

            try {
              if (!initialAuditories.map((el) => el.id).includes(666)) {
                await requestCreateRoom(
                  [
                    {
                      capacity: 0,
                      id: 666,
                      name: 'ПУСТОТА',
                      profiles: [],
                    },
                  ],
                  user.education_id,
                );
              }
              await requestCreateAccounts(
                formatAccounts(
                  accounts.filter(
                    (el) => !initialAccounts.find((acc) => acc.id === el.id),
                  ),
                ),
                user.education_id,
              );
              localStorage.setItem('accounts', JSON.stringify(accounts));

              await requestCreateTeacher(
                formatTeachers(
                  teachers.filter(
                    (el) => !initialTeachers.find((item) => item.id === el.id),
                  ),
                ),
                user.education_id,
              );
              localStorage.setItem('teachers', JSON.stringify(teachers));

              //

              await requestCreateGroup(
                formatGroups(
                  classes.filter(
                    (el) => !initialClasses.find((item) => item.id === el.id),
                  ),
                ),
                user.education_id,
              );
              localStorage.setItem('classes', JSON.stringify(classes));

              //

              await requestCreateRoom(
                formatAuditories(
                  auditories.filter(
                    (el) =>
                      !initialAuditories.find((item) => item.id === el.id),
                  ),
                ),
                user.education_id,
              );
              localStorage.setItem('auditories', JSON.stringify(auditories));

              //

              await requestCreateSubjects(
                formatSubjects(
                  subjects.filter(
                    (el) => !initialSubjects.find((item) => item.id === el.id),
                  ),
                ),
                user.education_id,
              );
              localStorage.setItem('subjects', JSON.stringify(subjects));

              const formatPlan = formatCoachings(
                subjects,
                studyPlan.filter(
                  (el) => !serverStudyPlan.find((item) => item.id === el.id),
                ),
              );

              await requestCreateCoach(formatPlan, user.education_id);
              localStorage.setItem('studyPlan', JSON.stringify(studyPlan));

              const coaches = serverCoach.map((el) => ({
                RoomID: el.RoomID,
                groupID: el.GroupID,
                subjectID: el.SubjectID,
                hours: el.Hours,
                id: el.ID,
              }));

              const resCoaches = formatPlan.length ? formatPlan : coaches;

              formatCoachLessons(studyPlan, subjects, resCoaches).filter(
                (el) =>
                  !serverCoachLessons.find(
                    (scl) =>
                      scl.CoachingID === el.coachingID &&
                      el.teacherID === scl.TeacherID,
                  ),
              );

              await requestCreateCoachLessons(
                formatCoachLessons(studyPlan, subjects, resCoaches).filter(
                  (el) =>
                    !serverCoachLessons.find(
                      (scl) =>
                        scl.CoachingID === el.coachingID &&
                        el.teacherID === scl.TeacherID,
                    ),
                ),
                user.education_id,
              );

              await requestCreateLessonTimes(
                lessonTimes.filter(
                  (el) => !initialLessonTimes.map((l) => l.ID).includes(el.ID),
                ),
                user.education_id,
              );

              //
              //
              //
              //
              //

              if (initialTeachers.length) {
                const formatedTeachers = formatTeachers(
                  initialTeachers.filter(
                    (el) => !teachers.find((item) => item.id === el.id),
                  ),
                );
                await requestDeleteTeacher(formatedTeachers, user.education_id);
                await requestDeleteCoachLessons(
                  serverCoachLessons
                    .filter((el) =>
                      formatedTeachers.find(
                        (teacher) => teacher.id === el.TeacherID,
                      ),
                    )
                    .map((el) => ({
                      coachingID: el.CoachingID,
                      teacherID: el.TeacherID,
                      id: el.ID,
                    })),
                  user.education_id,
                );
              }

              if (initialAuditories.length) {
                const formatedAuditories = formatAuditories(
                  initialAuditories.filter(
                    (el) => !auditories.find((item) => item.id === el.id),
                  ),
                );
                await requestDeleteRoom(formatedAuditories, user.education_id);
              }

              if (initialSubjects.length) {
                const formatedSubjects = formatSubjects(
                  initialSubjects.filter(
                    (el) => !subjects.find((item) => item.id === el.id),
                  ),
                );
                const formatedCoaches = formatCoachingsUpdate(
                  subjects,
                  serverStudyPlan.filter(
                    (el) => !studyPlan.find((item) => item.id === el.id),
                  ),
                );
                await requestDeleteSubjects(
                  formatedSubjects,
                  user.education_id,
                );
                await requestDeleteCoach(formatedCoaches, user.education_id);
                await requestDeleteCoachLessons(
                  serverCoachLessons
                    .filter((el) =>
                      formatedCoaches.find(
                        (coach) => coach.id === el.CoachingID,
                      ),
                    )
                    .map((el) => ({
                      coachingID: el.CoachingID,
                      teacherID: el.TeacherID,
                      id: el.ID,
                    })),
                  user.education_id,
                );
              }

              if (initialClasses.length) {
                const formatedClasses = formatGroups(
                  initialClasses.filter(
                    (el) => !classes.find((item) => item.id === el.id),
                  ),
                );
                const formatedCoaches = formatCoachingsUpdate(
                  subjects,
                  serverStudyPlan.filter(
                    (el) => !studyPlan.find((item) => item.id === el.id),
                  ),
                );
                await requestDeleteGroup(formatedClasses, user.education_id);
                await requestDeleteCoach(formatedCoaches, user.education_id);
                await requestDeleteCoachLessons(
                  serverCoachLessons
                    .filter((el) =>
                      formatedCoaches.find(
                        (coach) => coach.id === el.CoachingID,
                      ),
                    )
                    .map((el) => ({
                      coachingID: el.CoachingID,
                      teacherID: el.TeacherID,
                      id: el.ID,
                    })),
                  user.education_id,
                );
              }

              if (initialAccounts.length) {
                await requestDeleteAccounts(
                  formatAccounts(
                    initialAccounts.filter(
                      (el) => !accounts.find((item) => item.id === el.id),
                    ),
                  ),
                  user.education_id,
                );
              }
              if (initialLessonTimes.length) {
                await requestDeleteLessonTimes(
                  initialLessonTimes.filter(
                    (item) => !lessonTimes.map((l) => l.ID).includes(item.ID),
                  ),
                  user.education_id,
                );
              }
              //
              //
              //
              //
              //

              await requestUpdateAccounts(
                formatAccounts(accounts),
                user.education_id,
              );
              localStorage.setItem('accounts', JSON.stringify(accounts));

              if (initialTeachers.length)
                await requestUpdateTeacher(
                  formatTeachers(
                    teachers.filter((el) =>
                      initialTeachers.find((item) => item.id === el.id),
                    ),
                  ),
                  user.education_id,
                );
              localStorage.setItem('teachers', JSON.stringify(teachers));

              if (initialClasses.length)
                await requestUpdateGroup(
                  formatGroups(
                    classes.filter((el) =>
                      initialClasses.find((item) => item.id === el.id),
                    ),
                  ),
                  user.education_id,
                );
              localStorage.setItem('classes', JSON.stringify(classes));

              //

              if (initialAuditories.length)
                await requestUpdateRoom(
                  formatAuditories(
                    auditories.filter((el) =>
                      initialAuditories.find((item) => item.id === el.id),
                    ),
                  ),
                  user.education_id,
                );
              localStorage.setItem('auditories', JSON.stringify(auditories));

              //
              if (initialSubjects.length)
                await requestUpdateSubjects(
                  formatSubjects(
                    subjects.filter((el) =>
                      initialSubjects.find((item) => item.id === el.id),
                    ),
                  ),
                  user.education_id,
                );
              localStorage.setItem('subjects', JSON.stringify(subjects));

              //

              if (initialStudyPlan.length)
                await requestUpdateCoach(
                  formatCoachingsUpdate(
                    subjects,
                    studyPlan
                      .map((studyPlan) => {
                        const coach = coaches.find(
                          (el) =>
                            el.subjectID === studyPlan.subjectId &&
                            el.groupID === studyPlan.classId,
                        );
                        if (!coach) return null;
                        return {
                          ...studyPlan,
                          id: coach.id,
                        };
                      })
                      .filter((el) => !!el),
                  ),
                  user.education_id,
                );
              localStorage.setItem('studyPlan', JSON.stringify(studyPlan));

              await requestUpdateLessonTimes(
                lessonTimes.filter((el) =>
                  initialLessonTimes.map((l) => l.ID).includes(el.ID),
                ),
                user.education_id,
              );

              //

              toast.success('Успешно сохранено!', {});
            } catch (e) {
              toast.error(e as string);
            } finally {
              setIsLoading(false);
            }
          }}
          disabled={isLoading}
        >
          <Flex align="center" gap="10px">
            {isLoading && <ContentLoader size={16} color="#fff" />}
            Сохранить
          </Flex>
        </StyledButton>
      </Flex>
    </Wrapper>
  );
};

export default EducationPage;
