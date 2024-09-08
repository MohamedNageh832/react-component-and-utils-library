import { ReactNode } from "react";

type Variant = "normal" | "rounded";
type SelectValue = string | number;

interface Option {
  value: SelectValue;
  children: ReactNode;
}

interface SelectOptionProps {
  value?: SelectValue;
  children?: ReactNode;
  selected?: boolean;
  className?: string;
  disabled?: boolean;
  onClick?: (option: Option) => void;
}

interface SelectProps {
  id?: string;
  name?: string;
  label?: string;
  value?: string | null;
  className?: string;
  multiple?: boolean;
  variant?: Variant;
  inline?: boolean;
  placeholder?: string;
  children?: ReactNode;
  errorMessage?: string | null;
  onChange?: (name: string, value: string) => void;
}

export type { SelectProps, SelectOptionProps, Option, SelectValue };
