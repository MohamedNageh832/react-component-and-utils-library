import { useRef, useState, useEffect, ChangeEvent } from "react";
import { TbFileUpload } from "react-icons/tb";
import { FormFileProps } from "./types";
import { ButtonProps } from "../../ui/button/types";
import Label from "../label";
import "./style.css";
import Button from "../../ui/button";
import FormGroup from "../form-group";
import FormErrorMessage from "../form-error-message";

const FormFile = (props: FormFileProps) => {
  const {
    id,
    name,
    label,
    inline,
    className,
    icon = true,
    onChange,
    color = "secondary",
    variant = "rounded-outline",
    children,
    errorMessage,
    accept,
  } = props || {};
  const inputRef = useRef<HTMLInputElement>();
  const [error, setError] = useState(errorMessage);

  useEffect(() => {
    if (errorMessage !== error) setError(errorMessage);
  }, [errorMessage]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setError(undefined);
    if (onChange) onChange(e);
  };

  const inputProps = {
    id: id || name,
    name,
    className: "form-file__input",
    type: "file",
    multiple: true,
    ref: inputRef,
    onChange: handleChange,
    accept,
  };

  const handleClick = () => {
    if (!inputRef.current) return;

    inputRef.current.click();
  };

  const btnProps: ButtonProps = {
    className: `form-file__btn${error ? " form-file__btn--error" : ""}`,
    color,
    variant,
    onClick: handleClick,
  };

  return (
    <FormGroup
      className={`${className ? ` ${className}` : ""}`}
      inline={inline}
    >
      {label && <Label htmlFor={inputProps.id}>{label}</Label>}
      <section className="form-file__body">
        <Button {...btnProps}>
          {icon && <TbFileUpload className="btn__icon" />}
          {children}
        </Button>
        <input {...inputProps} />
      </section>
      {error && <FormErrorMessage>{error}</FormErrorMessage>}
    </FormGroup>
  );
};

export default FormFile;
