import { useEffect, useState } from "react";
import qethingLogo from "../../assets/images/qething-logo.png";
import "./LoadingScreen.css";

const loadingMessages = [
  "Understanding your occasion…",
  "Choosing the perfect rounds…",
  "Adding some QEthing energy…",
  "Balancing the competition…",
  "Preparing your grand finale…",
];

function LoadingScreen() {
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    const messageTimer = window.setInterval(() => {
      setMessageIndex((currentIndex) => {
        const nextIndex = currentIndex + 1;

        if (nextIndex >= loadingMessages.length) {
          return currentIndex;
        }

        return nextIndex;
      });
    }, 700);

    return () => {
      window.clearInterval(messageTimer);
    };
  }, []);

  const progress =
    ((messageIndex + 1) / loadingMessages.length) * 100;

  return (
    <main className="loading-screen">
      <div className="loading-screen__phone-shell">
        <img
          className="loading-screen__logo"
          src={qethingLogo}
          alt="QEthing"
        />

        <div className="loading-screen__content">
          <div
            className="loading-screen__spinner"
            aria-hidden="true"
          />

          <p className="loading-screen__eyebrow">
            Creating your show
          </p>

          <h1 className="loading-screen__title">
            Making something brilliant…
          </h1>

          <p
            className="loading-screen__message"
            aria-live="polite"
          >
            {loadingMessages[messageIndex]}
          </p>

          <div
            className="loading-screen__progress"
            role="progressbar"
            aria-label="Show creation progress"
            aria-valuemin="0"
            aria-valuemax="100"
            aria-valuenow={Math.round(progress)}
          >
            <div
              className="loading-screen__progress-bar"
              style={{ width: `${progress}%` }}
            />
          </div>

          <p className="loading-screen__percentage">
            {Math.round(progress)}%
          </p>
        </div>

        <p className="loading-screen__tagline">
          — We’ll make your show —
        </p>
      </div>
    </main>
  );
}

export default LoadingScreen;