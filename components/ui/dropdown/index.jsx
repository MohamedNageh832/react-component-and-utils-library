import { useEffect } from "react";
import "./style.css";

const Dropdown = ({ setShowList, children }) => {
  useEffect(() => {
    const hideList = () => setShowList(false);

    window.addEventListener("click", hideList);

    return () => window.removeEventListener("click", hideList);
  }, []);

  return (
    <section className="dropdown-holder">
      <ul className="dropdown">{children}</ul>
    </section>
  );
};

export default Dropdown;
