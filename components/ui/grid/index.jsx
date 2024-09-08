const Grid = ({ children, gap }) => {
  const gridProps = {
    className: `grid${gap ? ` gap-${gap}` : ""}`,
  };

  return <section {...gridProps}>{children}</section>;
};

export default Grid;
