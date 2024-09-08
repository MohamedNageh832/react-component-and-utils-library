import { ReactNode } from "react";

interface IModalProps {
  children: ReactNode;
  hideModal?: () => void;
  className?: string;
  overlay?: boolean;
}

export type { IModalProps };
