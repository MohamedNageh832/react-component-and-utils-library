import {
  useEffect,
  useState,
  useMemo,
  Children,
  cloneElement,
  isValidElement,
  ReactElement,
  Fragment,
  useRef,
  SetStateAction,
} from "react";
import { BiChevronDown } from "react-icons/bi";
import { Option, SelectOptionProps, SelectProps } from "./types";
import "./styles.css";
import Label from "../label";
import FormErrorMessage from "../form-error-message";
import FormGroup from "../form-group";
import { useSmartPosition } from "@/hooks";

const Select = (props: SelectProps) => {
  const {
    name = "",
    label,
    value,
    className,
    variant = "rounded",
    placeholder,
    children,
    inline,
    errorMessage,
    onChange,
  } = props || {};
  const [selectValue, setSelectValue] = useState<Option | null>(null);
  const [showList, setShowList] = useState(false);
  const [error, setError] = useState<SetStateAction<any> | null>(errorMessage);
  const inputRef = useRef<HTMLUListElement | null>(null);

  // TODO: Handle multiple selects
  // TODO: Handle making equal largest option width
  // TODO: Handle accessibility

  const { left, top, right, bottom } = useSmartPosition(inputRef);

  useEffect(() => {
    if (errorMessage === error) return;
    setError(errorMessage);
  }, [errorMessage]);

  const handleBlur = () => {
    setShowList(false);
  };

  const handleToggleOptionsList = () => setShowList((prev) => !prev);

  const selectProps = {
    className: `select${className ? ` ${className}` : ""} select--${variant}${
      showList ? ` select--list-opened` : ""
    }`,
    onBlur: handleBlur,
    tabIndex: 0,
  };

  const handleChange = (option: Option) => {
    setSelectValue(option);
    setShowList(false);

    if (option.value === "") setError(errorMessage);
    else setError(null);

    if (onChange) onChange(name, option.value as string);
  };

  const handleSelectedChild = (child: ReactElement) => {
    // TODO: is This even best practice!
    if (value && child.props.value === value) {
      setSelectValue({ children: child.props.children, value });
    }
  };

  const addChildProps = (child: ReactElement) => {
    const childIsFragment = child.type === Fragment;

    if (childIsFragment) {
      return Children.map(child.props.children, (nestedChild) => {
        handleSelectedChild(nestedChild);
        return cloneElement<SelectOptionProps>(nestedChild, {
          onClick: handleChange,
          selected:
            nestedChild.props.value === value || nestedChild.props.selected,
        });
      });
    } else {
      handleSelectedChild(child);
      return cloneElement<SelectOptionProps>(child, {
        onClick: handleChange,
        selected: child.props.value === value || child.props.selected,
      });
    }
  };

  const renderChildren = useMemo(() => {
    return Children.map(children, (child, i) => {
      if (!isValidElement<SelectOptionProps>(child)) return child;

      return addChildProps(child);
    });
  }, [children]);

  const selectInputProps = {
    className: `select__input${error ? " select__input--error" : ""}`,
    ref: inputRef,
    onClick: handleToggleOptionsList,
  };

  const listProps = {
    className: "select__options-list",
    style: { left, top, right, bottom },
  };

  return (
    <div {...selectProps}>
      <FormGroup inline={inline}>
        {label && (
          <Label className="select__label" onClick={handleToggleOptionsList}>
            {label}
          </Label>
        )}
        <section {...selectInputProps}>
          {selectValue ? (
            <p>{selectValue.children}</p>
          ) : (
            <p className="select__placeholder">{placeholder || ""}</p>
          )}

          <BiChevronDown className="select__caret" />
          {showList && <ul {...listProps}>{renderChildren}</ul>}
        </section>
      </FormGroup>

      {error && <FormErrorMessage>{error}</FormErrorMessage>}
    </div>
  );
};

export default Select;
