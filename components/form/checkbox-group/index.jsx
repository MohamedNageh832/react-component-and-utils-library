import { Children, cloneElement, isValidElement } from "react";
import Label from "../label";

const CheckboxGroup = (props) => {
  const { label, value, children, required, className, onChange } = props;
  const noValuesChosen = Object.keys(value).length === 0;

  const handleChange = (e) => onChange(e);

  const renderChildren = Children.map(children, (child) => {
    if (!isValidElement(child)) return;
    const { name } = child.props;

    return cloneElement(child, {
      checked: value[name],
      onChange: handleChange,
      required: noValuesChosen && required,
    });
  });

  return (
    <section className={`form__group`}>
      {label && <Label>{label}</Label>}
      <section className={className ? ` ${className}` : ""}>
        {renderChildren}
      </section>
    </section>
  );
};

export default CheckboxGroup;
