import Flex from "@components/Flex";
import CloseIcon from "@components/icons/CloseIcon";
import { FC, useState } from "react";
import {
  StyledModalWrap,
  StyledModalContent,
  StyledModalTitle,
  StyledModalInput,
} from "../ModalStyles";
import {
  AuditoryItem,
  ClassItem,
  TeacherItem,
} from "@modules/rootPage/RootPage";
import { validateTeacher } from "./helpers";
import { Text } from "@components/Typography";
import { Title } from "@components/Title";
import MultiDropdown from "@components/MultiDropdown";

interface AddingModalProps<T> {
  onConfirm: (newItem: T) => void;
  hideModal: VoidFunction;
  initValue: T | null;
  auditories: AuditoryItem[];
  classes: ClassItem[];
}

export const AddingTeacherModal: FC<AddingModalProps<TeacherItem>> = ({
  onConfirm,
  auditories,
  classes,
  hideModal,
  initValue,
}) => {
  const [newItem, setNewItem] = useState<Omit<TeacherItem, "isActive">>(
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
            <StyledModalTitle $top="xsmall">
              {initValue ? "Изменить учителя" : "Новый учитель"}
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
                  },
                ],
              }));
            }}
          >
            Предмет
          </Title>
          <Flex $top="medium" direction="column">
            {newItem.subjects
              .sort((a, b) => a.id - b.id)
              .map((el) => (
                <Flex gap="16px" key={el.id}>
                  <Flex direction="column">
                    <span>*Название</span>
                    <input
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
                  <Flex direction="column">
                    <span>Аудитории</span>
                    <MultiDropdown
                      options={auditories}
                      selectedOptions={el.auditory}
                      setSelectedOptions={(n) =>
                        setNewItem((prev) => ({
                          ...prev,
                          subjects: [
                            ...prev.subjects.filter(
                              (item) => item.id !== el.id
                            ),
                            { ...el, auditory: n as AuditoryItem[] },
                          ],
                        }))
                      }
                    />
                  </Flex>
                  <Flex direction="column">
                    <span>*Классы</span>
                    <MultiDropdown
                      options={classes}
                      selectedOptions={el.classes}
                      setSelectedOptions={(n) =>
                        setNewItem((prev) => ({
                          ...prev,
                          subjects: [
                            ...prev.subjects.filter(
                              (item) => item.id !== el.id
                            ),
                            { ...el, classes: n as ClassItem[] },
                          ],
                        }))
                      }
                    />
                  </Flex>
                </Flex>
              ))}
          </Flex>
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
