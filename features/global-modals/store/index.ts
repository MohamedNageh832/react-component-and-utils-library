import { proxy } from "valtio";
import {
  ModalsStore,
  ShowConfirmModalFn,
  ShowErrorModalFn,
  ShowLoadingModalFn,
  ShowSuccessModalFn,
  Values,
} from "./types";
import { deepClone } from "@/utils";

export const initialValues: Values = {
  loadingModal: { show: false, config: { overlay: false } },
  errorModal: { show: false, config: { title: "خطأ", message: "حدث خطأ!" } },
  successModal: { show: false, config: { title: "تم", message: "" } },
  confirmModal: {
    show: false,
    config: {
      title: "تأكيد؟",
      message: "",
      onConfirm: () => {},
    },
  },
};

const showLoadingModal: ShowLoadingModalFn = (show, config) => {
  const processedConfig = config || {};

  if (!config || !config.message) processedConfig.message = "جار التحميل...";

  modalsStore.loadingModal.show = show;
  modalsStore.loadingModal.config = processedConfig;
};

const showErrorModal: ShowErrorModalFn = (show, config) => {
  const processedConfig = config || { title: "خطأ!", message: "حدث خطأ" };

  modalsStore.errorModal.show = show;
  modalsStore.errorModal.config = processedConfig;
};

const showSuccessModal: ShowSuccessModalFn = (show, config) => {
  const processedConfig = config || {
    title: "تم",
    message: "تمت العملية بنجاح",
  };

  modalsStore.successModal.show = show;
  modalsStore.successModal.config = processedConfig;
};

const showConfirmModal: ShowConfirmModalFn = (show, config) => {
  if (config && !config.onConfirm)
    throw Error(
      `Error: Why would you use a confirm modal without providing an onConfirm function`
    );

  const processedConfig = config || {
    title: "تأكيد؟",
    message: "هل تريد التأكيد؟",
    password: null,
    onConfirm: () => {},
  };

  modalsStore.confirmModal.show = show;
  modalsStore.confirmModal.config = processedConfig;
};

const modalsStore = proxy<ModalsStore>({
  ...deepClone(initialValues),
  showLoadingModal,
  showErrorModal,
  showSuccessModal,
  showConfirmModal,
});

export { modalsStore };
