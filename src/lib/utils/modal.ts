import {
  CloseModal,
  MODAL_EVENT_NAME,
  ModalEvent,
  OpenModal,
  ShowModal,
} from '@components/Modal/types';

const createModalEvent = (data: OpenModal | CloseModal): ModalEvent =>
  new CustomEvent(MODAL_EVENT_NAME, {
    detail: {
      ...data,
    },
  });

const fireEventOnBody = (event: ModalEvent): void => {
  if (!window?.document?.body) {
    console.error("Can't fire CustomEvent");
    return;
  }
  window.document.body.dispatchEvent(event);
};
const showModalFn = (visible: boolean) => (data?: ShowModal) =>
  fireEventOnBody(createModalEvent({ visible, ...data }));

export const showModal = showModalFn(true);

export const closeModal = () =>
  fireEventOnBody(createModalEvent({ visible: false }));
