import { FormGroupProps } from "./types";
import "./style.css";

const FormGroup = (props: FormGroupProps) => {
  const { children, inline, className, ...otherProps } = props || {};

  const groupProps = {
    className: `${inline ? `form__inline-group` : "form__group"} ${
      className ? ` ${className}` : ""
    }`,
    ...otherProps,
  };

  return <section {...groupProps}>{children}</section>;
};

export default FormGroup;
