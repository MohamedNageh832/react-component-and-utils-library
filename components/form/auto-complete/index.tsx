import { useState, useRef, ChangeEvent, useEffect, FocusEvent } from "react";
import { AutoCompleteProps } from "./types";
import { MenuItem, MenuList } from "../../ui";
import { useClickOutside, useKey } from "../../../hooks";
import FormInput from "../form-input";

const AutoComplete = (props: AutoCompleteProps) => {
  const { name, options, value, onChange, ...otherProps } = props;
  const [inputValue, setInputValue] = useState(value);
  const [showList, setShowList] = useState(false);
  const [activeOption, setActiveOption] = useState<number>(-1);
  const parentRef = useRef();
  useClickOutside(parentRef, () => setShowList(false));

  const handleArrowUp = () => {
    if (activeOption <= 0) {
      setActiveOption(options.length - 1);
    } else {
      setActiveOption((prev) => prev - 1);
    }
  };

  const handleArrowDown = () => {
    if (activeOption >= options.length - 1) {
      setActiveOption(0);
    } else {
      setActiveOption((prev) => prev + 1);
    }
  };

  const handleMenuItemClick = (value: string) => {
    setShowList(false);
    setInputValue(value);
    setActiveOption(-1);
    if (onChange) onChange(name, value);
  };

  const handleEnterKey = () => {
    if (activeOption === -1) return;
    handleMenuItemClick(options[activeOption].text);
  };

  useKey(["ArrowUp"], handleArrowUp, parentRef);
  useKey(["ArrowDown"], handleArrowDown, parentRef);
  useKey(["Enter"], handleEnterKey, parentRef);

  useEffect(() => {
    if (value !== inputValue) setInputValue(value);
  }, [value]);

  const handleFocus = () => setShowList(true);
  const handleBlur = (e: FocusEvent<HTMLElement>) => {
    if (e.target !== parentRef.current) return;
    setShowList(false);
  };
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    setInputValue(value);
    if (onChange) onChange(name, value);
  };

  const inputProps = {
    value: inputValue,
    onFocus: handleFocus,
    onChange: handleChange,
    ...otherProps,
  };

  const parentProps = {
    ref: parentRef,
    className: "pos-relative",
    onBlur: handleBlur,
  };

  const filteredOptions = options.filter((option) =>
    option.text.includes(inputValue)
  );

  return (
    <section {...parentProps}>
      <FormInput {...inputProps} />

      {showList && (
        <MenuList>
          {filteredOptions.length > 0 ? (
            options.map((option, i) => (
              <MenuItem
                key={`auto-complete-option-${i}`}
                onClick={() => handleMenuItemClick(option.text)}
                active={activeOption === i}
              >
                {option.text}
              </MenuItem>
            ))
          ) : (
            <MenuItem>لا خيارات</MenuItem>
          )}
        </MenuList>
      )}
    </section>
  );
};

export default AutoComplete;
