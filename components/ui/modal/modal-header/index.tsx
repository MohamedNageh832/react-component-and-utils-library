import { IModalHeaderProps } from "./types";
import "./styles.css";

const ModalHeader = (props: IModalHeaderProps) => {
  const { children, className } = props || {};

  const headerProps = {
    className: `modal__header${className ? ` ${className}` : ""}`,
  };

  return <header {...headerProps}>{children}</header>;
};

export default ModalHeader;
