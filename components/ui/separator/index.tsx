import { SeparatorProps } from "./types";
import "./style.css";

const Separator = ({ horizontal, className }: SeparatorProps) => {
  return (
    <div
      className={`separator${horizontal ? " separator--horizontal" : ""}${
        className ? ` ${className}` : ""
      }`}
    ></div>
  );
};

export default Separator;
