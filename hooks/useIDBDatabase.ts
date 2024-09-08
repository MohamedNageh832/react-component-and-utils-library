import { initDB } from "@/config";
import { usersStore } from "@/features/current-users";
import { examsStore } from "@/features/exams";
import { modalsStore } from "@/features/global-modals";
import { useEffect, useRef } from "react";
import { useSnapshot } from "valtio";

export const useIDBDatabase = () => {
  const isMounted = useRef(false);
  const { getUsers } = useSnapshot(usersStore);
  const { getExams } = useSnapshot(examsStore);
  const { showLoadingModal, showSuccessModal } = useSnapshot(modalsStore);
  const connectToDB = async () => {
    showLoadingModal(true, {
      message: "جار تجهيز قاعدة البيانات...",
    });

    await initDB();
    await getUsers();
    await getExams();

    showLoadingModal(false);

    showSuccessModal(true, {
      title: "تم الاتصال",
      message: "تم الاتصال بقاعدة البيانات بنجاح",
    });
  };

  useEffect(() => {
    if (isMounted.current) return;

    isMounted.current = true;
    connectToDB();
  }, []);
};
