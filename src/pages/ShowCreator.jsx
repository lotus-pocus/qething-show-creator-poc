import { useMemo, useState } from "react";
import LoadingScreen from "../components/LoadingScreen/LoadingScreen";
import QuestionRenderer from "../components/QuestionRenderer/QuestionRenderer";
import ShowPreview from "../components/ShowPreview/ShowPreview";
import flow from "../data/flow";
import qethingLogo from "../assets/images/qething-logo.png";
import "./ShowCreator.css";

function createInitialAnswers() {
  return flow.reduce((initialAnswers, question) => {
    if (question.defaultValue !== undefined) {
      initialAnswers[question.id] = question.defaultValue;
    }

    if (question.type === "multiSelect" || question.type === "categorySelect") {
      initialAnswers[question.id] = [];
    }

    if (question.type === "makeItYours") {
      initialAnswers[question.id] = {
        title: "",
        imageUrl: "",
        imageName: "",
      };
    }

    return initialAnswers;
  }, {});
}

function ShowCreator() {
  const [stage, setStage] = useState("questions");

  const [currentStep, setCurrentStep] = useState(0);

  const [answers, setAnswers] = useState(createInitialAnswers);

  const [isNestedInterestView, setIsNestedInterestView] = useState(false);

  const visibleQuestions = useMemo(() => {
    return flow.filter((question) => {
      if (!question.showWhen) {
        return true;
      }

      return question.showWhen(answers);
    });
  }, [answers]);

  const lastAvailableStep = Math.max(visibleQuestions.length - 1, 0);

  const safeCurrentStep = Math.min(currentStep, lastAvailableStep);

  const currentQuestion = visibleQuestions[safeCurrentStep];

  const currentAnswer = currentQuestion
    ? answers[currentQuestion.id]
    : undefined;

  const isFirstStep = safeCurrentStep === 0;

  const isLastStep = safeCurrentStep === visibleQuestions.length - 1;

  const hasAnswer = useMemo(() => {
    if (!currentQuestion) {
      return false;
    }

    if (currentQuestion.optional) {
      return true;
    }

    if (
      currentQuestion.type === "multiSelect" ||
      currentQuestion.type === "categorySelect"
    ) {
      const minimumSelections = currentQuestion.minimumSelections ?? 1;

      return (
        Array.isArray(currentAnswer) &&
        currentAnswer.length >= minimumSelections
      );
    }

    return (
      currentAnswer !== undefined &&
      currentAnswer !== null &&
      currentAnswer !== ""
    );
  }, [currentAnswer, currentQuestion]);

  function handleAnswer(value) {
    if (!currentQuestion) {
      return;
    }

    setAnswers((previousAnswers) => {
      const updatedAnswers = {
        ...previousAnswers,
        [currentQuestion.id]: value,
      };

      /*
       * Occasion-specific answers should not survive if the
       * player changes the overall occasion.
       *
       * Make It Yours deliberately DOES survive. A player may
       * simply be correcting their occasion after already
       * naming their show.
       */

      /*
       * Changing build type effectively starts a different
       * creator journey, so clear answers belonging to the
       * previous journey.
       */
      if (currentQuestion.id === "buildType") {
        delete updatedAnswers.occasion;
        delete updatedAnswers.audience;
        delete updatedAnswers.experienceLevel;
        delete updatedAnswers.energyLevel;
        delete updatedAnswers.categories;
        delete updatedAnswers.roundTypes;
        delete updatedAnswers.avoid;
        delete updatedAnswers.showStyle;
        delete updatedAnswers.duration;

        updatedAnswers.makeItYours = {
          title: "",
          imageUrl: "",
          imageName: "",
        };

        updatedAnswers.categories = [];
        updatedAnswers.roundTypes = [];
        updatedAnswers.avoid = [];
      }

      return updatedAnswers;
    });
  }

  function handleNext() {
    if (!hasAnswer) {
      return;
    }

    setIsNestedInterestView(false);

    if (isLastStep) {
      setStage("generating");

      window.setTimeout(() => {
        setStage("preview");
      }, 4200);

      return;
    }

    setCurrentStep(safeCurrentStep + 1);
  }

  function handleBack() {
    if (isFirstStep) {
      return;
    }

    setIsNestedInterestView(false);

    setCurrentStep(safeCurrentStep - 1);
  }

  function handleStartAgain() {
    setIsNestedInterestView(false);
    setAnswers(createInitialAnswers());
    setCurrentStep(0);
    setStage("questions");
  }

  if (stage === "generating") {
    return <LoadingScreen answers={answers} />;
  }

  if (stage === "preview") {
    return <ShowPreview answers={answers} onStartAgain={handleStartAgain} />;
  }

  if (!currentQuestion) {
    return null;
  }

  const progressPercentage =
    ((safeCurrentStep + 1) / visibleQuestions.length) * 100;

  return (
    <main className="show-creator">
      <div className="show-creator__phone-shell">
        <header className="show-creator__header">
          <img className="show-creator__logo" src={qethingLogo} alt="QEthing" />

          <h1 className="show-creator__heading">Show Creator</h1>
        </header>

        <div className="show-creator__progress">
          <span
            className="show-creator__progress-bar"
            style={{
              width: `${progressPercentage}%`,
            }}
          />

          <span className="show-creator__progress-label">
            {safeCurrentStep + 1} / {visibleQuestions.length}
          </span>
        </div>

        <section className="question-card">
          <div className="question-card__intro">
            {currentQuestion.eyebrow && (
              <p className="question-card__eyebrow">
                {currentQuestion.eyebrow}
              </p>
            )}

            {currentQuestion.icon && (
              <div className="question-card__hero-icon">
                {currentQuestion.icon}
              </div>
            )}

            <h2 className="question-card__title">{currentQuestion.title}</h2>

            {currentQuestion.description && (
              <p className="question-card__description">
                {currentQuestion.description}
              </p>
            )}
          </div>

          <QuestionRenderer
            key={currentQuestion.id}
            question={currentQuestion}
            value={currentAnswer}
            onChange={handleAnswer}
            onNestedViewChange={setIsNestedInterestView}
          />
        </section>

        {!isNestedInterestView && (
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
              {isLastStep ? "Create Show" : "Next"}
            </button>
          </nav>
        )}

        <p className="show-creator__tagline">— We’ll make your show —</p>
      </div>
    </main>
  );
}

export default ShowCreator;