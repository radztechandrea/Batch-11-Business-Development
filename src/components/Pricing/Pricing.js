import React from "react";
import { Link as RouterLink } from "react-router-dom";

// Plan data aligned with Checkout — key used for ?plan=
const PLANS = [
  {
    key: "starter",
    name: "Starter",
    scoreRange: "5-9",
    priceBase: 2999,
    pricePerEmployee: 79,
    priceDisplay: "2,999 PHP + 79/employee/month",
    description: "Perfect for small teams",
    color: "#22c55e",
    lightBg: "rgba(34, 197, 94, 0.08)",
    features: [
      "Up to 20 employees",
      "Standard payroll processing",
      "Basic payroll reports",
      "Email support",
      "Monthly billing",
    ],
    notIncluded: ["Advanced compliance reports", "Dedicated support", "Custom analytics"],
  },
  {
    key: "professional",
    name: "Professional",
    scoreRange: "10-13",
    priceBase: 4999,
    pricePerEmployee: 109,
    priceDisplay: "4,999 PHP + 109/employee/month",
    description: "Best for growing businesses",
    color: "#3b82f6",
    lightBg: "rgba(59, 130, 246, 0.08)",
    popular: true,
    features: [
      "Up to 150 employees",
      "Advanced payroll & HR tools",
      "Compliance & tax reports",
      "Priority support",
      "Monthly or annual billing",
    ],
    notIncluded: ["Dedicated account manager", "Custom integrations"],
  },
  {
    key: "enterprise",
    name: "Enterprise",
    scoreRange: "14-17",
    priceBase: 10000,
    pricePerEmployee: 179,
    priceDisplay: "10,000 PHP + 179/employee/month",
    description: "For large organizations",
    color: "#8b5cf6",
    lightBg: "rgba(139, 92, 246, 0.08)",
    features: [
      "Unlimited employees",
      "Full UlapPayroll suite",
      "Management & analytics reports",
      "Dedicated Product Expert",
      "Custom reporting & integrations",
    ],
    notIncluded: [],
  },
  {
    key: "talk-to-sales",
    name: "Talk to Sales",
    scoreRange: "18-21",
    description: "Custom solutions for large or complex needs. Our team will reach out.",
    color: "#64748b",
    lightBg: "rgba(100, 116, 139, 0.08)",
    talkToSales: true,
    features: [
      "Custom pricing and terms",
      "Dedicated account team",
      "Tailored implementation",
    ],
    notIncluded: [],
  },
];

const KEYFRAMES = `
  @keyframes pricingCardIn {
    from { opacity: 0; transform: translateY(16px); }
    to { opacity: 1; transform: translateY(0); }
  }
`;

const styles = {
  wrapper: {
    minHeight: "100vh",
    background: "linear-gradient(160deg, #f8f9fc 0%, #f0f2f5 50%, #e8ecf1 100%)",
    padding: "48px 24px 64px",
    fontFamily: "'Segoe UI', 'Roboto', Tahoma, Geneva, Verdana, sans-serif",
    boxSizing: "border-box",
  },
  container: {
    maxWidth: 1100,
    margin: "0 auto",
  },
  header: {
    textAlign: "center",
    marginBottom: "48px",
  },
  title: {
    fontSize: "26px",
    fontWeight: "700",
    color: "#1e293b",
    letterSpacing: "-0.02em",
    marginBottom: "8px",
    maxWidth: 640,
    marginLeft: "auto",
    marginRight: "auto",
    lineHeight: 1.35,
  },
  subtitle: {
    fontSize: "16px",
    color: "#64748b",
    maxWidth: 520,
    margin: "0 auto",
    lineHeight: 1.5,
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: "24px",
    alignItems: "stretch",
  },
  card: (color, lightBg, isPopular) => ({
    position: "relative",
    backgroundColor: "#fff",
    borderRadius: "28px",
    padding: "28px 24px 32px",
    boxShadow: "0 2px 16px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)",
    display: "flex",
    flexDirection: "column",
    transition: "transform 0.25s ease, box-shadow 0.25s ease",
    ...(isPopular ? { boxShadow: `0 4px 24px ${color}20, 0 2px 12px rgba(0,0,0,0.06)` } : {}),
  }),
  popularBadge: (color) => ({
    position: "absolute",
    top: "-10px",
    left: "50%",
    transform: "translateX(-50%)",
    backgroundColor: color,
    color: "#fff",
    fontSize: "12px",
    fontWeight: "600",
    padding: "4px 14px",
    borderRadius: "999px",
    whiteSpace: "nowrap",
  }),
  planName: (color) => ({
    fontSize: "22px",
    fontWeight: "700",
    color,
    marginBottom: "4px",
  }),
  scoreRange: (color) => ({
    fontSize: "14px",
    fontWeight: "600",
    color,
    opacity: 0.9,
    marginBottom: "4px",
  }),
  planDescription: {
    fontSize: "14px",
    color: "#64748b",
    marginBottom: "20px",
    lineHeight: 1.4,
  },
  priceWrap: {
    marginBottom: "24px",
    paddingBottom: "20px",
    borderBottom: "1px solid #e2e8f0",
  },
  price: (color) => ({
    fontSize: "32px",
    fontWeight: "700",
    color: "#1e293b",
    letterSpacing: "-0.02em",
  }),
  priceUnit: {
    fontSize: "14px",
    color: "#64748b",
    fontWeight: 500,
    marginTop: "2px",
  },
  talkToSalesLabel: {
    fontSize: "18px",
    fontWeight: "600",
    color: "#64748b",
  },
  featuresList: {
    listStyle: "none",
    padding: 0,
    margin: "0 0 16px 0",
    flex: "1 1 auto",
    minHeight: 0,
  },
  featureItem: {
    fontSize: "14px",
    color: "#334155",
    padding: "6px 0",
    paddingLeft: "24px",
    position: "relative",
    lineHeight: 1.4,
  },
  featureCheck: (color) => ({
    position: "absolute",
    left: 0,
    color,
    fontWeight: "700",
  }),
  notIncluded: {
    fontSize: "13px",
    color: "#94a3b8",
    paddingLeft: "24px",
    marginBottom: "16px",
    lineHeight: 1.5,
    flexShrink: 0,
  },
  notIncludedItem: {
    position: "relative",
    paddingLeft: "16px",
    marginBottom: "4px",
  },
  notIncludedDash: {
    position: "absolute",
    left: 0,
  },
  cta: (color) => ({
    display: "block",
    textAlign: "center",
    padding: "14px 28px",
    fontSize: "15px",
    fontWeight: "600",
    borderRadius: "999px",
    textDecoration: "none",
    backgroundColor: color,
    color: "#fff",
    transition: "all 0.25s cubic-bezier(0.4, 0, 0.2, 1)",
    boxShadow: `0 2px 12px ${color}40`,
    border: "none",
    cursor: "pointer",
    width: "100%",
    flexShrink: 0,
    marginTop: "auto",
  }),
  linkWrap: {
    marginTop: "32px",
    textAlign: "center",
  },
  quizButton: {
    display: "inline-block",
    padding: "12px 24px",
    fontSize: "15px",
    fontWeight: "600",
    color: "#64748b",
    backgroundColor: "#fff",
    border: "2px solid #e2e8f0",
    borderRadius: "999px",
    textDecoration: "none",
    transition: "all 0.2s ease",
    boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
    cursor: "pointer",
  },
};

function formatPrice(n) {
  return `₱${Number(n).toLocaleString("en-PH")}`;
}

export default function Pricing() {
  return (
    <div style={styles.wrapper}>
      <style>{KEYFRAMES}</style>
      <div style={styles.container}>
        <header style={styles.header}>
          <h1 style={styles.title}>
            Compare features and find the right plan for your team.
          </h1>
          <p style={styles.subtitle}>
            All plans include secure payroll processing and support.
          </p>
        </header>

        <div style={styles.grid} className="pricing-grid">
          {PLANS.map((plan, index) => (
            <div
              key={plan.key}
              style={{
                ...styles.card(plan.color, plan.lightBg, plan.popular),
                animation: "pricingCardIn 0.45s ease-out forwards",
                animationDelay: `${index * 0.08}s`,
                opacity: 0,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-4px)";
                e.currentTarget.style.boxShadow = `0 8px 28px ${plan.color}22, 0 4px 12px rgba(0,0,0,0.06)`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = plan.popular
                  ? `0 4px 24px ${plan.color}20, 0 2px 12px rgba(0,0,0,0.06)`
                  : "0 2px 16px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)";
              }}
            >
              {plan.popular && (
                <span style={styles.popularBadge(plan.color)}>Most popular</span>
              )}
              <div style={styles.planName(plan.color)}>{plan.name}</div>
              <div style={styles.scoreRange(plan.color)}>{plan.scoreRange}</div>
              <div style={styles.planDescription}>{plan.description}</div>

              {plan.talkToSales ? (
                <div style={styles.priceWrap}>
                  <div style={styles.talkToSalesLabel}>Custom pricing</div>
                </div>
              ) : (
                <div style={styles.priceWrap}>
                  <div style={styles.price(plan.color)}>
                    {formatPrice(plan.priceBase)}
                  </div>
                  <div style={styles.priceUnit}>+ {formatPrice(plan.pricePerEmployee)}/employee/month</div>
                </div>
              )}

              <ul style={styles.featuresList}>
                {plan.features && plan.features.length > 0 ? (
                  plan.features.map((feature, i) => (
                    <li key={i} style={styles.featureItem}>
                      <span style={styles.featureCheck(plan.color)}>✓</span>
                      {feature}
                    </li>
                  ))
                ) : null}
              </ul>

              {plan.notIncluded && plan.notIncluded.length > 0 && (
                <div style={styles.notIncluded}>
                  {plan.notIncluded.map((item, i) => (
                    <div key={i} style={styles.notIncludedItem}>
                      <span style={styles.notIncludedDash}>—</span>
                      {item}
                    </div>
                  ))}
                </div>
              )}

              {plan.talkToSales ? (
                <RouterLink
                  to="/contact-us"
                  style={styles.cta(plan.color)}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-1px)";
                    e.currentTarget.style.boxShadow = `0 4px 16px ${plan.color}50`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = `0 2px 12px ${plan.color}40`;
                  }}
                >
                  Talk to Sales
                </RouterLink>
              ) : (
                <RouterLink
                  to={`/checkout?plan=${plan.key}`}
                  style={styles.cta(plan.color)}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-1px)";
                    e.currentTarget.style.boxShadow = `0 4px 16px ${plan.color}50`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = `0 2px 12px ${plan.color}40`;
                  }}
                >
                  Get {plan.name}
                </RouterLink>
              )}
            </div>
          ))}
        </div>

        <div style={styles.linkWrap}>
          <RouterLink
            to="/questionnaire"
            style={styles.quizButton}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "#ff6b00";
              e.currentTarget.style.color = "#ff6b00";
              e.currentTarget.style.boxShadow = "0 2px 12px rgba(255, 107, 0, 0.2)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "#e2e8f0";
              e.currentTarget.style.color = "#64748b";
              e.currentTarget.style.boxShadow = "0 1px 3px rgba(0,0,0,0.04)";
            }}
          >
            Not sure? Take the plan recommendation quiz —
          </RouterLink>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .pricing-grid { grid-template-columns: repeat(2, 1fr) !important; max-width: 100%; margin: 0; }
        }
        @media (max-width: 560px) {
          .pricing-grid { grid-template-columns: 1fr !important; max-width: 400px; margin: 0 auto; }
        }
      `}</style>
    </div>
  );
}
