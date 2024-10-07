import Flex from "@components/Flex";
import CloseIcon from "@components/icons/CloseIcon";
import { FC, useState } from "react";
import {
  StyledModalWrap,
  StyledModalContent,
  StyledModalTitle,
  StyledModalInput,
} from "../ModalStyles";
import { TeacherItem } from "@modules/rootPage/RootPage";
import { validateTeacher } from "./helpers";
import { Text } from "@components/Typography";

interface AddingModalProps<T> {
  onConfirm: (newItem: T) => void;
  hideModal: VoidFunction;
  initValue: T | null;
}

export const AddingTeacherModal: FC<AddingModalProps<TeacherItem>> = ({
  onConfirm,
  hideModal,
  initValue,
}) => {
  const [newItem, setNewItem] = useState<
    Omit<TeacherItem, "isActive" | "size">
  >(
    initValue || {
      name: "",
      subjects: [],
      id: 0,
    }
  );
  const [teacherError, setTeacherError] = useState("");

  const handleAdd = () => {
    const addingItem: TeacherItem = {
      ...newItem,
      id: newItem.id || new Date().getTime(),
      isActive: false,
    };
    const validateRes = validateTeacher(addingItem);
    if (validateRes) {
      setTeacherError(validateRes);
      return;
    }
    onConfirm(addingItem);
  };
  return (
    <StyledModalWrap $size={"default"}>
      <StyledModalContent>
        <Flex justify="space-between">
          <Flex>
            <StyledModalTitle $top="xsmall">Новый учитель</StyledModalTitle>
            <StyledModalInput
              onChange={(e) =>
                setNewItem((prev) => ({ ...prev, name: e.target.value }))
              }
              value={newItem.name}
            />
          </Flex>

          <CloseIcon onClick={hideModal} size={28} />
        </Flex>

        <Flex justify="flex-end">
          <Flex direction="column">
            <Text $color="red">{teacherError}</Text>
            <Flex gap="16px" $top="large" justify="start">
              <button onClick={handleAdd}>Добавить</button>
            </Flex>
          </Flex>
        </Flex>
      </StyledModalContent>
    </StyledModalWrap>
  );
};
