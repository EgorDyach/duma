import React, { useState } from "react";
import Flex from "./Flex";
import styled from "styled-components";

interface InputWithLabelProps {
  label: string;
  value: number;
  setValue: (newVal: number) => void;
}

const StyledWrapper = styled(Flex)`
  background-color: #f0f0f7;
  padding: 8px;
  border-radius: 10px;
`;

const StyledInput = styled.input`
  max-width: 60px;
  margin-right: 5px;
  border: none;
  background: transparent;
  outline: none;
  font-size: 14px;
`;

const InputWithLabel: React.FC<InputWithLabelProps> = ({
  value,
  setValue,
  label,
}) => {
  const [error, setError] = useState<string>("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;

    // Проверка на положительное или нулевое значение
    if (newValue === "" || /^[0-9]*$/.test(newValue)) {
      setValue(newValue === "" ? 0 : Number(newValue));
      setError(""); // Сбрасываем ошибку, если значение корректное
    } else {
      setError("Введите положительное целое число или 0");
    }
  };

  return (
    <Flex align="center" direction="column">
      <StyledWrapper align="center">
        <StyledInput
          type="text" // Изменяем тип на text для фильтрации ввода
          value={value}
          onChange={handleChange}
        />
        <span>{label}</span>
      </StyledWrapper>
      {error && <span style={{ color: "red" }}>{error}</span>}
    </Flex>
  );
};

export default InputWithLabel;
