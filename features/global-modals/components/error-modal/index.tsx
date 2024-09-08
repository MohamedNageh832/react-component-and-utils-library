import { AiOutlineClose } from "react-icons/ai";
import { Button, Modal, Text } from "@/components/ui";
import "./style.css";
import { useSnapshot } from "valtio";
import { modalsStore } from "@/features/global-modals";

const ErrorModal = () => {
  const { errorModal, showErrorModal } = useSnapshot(modalsStore);
  const { title, message } = errorModal.config;

  const hideModal = () => {
    showErrorModal(false);
  };

  const modalProps = {
    className: "error-modal",
    options: { closeBtn: false },
  };

  return (
    <Modal {...modalProps}>
      <Modal.Header className="error-modal__header">
        <Modal.Badge color="red">
          <AiOutlineClose />
        </Modal.Badge>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Text size="sm" color="secondary" whiteSpace="pre-line">
          {message}
        </Text>
      </Modal.Body>

      <Modal.Footer>
        <Button color="secondary" variant="rounded-outline" onClick={hideModal}>
          اغلاق
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ErrorModal;
