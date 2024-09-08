import { forwardRef } from "react";
import useFormInput from "./useFormInput";
import "./style.css";
import FormGroup from "../form-group";
import { FormInputProps } from "./types";

const FormInput = forwardRef(function FormInput(
  props: FormInputProps,
  forwardedRef
) {
  const { label, inputProps, parentProps, children, labelProps, errorMessage } =
    useFormInput(props);

  return (
    <FormGroup {...parentProps}>
      {label && <label {...labelProps}>{label}</label>}
      <input {...inputProps} />
      {errorMessage && (
        <span className="form__validation-msg">{errorMessage}</span>
      )}
      {children}
    </FormGroup>
  );
});

export default FormInput;
