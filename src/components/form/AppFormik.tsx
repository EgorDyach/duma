import type { FormikConfig, FormikHelpers, FormikValues } from "formik";
import { Formik } from "formik";
import React, { useMemo, useRef } from "react";
import debounce from "lodash.debounce";
import { useMemoOnce } from "@hooks/useMemoOnce";

export type AppFormikProps<T> = Omit<FormikConfig<T>, "onSubmit"> & {
  onSubmit?: (v: T, helpers: FormikHelpers<T>) => void;
  onChange?: (v: T) => void;
  onDebouncedChange?: (v: T) => void;
  onValidityChange?: (v: boolean) => void;
  onDebouncedValidityChange?: (v: boolean) => void;
  externalValue?: T;
  className?: string;
};

const emptyFunction = () => null;

// TODO: add <form/>

function AppFormik<T extends FormikValues>({
  onSubmit,
  onChange,
  onDebouncedChange,
  onValidityChange,
  onDebouncedValidityChange,
  children,
  initialValues,
  ...props
}: AppFormikProps<T>): React.ReactElement {
  const initData = useMemoOnce(() => initialValues);
  const formValueRef = useRef<T>(initData);
  const isValidRef = useRef<boolean | null>(null);

  const debouncedOnChange = useMemo(() => {
    if (!onDebouncedChange) return emptyFunction;
    return debounce((v: T) => onDebouncedChange(v), 300);
  }, [onDebouncedChange]);

  const debouncedOnValidityChange = useMemo(() => {
    if (!onDebouncedValidityChange) return emptyFunction;
    return debounce((v: boolean) => onDebouncedValidityChange(v), 300);
  }, [onDebouncedValidityChange]);

  return (
    <Formik
      onSubmit={onSubmit || emptyFunction}
      initialValues={initData}
      {...props}
    >
      {(formikState) => {
        if (formValueRef.current !== formikState.values) {
          formValueRef.current = formikState.values;
          if (onChange) onChange(formikState.values);
          if (onDebouncedChange) debouncedOnChange(formikState.values);
        }

        if (isValidRef.current !== formikState.isValid) {
          isValidRef.current = formikState.isValid;
          if (onValidityChange) onValidityChange(formikState.isValid);
          if (onDebouncedValidityChange) {
            debouncedOnValidityChange(formikState.isValid);
          }
        }
        return typeof children === "function"
          ? children(formikState)
          : children;
      }}
    </Formik>
  );
}

export default AppFormik;
