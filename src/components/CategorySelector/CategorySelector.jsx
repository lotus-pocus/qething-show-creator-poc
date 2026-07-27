import showCategories from "../../data/showCategories";
import "./CategorySelector.css";

const MAX_SELECTIONS = 5;

function CategorySelector({ value = [], onChange }) {
  const selectedCategories = Array.isArray(value) ? value : [];

  const isRandom = selectedCategories.includes("random");
  const hasReachedLimit =
    selectedCategories.length >= MAX_SELECTIONS && !isRandom;

  function handleCategoryClick(categoryId) {
    const isSelected = selectedCategories.includes(categoryId);

    if (isSelected) {
      onChange(
        selectedCategories.filter(
          (selectedId) => selectedId !== categoryId,
        ),
      );
      return;
    }

    if (hasReachedLimit) {
      return;
    }

    onChange([
      ...selectedCategories.filter(
        (selectedId) => selectedId !== "random",
      ),
      categoryId,
    ]);
  }

  function handleRandomClick() {
    onChange(["random"]);
  }

  function handleSkipClick() {
    onChange(["skip"]);
  }

  const selectedCount = selectedCategories.filter(
    (categoryId) =>
      categoryId !== "random" && categoryId !== "skip",
  ).length;

  return (
    <div className="category-selector">
      <div className="category-selector__summary">
        <span>Choose up to {MAX_SELECTIONS}</span>

        <span>
          {selectedCount}/{MAX_SELECTIONS}
        </span>
      </div>

      <div className="category-selector__grid">
        {showCategories.map((category) => {
          const isSelected = selectedCategories.includes(
            category.id,
          );

          const isDisabled =
            !isSelected &&
            hasReachedLimit;

          return (
            <button
              key={category.id}
              type="button"
              className={[
                "category-selector__option",
                isSelected
                  ? "category-selector__option--selected"
                  : "",
              ]
                .filter(Boolean)
                .join(" ")}
              onClick={() =>
                handleCategoryClick(category.id)
              }
              disabled={isDisabled}
              aria-pressed={isSelected}
            >
              <span
                className="category-selector__emoji"
                aria-hidden="true"
              >
                {category.emoji}
              </span>

              <span>{category.label}</span>
            </button>
          );
        })}
      </div>

      <div className="category-selector__shortcuts">
        <button
          type="button"
          className={[
            "category-selector__shortcut",
            isRandom
              ? "category-selector__shortcut--selected"
              : "",
          ]
            .filter(Boolean)
            .join(" ")}
          onClick={handleRandomClick}
        >
          🎲 Surprise Me
        </button>

        <button
          type="button"
          className={[
            "category-selector__shortcut",
            selectedCategories.includes("skip")
              ? "category-selector__shortcut--selected"
              : "",
          ]
            .filter(Boolean)
            .join(" ")}
          onClick={handleSkipClick}
        >
          Skip
        </button>
      </div>

      {hasReachedLimit && (
        <p className="category-selector__message">
          You’ve picked five. Remove one to choose another.
        </p>
      )}
    </div>
  );
}

export default CategorySelector;