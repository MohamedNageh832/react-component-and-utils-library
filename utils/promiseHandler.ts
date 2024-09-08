import { modalsStore } from "@/features/global-modals";

type Response = [any, null] | [null, any];

type PromiseHandlerFunc = <T>(promise: Promise<T>) => Promise<Response>;

export const promiseHandler: PromiseHandlerFunc = async (promise) => {
  const { showLoadingModal } = modalsStore;

  showLoadingModal(true);

  try {
    const response = await promise;

    showLoadingModal(false);
    return [response, null];
  } catch (error) {
    showLoadingModal(false);
    return [null, error];
  }
};
