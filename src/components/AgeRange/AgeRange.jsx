import "./AgeRange.css";

const MIN_AGE = 10;
const MAX_AGE = 80;
const STEP = 10;

function AgeRange({ value, onChange }) {
  const range = {
    min: 20,
    max: 50,
    ...(value && typeof value === "object" ? value : {}),
  };

  const minPercent =
    ((range.min - MIN_AGE) / (MAX_AGE - MIN_AGE)) * 100;

  const maxPercent =
    ((range.max - MIN_AGE) / (MAX_AGE - MIN_AGE)) * 100;

  function handleMinChange(event) {
    const nextMin = Number(event.target.value);

    onChange({
      ...range,
      min: Math.min(nextMin, range.max - STEP),
    });
  }

  function handleMaxChange(event) {
    const nextMax = Number(event.target.value);

    onChange({
      ...range,
      max: Math.max(nextMax, range.min + STEP),
    });
  }

  function formatAge(age) {
    return age >= MAX_AGE ? "80+" : age;
  }

  return (
    <div className="age-range">
      <div className="age-range__values">
        <div className="age-range__value">
          <span className="age-range__value-label">Youngest</span>
          <strong>{formatAge(range.min)}</strong>
        </div>

        <div className="age-range__value">
          <span className="age-range__value-label">Oldest</span>
          <strong>{formatAge(range.max)}</strong>
        </div>
      </div>

      <div className="age-range__slider">
        <div className="age-range__track" />

        <div
          className="age-range__selected"
          style={{
            left: `${minPercent}%`,
            width: `${maxPercent - minPercent}%`,
          }}
        />

        <input
          className="age-range__input age-range__input--min"
          type="range"
          min={MIN_AGE}
          max={MAX_AGE}
          step={STEP}
          value={range.min}
          onChange={handleMinChange}
          aria-label="Youngest player age"
        />

        <input
          className="age-range__input age-range__input--max"
          type="range"
          min={MIN_AGE}
          max={MAX_AGE}
          step={STEP}
          value={range.max}
          onChange={handleMaxChange}
          aria-label="Oldest player age"
        />
      </div>

      <div className="age-range__scale">
        <span>10</span>
        <span>20</span>
        <span>30</span>
        <span>40</span>
        <span>50</span>
        <span>60</span>
        <span>70</span>
        <span>80+</span>
      </div>

      <p className="age-range__summary">
        We'll build a show that works for players from{" "}
        <strong>{formatAge(range.min)}</strong> to{" "}
        <strong>{formatAge(range.max)}</strong>.
      </p>
    </div>
  );
}

export default AgeRange;