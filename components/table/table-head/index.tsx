import { TableHeadProps } from "./types";

const TableHead = (props: TableHeadProps) => {
  const { className, children } = props;

  return (
    <thead className={`table__thead${className ? ` ${className}` : ""}`}>
      <tr className="thead__space-in-print">
        <td></td>
      </tr>
      {children}
    </thead>
  );
};

export default TableHead;
