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
} from "../ModalStyles";
import { AccountItem, AuditoryItem } from "@modules/rootPage/RootPage";
import { validateAuditory } from "./helpers";
import { Text } from "@components/Typography";
import InputWithLabel from "@components/InputWithLabel";
import MultiDropdown from "@components/MultiDropdown";

interface AddingModalProps<T> {
  onConfirm: (newItem: T) => void;
  hideModal: VoidFunction;
  initValue: T | null;
  accounts: AccountItem[];
}

export const AddingAuditoryModal: FC<AddingModalProps<AuditoryItem>> = ({
  onConfirm,
  hideModal,
  initValue,
  accounts,
}) => {
  const [newItem, setNewItem] = useState<Omit<AuditoryItem, "isActive">>(
    initValue || {
      name: "",
      accounts: [],
      id: 0,
      capacity: 0,
    }
  );
  const [classError, setClassError] = useState("");

  const handleAdd = () => {
    const addingItem: AuditoryItem = {
      ...newItem,
      id: newItem.id || new Date().getTime(),
      isActive: false,
    };
    const validateRes = validateAuditory(addingItem);
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
              {initValue ? "Изменить аудиторию" : "Новая аудитория"}
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
            <span>*</span>Вместимость
            <InputWithLabel
              value={newItem.capacity}
              label="чел."
              setValue={(newVal) =>
                setNewItem((prev) => ({ ...prev, capacity: newVal }))
              }
            />
          </StyledItemTitle>
        </StyledModalButtons>
        <StyledModalButtons $top="small" direction="column" gap="8px">
          <StyledItemTitle>Профиль/факультет</StyledItemTitle>
          <MultiDropdown
            options={accounts}
            setSelectedOptions={(n) =>
              setNewItem((prev) => ({
                ...prev,
                accounts: n as any,
              }))
            }
            selectedOptions={newItem.accounts}
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
