import React from "react";
import { useLocation, useNavigate, Link as RouterLink } from "react-router-dom";

// --- Data Configuration (Same as Quiz) — key matches Checkout ?plan= ---
const plans = [
  {
    key: "starter",
    name: "Starter",
    price: "2,999 PHP + 79/employee/month",
    minScore: 5,
    maxScore: 9,
    color: "#22c55e",
    lightBg: "rgba(34, 197, 94, 0.08)",
    description: "Perfect for small teams getting started with payroll.",
    scoreRangeLabel: "5–9",
    features: [
      "Up to 20 employees",
      "Standard payroll processing",
      "Basic payroll reports",
      "Email support",
      "Monthly billing",
    ],
    benefits: [
      "Essential payroll without extra cost",
      "Quick setup for small teams",
    ],
  },
  {
    key: "professional",
    name: "Professional",
    price: "4,999 PHP + 109/employee/month",
    minScore: 10,
    maxScore: 13,
    color: "#3b82f6",
    lightBg: "rgba(59, 130, 246, 0.08)",
    description:
      "Ideal for growing companies with multiple branches and moderate complexity.",
    scoreRangeLabel: "10–13",
    features: [
      "Up to 150 employees",
      "Advanced payroll & HR tools",
      "Compliance & tax reports",
      "Priority support",
      "Monthly or annual billing",
    ],
    benefits: [
      "All Starter benefits",
      "Streamlined HR workflows across branches",
      "More power and compliance without going enterprise",
    ],
  },
  {
    key: "enterprise",
    name: "Enterprise",
    price: "10,000 PHP + 179/employee/month",
    minScore: 14,
    maxScore: 17,
    color: "#8b5cf6",
    lightBg: "rgba(139, 92, 246, 0.08)",
    description: "For large organizations that need full support.",
    scoreRangeLabel: "14–17",
    features: [
      "Unlimited employees",
      "Full UlapPayroll suite",
      "Management & analytics reports",
      "Dedicated Product Expert",
      "Custom reporting & integrations",
    ],
    benefits: [
      "All Professional benefits",
      "Dedicated account support",
      "Built for complex, large-scale demand",
    ],
  },
  {
    key: "talk-to-sales",
    name: "Talk to Sales",
    price: null,
    minScore: 18,
    maxScore: 21,
    color: "#64748b",
    lightBg: "rgba(100, 116, 139, 0.08)",
    description: "Custom solutions for large or complex needs. Our team will reach out to discuss the best fit.",
    scoreRangeLabel: "18–21",
    talkToSales: true,
    features: [],
    benefits: [
      "Custom pricing and terms",
      "Dedicated account team",
      "Tailored implementation",
    ],
  },
];

const KEYFRAMES = `
  @keyframes resultCardIn {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
`;

// --- Styles ---
const styles = {
  wrapper: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
    background:
      "linear-gradient(160deg, #f8f9fc 0%, #f0f2f5 50%, #e8ecf1 100%)",
    fontFamily: "'Segoe UI', 'Roboto', Tahoma, Geneva, Verdana, sans-serif",
    padding: "24px 16px",
    boxSizing: "border-box",
  },
  container: {
    width: "100%",
    maxWidth: "900px",
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "24px",
    alignItems: "start",
  },
  planColumn: {
    backgroundColor: "#ffffff",
    borderRadius: "24px",
    boxShadow: "0 4px 24px rgba(0,0,0,0.06), 0 1px 3px rgba(0,0,0,0.04)",
    padding: "40px 36px 36px",
    overflow: "hidden",
  },
  answersColumn: {
    backgroundColor: "#ffffff",
    borderRadius: "24px",
    boxShadow: "0 4px 24px rgba(0,0,0,0.06), 0 1px 3px rgba(0,0,0,0.04)",
    padding: "28px 24px 32px",
    overflow: "hidden",
  },
  resultCard: (color, lightBg) => ({
    padding: "32px 28px",
    borderRadius: "20px",
    borderTop: `4px solid ${color}`,
    backgroundColor: lightBg,
    transition: "box-shadow 0.3s ease",
  }),
  planPill: (color) => ({
    display: "inline-block",
    fontSize: "14px",
    fontWeight: "600",
    color: "#fff",
    backgroundColor: color,
    padding: "8px 18px",
    borderRadius: "999px",
    marginBottom: "16px",
  }),
  planTitle: {
    fontSize: "24px",
    fontWeight: "700",
    color: "#1e293b",
    letterSpacing: "-0.02em",
    marginBottom: "8px",
  },
  partialNote: {
    fontSize: "13px",
    color: "#94a3b8",
    marginBottom: "16px",
  },
  planPrice: {
    fontSize: "18px",
    fontWeight: "600",
    color: "#334155",
    marginBottom: "12px",
  },
  planDescription: {
    fontSize: "14px",
    color: "#64748b",
    lineHeight: 1.5,
    marginBottom: "24px",
  },
  sectionLabel: {
    fontSize: "12px",
    fontWeight: "600",
    color: "#475569",
    textTransform: "uppercase",
    letterSpacing: "0.04em",
    marginBottom: "10px",
  },
  featuresList: {
    listStyle: "none",
    padding: 0,
    margin: "0 0 20px 0",
  },
  featureItem: (color) => ({
    fontSize: "14px",
    color: "#334155",
    padding: "6px 0",
    paddingLeft: "22px",
    position: "relative",
    lineHeight: 1.4,
  }),
  featureCheck: (color) => ({
    position: "absolute",
    left: 0,
    color,
    fontWeight: "700",
  }),
  benefitsList: {
    listStyle: "none",
    padding: 0,
    margin: "0 0 24px 0",
  },
  benefitItem: {
    fontSize: "14px",
    color: "#334155",
    padding: "6px 0",
    paddingLeft: "22px",
    position: "relative",
    lineHeight: 1.4,
  },
  benefitCheck: {
    position: "absolute",
    left: 0,
    color: "#22c55e",
    fontWeight: "700",
  },
  button: (color) => ({
    display: "block",
    textAlign: "center",
    textDecoration: "none",
    backgroundColor: color,
    color: "white",
    border: "none",
    padding: "14px 28px",
    fontSize: "15px",
    fontWeight: "600",
    borderRadius: "14px",
    cursor: "pointer",
    width: "100%",
    transition: "all 0.25s cubic-bezier(0.4, 0, 0.2, 1)",
    boxShadow: `0 2px 10px ${color}40`,
  }),
  linkSecondary: {
    display: "block",
    marginTop: "16px",
    fontSize: "14px",
    color: "#64748b",
    textDecoration: "none",
    transition: "color 0.2s ease",
  },
  answersTitle: {
    fontSize: "15px",
    fontWeight: "600",
    color: "#64748b",
    textTransform: "uppercase",
    letterSpacing: "0.06em",
    marginBottom: "12px",
  },
  answersParagraph: {
    fontSize: "14px",
    color: "#334155",
    lineHeight: 1.65,
    marginBottom: "24px",
  },
};

function Result() {
  const location = useLocation();
  const navigate = useNavigate();
  const totalScore = location.state?.totalScore ?? null;
  const answeredCount = location.state?.answeredCount;
  const totalQuestions = location.state?.totalQuestions ?? 5;
  const answers = location.state?.answers ?? {};
  const questionsSummary = location.state?.questionsSummary ?? [];
  const isPartial =
    answeredCount != null &&
    totalQuestions != null &&
    answeredCount < totalQuestions;
  const hasAnswers =
    questionsSummary.length > 0 && Object.keys(answers).length > 0;

  // Determine plan based on score (default to first plan if no score)
  const getRecommendedPlan = () => {
    const score = totalScore != null ? totalScore : 0;
    return (
      plans.find((plan) => score >= plan.minScore && plan.maxScore >= score) ||
      plans[0]
    );
  };

  const recommended = getRecommendedPlan();

  const handleCheckout = () => {
    navigate(`/checkout?plan=${recommended.key}`);
  };

  // Format answer value for display (single option or array of options)
  const getAnswerLabels = (q) => {
    const val = answers[q.id];
    if (val == null) return null;
    if (Array.isArray(val)) return val.map((o) => o.label).join(", ");
    return val.label || val;
  };

  // Build paragraph text from questionnaire answers (natural flow)
  const answersParagraph = hasAnswers
    ? questionsSummary
        .filter((q) => getAnswerLabels(q))
        .map((q) => {
          const labels = getAnswerLabels(q);
          const t = q.title.replace(/\?$/, "").trim();
          if (/how many employees/i.test(t))
            return `You have ${labels} employees.`;
          if (/types of workers/i.test(t)) return `You pay ${labels}.`;
          if (/want from your payroll/i.test(t)) return `You want ${labels}.`;
          if (/kind of payroll reports/i.test(t)) return `You need ${labels}.`;
          if (/level of payroll support/i.test(t))
            return `You prefer ${labels}.`;
          return `${t}: ${labels}.`;
        })
        .join(" ")
    : "";

  // Landed without questionnaire state — still show recommended (default) and allow checkout or retake
  return (
    <div style={styles.wrapper}>
      <style>{KEYFRAMES}</style>
      <div
        style={{
          ...styles.container,
          gridTemplateColumns: hasAnswers ? "1fr 1fr" : "1fr",
          maxWidth: hasAnswers ? 900 : 440,
          animation: "resultCardIn 0.5s cubic-bezier(0.4, 0, 0.2, 1) forwards",
        }}
        className="result-layout"
      >
        <div style={styles.planColumn}>
          <div
            style={styles.resultCard(recommended.color, recommended.lightBg)}
          >
            {isPartial && (
              <p style={styles.partialNote}>
                Answer more questions for a more accurate recommendation.
              </p>
            )}

            <div style={styles.planPill(recommended.color)}>
              {recommended.name}
            </div>
            <h2 style={styles.planTitle}>
              {recommended.talkToSales ? recommended.name : `${recommended.name} Plan`}
            </h2>
            {recommended.price != null && (
              <div style={styles.planPrice}>{recommended.price}</div>
            )}
            <p style={styles.planDescription}>{recommended.description}</p>

            {recommended.features && recommended.features.length > 0 && (
              <>
                <div style={styles.sectionLabel}>What’s included</div>
                <ul style={styles.featuresList}>
                  {recommended.features.map((feature, i) => (
                    <li key={i} style={styles.featureItem(recommended.color)}>
                      <span style={styles.featureCheck(recommended.color)}>
                        ✓
                      </span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </>
            )}

            {recommended.talkToSales ? (
              <RouterLink
                to="/contact-us"
                style={styles.button(recommended.color)}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-1px)";
                  e.currentTarget.style.boxShadow = `0 4px 16px ${recommended.color}50`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = `0 2px 10px ${recommended.color}40`;
                }}
              >
                Talk to Sales
              </RouterLink>
            ) : (
              <button
                type="button"
                style={styles.button(recommended.color)}
                onClick={handleCheckout}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-1px)";
                  e.currentTarget.style.boxShadow = `0 4px 16px ${recommended.color}50`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = `0 2px 10px ${recommended.color}40`;
                }}
              >
                Proceed to checkout
              </button>
            )}
            <RouterLink
              to="/questionnaire"
              style={styles.linkSecondary}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "#1e293b";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "#64748b";
              }}
            >
              Retake questionnaire
            </RouterLink>
          </div>
        </div>

        {hasAnswers && (
          <div style={styles.answersColumn}>
            <div style={styles.answersTitle}>Your answers</div>
            <p style={styles.answersParagraph}>{answersParagraph}</p>

            {recommended.benefits && recommended.benefits.length > 0 && (
              <>
                <div style={styles.sectionLabel}>Benefits for you</div>
                <ul style={styles.benefitsList}>
                  {recommended.benefits.map((benefit, i) => (
                    <li key={i} style={styles.benefitItem}>
                      <span style={styles.benefitCheck}>✓</span>
                      {benefit}
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>
        )}
      </div>

      <style>{`
        @media (max-width: 720px) {
          .result-layout {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}

export default Result;
