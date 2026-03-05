import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// --- Data Configuration ---
const questions = [
  {
    id: 1,
    title: "What types of workers do you pay?",
    type: "multi-select",
    options: [
      { label: "Fixed Monthly Employees", score: 1, isComplex: false },
      { label: "Daily Wage Employees", score: 2, isComplex: true },
      { label: "Project-Based Employees", score: 2, isComplex: true },
      { label: "Field / Remote Employees", score: 3, isComplex: true },
      { label: "Mixed Compensation Staff", score: 5, isComplex: true },
    ],
  },
  {
    id: 2,
    title: "How many employees do you have?",
    type: "single-select",
    options: [
      { label: "1-20", score: 1 },
      { label: "21-50", score: 2 },
      { label: "50-150", score: 3 },
      { label: "151+", score: 4 },
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
];

const plans = [
  { name: "Starter", price: "2,000 PHP", minScore: 0, maxScore: 5 },
  { name: "Professional", price: "6,000 PHP", minScore: 6, maxScore: 10 },
  { name: "Enterprise", price: "13,000 PHP", minScore: 11, maxScore: 999 },
];

// --- Styles ---
const styles = {
  wrapper: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
    backgroundColor: "#f4f4f4",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    padding: "20px",
  },
  container: {
    width: "100%",
    maxWidth: "500px",
    backgroundColor: "#ffffff",
    borderRadius: "20px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
    padding: "40px 30px",
    textAlign: "center",
    position: "relative",
    overflow: "hidden",
  },
  dotContainer: {
    display: "flex",
    justifyContent: "center",
    gap: "12px",
    marginBottom: "30px",
  },
  dot: {
    width: "10px",
    height: "10px",
    borderRadius: "50%",
    backgroundColor: "#e0e0e0",
    transition: "all 0.3s ease",
  },
  dotActive: {
    backgroundColor: "#ff6b00",
    transform: "scale(1.3)",
  },
  dotCompleted: {
    backgroundColor: "#ff6b00",
    transform: "scale(1.1)",
  },
  title: {
    fontSize: "22px",
    fontWeight: "700",
    color: "#1a1a1a",
    marginBottom: "25px",
    lineHeight: "1.4",
  },
  optionsGrid: {
    display: "grid",
    gridTemplateColumns: "1fr",
    gap: "12px",
    marginBottom: "30px",
  },
  optionCard: {
    padding: "16px 20px",
    border: "2px solid #e0e0e0",
    borderRadius: "12px",
    cursor: "pointer",
    transition: "all 0.2s ease",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#fff",
  },
  optionCardSelected: {
    borderColor: "#ff6b00",
    backgroundColor: "#fff5eb",
    fontWeight: "600",
  },
  button: {
    backgroundColor: "#ff6b00",
    color: "white",
    border: "none",
    padding: "14px 32px",
    fontSize: "16px",
    fontWeight: "700",
    borderRadius: "30px",
    cursor: "pointer",
    width: "100%",
    marginTop: "20px",
    transition: "background 0.2s",
  },
};

function Quiz() {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [hoveredOption, setHoveredOption] = useState(null);
  const navigate = useNavigate();

  // --- Logic for Question 1 (Multi-select) ---
  const handleMultiSelect = (option) => {
    const currentSelection = answers[1] || [];
    let newSelection;

    if (currentSelection.includes(option)) {
      newSelection = currentSelection.filter((item) => item !== option);
    } else {
      newSelection = [...currentSelection, option];
    }

    setAnswers({ ...answers, [1]: newSelection });
  };

  // --- Logic for Single Select (Auto-Next) ---
  const handleSingleSelect = (option) => {
    setAnswers({ ...answers, [questions[currentStep].id]: option });
    
    setTimeout(() => {
      if (currentStep < questions.length - 1) {
        setCurrentStep(currentStep + 1);
      } else {
        calculateAndRedirect();
      }
    }, 250);
  };

  // --- Calculate Score and Redirect ---
  const calculateAndRedirect = () => {
    let score = 0;

    // 1. Process Question 1 (Multi-select)
    const q1Selection = answers[1] || [];
    let q1Score = 0;
    let complexCount = 0;

    q1Selection.forEach((opt) => {
      q1Score += opt.score;
      if (opt.isComplex) complexCount++;
    });

    // Complexity Bonus
    if (complexCount >= 3) {
      q1Score += 5;
    }
    score += q1Score;

    // 2. Process Questions 2, 3, 4
    for (let i = 1; i < questions.length; i++) {
      const selectedOption = answers[questions[i].id];
      if (selectedOption) {
        score += selectedOption.score;
      }
    }

    // Navigate to Result page with score
    navigate('/result', { state: { totalScore: score } });
  };

  // --- Render Dot Navigation ---
  const renderDots = () => {
    return (
      <div style={styles.dotContainer}>
        {questions.map((_, index) => {
          let dotStyle = styles.dot;
          
          if (index < currentStep) {
            dotStyle = { ...dotStyle, ...styles.dotCompleted };
          } else if (index === currentStep) {
            dotStyle = { ...dotStyle, ...styles.dotActive };
          }

          return <div key={index} style={dotStyle} />;
        })}
      </div>
    );
  };

  // --- Render ---
  return (
    <div style={styles.wrapper}>
      <div style={styles.container}>
        
        {/* Dot Navigation */}
        {currentStep < questions.length && renderDots()}

        {currentStep < questions.length ? (
          // --- Question View ---
          <div>
            <h2 style={styles.title}>{questions[currentStep].title}</h2>
            
            <div style={styles.optionsGrid}>
              {questions[currentStep].options.map((option, index) => {
                const isSelected = 
                  questions[currentStep].type === "multi-select" 
                    ? (answers[1] || []).includes(option)
                    : answers[questions[currentStep].id] === option;

                return (
                  <div
                    key={index}
                    style={{
                      ...styles.optionCard,
                      ...(isSelected ? styles.optionCardSelected : {}),
                      ...(hoveredOption === index && !isSelected ? { borderColor: "#ff6b00", backgroundColor: "#fafafa" } : {}),
                    }}
                    onClick={() =>
                      questions[currentStep].type === "multi-select"
                        ? handleMultiSelect(option)
                        : handleSingleSelect(option)
                    }
                    onMouseEnter={() => setHoveredOption(index)}
                    onMouseLeave={() => setHoveredOption(null)}
                  >
                    <span>{option.label}</span>
                    {isSelected && (
                      <span style={{ color: "#ff6b00", fontWeight: "bold" }}>✓</span>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Next Button for Multi-select */}
            {questions[currentStep].type === "multi-select" && (
              <button
                style={{
                  ...styles.button,
                  opacity: (answers[1] || []).length === 0 ? 0.5 : 1,
                  cursor: (answers[1] || []).length === 0 ? "not-allowed" : "pointer",
                }}
                disabled={(answers[1] || []).length === 0}
                onClick={() => {
                  if ((answers[1] || []).length > 0) {
                    setCurrentStep(currentStep + 1);
                  }
                }}
              >
                Next
              </button>
            )}
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default Quiz;