import { useEffect, useMemo, useState } from "react";
import AddInterestCard from "../AddInterestCard/AddInterestCard";
import InterestBuilder from "../InterestBuilder/InterestBuilder";
import MakeItYours from "../MakeItYours/MakeItYours";
import AgeRange from "../AgeRange/AgeRange";

function getOptionValue(option) {
  return typeof option === "string" ? option : option.value;
}

function getOptionLabel(option) {
  return typeof option === "string" ? option : option.label;
}

function getOptionIcon(option) {
  return typeof option === "string" ? null : option.icon;
}

function getOptionDescription(option) {
  return typeof option === "string" ? null : option.description;
}

function BuildTypeQuestion({ question, value, onChange }) {
  return (
    <div className="build-type-grid">
      {question.options.map((option) => {
        const optionValue = getOptionValue(option);

        const selected = value === optionValue;

        return (
          <button
            key={optionValue}
            type="button"
            className={`build-type-card ${
              selected ? "build-type-card--selected" : ""
            }`}
            onClick={() => onChange(optionValue)}
            aria-pressed={selected}
          >
            <span className="build-type-card__glow" />

            <span className="build-type-card__icon">
              {getOptionIcon(option)}
            </span>

            <span className="build-type-card__content">
              <span className="build-type-card__label">
                {getOptionLabel(option)}
              </span>

              {getOptionDescription(option) && (
                <span className="build-type-card__description">
                  {getOptionDescription(option)}
                </span>
              )}
            </span>

            {typeof option !== "string" && option.badge && (
              <span className="build-type-card__badge">{option.badge}</span>
            )}
          </button>
        );
      })}
    </div>
  );
}

function SingleSelectQuestion({ question, value, onChange }) {
  const standardOptions = question.options.filter(
    (option) => typeof option === "string" || !option.delegate,
  );

  const delegateOptions = question.options.filter(
    (option) => typeof option !== "string" && option.delegate,
  );

  function renderOption(option, isDelegate = false) {
    const optionValue = getOptionValue(option);

    const selected = value === optionValue;

    return (
      <button
        key={optionValue}
        type="button"
        className={`option-card ${isDelegate ? "option-card--delegate" : ""} ${
          selected ? "option-card--selected" : ""
        }`}
        onClick={() => onChange(optionValue)}
        aria-pressed={selected}
      >
        {getOptionIcon(option) && (
          <span className="option-card__icon">{getOptionIcon(option)}</span>
        )}

        <span className="option-card__label">{getOptionLabel(option)}</span>

        {getOptionDescription(option) && (
          <span className="option-card__description">
            {getOptionDescription(option)}
          </span>
        )}
      </button>
    );
  }

  return (
    <>
      <div className="option-grid">
        {standardOptions.map((option) => renderOption(option))}
      </div>

      {delegateOptions.length > 0 && (
        <div className="delegate-options">
          {delegateOptions.map((option) => renderOption(option, true))}
        </div>
      )}
    </>
  );
}

function SingleSelectWithOther({ question, value, onChange }) {
  const optionValues = useMemo(
    () => question.options.map(getOptionValue),
    [question.options],
  );

  const valueIsCustom = Boolean(value) && !optionValues.includes(value);

  const [showCustomInput, setShowCustomInput] = useState(valueIsCustom);

  const [customValue, setCustomValue] = useState(valueIsCustom ? value : "");

  function chooseOption(optionValue) {
    setShowCustomInput(false);
    setCustomValue("");
    onChange(optionValue);
  }

  function chooseOther() {
    setShowCustomInput(true);

    if (customValue.trim()) {
      onChange(customValue.trim());
      return;
    }

    onChange("");
  }

  function updateCustomValue(nextValue) {
    setCustomValue(nextValue);
    onChange(nextValue.trim());
  }

  return (
    <>
      <div className="option-grid">
        {question.options.map((option) => {
          const optionValue = getOptionValue(option);

          const selected = !showCustomInput && value === optionValue;

          return (
            <button
              key={optionValue}
              type="button"
              className={`option-card ${
                selected ? "option-card--selected" : ""
              }`}
              onClick={() => chooseOption(optionValue)}
              aria-pressed={selected}
            >
              {getOptionIcon(option) && (
                <span className="option-card__icon">
                  {getOptionIcon(option)}
                </span>
              )}

              <span className="option-card__label">
                {getOptionLabel(option)}
              </span>
            </button>
          );
        })}

        <button
          type="button"
          className={`option-card option-card--other ${
            showCustomInput ? "option-card--selected" : ""
          }`}
          onClick={chooseOther}
          aria-pressed={showCustomInput}
        >
          <span className="option-card__icon">✏️</span>

          <span className="option-card__label">
            {question.otherLabel ?? "Something else"}
          </span>
        </button>
      </div>

      {showCustomInput && (
        <div className="custom-answer">
          <label
            className="custom-answer__label"
            htmlFor={`${question.id}-custom`}
          >
            {question.otherInputLabel ?? "Tell us more"}
          </label>

          <input
            id={`${question.id}-custom`}
            className="custom-answer__input"
            type="text"
            value={customValue}
            placeholder={question.otherPlaceholder ?? "Type your answer"}
            maxLength={question.otherMaxLength ?? 60}
            autoFocus
            onChange={(event) => updateCustomValue(event.target.value)}
          />

          <span className="custom-answer__count">
            {customValue.length}/{question.otherMaxLength ?? 60}
          </span>
        </div>
      )}
    </>
  );
}

function NumberPickerQuestion({ question, value, onChange }) {
  const minimum = question.min ?? 1;
  const maximum = question.max ?? 20;

  const currentValue =
    typeof value === "number" ? value : (question.defaultValue ?? minimum);

  function decrease() {
    onChange(Math.max(minimum, currentValue - 1));
  }

  function increase() {
    onChange(Math.min(maximum, currentValue + 1));
  }

  return (
    <div className="number-picker">
      <div className="number-picker__stage">
        <span className="number-picker__spotlight" />

        <button
          type="button"
          className="number-picker__control"
          onClick={decrease}
          disabled={currentValue <= minimum}
          aria-label="Decrease player count"
        >
          ‹
        </button>

        <div className="number-picker__value" aria-live="polite">
          {currentValue}
        </div>

        <button
          type="button"
          className="number-picker__control"
          onClick={increase}
          disabled={currentValue >= maximum}
          aria-label="Increase player count"
        >
          ›
        </button>
      </div>

      <p className="number-picker__caption">
        {currentValue === 1 ? "Player" : "Players"}
      </p>
    </div>
  );
}

function MultiSelectQuestion({ question, value = [], onChange }) {
  const selectedValues = Array.isArray(value) ? value : [];

  function toggleOption(optionValue) {
    if (question.id === "avoid" && optionValue === "Nothing") {
      onChange(selectedValues.includes("Nothing") ? [] : ["Nothing"]);

      return;
    }

    const withoutNothing = selectedValues.filter((item) => item !== "Nothing");

    if (withoutNothing.includes(optionValue)) {
      onChange(withoutNothing.filter((item) => item !== optionValue));

      return;
    }

    onChange([...withoutNothing, optionValue]);
  }

  return (
    <div className="option-grid option-grid--compact">
      {question.options.map((option) => {
        const optionValue = getOptionValue(option);

        const selected = selectedValues.includes(optionValue);

        return (
          <button
            key={optionValue}
            type="button"
            className={`option-card option-card--compact ${
              selected ? "option-card--selected" : ""
            }`}
            onClick={() => toggleOption(optionValue)}
            aria-pressed={selected}
          >
            {getOptionIcon(option) && (
              <span className="option-card__icon">{getOptionIcon(option)}</span>
            )}

            <span className="option-card__label">{getOptionLabel(option)}</span>

            <span className="option-card__tick">{selected ? "✓" : "+"}</span>
          </button>
        );
      })}
    </div>
  );
}

function normaliseSelectedInterests(value) {
  if (!Array.isArray(value)) {
    return [];
  }

  return value.filter(
    (interest) => interest && typeof interest === "object" && interest.id,
  );
}

function InterestQuestion({ value, onChange, onNestedViewChange }) {
  const selectedInterests = normaliseSelectedInterests(value);

  const [activeGroupId, setActiveGroupId] = useState(null);

  const [isAddingCustom, setIsAddingCustom] = useState(false);

  useEffect(() => {
    return () => {
      onNestedViewChange(false);
    };
  }, [onNestedViewChange]);

  function handleGroupChange(groupId) {
    setActiveGroupId(groupId);
    onNestedViewChange(Boolean(groupId));
  }

  function handleBackToInterests() {
    setActiveGroupId(null);
    onNestedViewChange(false);
  }

  function handleOpenCustomInterest() {
    setIsAddingCustom(true);
    onNestedViewChange(true);
  }

  function handleCancelCustomInterest() {
    setIsAddingCustom(false);
    onNestedViewChange(false);
  }

  function handleAddCustomInterest(label) {
    const customInterest = {
      id: `custom-${Date.now()}`,
      label,
      emoji: "✨",
      groupId: "custom",
      type: "interest",
      source: "custom",
      mapsTo: [],
    };

    onChange([...selectedInterests, customInterest]);

    setIsAddingCustom(false);
    onNestedViewChange(false);
  }

  if (isAddingCustom) {
    return (
      <AddInterestCard
        existingInterests={selectedInterests}
        onAdd={handleAddCustomInterest}
        onCancel={handleCancelCustomInterest}
      />
    );
  }

  return (
    <>
      <InterestBuilder
        selectedInterests={selectedInterests}
        onChange={onChange}
        onAddCustomInterest={handleOpenCustomInterest}
        activeGroupId={activeGroupId}
        onActiveGroupChange={handleGroupChange}
      />

      {activeGroupId && (
        <button
          type="button"
          className="interest-builder__return-button interest-builder__return-button--full"
          onClick={handleBackToInterests}
        >
          Back to interests
        </button>
      )}
    </>
  );
}

function QuestionRenderer({
  question,
  value,
  onChange,
  onNestedViewChange = () => {},
}) {
  switch (question.type) {
    case "buildType":
      return (
        <BuildTypeQuestion
          question={question}
          value={value}
          onChange={onChange}
        />
      );

    case "singleSelect":
      return (
        <SingleSelectQuestion
          question={question}
          value={value}
          onChange={onChange}
        />
      );

    case "singleSelectWithOther":
      return (
        <SingleSelectWithOther
          question={question}
          value={value}
          onChange={onChange}
        />
      );

    case "numberPicker":
      return (
        <NumberPickerQuestion
          question={question}
          value={value}
          onChange={onChange}
        />
      );

    case "multiSelect":
      return (
        <MultiSelectQuestion
          question={question}
          value={value}
          onChange={onChange}
        />
      );

    case "categorySelect":
      return (
        <InterestQuestion
          value={value}
          onChange={onChange}
          onNestedViewChange={onNestedViewChange}
        />
      );

    case "makeItYours":
      return <MakeItYours value={value} onChange={onChange} />;

    case "ageRange":
      return <AgeRange value={value} onChange={onChange} />;

    default:
      return (
        <p className="question-card__error">
          This question type is not supported yet.
        </p>
      );
  }
}

export default QuestionRenderer;
