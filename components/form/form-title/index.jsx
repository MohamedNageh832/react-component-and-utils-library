import "./style.css";

const FormTitle = ({ children, subtitle }) => {
  return (
    <header className="form__title">
      <h4>{children}</h4>
      <span className="form__subtitle">{subtitle}</span>
    </header>
  );
};

export default FormTitle;
