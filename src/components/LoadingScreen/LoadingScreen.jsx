import { useEffect, useState } from "react";
import qethingLogo from "../../assets/images/qething-logo.png";

const loadingMessages = [
  "Understanding your audience...",
  "Mixing your interests...",
  "Finding great rounds...",
  "Balancing the difficulty...",
  "Adding a few surprises...",
  "Putting on the finishing touches...",
];

function LoadingScreen({ answers = {} }) {
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setMessageIndex((currentIndex) =>
        Math.min(currentIndex + 1, loadingMessages.length - 1),
      );
    }, 650);

    return () => {
      window.clearInterval(intervalId);
    };
  }, []);

  const progress = ((messageIndex + 1) / loadingMessages.length) * 100;

  return (
    <main className="show-creator">
      <div className="show-creator__phone-shell show-creator__phone-shell--loading">
        <header className="show-creator__header">
          <img className="show-creator__logo" src={qethingLogo} alt="QEthing" />

          <h1 className="show-creator__heading">Show Creator</h1>
        </header>

        <section className="build-loading">
          <div className="build-loading__stage">
            <div className="build-loading__spotlight" />

            <div className="build-loading__orb">
              <span>✨</span>
            </div>
          </div>

          <p className="build-loading__eyebrow">Creating your show</p>

          <h2 className="build-loading__title">
            {loadingMessages[messageIndex]}
          </h2>

          <div
            className="build-loading__track"
            role="progressbar"
            aria-label="Show creation progress"
            aria-valuemin="0"
            aria-valuemax="100"
            aria-valuenow={Math.round(progress)}
          >
            <div
              className="build-loading__progress"
              style={{
                width: `${progress}%`,
              }}
            />
          </div>

          <p className="build-loading__summary">
            {answers.buildType === "Blind Build"
              ? "Expect the unexpected."
              : "We’re turning your choices into a complete QEthing show."}
          </p>
        </section>

        <p className="show-creator__tagline">— Stand by for showtime —</p>
      </div>
    </main>
  );
}

export default LoadingScreen;
