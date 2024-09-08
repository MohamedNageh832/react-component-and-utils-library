import { MenuListProps } from "./types";
import "./style.css";

const MenuList = (props: MenuListProps) => {
  const { children } = props || {};

  return <ul className="menu-list">{children}</ul>;
};

export default MenuList;
