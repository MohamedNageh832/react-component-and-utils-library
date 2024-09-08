import "./styles.css";
import { ButtonProps } from "./types";

const Button = (props: ButtonProps) => {
  const {
    className,
    color,
    variant = "normal",
    isPending,
    children,
    disabled,
    type,
    error,
    onClick,
  } = props || {};

  const btnProps = {
    className: `btn btn--${color} btn--${variant}${
      className ? ` ${className}` : ""
    }${isPending ? " btn--is-pending" : ""}${disabled ? " btn--disabled" : ""}${
      error ? " btn--error" : ""
    }`,
    onClick,
    type: type || "button",
    disabled,
  };

  return (
    <button {...btnProps}>
      {children}
      {isPending && <span className="btn__loader"></span>}
    </button>
  );
};

export default Button;
