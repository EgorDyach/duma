import { FC, ReactNode } from "react";
import { ModalType } from "./types";
import { InformationModal } from "./ModalViews/InformationModal";
import { ModalWidth, modalSizes } from "./constants";

export const getModalView = (type?: ModalType): FC<ModalViewProps> => {
  return InformationModal;
};

export const getModalSize = (size: ModalWidth) => {
  return modalSizes[size];
};

export const getIcon = (type?: ModalType) => {
  if (type === "ConfirmationModal") return "success";
  if (type === "FailureModal") return "warning";

  return null;
};

export interface ModalViewProps {
  title: ReactNode;
  onConfirm?: () => void;
  hideModal: () => void;
  description: ReactNode;
  cancelText?: string;
  okText?: string;
  size: ModalWidth;
}
