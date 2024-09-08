import { TableRowProps } from "./types";
import "./styles.css";

const TableRow = ({ className, children }: TableRowProps) => {
  return (
    <tr className={`table__row${className ? ` ${className}` : ""}`}>
      {children}
    </tr>
  );
};

export default TableRow;
