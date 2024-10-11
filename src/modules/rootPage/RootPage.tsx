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
  requestAllAuditorium,
  requestAllCoaches,
  requestAllGroups,
  requestAllSubjects,
  requestAllTeacher,
  requestCreateAuditorium,
  requestCreateCoach,
  requestCreateCoachLessons,
  requestCreateGroup,
  requestCreateSubjects,
  requestCreateTeacher,
} from "@lib/api";
import { formatAuditories } from "@lib/utils/data/formatAuditories";
import { formatTeachers } from "@lib/utils/data/formatTeacher";
import { formatGroups } from "@lib/utils/data/formatGroup";
import { formatSubjects } from "@lib/utils/data/formatSubjects";
import { formatCoachings } from "@lib/utils/data/formatCoachings";
import { formatCoachLessons } from "@lib/utils/data/formatCoachLessons";
import ContentLoader from "@components/ContentLoader";
//
export type Item = {
  name: string;
  id: number;
};

export type TeacherItem = Item & {
  hours: number;
  subjects: {
    name: string;
    auditory: AuditoryItem[];
    classes: ClassItem[];
    id: number;
  }[];
};

export type ClassItem = Item & {
  shift: 1 | 2;
  schoolWeek: 5 | 6;
  account: AccountItem | null;
};

export type AuditoryItem = Item & {
  capacity: number;
  accounts: AccountItem[];
};

export type AccountItem = Item;

export type SubjectItem = Item & {
  time: number;
  room: AuditoryItem | null;
  teacher: TeacherItem | null;
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
  const [isTeacherModalOpen, setIsTeacherModalOpen] = useState(false);
  const [isClassModalOpen, setIsClassModalOpen] = useState(false);
  const [isAuditoryModalOpen, setIsAuditoryModalOpen] = useState(false);
  const [isSubjectModalOpen, setIsSubjectModalOpen] = useState(false);
  const [areTeachersLoading, setAreTeachersLoading] = useState(false);
  const [areClassesLoading, setAreClassesLoading] = useState(false);
  const [areAuditoriesLoading, setAreAuditoriesLoading] = useState(false);
  const [areSubjectsLoading, setAreSubjectsLoading] = useState(false);
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
  // const [initialAccounts, setInitialAccounts] = useState<Item[]>([]);
  const [accounts, setAccounts] = useState<Item[]>([]);

  const [initialSubjects, setInitialSubjects] = useState<SubjectItem[]>([]);
  const [subjects, setSubjects] = useState<SubjectItem[]>([]);

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
      setAreAuditoriesLoading(true);
      try {
        const res = await requestAllAuditorium();
        setAuditories(
          res.message.map((el) => ({
            id: el.ID,
            capacity: el.Capacity,
            name: el.Name,
            accounts: [],
          }))
        );
      } catch (e) {
        alert(e);
      } finally {
        setAreAuditoriesLoading(false);
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      setAreTeachersLoading(true);
      setAreClassesLoading(true);
      setAreSubjectsLoading(true);
      setAreAuditoriesLoading(true);
      try {
        const resAuditories = await requestAllAuditorium();
        const newAuditories = resAuditories.message.map((el) => ({
          id: el.ID,
          capacity: el.Capacity,
          name: el.Name,
          accounts: [],
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
          account: null,
        }));
        setClasses(newClasses);
        setInitialClasses(newClasses);
        setAreClassesLoading(false);

        const resTeachers = await requestAllTeacher();
        const newTeachers = resTeachers.message.map((el) => ({
          id: el.ID,
          name: el.Fullname,
          hours: 0,
          subjects: [],
        }));
        setTeachers(newTeachers);
        setInitialTeachers(newTeachers);
        setAreTeachersLoading(false);

        const resSubjects = await requestAllSubjects();
        const resCoaches = await requestAllCoaches();
        const newSubjects = resSubjects.message.map((el) => ({
          id: el.ID,
          name: el.Name,
          room: (() => {
            const room = resAuditories.message.find((item) =>
              resCoaches.message.find((coach) => coach.AuditoriumID === item.ID)
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
            resCoaches.message.find((coach) => coach.SubjectID === el.ID)
              ?.Hours || 0,
          teacher: null,
          type: "practice" as "practice" | "lecture",
          dependsOn: [] as [],
        }));
        setSubjects(newSubjects);
        setInitialSubjects(newSubjects);
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
    if (subjectEditValue) {
      setSubjects((prevItems) => [
        ...prevItems.filter((el) => el.id !== newItem.id),
      ]);
      setSubjectEditValue(null);
    }
    setSubjects((prevItems) => [...prevItems, newItem]);
    setStudyPlan((prev) => [
      ...prev,
      ...classes.map((el, index) => ({
        classId: el.id,
        subjectId: newItem.id,
        value: 0,
        id: new Date().getTime() + index,
      })),
    ]);
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
            classes={classes}
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
          <Title>Профили ({accounts.length})</Title>
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
                size="fit"
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
          <Flex direction="column" gap="7px" style={{ width: "fit-content" }}>
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
                  size="fit"
                  openEditing={() => {
                    setIsClassModalOpen(true);
                    setClassEditValue(el);
                  }}
                />
              ))}
            </Flex>
            <Flex direction="column" gap="7px">
              {subjects.map((subject) => (
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
                      key={subject.id}
                      label="ак. ч"
                      setText={(n) => {
                        const val = studyPlan.find(
                          (item) =>
                            item.classId === el.id &&
                            item.subjectId === subject.id
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
      <button>Сгенерировать</button>
      <button
        onClick={async () => {
          try {
            // const savedTeachers: TeacherItem[] = localStorage.getItem(
            //   "teachers"
            // )
            //   ? JSON.parse(localStorage.getItem("teachers") as string)
            //   : [];
            // const savedClasses: ClassItem[] = localStorage.getItem("classes")
            //   ? JSON.parse(localStorage.getItem("classes") as string)
            //   : [];
            // const savedAuditories: AuditoryItem[] = localStorage.getItem(
            //   "auditories"
            // )
            //   ? JSON.parse(localStorage.getItem("auditories") as string)
            //   : [];
            // const savedSubjects: SubjectItem[] = localStorage.getItem(
            //   "subjects"
            // )
            //   ? JSON.parse(localStorage.getItem("subjects") as string)
            //   : [];
            // const savedStudyPlan: StudyPlan[] = localStorage.getItem(
            //   "studyPlan"
            // )
            //   ? JSON.parse(localStorage.getItem("studyPlan") as string)
            //   : [];
            // const savedPeriod = localStorage.getItem("period")
            //   ? JSON.parse(localStorage.getItem("period") as string)
            //   : "";
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

            await requestCreateAuditorium(
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

            //

            await requestCreateCoach(
              formatCoachings(
                subjects,
                studyPlan.filter(
                  (el) => !initialStudyPlan.find((item) => item.id === el.id)
                )
              )
            );
            localStorage.setItem("studyPlan", JSON.stringify(studyPlan));

            //

            await requestCreateCoachLessons(
              formatCoachLessons(
                teachers,
                studyPlan.filter(
                  (el) => !initialStudyPlan.find((item) => item.id === el.id)
                ),
                subjects
              )
            );
            localStorage.setItem("accounts", JSON.stringify(accounts));
            localStorage.setItem("period", JSON.stringify(period));
            // await requestStudyPlan(data);
            alert("saved!");
          } catch (e) {
            alert(e);
          }
        }}
      >
        save
      </button>
    </div>
  );
};
