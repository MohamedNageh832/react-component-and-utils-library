import { Children, cloneElement, isValidElement } from "react";
import FormGroup from "../form-group";
import Label from "../label";

import "./style.css";

const RadioGroup = (props) => {
  const { value, children, required, onChange, name, inline, label } = props;

  const handleChange = (e) => {
    const { value } = e.target;
    onChange(name, value);
  };

  const renderChildren = Children.map(children, (child) => {
    if (!isValidElement(child)) return;
    const { value: radioValue } = child.props;

    return cloneElement(child, {
      checked: value === radioValue,
      onChange: handleChange,
      required: value !== "" && required,
    });
  });

  return (
    <section className="radio-group">
      {label && <Label>{label}</Label>}
      <FormGroup inline={inline}>{renderChildren}</FormGroup>
    </section>
  );
};

export default RadioGroup;
