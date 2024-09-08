const SelectOptions = ({ data }) => {
  return data.map((option, i) => (
    <option key={i} value={option.value}>
      {option.text ? option.text : option.value}
    </option>
  ));
};

export default SelectOptions;
