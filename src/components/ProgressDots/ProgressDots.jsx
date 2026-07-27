import "./ProgressDots.css";

function ProgressDots({ total, current }) {
  return (
    <div
      className="progress-dots"
      aria-label={`Step ${current + 1} of ${total}`}
    >
      {Array.from({ length: total }, (_, index) => (
        <span
          key={index}
          className={`progress-dots__dot ${
            index === current ? "progress-dots__dot--active" : ""
          }`}
          aria-hidden="true"
        />
      ))}
    </div>
  );
}

export default ProgressDots;