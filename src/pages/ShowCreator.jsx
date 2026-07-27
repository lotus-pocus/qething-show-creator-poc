import { useMemo, useState } from "react";
import qethingLogo from "../assets/images/qething-logo.png";
import LoadingScreen from "../components/LoadingScreen/LoadingScreen";
import ProgressDots from "../components/ProgressDots/ProgressDots";
import QuestionCard from "../components/QuestionCard/QuestionCard";
import flow from "../data/flow";
import mockShow from "../data/mockShow";
import "./ShowCreator.css";

function createInitialAnswers() {
  return flow.reduce((initialAnswers, question) => {
    if (question.defaultValue !== undefined) {
      initialAnswers[question.id] = question.defaultValue;
    }

    return initialAnswers;
  }, {});
}

function ShowCreator() {
  const [stage, setStage] = useState("questions");
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState(createInitialAnswers);

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

  const hasAnswer =
    currentAnswer !== undefined &&
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

      return updatedAnswers;
    });
  }

  function handleNext() {
    if (!hasAnswer) {
      return;
    }

    if (isLastStep) {
      handleBuildShow();
      return;
    }

    setCurrentStep(safeCurrentStep + 1);
  }

  function handleBack() {
    if (isFirstStep) {
      return;
    }

    setCurrentStep(safeCurrentStep - 1);
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

            <p className="show-creator__preview-meta">
              {answers.playerCount ?? mockShow.playerCount} players
              {" · "}
              {answers.energyLevel ?? mockShow.energyLevel}
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
            Show Creator
          </h1>
        </header>

        <QuestionCard
          key={currentQuestion.id}
          question={currentQuestion}
          value={currentAnswer}
          onChange={handleAnswer}
        />

        <ProgressDots
          total={visibleQuestions.length}
          current={safeCurrentStep}
        />

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
            {isLastStep ? "Build My Show" : "Next"}
          </button>
        </nav>

        <p className="show-creator__tagline">
          — We’ll make your show —
        </p>
      </div>
    </main>
  );
}

export default ShowCreator;