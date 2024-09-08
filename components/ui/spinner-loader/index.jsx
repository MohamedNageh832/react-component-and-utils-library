import "./style.css";

const SpinnerLoader = ({ message }) => {
  return (
    <section className="spinner">
      <span className="spinner__loader"></span>
      <p className="spinner__text">{message}</p>
    </section>
  );
};

export default SpinnerLoader;
