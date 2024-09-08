import { FormProps } from "./types";
import "./style.css";

const Form = (props: FormProps) => {
  const { children, onSubmit, className, ...otherProps } = props || {};

  const formProps = {
    className: `form ${className ? ` ${className}` : ""}`,
    onSubmit,
    ...otherProps,
  };

  return <form {...formProps}>{children}</form>;
};

export default Form;
