import { MouseEvent } from "react";
import { BiCheck } from "react-icons/bi";
import { Option, SelectOptionProps } from "./types";

const SelectOption = (props: SelectOptionProps) => {
  const {
    value = "",
    onClick,
    selected,
    disabled,
    children,
    className,
  } = props || {};

  const handleClick = (e: MouseEvent) => {
    if (disabled) return;
    e.stopPropagation();

    const option: Option = {
      children: children,
      value,
    };

    if (onClick) onClick(option);
  };

  const optionProps = {
    className: `select__option${selected ? " select__option--selected" : ""}${
      className ? ` ${className}` : ""
    }${disabled ? " select__option--disabled" : ""}`,
    onClick: handleClick,
  };

  return (
    <li {...optionProps}>
      <span>{children}</span>
      <BiCheck className="select__option-icon" />
    </li>
  );
};

export default SelectOption;
