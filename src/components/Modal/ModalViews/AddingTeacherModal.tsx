import Flex from "@components/Flex";
import CloseIcon from "@components/icons/CloseIcon";
import { FC, useState } from "react";
import {
  StyledModalWrap,
  StyledModalContent,
  StyledModalTitle,
  StyledModalInput,
  StyledItemTitle,
  StyledModalButton,
  StyledModalAdd,
} from "../ModalStyles";
import { AuditoryItem, TeacherItem } from "@modules/rootPage/RootPage";
import { validateTeacher } from "./helpers";
import { Text } from "@components/Typography";
import { Title } from "@components/Title";
import Dropdown from "@components/Dropdown";

interface AddingModalProps<T> {
  onConfirm: (newItem: T) => void;
  hideModal: VoidFunction;
  initValue: T | null;
  handleDelete: (id: number) => void;
  auditories: AuditoryItem[];
}

export const AddingTeacherModal: FC<AddingModalProps<TeacherItem>> = ({
  onConfirm,
  auditories,
  hideModal,
  initValue,
}) => {
  const [newItem, setNewItem] = useState<TeacherItem>(
    initValue || {
      name: "",
      lastName: "",
      surName: "",
      firstName: "",
      hours: 0,
      subjects: [],
      id: 0,
    }
  );
  const [teacherError, setTeacherError] = useState("");

  const handleAdd = () => {
    const addingItem: TeacherItem = {
      ...newItem,
      id: newItem.id || new Date().getTime(),
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
        <Flex gap="30px" justify="space-between">
          <Flex gap="10px">
            <StyledModalTitle $top="xsmall">
              {initValue ? "Изменить учителя" : "Новый учитель"}
            </StyledModalTitle>
          </Flex>

          <CloseIcon color={"#641AEE"} onClick={hideModal} size={28} />
        </Flex>
        <Flex align="start" $top="medium" gap="16px">
          <StyledModalInput
            placeholder="Введите фамилию..."
            onChange={(e) =>
              setNewItem((prev) => ({ ...prev, surName: e.target.value }))
            }
            value={newItem.surName}
          />
          <StyledModalInput
            placeholder="Введите имя..."
            onChange={(e) =>
              setNewItem((prev) => ({ ...prev, firstName: e.target.value }))
            }
            value={newItem.firstName}
          />
          <StyledModalInput
            placeholder="Введите отчество..."
            onChange={(e) =>
              setNewItem((prev) => ({ ...prev, lastName: e.target.value }))
            }
            value={newItem.lastName}
          />
        </Flex>
        <Flex direction="column">
          <Title
            action={() => {
              setNewItem((prev) => ({
                ...prev,
                subjects: [
                  ...prev.subjects,
                  {
                    auditory: [],
                    name: "",
                    classes: [],
                    id: new Date().getTime(),
                    room: null,
                    time: 0,
                    type: "practice",
                  },
                ],
              }));
            }}
          >
            Предмет
          </Title>
          <Flex $top="small" gap="8px">
            <Flex direction="column">
              {newItem.subjects
                .sort((a, b) => a.id - b.id)
                .map((el) => (
                  <Flex gap="16px" key={el.id}>
                    {!initValue && (
                      <CloseIcon
                        onClick={() =>
                          setNewItem((prev) => ({
                            ...prev,
                            subjects: prev.subjects.filter(
                              (item) => item.id !== el.id
                            ),
                          }))
                        }
                        color="red"
                        size={16}
                      />
                    )}
                    <Flex align="start" direction="column" gap="8px">
                      <Flex direction="column" gap="8px">
                        <span>*Название</span>
                        <StyledModalInput
                          placeholder="Введите название..."
                          value={el.name}
                          onChange={(v) =>
                            setNewItem((prev) => ({
                              ...prev,
                              subjects: [
                                ...prev.subjects.filter(
                                  (item) => item.id !== el.id
                                ),
                                { ...el, name: v.target.value },
                              ],
                            }))
                          }
                        />
                      </Flex>
                      <Flex direction="column" gap="8px">
                        <StyledItemTitle>
                          <span>*</span>Тип
                        </StyledItemTitle>
                        <Flex gap="10px">
                          <StyledModalButton
                            onClick={() =>
                              setNewItem((prev) => ({
                                ...prev,
                                subjects: [
                                  ...prev.subjects.filter(
                                    (subject) => subject.id !== el.id
                                  ),
                                  {
                                    ...el,
                                    type: "lecture",
                                  },
                                ],
                              }))
                            }
                            $active={el.type === "practice"}
                          >
                            Практика
                          </StyledModalButton>
                          <StyledModalButton
                            onClick={() =>
                              setNewItem((prev) => ({
                                ...prev,
                                subjects: [
                                  ...prev.subjects.filter(
                                    (subject) => subject.id !== el.id
                                  ),
                                  {
                                    ...el,
                                    type: "lecture",
                                  },
                                ],
                              }))
                            }
                            $active={el.type === "lecture"}
                          >
                            Лекция
                          </StyledModalButton>
                        </Flex>
                      </Flex>
                      <StyledItemTitle>
                        Аудитория
                        <Dropdown
                          options={auditories}
                          setSelectedOption={(n) =>
                            setNewItem((prev) => ({
                              ...prev,
                              subjects: [
                                ...prev.subjects.filter(
                                  (item) => item.id !== el.id
                                ),
                                { ...el, room: n },
                              ],
                            }))
                          }
                          selectedOption={el.room}
                        />
                      </StyledItemTitle>
                    </Flex>
                  </Flex>
                ))}
            </Flex>
          </Flex>
        </Flex>
        <Flex justify="flex-end">
          <Flex direction="column">
            <Text $color="red">{teacherError}</Text>
            <Flex gap="16px" $top="large" justify="start">
              <StyledModalAdd onClick={handleAdd}>
                {initValue ? "Изменить" : "Добавить"}
              </StyledModalAdd>
              {/* {initValue && (
                <button onClick={() => handleDelete(initValue.id)}>
                  Удалить
                </button>
              )} */}
            </Flex>
          </Flex>
        </Flex>
      </StyledModalContent>
    </StyledModalWrap>
  );
};
