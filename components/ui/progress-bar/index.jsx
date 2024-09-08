import "./style.css";

const ProgressBar = ({ min, max, value }) => {
  const props = {
    min: parseInt(min),
    max: parseInt(max),
    value: parseInt(value),
  };

  const progressBarProps = {
    className: "progress__bar",
    style: { width: `${(props.value / props.max) * 100}%` },
  };

  return (
    <section className="progress">
      <div {...progressBarProps}></div>
    </section>
  );
};

export default ProgressBar;
