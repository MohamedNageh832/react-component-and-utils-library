import { CSSProperties, ReactNode } from "react";

type TextSizes = "xs" | "sm" | "md" | "lg" | "xl";

type FontWeight =
  | "light"
  | "regular"
  | "medium"
  | "semibold"
  | "bold"
  | "black";

// TODO: Transform all colors into a global type
type TextColors =
  | "blue"
  | "red"
  | "green"
  | "indigo"
  | "teal"
  | "cyan"
  | "yellow"
  | "secondary"
  | "black";

interface TextProps {
  size?: TextSizes;
  color?: TextColors;
  inline?: boolean;
  className?: string;
  children?: ReactNode;
  fw?: FontWeight;
  whiteSpace?: CSSProperties["whiteSpace"];
}

export type { TextProps };
