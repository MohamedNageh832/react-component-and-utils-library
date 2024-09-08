import "./styles.css";

const CircularProgress = ({
  className,
  width,
  color = "#292ce1",
  percentage,
  children,
}) => {
  const progressStyles = {
    width,
    height: width,
    background: `radial-gradient(closest-side, white 85%, transparent 80% 100%),
                conic-gradient(${color} ${percentage}%, #eee 0)`,
  };

  const sectionProps = {
    className: `circular-progress${className ? ` ${className}` : ""}`,
    style: progressStyles,
  };

  return (
    <section {...sectionProps}>
      <progress style={{ display: "none" }}></progress>
      {children}
    </section>
  );
};

export default CircularProgress;
