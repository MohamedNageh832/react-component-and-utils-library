import { IModalFooterProps } from "./types";
import "./styles.css";

const ModalFooter = (props: IModalFooterProps) => {
  const { children, className } = props || {};

  const ModalControlsProps = {
    className: `modal__footer${className ? ` ${className}` : ""}`,
  };

  return <section {...ModalControlsProps}>{children}</section>;
};

export default ModalFooter;
