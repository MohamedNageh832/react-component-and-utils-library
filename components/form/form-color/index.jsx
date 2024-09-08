const FormColor = (props) => {
  const { label, value, ...otherProps } = props;

  const inputProps = {
    type: "color",
    className: "form__color",
    value: value || "#000000",
    ...otherProps,
  };

  return (
    <section className="form__group">
      {label && <label className="form__label">{label}</label>}
      <input {...inputProps} />
    </section>
  );
};

export default FormColor;
