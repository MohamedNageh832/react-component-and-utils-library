import { MouseEvent, ReactNode } from "react";

interface MenuListProps {
  children: ReactNode;
}

interface MenuItemProps {
  children?: ReactNode;
  active?: boolean;
  onClick?: (e: MouseEvent<HTMLElement>) => void;
}

export { MenuListProps, MenuItemProps };
