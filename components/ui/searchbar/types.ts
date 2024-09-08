import { ChangeEvent } from "react";

interface SearchbarProps {
  id?: string;
  name?: string;
  value?: string;
  placeholder?: string;
  onChange?: (name: string, value: string) => void;
  className?: string;
  label?: string;
}

export type { SearchbarProps };
