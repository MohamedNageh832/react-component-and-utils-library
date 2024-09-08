import { ChangeEvent } from "react";

interface ValueInterface {
  value: string | number;
  text: string | number;
}

type Values = Array<ValueInterface>;

interface MultiBtnGroupInterface {
  values: Values;
  value?: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  name?: string;
  inline?: boolean;
  className?: string;
  errorMessage: string | null;
}

export type { MultiBtnGroupInterface };
