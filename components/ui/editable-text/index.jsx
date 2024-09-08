import { useEffect, useRef, useState } from "react";
import {
  Checkbox,
  CheckboxGroup,
  FormInput,
  FormSelect,
  FormTextarea,
} from "../../form";
import SkeletonLoader from "../skeleton-loader";
import "./style.css";
import { SlPencil } from "react-icons/sl";
import Text from "../text";

const EditableText = ({
  children,
  className,
  onChange,
  onBlur,
  label,
  type,
  dir,
  placeholder,
  errorMessage,
  inputOptions,
  skeleton,
  ...otherProps
}) => {
  const editableTextRef = useRef();
  const [value, setValue] = useState(children);
  const [isEditting, setIsEditting] = useState();
  const [error, setError] = useState(errorMessage);

  useEffect(() => {
    setValue(children);
  }, [children]);

  useEffect(() => {
    if (!errorMessage) return;
    setError(errorMessage);
  }, [errorMessage]);

  useEffect(() => {
    if (!editableTextRef.current) return;

    const handleWindowClick = (e) => {
      if (
        e.target !== editableTextRef.current &&
        !editableTextRef.current.contains(e.target)
      ) {
        setIsEditting(false);
      }
    };

    if (isEditting) window.addEventListener("click", handleWindowClick);
    else window.removeEventListener("click", handleWindowClick);

    return () => window.removeEventListener("click", handleWindowClick);
  }, [isEditting, editableTextRef]);

  const handleClick = (e) => {
    e.stopPropagation();

    setIsEditting(true);
  };

  const handleBlur = (e) => {
    setIsEditting(false);
    if (onBlur) onBlur(e);
  };

  const handleChange = (e) => {
    const { value } = e.target;
    setValue(value);

    if (value === "" && errorMessage) setError(errorMessage);
    else setError(null);

    if (onChange) onChange(e);
  };

  const globalProps = {
    value,
    className: "editable-text__input",
    ...otherProps,
  };

  const inputProps = {
    className: "editable-text__input",
    onChange: handleChange,
    onBlur: handleBlur,
    ...globalProps,
  };

  const iconProps = {
    className: "editable-text__icon",
    onClick: handleClick,
    icon: "pen",
  };

  const selectProps = {
    options: inputOptions,
    onChange: handleChange,
    onBlur: handleBlur,
    ...globalProps,
  };

  const checkboxGroupProps = {
    ...globalProps,
    onChange,
  };

  const inputElements = new Map([
    ["textarea", <FormTextarea {...inputProps} autoFocus />],
    ["select", <FormSelect {...selectProps} />],
    [
      "checkboxGroup",
      <CheckboxGroup {...checkboxGroupProps}>
        {inputOptions &&
          inputOptions.map((option, i) => {
            const { label, ...otherProps } = option;

            return (
              <Checkbox key={`e-checkbox-${i}`} {...otherProps}>
                {label}
              </Checkbox>
            );
          })}
      </CheckboxGroup>,
    ],
  ]);

  const getInputElement = (type) => {
    const element = inputElements.get(type);

    if (element) return element;

    return <FormInput type={type || "text"} {...inputProps} autoFocus />;
  };

  return (
    <section
      ref={editableTextRef}
      className={`editable-text${className ? ` ${className}` : ""}`}
    >
      {label && (
        <label className="editable-text__label">
          {label}
          <SlPencil {...iconProps} />
        </label>
      )}
      {isEditting ? (
        getInputElement(type)
      ) : (
        <span className="editable-text__text">
          {value ? (
            <span style={{ direction: dir }}>{value}</span>
          ) : placeholder ? (
            <span className="editable-text__placeholder">{placeholder}</span>
          ) : skeleton ? (
            <SkeletonLoader rows={type === "textarea" ? 3 : 1} />
          ) : (
            <Text color="black">لا يوجد</Text>
          )}
          {!label && <SlPencil {...iconProps} />}
        </span>
      )}
      {error && <span className="editable-text__error">{error}</span>}
    </section>
  );
};

export default EditableText;
