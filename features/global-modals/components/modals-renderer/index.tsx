import { useSnapshot } from "valtio";
import { modalsStore } from "../../store";
import {
  ConfirmModal,
  ErrorModal,
  LoadingModal,
  SuccessModal,
} from "@/features/global-modals";

const ModalsRenderer = () => {
  const { loadingModal, successModal, confirmModal, errorModal } =
    useSnapshot(modalsStore);

  return (
    <>
      {loadingModal.show && <LoadingModal />}
      {successModal.show && <SuccessModal />}
      {confirmModal.show && <ConfirmModal />}
      {errorModal.show && <ErrorModal />}
      {/* !: modals order was chosen for z-index purposes */}
    </>
  );
};

export default ModalsRenderer;
