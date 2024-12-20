import Flex from "@components/Flex";
import CloseIcon from "@components/icons/CloseIcon";
import { FC, useState } from "react";
import {
  StyledModalWrap,
  StyledModalContent,
  StyledModalTitle,
  StyledModalButtons,
  StyledModalAdd,
} from "../ModalStyles";
import { validateLessonTime } from "./helpers";
import { Text } from "@components/Typography";
import styled from "styled-components";
import { LessonTime } from "@type/studyPlan";

interface AddingModalProps<T> {
  onConfirm: (newItem: T) => void;
  hideModal: VoidFunction;
  handleDelete: (id: number) => void;
  initValue: T | null;
}

const StyledInput = styled.input`
  border: 2px solid #641aee;
  background: #fff;
  padding: 8px;
  border-radius: 8px;
`;

export const AddingLessonTimesModal: FC<AddingModalProps<LessonTime>> = ({
  onConfirm,
  hideModal,
  initValue,
  handleDelete,
}) => {
  const [newItem, setNewItem] = useState<LessonTime>(
    initValue || {
      ID: 0,
      EndTime: "",
      StartTime: "",
    }
  );
  const [classError, setClassError] = useState("");

  const handleAdd = () => {
    const addingItem: LessonTime = {
      ...newItem,
      ID: newItem.ID || new Date().getTime(),
    };
    const validateRes = validateLessonTime(addingItem);
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
              {initValue ? "Изменить время" : "Новое время"}
            </StyledModalTitle>
          </Flex>

          <CloseIcon color={"#641AEE"} onClick={hideModal} size={28} />
        </Flex>

        <StyledModalButtons
          align="start"
          $top="medium"
          direction="column"
          gap="8px"
        >
          <StyledInput
            type="time"
            value={
              newItem && newItem.StartTime
                ? `${newItem.StartTime.split(":")[0].padStart(2, "0")}:${newItem.StartTime.split(":")[1].padStart(2, "0")}`
                : ""
            }
            onChange={(e) =>
              setNewItem((prev) => ({
                ...prev,
                StartTime: e.target.value,
              }))
            }
          />
          <StyledInput
            type="time"
            value={
              newItem && newItem.EndTime
                ? `${newItem.EndTime.split(":")[0].padStart(2, "0")}:${newItem.EndTime.split(":")[1].padStart(2, "0")}`
                : ""
            }
            onChange={(e) =>
              setNewItem((prev) => ({
                ...prev,
                EndTime: e.target.value,
              }))
            }
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
                <StyledModalAdd onClick={() => handleDelete(initValue.ID)}>
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
