import styled from "styled-components";

const CheckboxContainer = styled.label`
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const HiddenCheckbox = styled.input`
  display: none;
`;

const StyledCheckbox = styled.div<{ checked: boolean }>`
  width: 24px;
  height: 24px;
  border-radius: 5px;
  background-color: ${({ checked }) => (checked ? "#5727EC" : "#E0E0E0")};
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.2s;

  svg {
    display: ${({ checked }) => (checked ? "block" : "none")};
  }
`;

const Checkbox = ({
  checked,
  setChecked,
}: {
  checked: boolean;
  setChecked: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const handleChange = () => {
    setChecked(!checked);
  };

  return (
    <CheckboxContainer>
      <HiddenCheckbox
        type="checkbox"
        checked={checked}
        onChange={handleChange}
      />
      <StyledCheckbox checked={checked}>
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect width="24" height="24" rx="5" fill="#5727EC" />
          <path
            d="M6.5 11.75L10.4451 15.9769C10.9132 16.4784 11.7357 16.3705 12.0586 15.7652L17 6.5"
            stroke="white"
            stroke-linecap="round"
          />
        </svg>
      </StyledCheckbox>
    </CheckboxContainer>
  );
};

export default Checkbox;
