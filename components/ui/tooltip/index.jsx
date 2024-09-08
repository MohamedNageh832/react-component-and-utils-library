import "./style..css";

const Tooltip = ({ children, position }) => {
  return (
    <span className={`tooltip tooltip--${position || "top"}`}>{children}</span>
  );
};

export default Tooltip;
