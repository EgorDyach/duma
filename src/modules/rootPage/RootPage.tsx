import Flex from "@components/Flex";
import TextButton from "@components/TextButton";
import { Title } from "@components/Title";
import React, { useEffect, useState } from "react";
import Portal from "@components/Portal";
import { AddingTeacherModal } from "@components/Modal/ModalViews/AddingTeacherModal";
import { Backdrop, StyledModalButton } from "@components/Modal/ModalStyles";
import { AddingClassModal } from "@components/Modal/ModalViews/AddingClassModal";
import ActionButton from "@components/ActionButton";
import AccountButton from "@components/AccountButton";
import { AddingAuditoryModal } from "@components/Modal/ModalViews/AddingAuditoryModal";
import StudyPlanButton from "@components/StudyPlanButton";
import { AddingSubjectModal } from "@components/Modal/ModalViews/AddingSubjectModal";
import TextButtonWithLabel from "@components/TextButtonWithLabel";
import { getDateRange, DateRange } from "@lib/utils/getDateRange";
import { DateRange as DateRangeComponent } from "@components/DateRange";
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
} from "@lib/api";
import { formatAuditories } from "@lib/utils/data/formatAuditories";

import { formatTeachers } from "@lib/utils/data/formatTeacher";
import { formatGroups } from "@lib/utils/data/formatGroup";
import { formatSubjects } from "@lib/utils/data/formatSubjects";
import { formatCoachings } from "@lib/utils/data/formatCoachings";
import { formatCoachLessons } from "@lib/utils/data/formatCoachLessons";
import ContentLoader from "@components/ContentLoader";
import { removeDuplicates } from "@lib/utils/removeDublicates";
import { formatAccounts } from "@lib/utils/data/formatAccounts";
import { formatCoachingsUpdate } from "@lib/utils/data/formatCoachingsUpdate";
//
export type Item = {
  name: string;
  id: number;
};

export type TeacherItem = Item & {
  hours: number;
  subjects: {
    name: string;
    room: AuditoryItem | null;
    id: number;
    time: number;
    type: "practice" | "lecture";
  }[];
};

export type ClassItem = Item & {
  shift: 1 | 2;
  schoolWeek: 5 | 6;
  count: number;
  account: AccountItem | null;
};

export type AuditoryItem = Item & {
  capacity: number;
  accounts: AccountItem[];
};

export type AccountItem = Item;

export type SubjectItem = Item & {
  room: AuditoryItem | null;
  teacher: TeacherItem[] | null;
  type: "practice" | "lecture";
  dependsOn: [];
};

export type StudyPlan = {
  classId: number;
  id: number;
  subjectId: number | "total";
  value: number;
};

export const RootPage: React.FC = () => {
  const [error, setError] = useState("");
  const [isTeacherModalOpen, setIsTeacherModalOpen] = useState(false);
  const [isClassModalOpen, setIsClassModalOpen] = useState(false);
  const [isAuditoryModalOpen, setIsAuditoryModalOpen] = useState(false);
  const [isSubjectModalOpen, setIsSubjectModalOpen] = useState(false);
  const [areTeachersLoading, setAreTeachersLoading] = useState(false);
  const [areClassesLoading, setAreClassesLoading] = useState(false);
  const [areAuditoriesLoading, setAreAuditoriesLoading] = useState(false);
  const [areSubjectsLoading, setAreSubjectsLoading] = useState(false);
  const [areAccountsLoading, setAreAccountsLoading] = useState(false);
  const [teacherEditValue, setTeacherEditValue] = useState<null | TeacherItem>(
    null
  );
  const [classEditValue, setClassEditValue] = useState<null | ClassItem>(null);
  const [auditoryEditValue, setAuditoryEditValue] =
    useState<null | AuditoryItem>(null);
  const [subjectEditValue, setSubjectEditValue] = useState<null | SubjectItem>(
    null
  );
  const [initialTeachers, setInitialTeachers] = useState<TeacherItem[]>([]);
  const [teachers, setTeachers] = useState<TeacherItem[]>([]);
  const [initialClasses, setInitialClasses] = useState<ClassItem[]>([]);
  const [classes, setClasses] = useState<ClassItem[]>([]);
  const [initialAuditories, setInitialAuditories] = useState<AuditoryItem[]>(
    []
  );
  const [auditories, setAuditories] = useState<AuditoryItem[]>([]);
  const [initialAccounts, setInitialAccounts] = useState<Item[]>([]);
  const [accounts, setAccounts] = useState<Item[]>([]);

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
          }))
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
          }))
        );
      });
      return initSubjects.flat();
    })(),
  ]);

  const [period, setPeriod] = useState<DateRange>("semester");

  useEffect(() => {
    (async () => {
      setAreTeachersLoading(true);
      setAreClassesLoading(true);
      setAreSubjectsLoading(true);
      setAreAuditoriesLoading(true);
      setAreAccountsLoading(true);
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
        console.log(resAuditories.message.filter((el) => el.ID !== 666));
        const newAuditories = resAuditories.message
          .filter((el) => el.ID !== 666)
          .map((el) => ({
            id: el.ID,
            capacity: el.Capacity,
            name: el.Name,
            accounts: newAccounts.filter((acc) => acc.id === el.profileID),
          }));
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
        console.log(resGroups, newClasses, newAccounts);
        setClasses(newClasses);
        setInitialClasses(newClasses);
        setAreClassesLoading(false);

        const resTeachers = await requestAllTeacher();
        const resSubjects = await requestAllSubjects();
        const resCoaches = await requestAllCoaches();
        setServerCoach(resCoaches.message);
        const resCoachLessons = await requestAllCoachLessons();
        setServerCoachLessons(resCoachLessons.message);
        const newTeachers = resTeachers.message.map((el) => ({
          id: el.ID,
          name: el.Fullname,
          hours: 0,
          subjects: [],
        }));
        const newSubjects = resSubjects.message.map((subject) => ({
          id: subject.ID,
          name: subject.Name,
          room: (() => {
            const room = resAuditories.message.find((item) =>
              resCoaches.message.find((coach) => coach.RoomID === item.ID)
            );
            if (!room) return null;
            return {
              name: room.Name,
              id: room.ID,
              capacity: room.Capacity,
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
                    subject.ID === coach.SubjectID && cl.CoachingID === coach.ID
                );
              })
              .map((cl) => cl.TeacherID)
              .map((el) => newTeachers.find((item) => item.id === el))
              .flat()
              .filter((t) => !!t)
          ),
          type: "practice" as "practice" | "lecture",
          dependsOn: [] as [],
        }));
        setSubjects(newSubjects);
        setInitialSubjects(newSubjects);
        console.log();
        const updatedTeachers = newTeachers.map((teacher) => ({
          ...teacher,
          subjects: newSubjects.filter((subject) =>
            subject.teacher.find((t) => t.id === teacher.id)
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
          }))
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
                      coach.SubjectID === subject.ID
                  )?.ID || new Date().getTime() + index1 + index2 + index1 + 2,
                value:
                  resCoaches.message.find(
                    (coach) =>
                      coach.GroupID === group.ID &&
                      coach.SubjectID === subject.ID
                  )?.Hours || 0,
              })
            );
            return res;
          })
          .flat();
        setStudyPlan(studyPlan);
        setInitialStudyPlan(studyPlan);
      } catch (e) {
        alert(e);
      } finally {
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
    setIsTeacherModalOpen(false);
    setIsClassModalOpen(false);
    setIsAuditoryModalOpen(false);
    setIsSubjectModalOpen(false);
  };

  const handleAddTeacher = async (newItem: TeacherItem) => {
    try {
      if (teacherEditValue) {
        setTeachers((prevItems) => [
          ...prevItems.filter((el) => el.id !== newItem.id),
        ]);
        setTeacherEditValue(null);
      }
      setTeachers((prevItems) => [...prevItems, newItem]);

      setSubjects((prev) => [
        ...prev.filter((el) => el.id !== newItem.id),
        ...newItem.subjects.map((subject) => ({
          ...subject,
          teacher: [newItem],
          dependsOn: [] as [],
        })),
      ]);
      if (!teacherEditValue)
        setStudyPlan((prev) => [
          ...prev,
          ...newItem.subjects
            .map((subject, index2) => {
              const items: StudyPlan[] = [];
              items.push(
                ...classes.map((el, index) => ({
                  classId: el.id,
                  subjectId: subject.id,
                  value: 0,
                  id: new Date().getTime() + index + index2 + index2 + 2,
                }))
              );
              return items;
            })
            .flat(),
        ]);
      closeAllModals();
    } catch (error) {
      alert(error);
    }
  };

  const handleAddClass = async (newItem: ClassItem) => {
    if (!newItem.account) {
      alert("Введите профиль!");
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
        {
          classId: newItem.id,
          subjectId: "total",
          id: 0,
          value: 0,
        },
      ]);
    closeAllModals();
  };

  const handleAddAuditory = async (newItem: AuditoryItem) => {
    try {
      if (auditoryEditValue) {
        setAuditories((prevItems) => [
          ...prevItems.filter((el) => el.id !== newItem.id),
        ]);
        setAuditoryEditValue(null);
      }

      setAuditories((prevItems) => [...prevItems, newItem]);
      closeAllModals();
    } catch (e) {
      alert(e);
    }
  };

  const handleAddSubject = (newItem: SubjectItem) => {
    // if (subjectEditValue) {
    //   console.log(newItem, subjects);
    //   setSubjects((prevItems) => [
    //     ...prevItems.filter((el) => el.id !== newItem.id),
    //   ]);
    //   setSubjectEditValue(null);
    // }
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

  return (
    <div>
      {isTeacherModalOpen && (
        <Portal elementId="overlay">
          <Backdrop />
          <AddingTeacherModal
            handleDelete={(id) =>
              setTeachers((prev) => prev.filter((el) => el.id !== id))
            }
            initValue={teacherEditValue}
            onConfirm={handleAddTeacher}
            hideModal={closeAllModals}
            auditories={auditories}
          />
        </Portal>
      )}
      {isClassModalOpen && (
        <Portal elementId="overlay">
          <Backdrop />
          <AddingClassModal
            handleDelete={(id) =>
              setClasses((prev) => prev.filter((el) => el.id !== id))
            }
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
            auditories={auditories}
            handleDelete={(id) =>
              setSubjects((prev) => prev.filter((el) => el.id !== id))
            }
            teachers={teachers}
            initValue={subjectEditValue}
            onConfirm={handleAddSubject}
            hideModal={closeAllModals}
          />
        </Portal>
      )}
      <Flex>
        <Flex flex="1" direction="column">
          <Title>Профили {accounts.length ? `(${accounts.length})` : ""}</Title>
          {areAccountsLoading && <ContentLoader size={32} />}
          {!areAccountsLoading && (
            <>
              <Flex
                style={{
                  marginBottom: 11,
                  display: "flex",
                  flexDirection: "column",
                  maxHeight: "calc(2.5 * 42px + 2 * 11px)",
                  overflowY: "auto",
                  alignContent: "start",
                }}
                justify="start"
                basis="100%"
                gap="11px"
              >
                {accounts
                  .sort((a, b) => a.id - b.id)
                  .map((item) => (
                    <AccountButton
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
                    { name: "Название", id: new Date().getTime() },
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
                display: "flex",
                flexDirection: "column",
                maxHeight: "calc(2 * 42px + 1 * 11px)",
                overflowX: "auto",
                alignContent: "start",
                width: "100%",
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
            display: "flex",
            flexDirection: "column",
            maxHeight: "calc(3 * 42px + 2 * 11px)",
            overflowX: "auto",
            alignContent: "start",
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
            display: "flex",
            flexDirection: "column",
            maxHeight: "calc(4 * 42px + 3 * 11px)",
            overflowX: "auto",
            alignContent: "start",
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
            style={{ width: "fit-content", position: "relative" }}
          >
            <Flex gap="7px">
              <StudyPlanButton
                text={"Дисциплина\\Класс"}
                size="large"
                isActive={false}
              />
              {classes.map((el) => (
                <TextButton
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
                  <Flex gap="7px">
                    <TextButton
                      style={{ flex: 10 }}
                      text={subject.name}
                      size="large"
                      openEditing={() => {
                        setIsSubjectModalOpen(true);
                        setSubjectEditValue(subject);
                      }}
                    />
                    {classes.map((el) => (
                      <TextButtonWithLabel
                        id={(() => {
                          const val = studyPlan.find(
                            (item) =>
                              item.classId === el.id &&
                              item.subjectId === subject.id
                          );
                          if (!val) return undefined;
                          return val.id;
                        })()}
                        key={subject.id}
                        label="ак. ч"
                        setText={(n) => {
                          const val = studyPlan.find(
                            (item) =>
                              item.classId === el.id &&
                              item.subjectId === subject.id
                          );
                          console.log(val, subject, el);
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
                          if (n === "" || /^[0-9]*$/.test(n)) {
                            newVal = n === "" ? 0 : Number(n);
                          } else {
                            return;
                          }
                          setStudyPlan((prev) => [
                            ...prev.filter(
                              (p) =>
                                !(
                                  p.classId === val.classId &&
                                  p.subjectId === val.subjectId
                                )
                            ),
                            { ...val, value: newVal },
                          ]);
                        }}
                        text={
                          studyPlan.find(
                            (item) =>
                              item.classId === el.id &&
                              item.subjectId === subject.id
                          )?.value + ""
                        }
                      />
                    ))}
                  </Flex>
                ))}
              <Flex gap="7px">
                <StudyPlanButton
                  text={`Все дисциплины (${subjects.length})`}
                  size="large"
                  isActive={false}
                />
                {classes.map((el) => (
                  <TextButton
                    style={{ flex: 1 }}
                    key={el.id}
                    text={
                      studyPlan
                        .filter((item) => item.classId === el.id)
                        .reduce((prev, cur) => prev + cur.value, 0) + " ак. ч"
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
      <Flex gap="10px" align="start" direction="column" $top="medium">
        <Title>Диапозон формирования</Title>
        <Flex style={{ width: "100%" }} gap="10px">
          <StyledModalButton
            $active={period === "quarter"}
            onClick={() => setPeriod("quarter")}
          >
            1 четверть
          </StyledModalButton>
          <StyledModalButton
            $active={period === "semester"}
            onClick={() => setPeriod("semester")}
          >
            1 семестр
          </StyledModalButton>
          <StyledModalButton
            $active={period === "halfYear"}
            onClick={() => setPeriod("halfYear")}
          >
            Полгода
          </StyledModalButton>
          <StyledModalButton
            $active={period === "year"}
            onClick={() => setPeriod("year")}
          >
            Год
          </StyledModalButton>
        </Flex>
        <DateRangeComponent>{getDateRange(period)}</DateRangeComponent>
      </Flex>
      <button
        onClick={() => {
          const coaches = serverCoach.map((el) => ({
            RoomID: el.RoomID,
            groupID: el.GroupID,
            subjectID: el.SubjectID,
            hours: el.Hours,
            id: el.ID,
          }));
          console.log(
            studyPlan
              .map((studyPlan) => {
                const coach = coaches.find(
                  (el) =>
                    el.subjectID === studyPlan.subjectId &&
                    el.groupID === studyPlan.classId
                );
                if (!coach) return;
                return {
                  ...studyPlan,
                  id: coach.id,
                };
              })
              .filter((el) => !!el)
          );
        }}
      >
        Сгенерировать
      </button>
      <button
        onClick={async () => {
          const errors: SubjectItem[] = [];
          subjects.forEach((el) => {
            if (!el.teacher || !el.teacher.length) errors.push(el);
          });
          if (errors.length) {
            setError(
              `Необходимо прикрепить учителя к следующим предметам: ${errors.map((el) => el.name).join(", ")}`
            );
            return;
          }
          try {
            await requestCreateAccounts(
              formatAccounts(
                accounts.filter(
                  (el) => !initialAccounts.find((acc) => acc.id === el.id)
                )
              )
            );
            localStorage.setItem("accounts", JSON.stringify(accounts));

            await requestCreateTeacher(
              formatTeachers(
                teachers.filter(
                  (el) => !initialTeachers.find((item) => item.id === el.id)
                )
              )
            );
            localStorage.setItem("teachers", JSON.stringify(teachers));

            //

            await requestCreateGroup(
              formatGroups(
                classes.filter(
                  (el) => !initialClasses.find((item) => item.id === el.id)
                )
              )
            );
            localStorage.setItem("classes", JSON.stringify(classes));

            //

            await requestCreateRoom(
              formatAuditories(
                auditories.filter(
                  (el) => !initialAuditories.find((item) => item.id === el.id)
                )
              )
            );
            localStorage.setItem("auditories", JSON.stringify(auditories));

            //

            await requestCreateSubjects(
              formatSubjects(
                subjects.filter(
                  (el) => !initialSubjects.find((item) => item.id === el.id)
                )
              )
            );
            localStorage.setItem("subjects", JSON.stringify(subjects));

            const formatPlan = formatCoachings(
              subjects,
              studyPlan.filter(
                (el) => !serverStudyPlan.find((item) => item.id === el.id)
              )
            );

            await requestCreateCoach(formatPlan);
            localStorage.setItem("studyPlan", JSON.stringify(studyPlan));

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
                    el.teacherID === scl.TeacherID
                )
            );

            await requestCreateCoachLessons(
              formatCoachLessons(studyPlan, subjects, resCoaches).filter(
                (el) =>
                  !serverCoachLessons.find(
                    (scl) =>
                      scl.CoachingID === el.coachingID &&
                      el.teacherID === scl.TeacherID
                  )
              )
            );

            localStorage.setItem("period", JSON.stringify(period));

            //
            //
            //
            //
            //

            if (initialAccounts.length)
              await requestUpdateAccounts(formatAccounts(accounts));
            localStorage.setItem("accounts", JSON.stringify(accounts));

            if (initialTeachers.length)
              await requestUpdateTeacher(
                formatTeachers(
                  teachers.filter((el) =>
                    initialTeachers.find((item) => item.id === el.id)
                  )
                )
              );
            localStorage.setItem("teachers", JSON.stringify(teachers));

            //
            console.log(
              classes.filter((el) =>
                initialClasses.find((item) => item.id === el.id)
              )
            );
            if (initialClasses.length)
              await requestUpdateGroup(
                formatGroups(
                  classes.filter((el) =>
                    initialClasses.find((item) => item.id === el.id)
                  )
                )
              );
            localStorage.setItem("classes", JSON.stringify(classes));

            //

            if (initialAuditories.length)
              await requestUpdateRoom(
                formatAuditories(
                  auditories.filter((el) =>
                    initialAuditories.find((item) => item.id === el.id)
                  )
                )
              );
            localStorage.setItem("auditories", JSON.stringify(auditories));

            //
            if (initialSubjects.length)
              await requestUpdateSubjects(
                formatSubjects(
                  subjects.filter((el) =>
                    initialSubjects.find((item) => item.id === el.id)
                  )
                )
              );
            localStorage.setItem("subjects", JSON.stringify(subjects));

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
                          el.groupID === studyPlan.classId
                      );
                      if (!coach) return null;
                      return {
                        ...studyPlan,
                        id: coach.id,
                      };
                    })
                    .filter((el) => !!el)
                )
              );
            localStorage.setItem("studyPlan", JSON.stringify(studyPlan));

            //

            alert("saved!");
          } catch (e) {
            alert(e);
          }
        }}
      >
        save
      </button>
      {error && <span color="red">{error}</span>}
    </div>
  );
};

// serov 1 2
// golovin 3
//
// math serov
