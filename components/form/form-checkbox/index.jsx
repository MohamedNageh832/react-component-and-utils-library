import Label from "../label";
import "./style.css";

const FormCheckbox = (props) => {
  const { value, checked, id, name, onChange, children, label, ...otherProps } =
    props;

  const checkboxInputProps = {
    id: id || name,
    className: "checkbox__input",
    name,
    type: "checkbox",
    onChange,
    ...otherProps,
  };

  const labelText = children || label;

  return (
    <section className="checkbox">
      <span className="checkbox__ui">
        <input {...checkboxInputProps} />
        <span className="checkbox__check"></span>
      </span>
      {labelText && <Label htmlFor={id || name}>{labelText}</Label>}
    </section>
  );
};

export default FormCheckbox;
