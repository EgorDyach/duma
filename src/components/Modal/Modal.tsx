import { FC, useEffect, useState } from "react";
import Portal from "@components/Portal";
import { useEffectOnce } from "@hooks/useEffectOnce";
import { Backdrop } from "./ModalStyles";
import { MODAL_EVENT_NAME, ModalEvent, OpenModal } from "./types";
import { getModalView } from "./helpers";

export const Modal: FC = () => {
  const [content, setContent] = useState<OpenModal | null>(null);

  useEffectOnce(() => {
    const emitterNode = window?.document?.body;
    if (!emitterNode) return;

    const showModalHandler: EventListener = (e) => {
      const detail = (e as ModalEvent).detail;
      detail.visible ? setContent(detail as OpenModal) : setContent(null);
    };
    emitterNode.addEventListener(MODAL_EVENT_NAME, showModalHandler);

    return () => {
      emitterNode.removeEventListener(MODAL_EVENT_NAME, showModalHandler);
      setContent(null);
    };
  });

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && content?.visible === true) {
        setContent(null);
      }
    };
    content?.visible
      ? (document.body.style.overflow = "hidden")
      : (document.body.style.overflow = "unset");
    document.addEventListener("keydown", onKeyDown, false);
    return () => {
      document.removeEventListener("keydown", onKeyDown, false);
    };
  }, [content]);
  const ModalView = getModalView(content?.type);

  return (
    <>
      {content?.visible && (
        <Portal elementId="overlay">
          <Backdrop onClick={content.hideModal} />
          <ModalView
            title={content.title}
            onConfirm={content?.onOk}
            hideModal={content.hideModal}
            description={content?.description}
            cancelText={content.cancelText}
            okText={content?.okText}
            size={content.size}
          />
        </Portal>
      )}
    </>
  );
};
