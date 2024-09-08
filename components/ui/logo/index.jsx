import logo from "../../../assets/images/logo.jpg";
import "./style.css";

const Logo = ({ small }) => {
  const imgProps = {
    className: `logo__icon${small ? " logo--small" : ""}`,
    src: logo,
    alt: "لوجو الموقع",
  };

  return (
    <div className={`logo${small ? " logo--small" : ""}`}>
      <img {...imgProps} />
      <span className={`logo__text`}>اختبار ادينبروك</span>
    </div>
  );
};

export default Logo;
