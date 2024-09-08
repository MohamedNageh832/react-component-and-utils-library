import { useEffect, useRef, useState } from "react";
import Label from "../label";
import "./style.css";

const FormTextarea = (props) => {
  const {
    className,
    onChange,
    errorMessage,
    value,
    autoFocus,
    label,
    ...otherProps
  } = props;
  const textareaRef = useRef();
  const [error, setError] = useState(errorMessage);

  const adjustHeight = () => {
    if (!textareaRef.current) return;

    textareaRef.current.style.height = `0`;
    textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
  };

  useEffect(() => {
    if (!textareaRef.current) return;
    if (value === "") adjustHeight();
  }, [value]);

  const handleChange = (e) => {
    adjustHeight();
    setError(null);
    onChange(e);
  };

  useEffect(() => {
    if (!textareaRef.current) return;

    if (autoFocus) textareaRef.current.focus();

    textareaRef.current.style.height = `${
      textareaRef.current.scrollHeight + 2
    }px`;
  }, [textareaRef, autoFocus]);

  useEffect(() => {
    setError(errorMessage);

    if (!errorMessage) return;
    textareaRef.current.focus();
  }, [errorMessage]);

  const textareaProps = {
    className: `form__textarea${className ? ` ${className}` : ""}`,
    ref: textareaRef,
    value,
    onChange: handleChange,
    style: {
      borderColor: error ? "var(--red)" : "",
      borderWidth: error ? "2px" : "",
    },
    ...otherProps,
  };

  return (
    <section className="form__group">
      {label && <Label>{label}</Label>}
      <textarea {...textareaProps}></textarea>
      {error && <span className="form__validation-msg">{error}</span>}
    </section>
  );
};

export default FormTextarea;
