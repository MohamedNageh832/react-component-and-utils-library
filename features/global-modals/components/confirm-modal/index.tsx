import { AiFillQuestionCircle } from "react-icons/ai";
import { Button, Modal, Text } from "@/components/ui";
import { useSnapshot } from "valtio";
import { modalsStore } from "@/features/global-modals";
import { FormInput } from "@/components/form";
import { ChangeEvent, FormEvent, useState } from "react";

type ConfirmValues = { password: string; error?: string | null };

const ConfirmModal = () => {
  const { confirmModal, showConfirmModal } = useSnapshot(modalsStore);
  if (!confirmModal.config) return null;

  const [values, setValues] = useState<ConfirmValues>({
    password: "",
    error: null,
  });

  const { title, message, password, onConfirm, onCancel } = confirmModal.config;

  const handleConfirm = () => {
    if (password && values.password !== password) {
      return setValues((prev) => ({
        ...prev,
        error: "كلمة التأكيد غير مطابقة",
      }));
    } else {
      setValues((prev) => ({ ...prev, error: null }));
    }

    onConfirm();
    showConfirmModal(false);
  };

  const handleCancel = () => {
    if (onCancel) onCancel();
    showConfirmModal(false);
  };

  const handlePassChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValues((prev) => ({ password: e.target.value }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    handleConfirm();
  };

  return (
    <Modal>
      <Modal.Header className="flex gap-3 align-center">
        <Modal.Badge color="cyan">
          <AiFillQuestionCircle />
        </Modal.Badge>

        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>

      <Modal.Body className="flex flex-column gap-2">
        <Text color="secondary" whiteSpace="pre-line">
          {message}
        </Text>
        {password && (
          <form onSubmit={handleSubmit}>
            <FormInput
              variant="normal"
              value={values.password}
              onChange={handlePassChange}
              errorMessage={values.error}
            />
          </form>
        )}
      </Modal.Body>

      <Modal.Footer className="flex gap-3 flex-wrap">
        <Button color="cyan" variant="rounded" onClick={handleConfirm}>
          تأكيد
        </Button>
        <Button
          color="secondary"
          variant="rounded-outline"
          onClick={handleCancel}
        >
          إلغاء
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ConfirmModal;
