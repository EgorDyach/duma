import { showModal, closeModal } from "@lib/utils/modal";
import { useEffectOnce } from "./useEffectOnce";

export const useModal = () => {
  useEffectOnce(() => {
    return () => {
      closeModal();
    };
  });

  return [showModal, closeModal];
};
