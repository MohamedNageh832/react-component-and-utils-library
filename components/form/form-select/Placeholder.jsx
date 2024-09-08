const Placeholder = ({ children }) => {
  return (
    <option disabled={true} value="" style={{ color: "var(--secondary)" }}>
      {children || "اختر..."}
    </option>
  );
};

export default Placeholder;
