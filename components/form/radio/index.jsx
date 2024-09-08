import "./style.css";

const Radio = (props) => {
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
    }`,
  };

  return (
    <div {...holderProps}>
      {children}
      <input {...inputProps} />
    </div>
  );
};

export default Radio;
