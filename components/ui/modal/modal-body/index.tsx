import { IModalBodyProps } from "./types";
import "./style.css";

const ModalBody = (props: IModalBodyProps) => {
  const { children, className } = props || {};

  const modalBodyProps = {
    className: `modal__body${className ? ` ${className}` : ""}`,
  };

  return <section {...modalBodyProps}>{children}</section>;
};

export default ModalBody;
