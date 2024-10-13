import Flex from "@components/Flex";
import CloseIcon from "@components/icons/CloseIcon";
import { FC, useState } from "react";
import {
  StyledItemTitle,
  StyledModalWrap,
  StyledModalContent,
  StyledModalTitle,
  StyledModalInput,
  StyledModalButtons,
  StyledModalButton,
  StyledModalAdd,
} from "../ModalStyles";
import {
  AuditoryItem,
  SubjectItem,
  TeacherItem,
} from "@modules/rootPage/RootPage";
import { validateSubject } from "./helpers";
import { Text } from "@components/Typography";
import MultiDropdown from "@components/MultiDropdown";
import Dropdown from "@components/Dropdown";

interface AddingModalProps<T> {
  onConfirm: (newItem: T) => void;
  hideModal: VoidFunction;
  handleDelete: (id: number) => void;

  initValue: T | null;
  auditories: AuditoryItem[];
  teachers: TeacherItem[];
}

export const AddingSubjectModal: FC<AddingModalProps<SubjectItem>> = ({
  onConfirm,
  hideModal,
  initValue,
  teachers,
  auditories,
  handleDelete,
}) => {
  const [newItem, setNewItem] = useState<SubjectItem>(
    initValue || {
      name: "",
      id: 0,
      dependsOn: [],
      room: null,
      type: "practice",
      teacher: null,
    }
  );
  const [classError, setClassError] = useState("");

  const handleAdd = () => {
    const addingItem: SubjectItem = {
      ...newItem,
      id: newItem.id || new Date().getTime(),
    };
    const validateRes = validateSubject(addingItem);
    if (validateRes) {
      setClassError(validateRes);
      return;
    }
    onConfirm(addingItem);
  };
  return (
    <StyledModalWrap $size={"default"}>
      <StyledModalContent>
        <Flex gap="30px" justify="space-between">
          <Flex gap="10px">
            <StyledModalTitle $top="xsmall">
              {initValue ? "Изменить дисциплину" : "Новая дисциплина"}
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

        <StyledModalButtons
          align="start"
          $top="medium"
          direction="column"
          gap="8px"
        >
          <StyledItemTitle>
            Аудитория
            <Dropdown
              options={auditories}
              setSelectedOption={(n) => {
                console.log(n);
                setNewItem((prev) => ({
                  ...prev,
                  room: n as any,
                }));
              }}
              selectedOption={newItem.room}
            />
          </StyledItemTitle>
        </StyledModalButtons>
        <StyledModalButtons $top="medium" direction="column" gap="8px">
          <StyledItemTitle>
            <span>*</span>Тип
          </StyledItemTitle>
          <Flex gap="10px">
            <StyledModalButton
              onClick={() =>
                setNewItem((prev) => ({ ...prev, type: "practice" }))
              }
              $active={newItem.type === "practice"}
            >
              Практика
            </StyledModalButton>
            <StyledModalButton
              onClick={() =>
                setNewItem((prev) => ({ ...prev, type: "lecture" }))
              }
              $active={newItem.type === "lecture"}
            >
              Лекция
            </StyledModalButton>
          </Flex>
        </StyledModalButtons>
        <StyledModalButtons $top="small" direction="column" gap="8px">
          <StyledItemTitle>Учитель</StyledItemTitle>
          <MultiDropdown
            options={teachers}
            setSelectedOptions={(n) =>
              setNewItem((prev) => ({
                ...prev,
                teacher: n as any,
              }))
            }
            selectedOptions={
              newItem.teacher?.map((el) => ({
                ...el,
                name: el.name,
              })) || []
            }
          />
        </StyledModalButtons>
        <StyledModalButtons $top="small" direction="column" gap="8px">
          <StyledItemTitle>Зависимость от</StyledItemTitle>
          <MultiDropdown
            options={[]}
            setSelectedOptions={(n) =>
              setNewItem((prev) => ({
                ...prev,
                accounts: n as any,
              }))
            }
            selectedOptions={[]}
          />
        </StyledModalButtons>
        <Flex justify="start">
          <Flex direction="column">
            <Text $color="red">{classError}</Text>
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
