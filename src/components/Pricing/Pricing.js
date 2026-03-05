import React, { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import {
  Container,
  Typography,
  Box,
  Button,
  Grid,
  makeStyles,
} from "@material-ui/core";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import CheckIcon from "@material-ui/icons/Check";
import PhoneIcon from "@material-ui/icons/Phone";
import ChatBubbleOutlineIcon from "@material-ui/icons/ChatBubbleOutline";

// Price values in PHP (base + per employee). For annual we apply ~35% savings and show +3 mo. free.
const PLANS = [
  {
    key: "starter",
    name: "Starter",
    scoreRange: "5-9",
    tagline: "Perfect for small teams",
    priceOriginal: 3999,
    priceBase: 2999,
    pricePerEmployee: 79,
    discountPercent: 25,
    badge: null,
    features: [
      "Up to 20 employees",
      "Standard payroll processing",
      "Basic payroll reports",
      "Email support",
      "Monthly billing",
    ],
  },
  {
    key: "professional",
    name: "Professional",
    scoreRange: "10-13",
    tagline: "Best for growing businesses",
    priceOriginal: 6499,
    priceBase: 4999,
    pricePerEmployee: 109,
    discountPercent: 23,
    badge: "Most Popular",
    features: [
      "Up to 150 employees",
      "Advanced payroll & HR tools",
      "Compliance & tax reports",
      "Priority support",
      "Monthly or annual billing",
    ],
  },
  {
    key: "enterprise",
    name: "Enterprise",
    scoreRange: "14-17",
    tagline: "For large organizations",
    priceOriginal: 13999,
    priceBase: 10000,
    pricePerEmployee: 179,
    discountPercent: 29,
    badge: null,
    features: [
      "Unlimited employees",
      "Full UlapPayroll suite",
      "Management & analytics reports",
      "Dedicated Product Expert",
      "Custom reporting & integrations",
    ],
  },
  {
    key: "talk-to-sales",
    name: "Custom",
    cardTitle: "Custom Solution",
    tagline: "Tailored for unique needs",
    talkToSales: true,
    contactPricing: true,
    features: [
      "Everything in Enterprise",
      "Fully customizable workflows",
      "White-label options",
      "Dedicated implementation team",
      "SLA guarantees",
      "Ongoing strategic consulting",
    ],
  },
];

const ANNUAL_SAVE_PERCENT = 35;
const BONUS_MONTHS = 3;

const useStyles = makeStyles((theme) => ({
  wrapper: {
    fontFamily: theme.typography.body1.fontFamily,
    minHeight: "100vh",
    background: "#f7f9fc",
    paddingTop: theme.spacing(6),
    paddingBottom: 0,
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(3),
    animation: "$pageEnter 0.4s ease-out forwards",
    [theme.breakpoints.down("xs")]: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2),
    },
    [theme.breakpoints.down("sm")]: {
      paddingTop: theme.spacing(4),
    },
  },
  "@keyframes pageEnter": {
    "0%": { opacity: 0 },
    "100%": { opacity: 1 },
  },
  inner: {
    maxWidth: 1100,
    margin: "0 auto",
  },
  header: {
    textAlign: "center",
    marginBottom: theme.spacing(4),
  },
  title: {
    fontFamily: theme.typography.fontFamily,
    fontSize: "1.75rem",
    fontWeight: 700,
    color: "#0f172a",
    letterSpacing: "-0.02em",
    marginBottom: theme.spacing(1),
    maxWidth: 560,
    marginLeft: "auto",
    marginRight: "auto",
    lineHeight: 1.3,
  },
  subtitle: {
    fontSize: "0.9rem",
    color: "#64748b",
    maxWidth: 480,
    margin: "0 auto",
    lineHeight: 1.5,
  },
  toggleSection: {
    textAlign: "center",
    marginBottom: theme.spacing(4),
  },
  toggleText: {
    fontSize: "0.8125rem",
    color: "#64748b",
    marginBottom: theme.spacing(1.5),
    maxWidth: 380,
    marginLeft: "auto",
    marginRight: "auto",
    lineHeight: 1.5,
  },
  toggleWrap: {
    display: "inline-flex",
    alignItems: "stretch",
    background: "#fff",
    borderRadius: 6,
    border: "1px solid #e2e8f0",
    padding: 3,
    boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
  },
  toggleOption: {
    padding: theme.spacing(0.6, 1.5),
    fontSize: "0.8rem",
    fontWeight: 600,
    textTransform: "none",
    borderRadius: 4,
    minWidth: 72,
    color: "#64748b",
    backgroundColor: "transparent",
    "&:hover": {
      backgroundColor: "rgba(0,0,0,0.04)",
    },
    "&$toggleActive": {
      backgroundColor: "#FF7704",
      color: "#fff",
    },
  },
  toggleActive: {},
  toggleAnnualLabel: {
    fontSize: "0.7rem",
    fontWeight: 500,
    color: "#f",
    marginLeft: 4,
  },
  grid: {
    marginBottom: theme.spacing(4),
  },
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    background: "#fff",
    borderRadius: 12,
    border: "1px solid #e2e8f0",
    padding: theme.spacing(2.5),
    transition: "box-shadow 0.2s ease",
    position: "relative",
    overflow: "hidden",
    "&:hover": {
      boxShadow: "0 10px 40px rgba(0,0,0,0.08)",
    },
  },
  badge: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    padding: "8px 12px",
    fontSize: "0.7rem",
    fontWeight: 700,
    letterSpacing: "0.04em",
    color: "#fff",
    backgroundColor: "#FF7704",
    textAlign: "center",
  },
  cardName: {
    fontSize: "1.125rem",
    fontWeight: 700,
    color: "#0f172a",
    marginBottom: theme.spacing(0.5),
    marginTop: theme.spacing(0.5),
  },
  cardNameWithBadge: {
    marginTop: theme.spacing(3),
  },
  cardTagline: {
    fontSize: "0.8125rem",
    color: "#64748b",
    marginBottom: theme.spacing(2),
    lineHeight: 1.4,
    minHeight: 36,
  },
  priceRow: {
    marginBottom: theme.spacing(1),
  },
  priceCurrentWrap: {
    display: "flex",
    alignItems: "baseline",
    flexWrap: "wrap",
    gap: 4,
  },
  priceCurrent: {
    fontSize: "1.5rem",
    fontWeight: 800,
    color: "#0f172a",
    letterSpacing: "-0.02em",
  },
  priceMoLabel: {
    fontSize: "0.875rem",
    fontWeight: 500,
    color: "#64748b",
  },
  bonusMonths: {
    fontSize: "0.8125rem",
    color: "#22c55e",
    fontWeight: 600,
    width: "100%",
    marginTop: 2,
  },
  featureList: {
    listStyle: "none",
    padding: 0,
    margin: 0,
    flex: 1,
  },
  featureItem: {
    display: "flex",
    alignItems: "flex-start",
    gap: theme.spacing(2),
    fontSize: "0.8125rem",
    color: "#475569",
    marginBottom: theme.spacing(1.5),
    lineHeight: 1.4,
  },
  checkIconWrap: {
    width: 14,
    height: 14,
    borderRadius: "50%",
    border: "1.5px solid #22c55e",
    backgroundColor: "transparent",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
    marginTop: 3,
  },
  checkIcon: {
    fontSize: 9,
    color: "#22c55e",
  },
  ctaWrap: {
    marginTop: "auto",
    paddingTop: theme.spacing(2),
  },
  getPlanBtn: {
    width: "100%",
    padding: theme.spacing(1.25, 2),
    fontWeight: 600,
    fontSize: "0.875rem",
    textTransform: "none",
    borderRadius: 8,
    backgroundColor: "#FF7704",
    color: "#fff",
    "&:hover": {
      backgroundColor: "#e66d04",
    },
  },
  talkToSalesBtn: {
    width: "100%",
    padding: theme.spacing(1.25, 2),
    fontWeight: 600,
    fontSize: "0.875rem",
    textTransform: "none",
    borderRadius: 8,
    backgroundColor: "#1e293b",
    color: "#fff",
    "&:hover": {
      backgroundColor: "#0f172a",
    },
  },
  cardCustomTitle: {
    fontSize: "1rem",
    fontWeight: 700,
    color: "#0f172a",
    marginTop: 0,
    marginBottom: theme.spacing(0.25),
  },
  cardCustomName: {
    fontSize: "1.75rem",
    fontWeight: 800,
    color: "#0f172a",
    letterSpacing: "-0.02em",
    marginBottom: theme.spacing(0.5),
  },
  contactForPricing: {
    fontSize: "0.875rem",
    color: "#64748b",
    marginBottom: theme.spacing(2),
  },
  linkWrap: {
    marginTop: theme.spacing(4),
    textAlign: "center",
    marginBottom: theme.spacing(2),
  },
  quizButton: {
    textTransform: "none",
    padding: theme.spacing(1.25, 2.5),
    fontSize: "0.8125rem",
    fontWeight: 500,
    color: "#64748b",
    backgroundColor: "transparent",
    "&:hover": {
      backgroundColor: "transparent",
      color: "#FF7704",
    },
    "& .MuiButton-endIcon": {
      marginLeft: theme.spacing(0.5),
    },
  },
  quizLinkWrap: {
    textAlign: "center",
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(5),
  },
  stillNotSure: {
    border: "1px solid #e2e8f0",
    borderRadius: 12,
    padding: theme.spacing(4, 3),
    textAlign: "center",
    marginTop: theme.spacing(7),
  },
  stillNotSureTitle: {
    fontSize: "1.375rem",
    fontWeight: 700,
    color: "#0f172a",
    marginBottom: theme.spacing(1),
  },
  stillNotSureText: {
    fontSize: "0.875rem",
    color: "#475569",
    maxWidth: 460,
    margin: "0 auto",
    marginBottom: theme.spacing(2.5),
    lineHeight: 1.5,
  },
  stillNotSureBtns: {
    display: "flex",
    flexWrap: "wrap",
    gap: theme.spacing(1.5),
    justifyContent: "center",
  },
  stillNotSureBtn: {
    textTransform: "none",
    fontWeight: 600,
    fontSize: "0.875rem",
    borderRadius: 8,
    border: "1px solid #334155",
    color: "#0f172a",
    backgroundColor: "#fff",
    padding: theme.spacing(1, 1.75),
    "&:hover": {
      backgroundColor: "#f8fafc",
      borderColor: "#475569",
    },
  },
}));

function formatPhp(n) {
  return "₱" + Number(n).toLocaleString("en-PH");
}

export default function Pricing() {
  const classes = useStyles();
  const [billingPeriod, setBillingPeriod] = useState("monthly"); // 'monthly' | 'annual'

  const getDisplayPrice = (plan) => {
    if (plan.talkToSales) return null;
    if (billingPeriod === "monthly") {
      return {
        original: plan.priceOriginal,
        current: plan.priceBase,
        perEmployee: plan.pricePerEmployee,
        discountPercent: plan.discountPercent,
        bonusMonths: null,
      };
    }
    const annualMultiplier = 1 - ANNUAL_SAVE_PERCENT / 100;
    const monthlyEquivalent = Math.round((plan.priceBase * 12 * annualMultiplier) / (12 + BONUS_MONTHS));
    return {
      original: plan.priceOriginal,
      current: monthlyEquivalent,
      perEmployee: Math.round(plan.pricePerEmployee * annualMultiplier),
      discountPercent: plan.discountPercent,
      bonusMonths: BONUS_MONTHS,
    };
  };

  return (
    <div className={classes.wrapper}>
      <Container maxWidth="lg" disableGutters>
        <Box className={classes.inner}>
          <header className={classes.header}>
            <Typography component="h1" className={classes.title}>
              Choose the right plan for your business
            </Typography>
            <Typography className={classes.subtitle}>
              All plans include secure payroll processing and expert support.
            </Typography>
          </header>

          <Box className={classes.toggleSection}>
            <Typography className={classes.toggleText}>
              Save when you pay yearly—get more for your plan at a lower rate.
            </Typography>
            <Box className={classes.toggleWrap}>
              <Button
                className={`${classes.toggleOption} ${billingPeriod === "monthly" ? classes.toggleActive : ""}`}
                onClick={() => setBillingPeriod("monthly")}
              >
                Monthly
              </Button>
              <Button
                className={`${classes.toggleOption} ${billingPeriod === "annual" ? classes.toggleActive : ""}`}
                onClick={() => setBillingPeriod("annual")}
              >
                Annual
                <span className={classes.toggleAnnualLabel}>Save {ANNUAL_SAVE_PERCENT}%</span>
              </Button>
            </Box>
          </Box>

          <Grid container spacing={3} className={classes.grid}>
            {PLANS.map((plan) => {
              const priceDisplay = getDisplayPrice(plan);
              return (
                <Grid item xs={12} sm={6} md={3} key={plan.key}>
                  <Box className={classes.card}>
                    {plan.badge && (
                      <div className={classes.badge}>{plan.badge.toUpperCase()}</div>
                    )}
                    <Typography component="h3" className={`${classes.cardName} ${plan.badge ? classes.cardNameWithBadge : ""} ${plan.talkToSales && plan.cardTitle ? classes.cardCustomTitle : ""}`}>
                      {plan.cardTitle || plan.name}
                    </Typography>
                    {plan.talkToSales && plan.cardTitle && (
                      <Typography className={classes.cardCustomName}>{plan.name}</Typography>
                    )}
                    <Typography className={classes.cardTagline}>
                      {plan.tagline}
                    </Typography>
                    {plan.contactPricing && (
                      <Typography className={classes.contactForPricing}>
                        Contact for pricing
                      </Typography>
                    )}
                    {priceDisplay && (
                      <Box className={classes.priceRow}>
                        <Box className={classes.priceCurrentWrap}>
                          <Typography component="span" className={classes.priceCurrent}>
                            {formatPhp(priceDisplay.current)}
                          </Typography>
                          <Typography component="span" className={classes.priceMoLabel}>
                            /mo
                            {priceDisplay.perEmployee > 0 && ` + ${priceDisplay.perEmployee}/employee`}
                          </Typography>
                        </Box>
                        {priceDisplay.bonusMonths && (
                          <Typography className={classes.bonusMonths}>
                            +{priceDisplay.bonusMonths} mo. free
                          </Typography>
                        )}
                      </Box>
                    )}
                    <ul className={classes.featureList}>
                      {plan.features.map((feature, i) => (
                        <li key={i} className={classes.featureItem}>
                          <span className={classes.checkIconWrap}>
                            <CheckIcon className={classes.checkIcon} />
                          </span>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Box className={classes.ctaWrap}>
                      {plan.talkToSales ? (
                        <Button
                          component={RouterLink}
                          to="/contact-us"
                          variant="contained"
                          className={classes.talkToSalesBtn}
                          startIcon={<PhoneIcon style={{ fontSize: 18 }} />}
                        >
                          Talk to Sales
                        </Button>
                      ) : (
                        <Button
                          component={RouterLink}
                          to={`/checkout?plan=${plan.key}&billing=${billingPeriod}`}
                          variant="contained"
                          className={classes.getPlanBtn}
                        >
                          Get {plan.name}
                        </Button>
                      )}
                    </Box>
                  </Box>
                </Grid>
              );
            })}
          </Grid>

          <Box className={classes.stillNotSure}>
            <Typography component="h2" className={classes.stillNotSureTitle}>
              Still not sure which plan is right for you?
            </Typography>
            <Typography className={classes.stillNotSureText}>
              Our payroll experts can help you understand your options and find the perfect fit for your business.
            </Typography>
            <Box className={classes.stillNotSureBtns}>
              <Button
                component={RouterLink}
                to="/contact-us"
                variant="outlined"
                className={classes.stillNotSureBtn}
                startIcon={<PhoneIcon />}
              >
                Schedule a Call
              </Button>
              <Button
                component={RouterLink}
                to="/contact-us"
                variant="outlined"
                className={classes.stillNotSureBtn}
                startIcon={<ChatBubbleOutlineIcon />}
              >
                Chat with Sales
              </Button>
            </Box>
          </Box>

          <Box className={classes.quizLinkWrap}>
            <Button
              component={RouterLink}
              to="/questionnaire"
              className={classes.quizButton}
              endIcon={<ArrowForwardIcon style={{ fontSize: 18 }} />}
            >
              Not sure? Take the plan recommendation quiz
            </Button>
          </Box>
        </Box>
      </Container>
    </div>
  );
}
