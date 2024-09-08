import { IModalBadgeProps } from "./types";
import "./style.css";

const ModalBadge = (props: IModalBadgeProps) => {
  const { color = "green", children } = props || {};

  const badgeProps = {
    className: `modal__badge${color ? ` modal__badge--${color}` : ""}`,
  };

  return <span {...badgeProps}>{children}</span>;
};

export default ModalBadge;
