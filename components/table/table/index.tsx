import "./style.css";
import { TableProps } from "./types";

const Table = (props: TableProps) => {
  const { className, children } = props || {};

  return (
    <section className="table-holder">
      <table className={`table ${className ? className : ""}`}>
        {children}
      </table>
    </section>
  );
};

export default Table;
