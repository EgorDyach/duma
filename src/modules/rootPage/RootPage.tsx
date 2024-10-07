import Flex from "@components/Flex";
import TextButton from "@components/TextButton";
import { Title } from "@components/Title";
import React, { useEffect, useState } from "react";
import Portal from "@components/Portal";
import { AddingTeacherModal } from "@components/Modal/ModalViews/AddingTeacherModal";
import { Backdrop } from "@components/Modal/ModalStyles";
import { AddingClassModal } from "@components/Modal/ModalViews/AddingClassModal";
import ActionButton from "@components/ActionButton";
import AccountButton from "@components/AccountButton";
import { AddingAuditoryModal } from "@components/Modal/ModalViews/AddingAuditoryModal";

export type Item = {
  isActive: boolean;
  name: string;
  id: number;
};

export type TeacherItem = Item & {
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
  // subjects: {name: string; auditory: number; classes: number[]}[]
};

export type AuditoryItem = Item & {
  capacity: number;
  accounts: AccountItem[];
  // subjects: {name: string; auditory: number; classes: number[]}[]
};

export type AccountItem = Item & {
  // subjects: {name: string; auditory: number; classes: number[]}[]
};

export const RootPage: React.FC = () => {
  const [isTeacherModalOpen, setIsTeacherModalOpen] = useState(false);
  const [isClassModalOpen, setIsClassModalOpen] = useState(false);
  const [isAuditoryModalOpen, setIsAuditoryModalOpen] = useState(false);
  const [teacherEditValue, setTeacherEditValue] = useState<null | TeacherItem>(
    null
  );
  const [classEditValue, setClassEditValue] = useState<null | ClassItem>(null);
  const [auditoryEditValue, setAuditoriEditValue] =
    useState<null | AuditoryItem>(null);
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

  const closeAllModals = () => {
    setIsTeacherModalOpen(false);
    setIsClassModalOpen(false);
    setIsAuditoryModalOpen(false);
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
    closeAllModals();
  };

  const handleAddAuditory = (newItem: AuditoryItem) => {
    if (auditoryEditValue) {
      setAuditories((prevItems) => [
        ...prevItems.filter((el) => el.id !== newItem.id),
      ]);
      setAuditoriEditValue(null);
    }
    setAuditories((prevItems) => [...prevItems, newItem]);
    closeAllModals();
  };

  return (
    <div>
      {isTeacherModalOpen && (
        <Portal elementId="overlay">
          <Backdrop />
          <AddingTeacherModal
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
            accounts={accounts}
            initValue={auditoryEditValue}
            onConfirm={handleAddAuditory}
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
                  isActive={item.isActive}
                  setIsActive={() =>
                    setAccounts((prevItems) =>
                      prevItems.map((elem) =>
                        elem.id === item.id
                          ? { ...elem, isActive: !item.isActive }
                          : elem
                      )
                    )
                  }
                />
              ))}
          </Flex>
          <ActionButton
            size="large"
            handleClick={() =>
              setAccounts((prev) => [
                ...prev,
                { name: "Название", id: new Date().getTime(), isActive: false },
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
                  isActive={item.isActive}
                  openEditing={() => {
                    setIsAuditoryModalOpen(true);
                    setAuditoriEditValue(item);
                  }}
                  setIsActive={() =>
                    setAuditories((prevItems) =>
                      prevItems.map((elem) =>
                        elem.id === item.id
                          ? { ...item, isActive: !elem.isActive }
                          : elem
                      )
                    )
                  }
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
              isActive={item.isActive}
              openEditing={() => {
                setIsClassModalOpen(true);
                setClassEditValue(item);
              }}
              setIsActive={() =>
                setClasses((prevItems) =>
                  prevItems.map((elem) =>
                    elem.id === item.id
                      ? { ...item, isActive: !elem.isActive }
                      : elem
                  )
                )
              }
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
              isActive={item.isActive}
              size="large"
              openEditing={() => {
                setIsTeacherModalOpen(true);
                setTeacherEditValue(item);
              }}
              setIsActive={() =>
                setTeachers((prevItems) =>
                  prevItems.map((elem) =>
                    elem.id === item.id
                      ? { ...item, isActive: !elem.isActive }
                      : elem
                  )
                )
              }
            />
          ))}
      </Flex>
      <button
        onClick={() => console.log(teachers, classes, auditories, accounts)}
      >
        console log
      </button>
    </div>
  );
};
