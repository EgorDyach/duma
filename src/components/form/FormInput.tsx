import { FC } from "react";
import Input, { InputProps } from "@components/Input/Input";
import { FormControlProps, IndentStylesProps } from "@type/common";
import { useFormContext } from "@hooks/useFormContext";
import FieldError from "./FieldError";

export type FormInputProps = Omit<InputProps, "value" | "onChange" | "onBlur"> &
  FormControlProps &
  IndentStylesProps;

const FormInput: FC<FormInputProps> = ({ name, ...restProps }) => {
  const { controlValue, setControlValue, setControlTouched, getControlError } =
    useFormContext(name);
  const error = getControlError();

  return (
    <>
      <Input
        {...restProps}
        value={controlValue}
        onChange={setControlValue}
        onBlur={setControlTouched}
      />
      <FieldError error={error} />
    </>
  );
};

export default FormInput;
