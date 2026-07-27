import { useState } from "react";
import CategorySelector from "../CategorySelector/CategorySelector";
import OptionButton from "../OptionButton/OptionButton";
import TextInput from "../TextInput/TextInput";
import "./QuestionCard.css";

function QuestionCard({ question, value, onChange }) {
  const options = question.options ?? [];

  const valueMatchesOption = options.includes(value);

  const [isCustomSelected, setIsCustomSelected] = useState(
    question.type === "singleSelectWithOther" &&
      Boolean(value) &&
      !valueMatchesOption,
  );

  const [customAnswer, setCustomAnswer] = useState(
    question.type === "singleSelectWithOther" &&
      Boolean(value) &&
      !valueMatchesOption
      ? value
      : "",
  );

  function handleOptionSelect(option) {
    setIsCustomSelected(false);
    setCustomAnswer("");
    onChange(option);
  }

  function handleCustomSelect() {
    setIsCustomSelected(true);

    if (customAnswer.trim()) {
      onChange(customAnswer.trim());
      return;
    }

    onChange("");
  }

  function handleCustomAnswerChange(event) {
    const newValue = event.target.value;

    setCustomAnswer(newValue);
    onChange(newValue.trim() ? newValue : "");
  }

  function handleNumberChange(amount) {
    const minimum = question.min ?? 1;
    const maximum = question.max ?? 20;
    const currentValue =
      typeof value === "number"
        ? value
        : question.defaultValue ?? minimum;

    const updatedValue = Math.min(
      maximum,
      Math.max(minimum, currentValue + amount),
    );

    onChange(updatedValue);
  }

  function renderSingleSelect() {
    return (
      <div className="question-card__options">
        {options.map((option) => (
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
          {options.map((option) => (
            <OptionButton
              key={option}
              label={option}
              selected={
                !isCustomSelected && value === option
              }
              onClick={() => handleOptionSelect(option)}
            />
          ))}

          <OptionButton
            label={question.otherLabel ?? "✨ My Own"}
            selected={isCustomSelected}
            onClick={handleCustomSelect}
          />
        </div>

        {isCustomSelected && (
          <div className="question-card__custom-answer">
            <TextInput
              label={
                question.otherInputLabel ??
                "Tell us about it"
              }
              placeholder={
                question.otherPlaceholder ??
                "Type your answer"
              }
              value={customAnswer}
              onChange={handleCustomAnswerChange}
              maxLength={question.maxLength ?? 100}
            />
          </div>
        )}
      </>
    );
  }

  function renderNumberPicker() {
    const minimum = question.min ?? 1;
    const maximum = question.max ?? 20;
    const displayedValue =
      typeof value === "number"
        ? value
        : question.defaultValue ?? minimum;

    return (
      <div className="question-card__number-picker">
        <button
          type="button"
          className="question-card__number-button"
          onClick={() => handleNumberChange(-1)}
          disabled={displayedValue <= minimum}
          aria-label="Decrease number"
        >
          −
        </button>

        <div
          className="question-card__number-value"
          aria-live="polite"
        >
          <span>{displayedValue}</span>

          {question.numberLabel && (
            <small>{question.numberLabel}</small>
          )}
        </div>

        <button
          type="button"
          className="question-card__number-button"
          onClick={() => handleNumberChange(1)}
          disabled={displayedValue >= maximum}
          aria-label="Increase number"
        >
          +
        </button>
      </div>
    );
  }

  function renderQuestionInput() {
    switch (question.type) {
      case "singleSelect":
        return renderSingleSelect();

      case "singleSelectWithOther":
        return renderSingleSelectWithOther();

      case "numberPicker":
        return renderNumberPicker();

      case "categorySelect":
        return (
          <CategorySelector
            value={value}
            onChange={onChange}
          />
        );

      default:
        return (
          <p className="question-card__error">
            This question type is not supported yet.
          </p>
        );
    }
  }

  return (
    <section className="question-card">
      <div className="question-card__heading">
        {question.eyebrow && (
          <p className="question-card__eyebrow">
            {question.eyebrow}
          </p>
        )}

        <h2 className="question-card__title">
          {question.title}
        </h2>

        {question.description && (
          <p className="question-card__description">
            {question.description}
          </p>
        )}
      </div>

      {renderQuestionInput()}
    </section>
  );
}

export default QuestionCard;