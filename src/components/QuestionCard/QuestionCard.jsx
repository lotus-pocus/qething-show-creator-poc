import { useState } from "react";
import OptionButton from "../OptionButton/OptionButton";
import TextInput from "../TextInput/TextInput";
import "./QuestionCard.css";

function QuestionCard({ question, value, onChange }) {
  const standardOptions = question.options ?? [];

  const hasSavedCustomAnswer =
    question.type === "singleSelectWithOther" &&
    typeof value === "string" &&
    value.trim() !== "" &&
    !standardOptions.includes(value);

  const [isOtherSelected, setIsOtherSelected] = useState(
    hasSavedCustomAnswer,
  );

  const [customValue, setCustomValue] = useState(
    hasSavedCustomAnswer ? value : "",
  );

  function handleOptionSelect(option) {
    setIsOtherSelected(false);
    setCustomValue("");
    onChange(option);
  }

  function handleOtherSelect() {
    setIsOtherSelected(true);
    setCustomValue("");

    // Keeps the Next button disabled until something is typed.
    onChange("");
  }

  function handleCustomValueChange(newValue) {
    setCustomValue(newValue);
    onChange(newValue);
  }

  function decreaseNumber() {
    const currentValue =
      value ?? question.defaultValue ?? question.min;

    const newValue = Math.max(
      question.min,
      currentValue - 1,
    );

    onChange(newValue);
  }

  function increaseNumber() {
    const currentValue =
      value ?? question.defaultValue ?? question.min;

    const newValue = Math.min(
      question.max,
      currentValue + 1,
    );

    onChange(newValue);
  }

  function renderSingleSelect() {
    return (
      <div className="question-card__options">
        {standardOptions.map((option) => (
          <OptionButton
            key={option}
            label={option}
            selected={value === option}
            onClick={() => handleOptionSelect(option)}
          />
        ))}
      </div>
    );
  }

  function renderSingleSelectWithOther() {
    return (
      <>
        <div className="question-card__options">
          {standardOptions.map((option) => (
            <OptionButton
              key={option}
              label={option}
              selected={
                !isOtherSelected && value === option
              }
              onClick={() => handleOptionSelect(option)}
            />
          ))}

          <OptionButton
            label={
              question.otherLabel ??
              "Something else…"
            }
            selected={isOtherSelected}
            onClick={handleOtherSelect}
          />
        </div>

        {isOtherSelected && (
          <div className="question-card__custom-answer">
            <TextInput
              label={
                question.otherInputLabel ??
                "Tell us about it"
              }
              placeholder={
                question.otherPlaceholder ??
                "Type your answer here"
              }
              value={customValue}
              onChange={handleCustomValueChange}
              maxLength={
                question.otherMaxLength ?? 80
              }
            />
          </div>
        )}
      </>
    );
  }

  function renderNumberPicker() {
    const numberValue =
      value ?? question.defaultValue ?? question.min;

    return (
      <div className="question-card__number-picker">
        <button
          type="button"
          className="question-card__number-arrow"
          onClick={decreaseNumber}
          disabled={numberValue <= question.min}
          aria-label="Decrease number of players"
        >
          ←
        </button>

        <div
          className="question-card__number-display"
          aria-live="polite"
        >
          {numberValue}
        </div>

        <button
          type="button"
          className="question-card__number-arrow"
          onClick={increaseNumber}
          disabled={numberValue >= question.max}
          aria-label="Increase number of players"
        >
          →
        </button>
      </div>
    );
  }

  function renderQuestionContent() {
    switch (question.type) {
      case "singleSelect":
        return renderSingleSelect();

      case "singleSelectWithOther":
        return renderSingleSelectWithOther();

      case "numberPicker":
        return renderNumberPicker();

      default:
        return (
          <p className="question-card__error">
            Question type not supported.
          </p>
        );
    }
  }

  return (
    <section className="question-card">
      <h2 className="question-card__title">
        {question.title}
      </h2>

      {question.description && (
        <p className="question-card__description">
          {question.description}
        </p>
      )}

      {renderQuestionContent()}

      {question.helperText && (
        <p className="question-card__helper">
          {question.helperText}
        </p>
      )}
    </section>
  );
}

export default QuestionCard;