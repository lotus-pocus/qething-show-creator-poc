import mockShow from "../../data/mockShow";
import showCategories from "../../data/showCategories";
import qethingLogo from "../../assets/images/qething-logo.png";

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
  const selectedInterests = (answers.categories ?? [])
    .map(getInterestLabel)
    .filter(Boolean);

  const personalisation = answers.makeItYours ?? {};

  const showTitle =
    personalisation.title?.trim() ||
    mockShow.title ||
    "Your QEthing Show";

  const showImage = personalisation.imageUrl || "";

  const occasion = answers.occasion || null;

  const playerDisplay =
    answers.playerCount ??
    answers.gameSize ??
    mockShow.playerCount ??
    "Flexible";

  const vibe =
    answers.energyLevel ||
    answers.showStyle ||
    "QEthing Mix";

  const duration = answers.duration || "Flexible";

  return (
    <main className="show-creator">
      <div className="show-creator__phone-shell">
        <header className="show-creator__header">
          <img
            className="show-creator__logo"
            src={qethingLogo}
            alt="QEthing"
          />

          <h1 className="show-creator__heading">Your Show</h1>
        </header>

        <section className="show-preview">
          {showImage ? (
            <div className="show-preview__hero">
              <img
                className="show-preview__hero-image"
                src={showImage}
                alt=""
              />

              <div className="show-preview__hero-shade" />

              <div className="show-preview__hero-copy">
                <p className="show-preview__eyebrow">
                  Ready for showtime
                </p>

                <h2 className="show-preview__title">
                  {showTitle}
                </h2>
              </div>
            </div>
          ) : (
            <>
              <div className="show-preview__confetti">
                ✦ · ✧ · ✦ · ✧ · ✦
              </div>

              <p className="show-preview__eyebrow">
                Ready for showtime
              </p>

              <h2 className="show-preview__title">
                {showTitle}
              </h2>
            </>
          )}

          <p className="show-preview__description">
            Your QEthing show is ready. We’ve mixed the questions,
            games and surprises so you can get straight to playing.
          </p>

          <div className="show-preview__stats">
            <div className="show-preview__stat">
              <span>👥</span>

              <strong>{playerDisplay}</strong>

              <small>Players</small>
            </div>

            <div className="show-preview__stat">
              <span>⚡</span>

              <strong>{vibe.replace("Classic ", "")}</strong>

              <small>Style</small>
            </div>

            <div className="show-preview__stat">
              <span>⏱️</span>

              <strong>{duration}</strong>

              <small>Duration</small>
            </div>
          </div>

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
                  <strong>
                    {selectedInterests.slice(0, 3).join(", ")}
                  </strong>
                </div>
              </div>
            )}
          </div>

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

        <p className="show-creator__tagline">
          — Your stage is ready —
        </p>
      </div>
    </main>
  );
}

export default ShowPreview;