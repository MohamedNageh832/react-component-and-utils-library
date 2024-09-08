import { AiOutlineCheck } from "react-icons/ai";
import { useSnapshot } from "valtio";
import { Button, Modal, Text } from "@/components/ui";
import { modalsStore } from "@/features/global-modals";
import "./style.css";

const SuccessModal = () => {
  const { successModal, showSuccessModal } = useSnapshot(modalsStore);
  const { title, message } = successModal.config;

  const hideModal = () => showSuccessModal(false);

  const modalProps = {
    className: "success-modal",
    hideModal: hideModal,
    options: { closeBtn: false },
  };

  return (
    <Modal {...modalProps}>
      <Modal.Header className="success-modal__header">
        <Modal.Badge color="green">
          <AiOutlineCheck />
        </Modal.Badge>

        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Text size="sm" color="secondary">
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

export default SuccessModal;
