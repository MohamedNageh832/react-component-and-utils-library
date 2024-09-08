import Label from "../label";
import "./style.css";

const FormCheckboxBtn = (props) => {
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

  const labelProps = {
    className: `checkbox-btn-label`,
    htmlFor: id || name,
  };

  return (
    <section className={`checkbox-btn${checked ? " checked" : ""}`}>
      <span className="checkbox-btn__ui">
        <input {...checkboxInputProps} />
        <span className="checkbox-btn__check"></span>
      </span>
      {labelText && <Label {...labelProps}>{labelText}</Label>}
    </section>
  );
};

export default FormCheckboxBtn;
