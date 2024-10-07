import Flex from "@components/Flex";
import CloseIcon from "@components/icons/CloseIcon";
import { FC, useState } from "react";
import {
  StyledItemTitle,
  StyledModalWrap,
  StyledModalContent,
  StyledModalTitle,
  StyledModalInput,
  StyledModalButton,
  StyledModalButtons,
} from "../ModalStyles";
import { AccountItem, ClassItem } from "@modules/rootPage/RootPage";
import { validateClass } from "./helpers";
import { Text } from "@components/Typography";
import Dropdown from "@components/Dropdown";

interface AddingModalProps<T> {
  onConfirm: (newItem: T) => void;
  hideModal: VoidFunction;
  initValue: T | null;
  accounts: AccountItem[];
}

export const AddingClassModal: FC<AddingModalProps<ClassItem>> = ({
  onConfirm,
  hideModal,
  initValue,
  accounts,
}) => {
  const [newItem, setNewItem] = useState<Omit<ClassItem, "isActive" | "size">>(
    initValue || {
      name: "",
      shift: 1,
      schoolWeek: 5,
      account: null,
      id: 0,
    }
  );
  const [classError, setClassError] = useState("");

  const handleAdd = () => {
    const addingItem: ClassItem = {
      ...newItem,
      id: newItem.id || new Date().getTime(),
      isActive: false,
    };
    const validateRes = validateClass(addingItem);
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
              {initValue ? "Изменить" : "Новый"} класс
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

        <Flex gap="16px" $top="medium">
          <StyledModalButtons direction="column" gap="8px">
            <StyledItemTitle>
              <span>*</span>Смена
            </StyledItemTitle>
            <Flex gap="10px">
              <StyledModalButton
                onClick={() => setNewItem((prev) => ({ ...prev, shift: 1 }))}
                $active={newItem.shift === 1}
              >
                1
              </StyledModalButton>
              <StyledModalButton
                onClick={() => setNewItem((prev) => ({ ...prev, shift: 2 }))}
                $active={newItem.shift === 2}
              >
                2
              </StyledModalButton>
            </Flex>
          </StyledModalButtons>
          <StyledModalButtons direction="column" gap="8px">
            <StyledItemTitle>
              <span>*</span>Учебная неделя
            </StyledItemTitle>
            <Flex gap="10px">
              <StyledModalButton
                onClick={() =>
                  setNewItem((prev) => ({ ...prev, schoolWeek: 5 }))
                }
                $active={newItem.schoolWeek === 5}
              >
                5 дней
              </StyledModalButton>
              <StyledModalButton
                onClick={() =>
                  setNewItem((prev) => ({ ...prev, schoolWeek: 6 }))
                }
                $active={newItem.schoolWeek === 6}
              >
                6 дней
              </StyledModalButton>
            </Flex>
          </StyledModalButtons>
        </Flex>
        <StyledModalButtons $top="small" direction="column" gap="8px">
          <StyledItemTitle>Профиль/факультет</StyledItemTitle>
          <Dropdown
            options={accounts}
            setSelectedOption={(n) =>
              setNewItem((prev) => ({ ...prev, account: n }))
            }
            selectedOption={newItem.account}
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
