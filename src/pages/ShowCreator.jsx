import { useMemo, useState } from "react";
import qethingLogo from "../assets/images/qething-logo.png";
import AddInterestCard from "../components/AddInterestCard/AddInterestCard";
import InterestBuilder from "../components/InterestBuilder/InterestBuilder";
import LoadingScreen from "../components/LoadingScreen/LoadingScreen";
import ProgressDots from "../components/ProgressDots/ProgressDots";
import QuestionCard from "../components/QuestionCard/QuestionCard";
import flow from "../data/flow";
import mockShow from "../data/mockShow";
import "./ShowCreator.css";

const MAX_INTERESTS = 5;

function createInitialAnswers() {
  return flow.reduce((initialAnswers, question) => {
    if (question.defaultValue !== undefined) {
      initialAnswers[question.id] =
        question.defaultValue;
    }

    return initialAnswers;
  }, {});
}

function createCustomInterest(label) {
  const cleanLabel = label.trim();

  const slug = cleanLabel
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

  return {
    id: `custom-${slug}-${Date.now()}`,
    label: cleanLabel,
    emoji: "✨",
    groupId: "custom",
    type: "interest",
    source: "user",
    mapsTo: [],
  };
}

function ShowCreator() {
  const [stage, setStage] = useState("questions");
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState(
    createInitialAnswers,
  );
  const [isAddingInterest, setIsAddingInterest] =
    useState(false);

  const [activeInterestGroupId, setActiveInterestGroupId] =
    useState(null);

  const visibleQuestions = useMemo(() => {
    return flow.filter((question) => {
      if (!question.showWhen) {
        return true;
      }

      return question.showWhen(answers);
    });
  }, [answers]);

  const lastAvailableStep = Math.max(
    visibleQuestions.length - 1,
    0,
  );

  const safeCurrentStep = Math.min(
    currentStep,
    lastAvailableStep,
  );

  const currentQuestion =
    visibleQuestions[safeCurrentStep];

  const currentAnswer = currentQuestion
    ? answers[currentQuestion.id]
    : undefined;

  const isInterestQuestion =
    currentQuestion?.type === "categorySelect";

  const isViewingInterestGroup =
    Boolean(activeInterestGroupId);

  const selectedInterests = Array.isArray(
    answers.categories,
  )
    ? answers.categories
    : [];

  const hasAnswer = isInterestQuestion
    ? selectedInterests.length > 0
    : currentAnswer !== undefined &&
      currentAnswer !== null &&
      currentAnswer !== "";

  const isFirstStep = safeCurrentStep === 0;

  const isLastStep =
    safeCurrentStep === visibleQuestions.length - 1;

  function handleAnswer(value) {
    if (!currentQuestion) {
      return;
    }

    setAnswers((previousAnswers) => {
      const updatedAnswers = {
        ...previousAnswers,
        [currentQuestion.id]: value,
      };

      if (currentQuestion.id === "occasion") {
        delete updatedAnswers.workEventType;
        delete updatedAnswers.partyType;
        delete updatedAnswers.theme;
      }

      if (
        currentQuestion.id === "buildType" &&
        value !== "Tailored Show"
      ) {
        delete updatedAnswers.audience;
      }

      if (
        currentQuestion.id === "buildType" &&
        value === "Blind Build"
      ) {
        delete updatedAnswers.categories;
      }

      return updatedAnswers;
    });
  }

  function handleInterestChange(interests) {
    setAnswers((previousAnswers) => ({
      ...previousAnswers,
      categories: interests,
    }));
  }

  function handleOpenAddInterest() {
    if (selectedInterests.length >= MAX_INTERESTS) {
      return;
    }

    setActiveInterestGroupId(null);
    setIsAddingInterest(true);
  }

  function handleAddCustomInterest(label) {
    if (selectedInterests.length >= MAX_INTERESTS) {
      setIsAddingInterest(false);
      return;
    }

    const newInterest = createCustomInterest(label);

    setAnswers((previousAnswers) => {
      const existingInterests = Array.isArray(
        previousAnswers.categories,
      )
        ? previousAnswers.categories
        : [];

      return {
        ...previousAnswers,
        categories: [
          ...existingInterests,
          newInterest,
        ].slice(0, MAX_INTERESTS),
      };
    });

    setIsAddingInterest(false);
    setActiveInterestGroupId(null);
  }

  function handleNext() {
    if (!hasAnswer || isViewingInterestGroup) {
      return;
    }

    if (isLastStep) {
      handleBuildShow();
      return;
    }

    setActiveInterestGroupId(null);
    setCurrentStep(safeCurrentStep + 1);
  }

  function handleBack() {
    if (isViewingInterestGroup) {
      setActiveInterestGroupId(null);
      return;
    }

    if (isFirstStep) {
      return;
    }

    setCurrentStep(safeCurrentStep - 1);
  }

  function handleReturnToInterests() {
    setActiveInterestGroupId(null);
  }

  function handleBuildShow() {
    setStage("generating");

    window.setTimeout(() => {
      setStage("preview");
    }, 4000);
  }

  function handleStartAgain() {
    setAnswers(createInitialAnswers());
    setCurrentStep(0);
    setIsAddingInterest(false);
    setActiveInterestGroupId(null);
    setStage("questions");
  }

  if (stage === "generating") {
    return <LoadingScreen />;
  }

  if (stage === "preview") {
    return (
      <main className="show-creator">
        <div className="show-creator__phone-shell">
          <header className="show-creator__header">
            <img
              className="show-creator__logo"
              src={qethingLogo}
              alt="QEthing"
            />

            <h1 className="show-creator__heading">
              Your Show
            </h1>
          </header>

          <section className="question-card">
            <p className="show-creator__preview-eyebrow">
              Your show is ready
            </p>

            <h2 className="show-creator__preview-title">
              {mockShow.title}
            </h2>

            <p className="show-creator__preview-copy">
              {mockShow.subtitle}
            </p>

            {selectedInterests.length > 0 && (
              <section className="show-creator__preview-interests">
                <h3>Mixed with</h3>

                <div className="show-creator__preview-interest-list">
                  {selectedInterests.map((interest) => (
                    <span
                      key={interest.id}
                      className="show-creator__preview-interest"
                    >
                      <span aria-hidden="true">
                        {interest.emoji || "✨"}
                      </span>

                      {interest.label}
                    </span>
                  ))}
                </div>
              </section>
            )}

            <p className="show-creator__preview-meta">
              {answers.playerCount ??
                mockShow.playerCount}{" "}
              players
              {" · "}
              {answers.energyLevel ??
                mockShow.energyLevel}
            </p>

            <button
              type="button"
              className="show-creator__button show-creator__button--primary"
              onClick={handleStartAgain}
            >
              Start Again
            </button>
          </section>

          <p className="show-creator__tagline">
            — We made your show —
          </p>
        </div>
      </main>
    );
  }

  if (!currentQuestion) {
    return null;
  }

  if (isAddingInterest) {
    return (
      <main className="show-creator">
        <div className="show-creator__phone-shell">
          <CreatorHeader
            totalSteps={visibleQuestions.length}
            currentStep={safeCurrentStep}
          />

          <AddInterestCard
            existingInterests={selectedInterests}
            onAdd={handleAddCustomInterest}
            onCancel={() => {
              setIsAddingInterest(false);
              setActiveInterestGroupId(null);
            }}
          />

          <p className="show-creator__tagline">
            — Add your own twist —
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="show-creator">
      <div className="show-creator__phone-shell">
        <CreatorHeader
          totalSteps={visibleQuestions.length}
          currentStep={safeCurrentStep}
        />

        {isInterestQuestion ? (
          <section className="question-card question-card--interests">
            <InterestBuilder
              selectedInterests={selectedInterests}
              onChange={handleInterestChange}
              onAddCustomInterest={
                handleOpenAddInterest
              }
              activeGroupId={activeInterestGroupId}
              onActiveGroupChange={
                setActiveInterestGroupId
              }
            />
          </section>
        ) : (
          <QuestionCard
            key={currentQuestion.id}
            question={currentQuestion}
            value={currentAnswer}
            onChange={handleAnswer}
          />
        )}

        {isInterestQuestion && isViewingInterestGroup ? (
          <>
            <nav
              className="show-creator__navigation show-creator__navigation--single"
              aria-label="Interest-group navigation"
            >
              <button
                type="button"
                className="show-creator__button show-creator__button--secondary"
                onClick={handleReturnToInterests}
              >
                Back to interests
              </button>
            </nav>

            <p className="show-creator__tagline">
              — Choose your ingredients —
            </p>
          </>
        ) : (
          <>
            <nav
              className="show-creator__navigation"
              aria-label="Question navigation"
            >
              <button
                type="button"
                className="show-creator__button show-creator__button--secondary"
                onClick={handleBack}
                disabled={isFirstStep}
              >
                Back
              </button>

              <button
                type="button"
                className="show-creator__button show-creator__button--primary"
                onClick={handleNext}
                disabled={!hasAnswer}
              >
                {isLastStep
                  ? "Build My Show"
                  : "Next"}
              </button>
            </nav>

            <p className="show-creator__tagline">
              — We’ll make your show —
            </p>
          </>
        )}
      </div>
    </main>
  );
}

function CreatorHeader({ totalSteps, currentStep }) {
  return (
    <header className="show-creator__header">
      <div className="show-creator__brand-row">
        <img
          className="show-creator__logo"
          src={qethingLogo}
          alt="QEthing"
        />

        <h1 className="show-creator__heading">
          Show Creator
        </h1>
      </div>

      <ProgressDots
        total={totalSteps}
        current={currentStep}
      />
    </header>
  );
}

export default ShowCreator;