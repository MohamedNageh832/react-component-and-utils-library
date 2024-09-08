import "./style.css";

const Checkbox = (props) => {
  const {
    label,
    id,
    name,
    small,
    children,
    checked,
    className,
    onChange,
    ...otherProps
  } = props || {};

  const checkboxProps = {
    className: `checkbox${className ? ` ${className}` : ""}${
      small ? " checkbox--sm" : ""
    }${checked ? " checked" : ""}`,
  };

  const checkboxInputProps = {
    id: id || name,
    className: "checkbox__input",
    name,
    type: "checkbox",
    onChange,
    checked,
    ...otherProps,
  };

  const labelProps = {
    className: "checkbox__label",
    htmlFor: id || name,
  };

  return (
    <div {...checkboxProps}>
      <span className="checkbox__ui">
        <span className="checkbox__check"></span>
        <input {...checkboxInputProps} />
      </span>

      {label ? (
        <label {...labelProps}>{label}</label>
      ) : (
        <label {...labelProps}>{children}</label>
      )}
    </div>
  );
};

export default Checkbox;
