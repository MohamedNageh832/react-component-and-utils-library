import { MouseEvent, ReactNode } from "react";

type ButtonColors =
  | "green"
  | "red"
  | "blue"
  | "yellow"
  | "teal"
  | "cyan"
  | "white"
  | "secondary"
  | "black"
  | "light-green";

type ButtonVariants =
  | "normal"
  | "rounded"
  | "sharp"
  | "outline"
  | "sharp-outline"
  | "rounded-outline"
  | "link";

type ButtonTypes = "submit" | "button" | "reset" | undefined;

interface ButtonProps {
  color?: ButtonColors;
  variant?: ButtonVariants;
  className?: string;
  isPending?: boolean;
  children?: ReactNode;
  disabled?: boolean;
  type?: ButtonTypes;
  onClick?: Function;
  error?: any; // Wasn't made boolean to be able to pass any value to it
}

export type { ButtonProps, ButtonColors, ButtonVariants };
