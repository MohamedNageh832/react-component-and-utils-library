import { ChangeEvent, useEffect, useState } from "react";
import Radio from "../radio";
import { MultiBtnGroupInterface } from "./types";
import FormErrorMessage from "../form-error-message";
import "./style.css";

const MultiBtnGroup = (props: MultiBtnGroupInterface) => {
  const { values, value, onChange, name, className, errorMessage } = props;
  const [error, setError] = useState(errorMessage);

  useEffect(() => {
    setError(errorMessage);
  }, [errorMessage]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setError(null);

    if (onChange) onChange(e);
  };

  const parentProps = {
    className: "multi-btn-group",
  };

  return (
    <section {...parentProps}>
      {error && <FormErrorMessage>{error}</FormErrorMessage>}

      <section
        className={`multi-btn-group__radios${className ? ` ${className}` : ""}`}
      >
        {values.map((input, i) => (
          <Radio
            className={`multi-btn-group__btn${
              input.value == value ? " multi-btn-group__btn--active" : ""
            }`}
            key={`multibtn-${i}`}
            name={name}
            value={`${input.value}`}
            onChange={handleChange}
            checked={input.value === value}
          >
            {input.text}
          </Radio>
        ))}
      </section>
    </section>
  );
};

export default MultiBtnGroup;
