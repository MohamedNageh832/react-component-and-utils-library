type Values = {
  loadingModal: {
    show: boolean;
    config: { overlay?: boolean; message?: string };
  };
  errorModal: { show: boolean; config: { title: string; message: string } };
  successModal: { show: boolean; config: { title: string; message: string } };
  confirmModal: {
    show: boolean;
    config: {
      title: string;
      message: string;
      password?: string | null;
      onConfirm: Function;
      onCancel?: Function;
    };
  };
};

type ShowLoadingModalFn = (
  show: boolean,
  config?: { overlay?: boolean; message?: string }
) => void;

type ShowErrorModalFn = (
  show: boolean,
  config?: { title: string; message: string }
) => void;

type ShowSuccessModalFn = (
  show: boolean,
  config?: { title: string; message: string }
) => void;

type ShowConfirmModalFn = (
  show: boolean,
  config?: Values["confirmModal"]["config"]
) => void;

type ModalsStore = Values & {
  showLoadingModal: ShowLoadingModalFn;
  showErrorModal: ShowErrorModalFn;
  showSuccessModal: ShowSuccessModalFn;
  showConfirmModal: ShowConfirmModalFn;
};

export type {
  Values,
  ShowLoadingModalFn,
  ShowErrorModalFn,
  ShowSuccessModalFn,
  ShowConfirmModalFn,
  ModalsStore,
};
