import { FormikTouched, FormikValues, useFormikContext } from "formik";
import { FormikContextType, FormikErrors } from "formik/dist/types";
import _ from "lodash";
import { useCallback } from "react";

const getErrorMessage = <T extends FormikValues>(
  errors: FormikErrors<T>,
  touched: FormikTouched<T>,
  name: string,
): string | null => {
  const errorMessage = _.get(errors, name) as string | string[];
  const isTouched = _.get(touched, name);
  const shouldShowError = errorMessage && isTouched;
  return shouldShowError
    ? Array.isArray(errorMessage)
      ? errorMessage.join(", ") || null
      : errorMessage
    : null;
};

export interface useFormContextOutput<
  T extends FormikValues,
  Name extends string,
> extends FormikContextType<T> {
  controlValue: T[Name];
  getControlError: () => string | null;
  setControlValue: (v: T[Name]) => void;
  setControlTouched: () => void;
}

export const useFormContext = <Value extends FormikValues, Name extends string>(
  name: Name,
): useFormContextOutput<Value, Name> => {
  const formikContext = useFormikContext<Value>();

  const getControlError = useCallback(
    () => getErrorMessage(formikContext.errors, formikContext.touched, name),
    [formikContext.errors, formikContext.touched, name],
  );

  const setControlValue = useCallback(
    (v: Value[string]) => formikContext.setFieldValue(name, v),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [name],
  );

  const setControlTouched = useCallback(
    () => {
      if (_.get(formikContext.touched, name)) return;
      formikContext.setFieldTouched(name, true);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [name, formikContext.touched],
  );

  const controlValue = _.get(formikContext.values, name);

  return {
    ...formikContext,
    getControlError,
    setControlValue,
    setControlTouched,
    controlValue,
  };
};
