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
import InputWithLabel from "@components/InputWithLabel";

interface AddingModalProps<T> {
  onConfirm: (newItem: T) => void;
  hideModal: VoidFunction;
  handleDelete: (id: number) => void;
  initValue: T | null;
  accounts: AccountItem[];
}

export const AddingClassModal: FC<AddingModalProps<ClassItem>> = ({
  onConfirm,
  hideModal,
  initValue,
  handleDelete,
  accounts,
}) => {
  const [newItem, setNewItem] = useState<ClassItem>(
    initValue || {
      name: "",
      shift: 1,
      schoolWeek: 5,
      account: null,
      count: 0,
      id: 0,
    }
  );
  const [classError, setClassError] = useState("");

  const handleAdd = () => {
    const addingItem: ClassItem = {
      ...newItem,
      id: newItem.id || new Date().getTime(),
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
        <Flex gap="30px" justify="space-between">
          <Flex gap="10px">
            <StyledModalTitle $top="xsmall">
              {initValue ? "Изменить" : "Новый"} класс
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
        <Flex gap="8px">
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
          <StyledModalButtons
            align="start"
            $top="medium"
            direction="column"
            gap="8px"
          >
            <StyledItemTitle>
              <span>*</span>Кол-во человек
              <InputWithLabel
                value={newItem.count}
                label=""
                setValue={(newVal) =>
                  setNewItem((prev) => ({
                    ...prev,
                    count: newVal as number,
                  }))
                }
              />
            </StyledItemTitle>
          </StyledModalButtons>
        </Flex>
        <Flex justify="start">
          <Flex direction="column">
            <Text $color="red">{classError}</Text>
            <Flex gap="16px" $top="large" justify="start">
              <button onClick={handleAdd}>
                {initValue ? "Изменить" : "Добавить"}
              </button>
              {initValue && (
                <button onClick={() => handleDelete(initValue.id)}>
                  Удалить
                </button>
              )}
            </Flex>
          </Flex>
        </Flex>
      </StyledModalContent>
    </StyledModalWrap>
  );
};
