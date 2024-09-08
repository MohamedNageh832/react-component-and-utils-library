import { useEffect, useState, ChangeEvent } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { IoMdClose } from "react-icons/io";
import { Label } from "../../form";
import { SearchbarProps } from "./types";
import "./style.css";

const Searchbar = (props: SearchbarProps) => {
  const { id, name, value, placeholder, onChange, className, label } =
    props || {};
  const [inputValue, setInputValue] = useState<string>(value || "");
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const showPlaceholder = inputValue === "" && !isFocused && placeholder;

  const handleFocus = () => setIsFocused(true);

  const handleBlur = () => setIsFocused(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputValue(value);

    if (onChange) onChange(name, value);
  };

  const handleClearInput = () => {
    setInputValue("");

    if (onChange) onChange(name as string, "");
  };

  useEffect(() => {
    if (!value || value === inputValue) return;
    setInputValue(value);
  }, [value]);

  const inputProps = {
    className: `searchbar__input ${value ? "" : "is-empty"}`,
    name,
    id: id || name,
    type: "text",
    value: inputValue,
    onFocus: handleFocus,
    onBlur: handleBlur,
    onChange: handleChange,
  };

  return (
    <section className={`searchbar${className ? ` ${className}` : ""}`}>
      {label && <Label htmlFor={inputProps.id}>{label}</Label>}

      <input {...inputProps} />

      {showPlaceholder && (
        <p className="searchbar__placeholder">{placeholder}</p>
      )}

      {inputValue === "" ? (
        <AiOutlineSearch className="searchbar__icon" />
      ) : (
        <IoMdClose className="searchbar__icon" onClick={handleClearInput} />
      )}
    </section>
  );
};

export default Searchbar;
