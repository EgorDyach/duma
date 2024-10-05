import ActionButton from "@components/ActionButton";
import Flex from "@components/Flex";
import TextButton from "@components/TextButton";
import { Title } from "@components/Title";
import { useModal } from "@hooks/useModal";
import React, { useState } from "react";

type Item = {
  text: string;
  isActive: boolean;
  size: "small" | "medium" | "large" | "fullSize";
  id: number;
};

export const RootPage: React.FC = () => {
  const [teachers, setTeachers] = useState<Item[]>([]);
  const [classes, setClasses] = useState<Item[]>([]);
  const [auditories, setAuditories] = useState<Item[]>([]);
  const [accounts, setAccounts] = useState<Item[]>([]);
  const [openModal, closeModal] = useModal();
  const addItem = (
    arraySetter: React.Dispatch<React.SetStateAction<Item[]>>,
    size: "small" | "medium" | "large" | "fullSize",
    type: "teachers" | "classes" | "auditories" | "accounts",
    text: string = "Name"
  ) => {
    const newItem: Item = {
      text,
      isActive: true,
      size: size,
      id: Date.now(),
    };
    if (type === "accounts") {
      arraySetter((prevItems) => [...prevItems, newItem]);
      return;
    }
    openModal({
      title: "Новый элемент",
      type: "InformationModal",
      size: "default",
      onOk: () => {
        arraySetter((prevItems) => [...prevItems, newItem]);
        closeModal();
      },
      okText: "Добавить",
      description: (
        <Flex justify="end">
          Страница в разработке, добавьте тестовое данное...
        </Flex>
      ),
      hideModal: closeModal,
    });
  };

  const updateItemText = (
    arraySetter: React.Dispatch<React.SetStateAction<Item[]>>,
    id: number,
    newText: string
  ) => {
    arraySetter((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, text: newText } : item
      )
    );
  };

  return (
    <div>
      <Flex>
        <Flex flex="1" direction="column">
          <Title>Профили ({accounts.length})</Title>
          <Flex
            style={{
              marginBottom: 11,
              display: "flex",
              flexDirection: "column",
              maxHeight: "calc(2 * 42px + 1 * 11px)",
              overflowY: "auto",
              alignContent: "start",
            }}
            justify="start"
            basis="100%"
            gap="11px"
          >
            {accounts.map((item) => (
              <TextButton
                key={item.id}
                text={item.text}
                size={item.size}
                setText={(newText) =>
                  updateItemText(setAccounts, item.id, newText)
                }
                onSave={(newText) =>
                  updateItemText(setAccounts, item.id, newText)
                }
              />
            ))}
          </Flex>
          <ActionButton
            size="large"
            handleClick={() => addItem(setAccounts, "large", "accounts")}
          />
        </Flex>
        <Flex flex="2" direction="column">
          <Title action={() => addItem(setAuditories, "medium", "auditories")}>
            Аудитории
          </Title>
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
            {auditories.map((item) => (
              <TextButton
                key={item.id}
                text={item.text}
                setText={(newText) =>
                  updateItemText(setAuditories, item.id, newText)
                }
                onSave={(newText) =>
                  updateItemText(setAuditories, item.id, newText)
                }
              />
            ))}
          </Flex>
        </Flex>
      </Flex>
      <Title
        action={() =>
          addItem(
            setClasses,
            "small",
            "classes",
            `${Math.ceil(Math.random() * 11)}А`
          )
        }
      >
        Классы
      </Title>
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
        {classes.map((item) => (
          <TextButton
            key={item.id}
            text={item.text}
            size={item.size}
            setText={(newText) => updateItemText(setClasses, item.id, newText)}
            onSave={(newText) => updateItemText(setClasses, item.id, newText)}
          />
        ))}
      </Flex>
      <Title action={() => addItem(setTeachers, "large", "teachers")}>
        Учителя
      </Title>
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
        {teachers.map((item) => (
          <TextButton
            key={item.id}
            text={item.text}
            size={item.size}
            setText={(newText) => updateItemText(setTeachers, item.id, newText)}
            onSave={(newText) => updateItemText(setTeachers, item.id, newText)}
          />
        ))}
      </Flex>
    </div>
  );
};
