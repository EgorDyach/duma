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
import { formatData } from "@lib/utils/formatData";
import { DateRange as DateRangeComponent } from "@components/DateRange";
import { requestStudyPlan } from "@lib/api";

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
  room: string;
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
  const [teacherEditValue, setTeacherEditValue] = useState<null | TeacherItem>(
    null
  );
  const [classEditValue, setClassEditValue] = useState<null | ClassItem>(null);
  const [auditoryEditValue, setAuditoryEditValue] =
    useState<null | AuditoryItem>(null);
  const [subjectEditValue, setSubjectEditValue] = useState<null | SubjectItem>(
    null
  );
  const [teachers, setTeachers] = useState<TeacherItem[]>(
    localStorage.getItem("teachers")
      ? JSON.parse(localStorage.getItem("teachers") || "")
      : []
  );
  const [classes, setClasses] = useState<ClassItem[]>(
    localStorage.getItem("classes")
      ? JSON.parse(localStorage.getItem("classes") || "")
      : []
  );
  const [auditories, setAuditories] = useState<AuditoryItem[]>(
    localStorage.getItem("auditories")
      ? JSON.parse(localStorage.getItem("auditories") || "")
      : []
  );
  const [accounts, setAccounts] = useState<Item[]>(
    localStorage.getItem("accounts")
      ? JSON.parse(localStorage.getItem("accounts") || "")
      : []
  );

  const [subjects, setSubjects] = useState<SubjectItem[]>(
    localStorage.getItem("subjects")
      ? JSON.parse(localStorage.getItem("subjects") || "")
      : []
  );

  const [studyPlan, setStudyPlan] = useState<StudyPlan[]>(
    localStorage.getItem("studyPlan")
      ? JSON.parse(localStorage.getItem("studyPlan") || "")
      : [
          ...classes.map((el) => ({
            classId: el.id,
            subjectId: "total",
            value: 0,
            isActive: false,
          })),
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
        ]
  );

  const [period, setPeriod] = useState<DateRange>(
    (JSON.parse(localStorage.getItem("period") || '"semester"') as DateRange) ||
      "semester"
  );

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

  useEffect(() => {
    localStorage.setItem("teachers", JSON.stringify(teachers));
  }, [teachers]);
  useEffect(() => {
    localStorage.setItem("classes", JSON.stringify(classes));
  }, [classes]);
  useEffect(() => {
    localStorage.setItem("auditories", JSON.stringify(auditories));
  }, [auditories]);
  useEffect(() => {
    localStorage.setItem("accounts", JSON.stringify(accounts));
  }, [accounts]);
  useEffect(() => {
    localStorage.setItem("subjects", JSON.stringify(subjects));
  }, [subjects]);
  useEffect(() => {
    localStorage.setItem("studyPlan", JSON.stringify(studyPlan));
  }, [studyPlan]);

  useEffect(() => {
    localStorage.setItem("period", JSON.stringify(period));
  }, [period]);

  const handleAddTeacher = (newItem: TeacherItem) => {
    if (teacherEditValue) {
      setTeachers((prevItems) => [
        ...prevItems.filter((el) => el.id !== newItem.id),
      ]);
      setTeacherEditValue(null);
    }
    setTeachers((prevItems) => [...prevItems, newItem]);
    closeAllModals();
  };

  const handleAddClass = (newItem: ClassItem) => {
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

  const handleAddAuditory = (newItem: AuditoryItem) => {
    if (auditoryEditValue) {
      setAuditories((prevItems) => [
        ...prevItems.filter((el) => el.id !== newItem.id),
      ]);
      setAuditoryEditValue(null);
    }
    setAuditories((prevItems) => [...prevItems, newItem]);
    closeAllModals();
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
            handleDelete={(id) =>
              setAuditories((prev) => prev.filter((el) => el.id !== id))
            }
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
        <Flex flex="2" direction="column">
          <Title action={() => setIsAuditoryModalOpen(true)}>Аудитории</Title>
          <Flex
            wrap="wrap"
            style={{
              display: "flex",
              flexDirection: "column",
              maxHeight: "calc(2 * 42px + 1 * 11px)",
              overflowX: "auto",
              alignContent: "start",
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
        </Flex>
      </Flex>
      <Title action={() => setIsClassModalOpen(true)}>Классы</Title>
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
      <Title action={() => setIsTeacherModalOpen(true)}>Учителя</Title>
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

      <Title>Учебный план</Title>
      <Flex style={{ position: "relative", overflow: "scroll" }}>
        <Flex gap="7px" direction="column" style={{ width: "fit-content" }}>
          <Flex gap="7px">
            <StudyPlanButton
              text={"Дисциплина\\Класс"}
              size="large"
              isActive={false}
            />
            {classes.map((el) => (
              <TextButton
                key={el.id}
                text={el.name}
                size="small"
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
                  text={subject.name}
                  size="large"
                  openEditing={() => {
                    setIsSubjectModalOpen(true);
                    setSubjectEditValue(subject);
                  }}
                />
                {classes.map((el) => (
                  <TextButtonWithLabel
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
                      // val.value = newVal;
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
                <TextButtonWithLabel
                  label="ак. ч"
                  setText={(n) => {
                    const val = studyPlan.find(
                      (item) =>
                        item.classId === el.id && item.subjectId === "total"
                    );
                    if (!val) {
                      setStudyPlan((prev) => [
                        ...prev,
                        {
                          classId: el.id,
                          subjectId: "total",
                          value: 0,
                          id: 0,
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
                    // val.value = newVal;
                  }}
                  text={
                    studyPlan.find(
                      (item) =>
                        item.classId === el.id && item.subjectId === "total"
                    )?.value + ""
                  }
                />
              ))}
            </Flex>
            <ActionButton
              size="large"
              handleClick={() => setIsSubjectModalOpen(true)}
            />
          </Flex>
        </Flex>
      </Flex>
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
        onClick={async () => {
          const data = formatData(
            teachers,
            classes,
            auditories,
            accounts,
            subjects,
            studyPlan,
            period
          );
          console.log(data);
          console.log(JSON.stringify(data));
          try {
            await requestStudyPlan(data);
          } catch (e) {
            alert(e);
          }
        }}
      >
        Сгенерировать
      </button>
    </div>
  );
};
