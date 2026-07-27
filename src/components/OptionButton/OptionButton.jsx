import "./OptionButton.css";

function OptionButton({
  label,
  selected = false,
  onClick,
  disabled = false,
}) {
  return (
    <button
      type="button"
      className={`option-button ${
        selected ? "option-button--selected" : ""
      }`}
      onClick={onClick}
      disabled={disabled}
      aria-pressed={selected}
    >
      {label}
    </button>
  );
}

export default OptionButton;