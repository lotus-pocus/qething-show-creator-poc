import { useState } from "react";
import TextInput from "../TextInput/TextInput";
import "./AddInterestCard.css";

function AddInterestCard({
  existingInterests = [],
  onAdd,
  onCancel,
}) {
  const [value, setValue] = useState("");
  const [error, setError] = useState("");

  const cleanedValue = value.trim();

  function handleChange(newValue) {
    setValue(newValue);

    if (error) {
      setError("");
    }
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (!cleanedValue) {
      return;
    }

    const alreadyExists = existingInterests.some(
      (interest) =>
        interest.label.toLowerCase() ===
        cleanedValue.toLowerCase(),
    );

    if (alreadyExists) {
      setError("You’ve already added that interest.");
      return;
    }

    onAdd(cleanedValue);
  }

  return (
    <section className="add-interest-card">
      <p className="add-interest-card__eyebrow">
        Add an ingredient
      </p>

      <h2 className="add-interest-card__title">
        What else does your group enjoy?
      </h2>

      <p className="add-interest-card__description">
        Add something specific, such as a hobby, artist,
        football team, game or television show.
      </p>

      <form
        className="add-interest-card__form"
        onSubmit={handleSubmit}
      >
        <TextInput
          label="Interest"
          placeholder="For example, chess"
          value={value}
          onChange={handleChange}
          maxLength={50}
        />

        {error && (
          <p
            className="add-interest-card__error"
            role="alert"
          >
            {error}
          </p>
        )}

        <div className="add-interest-card__actions">
          <button
            type="button"
            className="add-interest-card__button add-interest-card__button--secondary"
            onClick={onCancel}
          >
            Back
          </button>

          <button
            type="submit"
            className="add-interest-card__button add-interest-card__button--primary"
            disabled={!cleanedValue}
          >
            Add Interest
          </button>
        </div>
      </form>
    </section>
  );
}

export default AddInterestCard;