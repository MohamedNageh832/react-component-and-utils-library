import Container from "../container";
import "./style.css";

const ContentHolder = ({ isSidebarVisible, children }) => {
  return (
    <section
      className={`content-holder${
        isSidebarVisible ? " content-holder--sidebar-visible" : ""
      }`}
    >
      <Container className="content-holder__container">{children}</Container>
    </section>
  );
};

export default ContentHolder;
