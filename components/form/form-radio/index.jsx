import "./style.css";

const FormRadio = (props) => {
  const {
    value,
    checked,
    onChange,
    label,
    className,
    children,
    ...otherProps
  } = props;

  const inputProps = {
    className: `radio__input`,
    type: "radio",
    value: value || "",
    onChange: onChange || undefined,
    checked,
    ...otherProps,
  };

  const holderProps = {
    className: `form__radio${className ? ` ${className}` : ""}${
      checked ? " active" : ""
    }${label || children ? " form__radio--with-label" : ""}`,
  };

  return (
    <div {...holderProps}>
      <span className="radio__check"></span>
      {children}
      {label && label}
      <input {...inputProps} />
    </div>
  );
};

export default FormRadio;
