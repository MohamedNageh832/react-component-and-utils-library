import "./style.css";
import { IModalTitleProps } from "./types";

const ModalTitle = (props: IModalTitleProps) => {
  const { children, className } = props || {};

  const titleProps = {
    className: `modal__title${className ? ` ${className}` : ""}`,
  };

  return <h3 {...titleProps}>{children}</h3>;
};

export default ModalTitle;
