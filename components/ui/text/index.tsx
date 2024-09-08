import { TextProps } from "./types";
import "./styles.css";

const Text = (props: TextProps) => {
  const { size, color, inline, children, whiteSpace, className, fw } =
    props || {};

  // c-${color} is  a global utility class
  const textprops = {
    className: `text${size ? ` text--${size}` : ""}${
      color ? ` c-${color}` : ""
    }${className ? ` ${className}` : ""}${inline ? ` text--inline` : ""}${
      fw ? ` text--${fw}` : ""
    }`,
    style: { whiteSpace },
  };

  return <p {...textprops}>{children}</p>;
};

export default Text;
