import "./styles.css";
import { LabelProps } from "./types";

const Label = (props: LabelProps) => {
  const { children, htmlFor, className, onClick } = props || {};

  const labelProps = {
    htmlFor,
    className: `form__label${className ? ` ${className}` : ""}`,
    onClick,
  };

  return <label {...labelProps}>{children}</label>;
};

export default Label;
