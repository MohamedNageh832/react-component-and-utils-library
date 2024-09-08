import { TableHeadingProps } from "./types";

const TableHeading = ({ children, className }: TableHeadingProps) => {
  const props = {
    className: `table__heading${className ? ` ${className}` : ""}`,
  };

  return <th {...props}>{children}</th>;
};

export default TableHeading;
