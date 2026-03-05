import React from "react";
import { useLocation } from "react-router-dom";

// --- Data Configuration (Same as Quiz) ---
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
  },
  resultCard: {
    backgroundColor: "#fff",
    padding: "30px",
    borderRadius: "12px",
    border: "2px solid #ff6b00",
  },
  planName: {
    fontSize: "28px",
    fontWeight: "800",
    color: "#ff6b00",
    margin: "10px 0",
  },
  planPrice: {
    fontSize: "20px",
    color: "#333",
    marginBottom: "20px",
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

function Result() {
  const location = useLocation();
  const totalScore = location.state?.totalScore || 0;

  // Determine plan based on score
  const getRecommendedPlan = () => {
    return plans.find((plan) => totalScore >= plan.minScore && totalScore <= plan.maxScore) || plans[0];
  };

  return (
    <div style={styles.wrapper}>
      <div style={styles.container}>
        <div style={styles.resultCard}>
          <h2 style={{ color: "#333", marginBottom: "10px" }}>Your Recommended Plan</h2>
          <p style={{ color: "#666" }}>Based on your answers, you scored {totalScore} points.</p>
          
          <div style={styles.planName}>{getRecommendedPlan().name}</div>
          <div style={styles.planPrice}>{getRecommendedPlan().price} / month</div>
          
          <button style={styles.button}>Check out </button>
        </div>
      </div>
    </div>
  );
}

export default Result;