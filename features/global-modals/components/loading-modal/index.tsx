import { useSnapshot } from "valtio";
import { Overlay, SpinnerLoader } from "@/components/ui";
import { modalsStore } from "@/features/global-modals";

const LoadingModal = () => {
  const { loadingModal } = useSnapshot(modalsStore);
  const { overlay, message } = loadingModal.config || {};

  return (
    <Overlay>
      <SpinnerLoader message={message} />
    </Overlay>
  );
};

export default LoadingModal;
