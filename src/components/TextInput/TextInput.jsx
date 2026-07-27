import "./TextInput.css";

function TextInput({
  label,
  placeholder,
  value,
  onChange,
  maxLength = 100,
}) {
  return (
    <div className="text-input">
      {label && (
        <label className="text-input__label">
          {label}
        </label>
      )}

      <input
        className="text-input__field"
        type="text"
        placeholder={placeholder}
        value={value}
        maxLength={maxLength}
        onChange={(event) => onChange(event.target.value)}
      />
    </div>
  );
}

export default TextInput;