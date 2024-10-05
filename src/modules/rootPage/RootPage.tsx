import ActionButton from "@components/ActionButton";
import Flex from "@components/Flex";
import TextButton from "@components/TextButton";
import { useState } from "react";

type Values = Record<string, { text: string; isActive: boolean }[]>;

export const RootPage = () => {
  const [values, setValues] = useState<Values>({
    teachers: [],
    accounts: [],
    auditories: [],
    classes: [],
  });
  return (
    <>
      <Flex direction="column">
        teachers
        {values["teachers"].map((el, index) => (
          <TextButton
            key={index}
            initialText={el.text}
            initIsActive={el.isActive}
          />
        ))}
        <ActionButton
          handleClick={() =>
            setValues({
              ...values,
              teachers: [...values.teachers, { text: "test", isActive: true }],
            })
          }
        />
      </Flex>
    </>
  );
};
