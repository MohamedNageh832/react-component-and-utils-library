import "./style.css";

const Overlay = ({ className, onClick, children, type }) => {
  const overlayProps = {
    className: `overlay${type ? ` overlay--${type}` : ""}${
      className ? ` ${className}` : ""
    }`,
    onClick,
  };

  return <div {...overlayProps}>{children}</div>;
};

export default Overlay;
