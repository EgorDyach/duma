import { RefObject, useRef } from "react";
import { FormikProps } from "formik/dist/types";
import { FormikValues } from "formik";

export const useFormRef = <T extends FormikValues>(): RefObject<
  FormikProps<T>
> => {
  return useRef() as RefObject<FormikProps<T>>;
};
