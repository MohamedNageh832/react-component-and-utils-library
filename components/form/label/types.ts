import { ReactNode } from "react";

interface LabelProps {
  htmlFor?: string;
  className?: string;
  children?: ReactNode;
  onClick?: () => void;
}

export { LabelProps };
