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
} from "../ModalStyles";
import { SubjectItem } from "@modules/rootPage/RootPage";
import { validateSubject } from "./helpers";
import { Text } from "@components/Typography";
import InputWithLabel from "@components/InputWithLabel";
import MultiDropdown from "@components/MultiDropdown";

interface AddingModalProps<T> {
  onConfirm: (newItem: T) => void;
  hideModal: VoidFunction;
  initValue: T | null;
}

export const AddingSubjectModal: FC<AddingModalProps<SubjectItem>> = ({
  onConfirm,
  hideModal,
  initValue,
}) => {
  const [newItem, setNewItem] = useState<Omit<SubjectItem, "isActive">>(
    initValue || {
      name: "",
      id: 0,
      dependsOn: [],
      time: 0,
      room: "",
      type: "practice",
    }
  );
  const [classError, setClassError] = useState("");

  const handleAdd = () => {
    const addingItem: SubjectItem = {
      ...newItem,
      id: newItem.id || new Date().getTime(),
      isActive: false,
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
        <Flex justify="space-between">
          <Flex>
            <StyledModalTitle $top="xsmall">
              {initValue ? "Изменить дисциплину" : "Новая дисциплина"}
            </StyledModalTitle>
            <StyledModalInput
              onChange={(e) =>
                setNewItem((prev) => ({ ...prev, name: e.target.value }))
              }
              value={newItem.name}
            />
          </Flex>

          <CloseIcon onClick={hideModal} size={28} />
        </Flex>

        <StyledModalButtons
          align="start"
          $top="medium"
          direction="column"
          gap="8px"
        >
          <StyledItemTitle>
            <span>*</span>Время
            <InputWithLabel
              value={newItem.time}
              label={"мин."}
              setValue={(newVal) =>
                setNewItem((prev) => ({ ...prev, time: newVal }))
              }
            />
          </StyledItemTitle>
          <StyledItemTitle>
            Аудитория
            <StyledModalInput
              value={newItem.room}
              onChange={(el) =>
                setNewItem((prev) => ({ ...prev, room: el.target.value }))
              }
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
              <button onClick={handleAdd}>
                {initValue ? "Изменить" : "Добавить"}
              </button>
            </Flex>
          </Flex>
        </Flex>
      </StyledModalContent>
    </StyledModalWrap>
  );
};
