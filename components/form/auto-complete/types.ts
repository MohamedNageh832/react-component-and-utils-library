interface AutoCompleteProps {
  label?: string;
  options: any[];
  name?: string;
  value?: string;
  placeholder?: string;
  errorMessage?: string | null;
  onChange?: (name: string, value: string) => void;
}

export type { AutoCompleteProps };
