import { FormEvent, ReactNode } from "react";

interface FormProps {
  children?: ReactNode;
  onSubmit?: (e: FormEvent<HTMLFormElement>) => void;
  className?: string;
}

export { FormProps };
