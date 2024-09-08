import { MenuItemProps } from "./types";

const MenuItem = (props: MenuItemProps) => {
  const { onClick, children, active } = props || {};

  return (
    <li
      className={`menu-list__option${active ? ` active` : ""}`}
      onClick={onClick}
    >
      {children}
    </li>
  );
};

export default MenuItem;
