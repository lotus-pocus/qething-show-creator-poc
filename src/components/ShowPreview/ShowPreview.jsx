import mockShow from "../../data/mockShow";
import showCategories from "../../data/showCategories";
import qethingLogo from "../../assets/images/qething-logo.png";

function getOccasionDetail(answers) {
  if (answers.occasion === "Work Event") {
    return answers.workEventType;
  }

  if (answers.occasion === "Party") {
    return answers.partyType;
  }

  if (answers.occasion === "Themed Night") {
    return answers.theme;
  }

  return answers.occasion;
}

function getInterestLabel(interest) {
  if (!interest) {
    return null;
  }

  if (typeof interest === "object") {
    return interest.label ?? null;
  }

  if (typeof interest !== "string") {
    return null;
  }

  if (interest.startsWith("custom:")) {
    return interest.replace("custom:", "");
  }

  const matchingCategory = showCategories.find(
    (category) => category.id === interest,
  );

  return matchingCategory?.label ?? interest;
}

function ShowPreview({ answers, onStartAgain }) {
  const isBlindBuild = answers.buildType === "Blind Build";

  const selectedInterests = (answers.categories ?? [])
    .map(getInterestLabel)
    .filter(Boolean);

  const occasion = getOccasionDetail(answers);

  return (
    <main className="show-creator">
      <div className="show-creator__phone-shell">
        <header className="show-creator__header">
          <img className="show-creator__logo" src={qethingLogo} alt="QEthing" />

          <h1 className="show-creator__heading">Your Show</h1>
        </header>

        <section className="show-preview">
          <div className="show-preview__confetti">✦ · ✧ · ✦ · ✧ · ✦</div>

          <p className="show-preview__eyebrow">
            {isBlindBuild ? "Your mystery show is ready" : "Ready for showtime"}
          </p>

          <h2 className="show-preview__title">
            {isBlindBuild ? "The Mystery Mix" : mockShow.title}
          </h2>

          <p className="show-preview__description">
            {isBlindBuild
              ? "We chose every topic, twist and challenge. Your rounds will be revealed as you play."
              : "A lively show shaped around your group, your occasion and the kind of night you want."}
          </p>

          <div className="show-preview__stats">
            <div className="show-preview__stat">
              <span>👥</span>

              <strong>
                {answers.playerCount ?? mockShow.playerCount ?? 8}
              </strong>

              <small>Players</small>
            </div>

            <div className="show-preview__stat">
              <span>⚡</span>

              <strong>
                {answers.energyLevel
                  ? answers.energyLevel.replace("Classic ", "")
                  : "Mystery"}
              </strong>

              <small>Energy</small>
            </div>

            <div className="show-preview__stat">
              <span>⏱️</span>

              <strong>{answers.duration ?? "Flexible"}</strong>

              <small>Duration</small>
            </div>
          </div>

          {!isBlindBuild && (
            <div className="show-preview__details">
              {occasion && (
                <div className="show-preview__detail">
                  <span>🎉</span>

                  <div>
                    <small>Made for</small>
                    <strong>{occasion}</strong>
                  </div>
                </div>
              )}

              {answers.audience && (
                <div className="show-preview__detail">
                  <span>👥</span>

                  <div>
                    <small>Playing with</small>

                    <strong>{answers.audience}</strong>
                  </div>
                </div>
              )}

              {selectedInterests.length > 0 && (
                <div className="show-preview__detail">
                  <span>❤️</span>

                  <div>
                    <small>Featuring</small>

                    <strong>{selectedInterests.slice(0, 3).join(", ")}</strong>
                  </div>
                </div>
              )}
            </div>
          )}

          <button
            type="button"
            className="show-creator__button show-creator__button--primary show-creator__button--wide"
          >
            Start Show
          </button>

          <button
            type="button"
            className="show-preview__restart"
            onClick={onStartAgain}
          >
            Build another show
          </button>
        </section>

        <p className="show-creator__tagline">— Your stage is ready —</p>
      </div>
    </main>
  );
}

export default ShowPreview;
