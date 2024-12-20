import Flex from "@components/Flex";
import CloseIcon from "@components/icons/CloseIcon";
import { FC, useState } from "react";
import {
  StyledModalWrap,
  StyledModalContent,
  StyledModalTitle,
  StyledModalInput,
  StyledItemTitle,
  StyledModalAdd,
} from "../ModalStyles";
import { Text } from "@components/Typography";
import Input from "@components/input/Input";

interface AddingModalProps<T> {
  onConfirm: (newItem: T) => void;
  hideModal: VoidFunction;
  initValue: T | null;
  handleDelete: (id: number) => void;
}

export type SchoolItem = {
  id: number;
  name: string;
  address: string;
  login: string;
  password: string;
  type: string;
};

export const AddingVuzModal: FC<AddingModalProps<SchoolItem>> = ({
  onConfirm,
  hideModal,
  initValue,
  handleDelete,
}) => {
  const [newItem, setNewItem] = useState<SchoolItem>(
    initValue || {
      id: new Date().getTime(),
      name: "",
      address: "",
      login: "",
      password: "",
      type: "vuz",
    }
  );
  const [teacherError] = useState("");

  const handleAdd = () => {
    const addingItem: SchoolItem = {
      ...newItem,
      id: newItem.id || new Date().getTime(),
    };
    onConfirm(addingItem);
  };
  return (
    <StyledModalWrap $size={"default"}>
      <StyledModalContent>
        <Flex gap="30px" justify="space-between">
          <Flex gap="10px">
            <StyledModalTitle $top="xsmall">
              {initValue ? "Изменить ВУЗ" : "Новый ВУЗ"}
            </StyledModalTitle>
            <StyledModalInput
              placeholder="Введите название..."
              onChange={(e) =>
                setNewItem((prev) => ({ ...prev, name: e.target.value }))
              }
              value={newItem.name}
            />
          </Flex>

          <CloseIcon color={"#641AEE"} onClick={hideModal} size={28} />
        </Flex>
        <Flex direction="column" $top="medium" gap="16px">
          <StyledItemTitle>
            <span>*</span>Адрес ВУЗа
            <Input
              value={newItem.address}
              onChange={(newVal) =>
                setNewItem((prev) => ({ ...prev, address: newVal }))
              }
              name={""}
            />
          </StyledItemTitle>
        </Flex>
        <Flex direction="column" $top="medium" gap="16px">
          <StyledItemTitle>
            <span>*</span> Логин
            <Flex gap="10px" align="end">
              <Input
                // @ts-ignore
                style={{ flex: 10, width: "100%" }}
                value={newItem.login}
                onChange={(newVal) =>
                  setNewItem((prev) => ({ ...prev, login: newVal }))
                }
                name={""}
              />
              <button
                style={{
                  flex: 1,
                  height: 44.5,

                  border: "none",
                  borderRadius: 10,
                  backgroundColor: "#5727ec",
                  color: "white",
                  cursor: "pointer",
                  fontSize: 16,
                  display: "flex",
                  padding: "12px ",
                  alignItems: "center",
                  justifyContent: "center",
                }}
                onClick={() => {
                  const characters =
                    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
                  let login = "";

                  for (let i = 0; i < 10; i++) {
                    const randomIndex = Math.floor(
                      Math.random() * characters.length
                    );
                    login += characters[randomIndex];
                  }
                  return setNewItem((prev) => ({ ...prev, login }));
                }}
              >
                Сгенерировать
              </button>
            </Flex>
          </StyledItemTitle>
        </Flex>
        <Flex direction="column" $top="medium" gap="16px">
          <StyledItemTitle>
            <span>*</span> Пароль
            <Flex gap="10px" align="end">
              <Input
                // @ts-ignore
                style={{ flex: 10, width: "100%" }}
                value={newItem.password}
                onChange={(newVal) =>
                  setNewItem((prev) => ({ ...prev, password: newVal }))
                }
                name={""}
              />
              <button
                style={{
                  flex: 1,
                  height: 44.5,

                  border: "none",
                  borderRadius: 10,
                  backgroundColor: "#5727ec",
                  color: "white",
                  cursor: "pointer",
                  fontSize: 16,
                  display: "flex",
                  padding: "12px ",
                  alignItems: "center",
                  justifyContent: "center",
                }}
                onClick={() => {
                  const lowercase = "abcdefghijklmnopqrstuvwxyz";
                  const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
                  const numbers = "0123456789";
                  const specialCharacters = "!@#$%^&*()_+[]{}|;:,.<>?";

                  const allCharacters =
                    lowercase + uppercase + numbers + specialCharacters;
                  let password = "";

                  // Убедимся, что пароль содержит хотя бы один символ из каждой категории
                  password +=
                    lowercase[Math.floor(Math.random() * lowercase.length)];
                  password +=
                    uppercase[Math.floor(Math.random() * uppercase.length)];
                  password +=
                    numbers[Math.floor(Math.random() * numbers.length)];
                  password +=
                    specialCharacters[
                      Math.floor(Math.random() * specialCharacters.length)
                    ];

                  // Заполняем оставшуюся длину пароля случайными символами
                  for (let i = 4; i < 16; i++) {
                    const randomIndex = Math.floor(
                      Math.random() * allCharacters.length
                    );
                    password += allCharacters[randomIndex];
                  }

                  // Перемешиваем пароль для большей случайности
                  return setNewItem((prev) => ({
                    ...prev,
                    password: password
                      .split("")
                      .sort(() => Math.random() - 0.5)
                      .join(""),
                  }));
                }}
              >
                Сгенерировать
              </button>
            </Flex>
          </StyledItemTitle>
        </Flex>

        <Flex justify="flex-end">
          <Flex direction="column">
            <Text $color="red">{teacherError}</Text>
            <Flex gap="16px" $top="large" justify="start">
              <StyledModalAdd onClick={handleAdd}>
                {initValue ? "Изменить" : "Добавить"}
              </StyledModalAdd>
              {initValue && (
                <StyledModalAdd onClick={() => handleDelete(initValue.id)}>
                  Удалить
                </StyledModalAdd>
              )}
            </Flex>
          </Flex>
        </Flex>
      </StyledModalContent>
    </StyledModalWrap>
  );
};
