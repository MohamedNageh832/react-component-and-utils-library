const DropdownOption = ({ children, onClick }) => {
  return (
    <li className="dropdown__item">
      <button onClick={onClick}>{children}</button>
    </li>
  );
};

export default DropdownOption;
