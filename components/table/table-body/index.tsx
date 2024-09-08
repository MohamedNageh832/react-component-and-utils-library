import { TableBodyProps } from "./types";

const TableBody = ({ children, className }: TableBodyProps) => {
  return (
    <tbody className={`table__tbody${className ? ` ${className}` : ""}`}>
      {children}
    </tbody>
  );
};

export default TableBody;
