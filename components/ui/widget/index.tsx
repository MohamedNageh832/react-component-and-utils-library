import { WidgetInterface } from "./types";
import "./style.css";

const Widget = ({ children, className }: WidgetInterface) => {
  return (
    <section className={`widget${className ? ` ${className}` : ""}`}>
      {children}
    </section>
  );
};

export default Widget;
