import SelectOptions from "./SelectOptions";
import Placeholder from "./Placeholder";
import "./style.css";
import Label from "../label";
import FormGroup from "../form-group";
import { useEffect, useState } from "react";

const FormSelect = (props) => {
  const {
    options,
    placeholder,
    errorMessage,
    label,
    className,
    value,
    inline,
    onChange,
    ...otherProps
  } = props;

  const [error, setError] = useState(errorMessage);

  const handleChange = (e) => {
    setError(null);

    if (onChange) onChange(e);
  };

  useEffect(() => {
    setError(errorMessage);
  }, [errorMessage]);

  const selectProps = {
    className: `form-select`,
    value: value || placeholder || "",
    style: {
      borderColor: error ? "var(--red)" : "",
      borderWidth: error ? "2px" : "",
    },
    onChange: handleChange,
    ...otherProps,
  };

  return (
    <FormGroup className={className} inline={inline}>
      {label && <Label>{label}</Label>}
      <select {...selectProps}>
        <Placeholder>{placeholder}</Placeholder>
        <SelectOptions data={options} />
      </select>
      {error && <span className="form__validation-msg">{error}</span>}
    </FormGroup>
  );
};

export default FormSelect;
