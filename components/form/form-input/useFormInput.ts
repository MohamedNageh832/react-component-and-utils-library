import { useRef, useEffect, useState, ChangeEvent } from "react";
import { isValidUrl } from "../../../utils";
import { getInputLength } from "./getInputLength";
import { FormInputProps } from "./types";

const useFormInput = (props: FormInputProps) => {
  const {
    label,
    className,
    onChange,
    onBlur,
    type,
    name,
    errorMessage,
    children,
    autoFocus,
    fitContent,
    variant = "rounded",
    ...otherProps
  } = props || {};

  const [error, setError] = useState(errorMessage);
  const inputRef = useRef<HTMLInputElement>();

  const validateUrl = (value: string) => {
    if (type === "url") {
      const validUrl = isValidUrl(value);
      if (!validUrl) return;
      setError("عنوان ال url غير صحيح");
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    validateUrl(value);

    if (value === "") setError(errorMessage);
    else setError(null);

    if (onChange) onChange(e);
  };

  const parentProps = {
    className: className ? ` ${className}` : "",
  };

  const inputProps = {
    id: name,
    name,
    type: type !== "url" ? type : "text",
    className: `form-input form-input--${variant}`,
    style: {
      borderColor: error ? "var(--red)" : "",
      borderWidth: error ? "2px" : "",
    },
    onChange: handleChange,
    onBlur,
    ref: inputRef,
    ...otherProps,
  };

  useEffect(() => {
    if (!inputRef.current) return;

    if (fitContent) {
      inputRef.current.style.width = getInputLength(inputRef.current);

      inputRef.current.addEventListener("input", (e: InputEvent) => {
        (e.target as HTMLInputElement).style.width = getInputLength(e.target);
      });
    }

    if (inputRef.current.value) validateUrl(inputRef.current.value);

    if (autoFocus) inputRef.current.focus();
  }, [inputRef.current]);

  useEffect(() => {
    setError(errorMessage);

    if (!errorMessage) return;
    inputRef.current.focus();
  }, [errorMessage]);

  const labelProps = {
    htmlFor: name,
    className: "form__label",
  };

  return {
    label,
    inputProps,
    labelProps,
    parentProps,
    children,
    errorMessage: error,
  };
};

export default useFormInput;
