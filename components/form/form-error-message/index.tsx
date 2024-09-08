import { AiOutlineExclamationCircle } from "react-icons/ai";
import { FormErrorMessageProps } from "./types";
import "./styles.css";

const FormErrorMessage = (props: FormErrorMessageProps) => {
  const { children } = props;

  return (
    <div className="form-error">
      <AiOutlineExclamationCircle className="form-error__icon" />
      <p className="form-error__message">{children}</p>
    </div>
  );
};

export default FormErrorMessage;
