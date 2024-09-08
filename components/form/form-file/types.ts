import { ChangeEvent, ReactNode } from "react";
import { ButtonColors, ButtonVariants } from "../../ui/button/types";

interface FormFileProps {
  id?: string;
  name?: string;
  label?: string;
  color?: ButtonColors;
  variant?: ButtonVariants;
  className?: string;
  icon?: boolean;
  inline?: boolean;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  children?: ReactNode;
  errorMessage?: string;
  accept?: string;
}

export type { FormFileProps };
