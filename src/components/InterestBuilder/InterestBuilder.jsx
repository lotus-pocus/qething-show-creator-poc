import { useRef, useState } from "react";
import interestGroups from "../../data/interestGroup";
import showCategories from "../../data/showCategories";
import "./InterestBuilder.css";

const MAX_INTERESTS = 5;

function InterestBuilder({
  selectedInterests = [],
  onChange,
  onAddCustomInterest,
  activeGroupId,
  onActiveGroupChange,
}) {
  const activeGroup = interestGroups.find(
    (group) => group.id === activeGroupId,
  );

  const activeGroupInterests = showCategories.filter(
    (interest) => interest.groupId === activeGroupId,
  );

  const selectedCount = selectedInterests.length;
  const hasReachedLimit = selectedCount >= MAX_INTERESTS;

  function isInterestSelected(interestId) {
    return selectedInterests.some(
      (interest) => interest.id === interestId,
    );
  }

  function handleInterestClick(interest) {
    const alreadySelected = isInterestSelected(interest.id);

    if (alreadySelected) {
      onChange(
        selectedInterests.filter(
          (selectedInterest) =>
            selectedInterest.id !== interest.id,
        ),
      );

      return;
    }

    if (hasReachedLimit) {
      return;
    }

    const newInterest = {
      id: interest.id,
      label: interest.label,
      emoji: interest.emoji,
      groupId: interest.groupId,
      type: "interest",
      source: "preset",
      mapsTo: interest.mapsTo,
    };

    onChange([...selectedInterests, newInterest]);
  }

  function handleRemoveInterest(interestId) {
    onChange(
      selectedInterests.filter(
        (interest) => interest.id !== interestId,
      ),
    );
  }

  function handleSurpriseMe() {
    if (hasReachedLimit) {
      return;
    }

    const availableInterests = showCategories.filter(
      (interest) => !isInterestSelected(interest.id),
    );

    if (availableInterests.length === 0) {
      return;
    }

    const randomIndex = Math.floor(
      Math.random() * availableInterests.length,
    );

    const randomInterest = availableInterests[randomIndex];

    const newInterest = {
      id: randomInterest.id,
      label: randomInterest.label,
      emoji: randomInterest.emoji,
      groupId: randomInterest.groupId,
      type: "interest",
      source: "surprise",
      mapsTo: randomInterest.mapsTo,
    };

    onChange([...selectedInterests, newInterest]);
  }

  function getSelectedCountForGroup(groupId) {
    return selectedInterests.filter(
      (interest) => interest.groupId === groupId,
    ).length;
  }

  if (activeGroup) {
    return (
      <section className="interest-builder">
        <div className="interest-builder__group-toolbar">
          <span className="interest-builder__group-context">
            <span aria-hidden="true">
              {activeGroup.emoji}
            </span>

            {activeGroup.label}
          </span>

          <span className="interest-builder__count">
            {selectedCount}/{MAX_INTERESTS}
          </span>
        </div>

        <SelectedInterestStrip
          selectedInterests={selectedInterests}
          onRemove={handleRemoveInterest}
        />

        <div className="interest-builder__interest-grid">
          {activeGroupInterests.map((interest) => {
            const selected = isInterestSelected(interest.id);
            const unavailable = hasReachedLimit && !selected;

            return (
              <button
                key={interest.id}
                type="button"
                className={`interest-builder__interest ${
                  selected
                    ? "interest-builder__interest--selected"
                    : ""
                }`}
                aria-pressed={selected}
                disabled={unavailable}
                onClick={() =>
                  handleInterestClick(interest)
                }
              >
                <span
                  className="interest-builder__interest-emoji"
                  aria-hidden="true"
                >
                  {interest.emoji}
                </span>

                <span className="interest-builder__interest-label">
                  {interest.label}
                </span>

                {selected && (
                  <span
                    className="interest-builder__tick"
                    aria-hidden="true"
                  >
                    ✓
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </section>
    );
  }

  return (
    <section className="interest-builder">
      <div className="interest-builder__title-row">
        <h2 className="interest-builder__main-title">
          Choose up to 5 interests
        </h2>

        <span className="interest-builder__count">
          {selectedCount}/{MAX_INTERESTS}
        </span>
      </div>

      <SelectedInterestStrip
        selectedInterests={selectedInterests}
        onRemove={handleRemoveInterest}
      />

      <div className="interest-builder__groups">
        {interestGroups.map((group) => {
          const groupSelectedCount =
            getSelectedCountForGroup(group.id);

          return (
            <button
              key={group.id}
              type="button"
              className="interest-builder__group-button"
              onClick={() =>
                onActiveGroupChange(group.id)
              }
            >
              <span
                className="interest-builder__group-button-emoji"
                aria-hidden="true"
              >
                {group.emoji}
              </span>

              <span className="interest-builder__group-button-label">
                {group.label}
              </span>

              {groupSelectedCount > 0 && (
                <span className="interest-builder__group-count">
                  {groupSelectedCount}
                </span>
              )}

              <span
                className="interest-builder__group-arrow"
                aria-hidden="true"
              >
                ›
              </span>
            </button>
          );
        })}
      </div>

      <div className="interest-builder__actions">
        <button
          type="button"
          className="interest-builder__action-button"
          onClick={onAddCustomInterest}
          disabled={hasReachedLimit}
        >
          <span aria-hidden="true">✨</span>
          <span>Add your own</span>
        </button>

        <button
          type="button"
          className="interest-builder__action-button"
          onClick={handleSurpriseMe}
          disabled={hasReachedLimit}
        >
          <span aria-hidden="true">🎲</span>
          <span>Surprise me</span>
        </button>
      </div>
    </section>
  );
}

function SelectedInterestStrip({
  selectedInterests,
  onRemove,
}) {
  const stripRef = useRef(null);

  const dragStateRef = useRef({
    isDragging: false,
    startX: 0,
    startScrollLeft: 0,
  });

  const [isDragging, setIsDragging] = useState(false);

  function handlePointerDown(event) {
    if (event.pointerType !== "mouse" || event.button !== 0) {
      return;
    }

    const clickedRemoveButton = event.target.closest(
      ".interest-builder__remove-button",
    );

    if (clickedRemoveButton) {
      return;
    }

    const strip = stripRef.current;

    if (!strip) {
      return;
    }

    dragStateRef.current = {
      isDragging: true,
      startX: event.clientX,
      startScrollLeft: strip.scrollLeft,
    };

    setIsDragging(true);
    strip.setPointerCapture(event.pointerId);
  }

  function handlePointerMove(event) {
    const strip = stripRef.current;
    const dragState = dragStateRef.current;

    if (!strip || !dragState.isDragging) {
      return;
    }

    const distanceMoved =
      event.clientX - dragState.startX;

    strip.scrollLeft =
      dragState.startScrollLeft - distanceMoved;
  }

  function stopDragging(event) {
    const strip = stripRef.current;

    dragStateRef.current.isDragging = false;
    setIsDragging(false);

    if (
      strip &&
      event.pointerId !== undefined &&
      strip.hasPointerCapture(event.pointerId)
    ) {
      strip.releasePointerCapture(event.pointerId);
    }
  }

  function handleWheel(event) {
    const strip = stripRef.current;

    if (!strip || strip.scrollWidth <= strip.clientWidth) {
      return;
    }

    if (Math.abs(event.deltaY) > Math.abs(event.deltaX)) {
      strip.scrollLeft += event.deltaY;
      event.preventDefault();
    }
  }

  if (selectedInterests.length === 0) {
    return (
      <div className="interest-builder__empty-strip">
        Your selections will appear here
      </div>
    );
  }

  return (
    <div
      ref={stripRef}
      className={`interest-builder__selection-strip ${
        isDragging
          ? "interest-builder__selection-strip--dragging"
          : ""
      }`}
      aria-label="Selected interests"
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={stopDragging}
      onPointerCancel={stopDragging}
      onLostPointerCapture={stopDragging}
      onWheel={handleWheel}
    >
      {selectedInterests.map((interest) => (
        <div
          key={interest.id}
          className="interest-builder__selection-pill"
        >
          <span aria-hidden="true">
            {interest.emoji || "✨"}
          </span>

          <span className="interest-builder__selection-pill-label">
            {interest.label}
          </span>

          <button
            type="button"
            className="interest-builder__remove-button"
            onPointerDown={(event) => {
              event.stopPropagation();
            }}
            onClick={(event) => {
              event.stopPropagation();
              onRemove(interest.id);
            }}
            aria-label={`Remove ${interest.label}`}
          >
            ×
          </button>
        </div>
      ))}
    </div>
  );
}

export default InterestBuilder;