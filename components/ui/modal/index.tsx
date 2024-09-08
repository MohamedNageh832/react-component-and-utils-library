import { Overlay } from "./..";
import ModalBadge from "./modal-badge";
import ModalTitle from "./modal-title";
import ModalSubtitle from "./modal-subtitle";
import ModalBody from "./modal-body";
import ModalFooter from "./modal-footer";
import ModalHeader from "./modal-header";
import { IModalProps } from "./types";
import "./style.css";
import { useKey } from "@/hooks";

const Modal = (props: IModalProps) => {
  const { children, hideModal, className, overlay = true } = props || {};

  const modalProps = {
    className: `modal${className ? ` ${className}` : ""}`,
  };

  const handler = () => {
    if (hideModal) hideModal();
  };

  useKey(["Escape"], handler);

  return (
    <>
      {overlay && <Overlay onClick={hideModal} />}
      <section {...modalProps}>{children}</section>
    </>
  );
};

Modal.Header = ModalHeader;
Modal.Badge = ModalBadge;
Modal.Title = ModalTitle;
Modal.Body = ModalBody;
Modal.Subtitle = ModalSubtitle;
Modal.Footer = ModalFooter;

export default Modal;
