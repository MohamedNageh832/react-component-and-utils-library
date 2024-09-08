import { ReactNode, ChangeEvent } from "react";

type Variant = "rounded" | "normal" | "sharp" | "underline";

interface FormInputProps {
  label?: string;
  className?: string;
  type?: string;
  name?: string;
  value?: string | number | null;
  defaultValue?: string | number | null;
  placeholder?: string;
  errorMessage?: string | null;
  children?: ReactNode;
  autoFocus?: boolean;
  fitContent?: boolean;
  variant?: Variant;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: ChangeEvent<HTMLInputElement>) => void;
}

export type { FormInputProps };
