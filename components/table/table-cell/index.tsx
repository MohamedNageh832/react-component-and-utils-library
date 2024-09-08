import { TableCellProps } from "./types";
import "./styles.css";

const TableCell = (props: TableCellProps) => {
  const { children, className, colSpan } = props || {};

  const tableCellProps = {
    className: `table__cell${className ? ` ${className}` : ""}`,
    colSpan,
  };

  return <td {...tableCellProps}>{children}</td>;
};

export default TableCell;
