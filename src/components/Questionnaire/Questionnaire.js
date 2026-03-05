import React, { useState } from "react";
import { useNavigate, Link as RouterLink } from "react-router-dom";

// --- Data Configuration ---
const questions = [
  {
    id: 1,
    title: "How many employees do you have?",
    type: "single-select",
    options: [
      { label: "Startup (1-20 Employees) — Small, agile team.", score: 1 },
      { label: "Growing (21-49 Employees) — Expanding team with emerging structure.", score: 2 },
      { label: "Mid-Sized (51-150 Employees) — Established company with organized workflows", score: 3 },
      { label: "Enterprise (151+ Employees) — Large Organization", score: 4 },
    ],
  },
  {
    id: 2,
    title: "What types of workers do you pay? (Select all that apply)",
    type: "multi-select",
    hint: "Complexity Bonus: If 3 or more complex types are selected (Daily, Project-Based, Field, Mixed) → Add +5 points",
    options: [
      { label: "Fixed Monthly Employees — Salaried staff", score: 1, isComplex: false },
      { label: "Daily Wage Employees — Paid by day", score: 2, isComplex: true },
      { label: "Project-Based Employees — Paid per project", score: 2, isComplex: true },
      { label: "Field / Remote Employees — Offsite Staff", score: 3, isComplex: true },
    ],
  },
  {
    id: 3,
    title: "What do you want from your payroll and HR solution?",
    type: "single-select",
    options: [
      { label: "Standard features only.", score: 1 },
      { label: "Standard features with additional tools.", score: 2 },
      { label: "Everything available in UlapPayroll.", score: 3 },
    ],
  },
  {
    id: 4,
    title: "What kind of payroll reports do you need?",
    type: "single-select",
    options: [
      { label: "Standard reports only.", score: 1 },
      { label: "Advanced compliance reports.", score: 2 },
      { label: "Management & analytics reports.", score: 3 },
    ],
  },
  {
    id: 5,
    title: "What level of payroll support would you like?",
    type: "single-select",
    options: [
      { label: "Expert Product Support", score: 1 },
      { label: "Expert Product Support & Expert Setup", score: 3 },
    ],
  },
];
// eslint-disable-next-line
const plans = [
  { name: "Starter", price: "2,999 PHP + 79/employee/month", minScore: 5, maxScore: 9 },
  { name: "Professional", price: "4,999 PHP + 109/employee/month", minScore: 10, maxScore: 13 },
  { name: "Enterprise", price: "10,000 PHP + 179/employee/month", minScore: 14, maxScore: 17 },
  { name: "Talk to Sales", price: "—", minScore: 18, maxScore: 21 },
];

// --- Styles ---
const styles = {
  wrapper: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
    background: "linear-gradient(160deg, #f8f9fc 0%, #f0f2f5 50%, #e8ecf1 100%)",
    fontFamily: "'Segoe UI', 'Roboto', Tahoma, Geneva, Verdana, sans-serif",
    padding: "24px 16px",
    boxSizing: "border-box",
  },
  container: {
    width: "100%",
    maxWidth: "520px",
    backgroundColor: "#ffffff",
    borderRadius: "24px",
    boxShadow: "0 4px 24px rgba(0,0,0,0.06), 0 1px 3px rgba(0,0,0,0.04)",
    padding: "36px 32px 32px",
    position: "relative",
    overflow: "hidden",
    transition: "box-shadow 0.3s ease",
  },
  progressWrap: {
    marginBottom: "28px",
  },
  progressBar: {
    height: "6px",
    borderRadius: "999px",
    backgroundColor: "rgba(255, 107, 0, 0.15)",
    overflow: "hidden",
    transition: "width 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
  },
  progressFill: {
    height: "100%",
    borderRadius: "999px",
    background: "linear-gradient(90deg, #ff6b00, #ff8c42)",
    transition: "width 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
  },
  stepLabel: {
    fontSize: "13px",
    color: "#64748b",
    marginTop: "8px",
    fontWeight: 500,
  },
  introTitle: {
    fontSize: "22px",
    fontWeight: "700",
    color: "#1e293b",
    marginBottom: "8px",
    lineHeight: 1.3,
    letterSpacing: "-0.02em",
  },
  introSubtitle: {
    fontSize: "15px",
    color: "#64748b",
    marginBottom: "24px",
    lineHeight: 1.5,
  },
  title: {
    fontSize: "20px",
    fontWeight: "700",
    color: "#1e293b",
    marginBottom: "8px",
    lineHeight: 1.4,
    letterSpacing: "-0.01em",
  },
  hint: {
    fontSize: "13px",
    color: "#64748b",
    marginBottom: "20px",
    lineHeight: 1.5,
    padding: "10px 14px",
    backgroundColor: "rgba(255, 107, 0, 0.06)",
    borderRadius: "10px",
    borderLeft: "3px solid #ff6b00",
  },
  optionsGrid: {
    display: "grid",
    gridTemplateColumns: "1fr",
    gap: "10px",
    marginBottom: "24px",
  },
  optionCard: {
    padding: "16px 20px",
    border: "2px solid #e2e8f0",
    borderRadius: "14px",
    cursor: "pointer",
    transition: "all 0.25s cubic-bezier(0.4, 0, 0.2, 1)",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#fff",
    outline: "none",
  },
  optionCardSelected: {
    borderColor: "#ff6b00",
    backgroundColor: "rgba(255, 107, 0, 0.06)",
    fontWeight: "600",
    boxShadow: "0 0 0 1px rgba(255, 107, 0, 0.2)",
  },
  button: {
    backgroundColor: "#ff6b00",
    color: "white",
    border: "none",
    padding: "14px 32px",
    fontSize: "16px",
    fontWeight: "600",
    borderRadius: "14px",
    cursor: "pointer",
    width: "100%",
    marginTop: "8px",
    transition: "all 0.25s cubic-bezier(0.4, 0, 0.2, 1)",
    boxShadow: "0 2px 8px rgba(255, 107, 0, 0.25)",
  },
  backLink: {
    display: "inline-block",
    marginTop: "20px",
    fontSize: "14px",
    color: "#64748b",
    textDecoration: "none",
    transition: "color 0.2s ease",
  },
};

const KEYFRAMES = `
  @keyframes questionIn {
    from { opacity: 0; transform: translateY(16px); }
    to { opacity: 1; transform: translateY(0); }
  }
  @keyframes optionIn {
    from { opacity: 0; transform: translateY(8px); }
    to { opacity: 1; transform: translateY(0); }
  }
`;

function Quiz() {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [hoveredOption, setHoveredOption] = useState(null);
  const navigate = useNavigate();

  // --- Logic for Multi-select (worker types, etc.) ---
  const handleMultiSelect = (option) => {
    const qId = questions[currentStep].id;
    const currentSelection = answers[qId] || [];
    let newSelection;

    if (currentSelection.includes(option)) {
      newSelection = currentSelection.filter((item) => item !== option);
    } else {
      newSelection = [...currentSelection, option];
    }

    setAnswers({ ...answers, [qId]: newSelection });
  };

  // When we reach last question and user selects an option, single-select auto-advances and redirects
  const handleSingleSelect = (option) => {
    const qId = questions[currentStep].id;
    const nextAnswers = { ...answers, [qId]: option };
    setAnswers(nextAnswers);

    setTimeout(() => {
      if (currentStep < questions.length - 1) {
        setCurrentStep(currentStep + 1);
      } else {
        // Last question: compute score with the new answer (state not updated yet)
        let score = 0;
        questions.forEach((q) => {
          const data = q.id === qId ? option : answers[q.id];
          if (q.type === "multi-select") {
            const selection = q.id === qId ? [option] : answers[q.id] || [];
            let qScore = 0,
              complexCount = 0;
            selection.forEach((opt) => {
              qScore += opt.score;
              if (opt.isComplex) complexCount++;
            });
            if (complexCount >= 3) qScore += 5;
            score += qScore;
          } else if (data) {
            score += data.score;
          }
        });
        navigate("/result", {
          state: {
            totalScore: score,
            answeredCount: questions.length,
            totalQuestions: questions.length,
            answers: nextAnswers,
            questionsSummary: questions.map((q) => ({
              id: q.id,
              title: q.title,
              type: q.type,
              options: q.options.map((o) => ({ label: o.label })),
            })),
          },
        });
      }
    }, 250);
  };

  const progressPercent =
    questions.length > 0
      ? ((currentStep + 1) / questions.length) * 100
      : 0;

  const renderProgress = () => (
    <div style={styles.progressWrap}>
      <div style={styles.progressBar}>
        <div
          style={{
            ...styles.progressFill,
            width: `${progressPercent}%`,
          }}
        />
      </div>
      <div style={styles.stepLabel}>
        Question {currentStep + 1} of {questions.length}
      </div>
    </div>
  );

  // --- Render ---
  return (
    <div style={styles.wrapper}>
      <style>{KEYFRAMES}</style>
      <div style={styles.container}>
        {currentStep < questions.length && renderProgress()}

        {currentStep < questions.length ? (
          <div
            key={currentStep}
            style={{
              animation: "questionIn 0.4s cubic-bezier(0.4, 0, 0.2, 1) forwards",
            }}
          >
            {currentStep === 0 && (
              <>
                <h1 style={styles.introTitle}>Find Your Plan</h1>
                <p style={styles.introSubtitle}>
                  Share a few details to discover the best payroll for your business. We’ll take it from there.
                </p>
              </>
            )}
            <h2 style={styles.title}>{questions[currentStep].title}</h2>
            {questions[currentStep].hint && (
              <p style={styles.hint}>⚠ {questions[currentStep].hint}</p>
            )}

            <div style={styles.optionsGrid}>
              {questions[currentStep].options.map((option, index) => {
                const qId = questions[currentStep].id;
                const isSelected =
                  questions[currentStep].type === "multi-select"
                    ? (answers[qId] || []).includes(option)
                    : answers[qId] === option;
                const isHovered = hoveredOption === index && !isSelected;

                return (
                  <div
                    key={index}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        questions[currentStep].type === "multi-select"
                          ? handleMultiSelect(option)
                          : handleSingleSelect(option);
                      }
                    }}
                    style={{
                      ...styles.optionCard,
                      ...(isSelected ? styles.optionCardSelected : {}),
                      ...(isHovered
                        ? {
                            borderColor: "rgba(255, 107, 0, 0.5)",
                            backgroundColor: "#fafafa",
                            transform: "translateY(-2px)",
                            boxShadow: "0 4px 12px rgba(0,0,0,0.06)",
                          }
                        : {}),
                      animation: "optionIn 0.35s ease-out forwards",
                      animationDelay: `${index * 0.04}s`,
                      opacity: 0,
                    }}
                    onClick={() =>
                      questions[currentStep].type === "multi-select"
                        ? handleMultiSelect(option)
                        : handleSingleSelect(option)
                    }
                    onMouseEnter={() => setHoveredOption(index)}
                    onMouseLeave={() => setHoveredOption(null)}
                  >
                    <span style={{ textAlign: "left" }}>{option.label}</span>
                    {isSelected && (
                      <span
                        style={{
                          color: "#ff6b00",
                          fontWeight: "700",
                          fontSize: "18px",
                          flexShrink: 0,
                          marginLeft: "8px",
                        }}
                      >
                        ✓
                      </span>
                    )}
                  </div>
                );
              })}
            </div>

            {questions[currentStep].type === "multi-select" && (
              <button
                type="button"
                style={{
                  ...styles.button,
                  opacity:
                    (answers[questions[currentStep].id] || []).length === 0
                      ? 0.5
                      : 1,
                  cursor:
                    (answers[questions[currentStep].id] || []).length === 0
                      ? "not-allowed"
                      : "pointer",
                }}
                disabled={
                  (answers[questions[currentStep].id] || []).length === 0
                }
                onClick={() => {
                  if ((answers[questions[currentStep].id] || []).length > 0) {
                    setCurrentStep(currentStep + 1);
                  }
                }}
                onMouseEnter={(e) => {
                  if ((answers[questions[currentStep].id] || []).length > 0) {
                    e.currentTarget.style.transform = "translateY(-1px)";
                    e.currentTarget.style.boxShadow =
                      "0 4px 14px rgba(255, 107, 0, 0.35)";
                  }
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow =
                    "0 2px 8px rgba(255, 107, 0, 0.25)";
                }}
              >
                Continue
              </button>
            )}

            <RouterLink
              to="/"
              style={styles.backLink}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "#ff6b00";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "#64748b";
              }}
            >
              ← Back to home
            </RouterLink>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default Quiz;
