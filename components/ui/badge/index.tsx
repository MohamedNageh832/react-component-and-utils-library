import { BadgeProps } from "./types";
import "./style.css";

const Badge = (props: BadgeProps) => {
  const { type, children, className } = props || {};

  const parentProps = {
    className: `badge${type ? ` badge--${type}` : ""}${
      className ? ` ${className}` : ""
    }`,
  };

  return <small {...parentProps}>{children}</small>;
};

export default Badge;
