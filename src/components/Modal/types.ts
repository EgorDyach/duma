import { ReactNode } from "react";
import { ModalWidth } from "./constants";

export type ModalType = "InformationModal" | "addingModal";

export type OpenModal = {
  visible: boolean;
  title: ReactNode;
  type: ModalType;
  description?: ReactNode;
  cancelText?: string;
  hideModal: VoidFunction;
  onOk?: VoidFunction;
  okText?: string;
  size: ModalWidth;
};

export type ShowModal = Omit<OpenModal, "visible">;

export type CloseModal = {
  visible: boolean;
};

export type ModalEvent = CustomEvent<OpenModal | CloseModal>;

export const MODAL_EVENT_NAME = "modalWindow";
