import React, { useState } from "react";
import { useLocation, useNavigate, Link as RouterLink } from "react-router-dom";
import {
  Box,
  Button,
  CircularProgress,
  Container,
  // eslint-disable-next-line
  IconButton,
  InputAdornment,
  makeStyles,
  Paper,
  TextField,
  Typography,
  Chip,
} from "@material-ui/core";
import {
  Lock,
  ArrowBack,
  Person,
  Email,
  Business,
  Phone,
  LocationOn,
  MyLocation,
  CheckCircle,
  ShoppingCart,
} from "@material-ui/icons";

const PLANS = {
  starter: {
    name: "Starter",
    label: "Starter Plan",
    price: 2999,
    basePrice: 2999,
    perEmployee: 79,
    priceDisplay: "2,999 PHP + 79/employee/month",
    color: "#22c55e",
    lightColor: "rgba(34, 197, 94, 0.15)",
    bgColor: "rgba(34, 197, 94, 0.12)",
    description: "Perfect for small teams",
  },
  professional: {
    name: "Professional",
    label: "Professional Plan",
    price: 4999,
    basePrice: 4999,
    perEmployee: 109,
    priceDisplay: "4,999 PHP + 109/employee/month",
    color: "#3b82f6",
    lightColor: "rgba(59, 130, 246, 0.15)",
    bgColor: "rgba(59, 130, 246, 0.12)",
    description: "Best for growing businesses",
  },
  enterprise: {
    name: "Enterprise",
    label: "Enterprise Plan",
    price: 10000,
    basePrice: 10000,
    perEmployee: 179,
    priceDisplay: "10,000 PHP + 179/employee/month",
    color: "#8b5cf6",
    lightColor: "rgba(139, 92, 246, 0.15)",
    bgColor: "rgba(139, 92, 246, 0.12)",
    description: "For large organizations",
  },
};

const BENEFITS = [
  "Instant access after payment",
  "Cancel anytime",
  "Dedicated support",
];

const PAYMENT_METHODS = [
  { value: "card", label: "Credit / Debit Card" },
  { value: "gcash", label: "GCash" },
  { value: "paymaya", label: "PayMaya" },
];

const QR_CODE_BASE = "https://api.qrserver.com/v1/create-qr-code/";
const PENDING_RECEIPT_KEY = "ulap_pending_receipt_";

const COUNTRY_CODES = [
  { code: "+63", iso: "ph", country: "Philippines", maxLength: 11 },
  { code: "+1", iso: "us", country: "US/Canada", maxLength: 10 },
  { code: "+44", iso: "gb", country: "UK", maxLength: 10 },
  { code: "+61", iso: "au", country: "Australia", maxLength: 9 },
  { code: "+65", iso: "sg", country: "Singapore", maxLength: 8 },
  { code: "+81", iso: "jp", country: "Japan", maxLength: 10 },
  { code: "+82", iso: "kr", country: "South Korea", maxLength: 9 },
  { code: "+971", iso: "ae", country: "UAE", maxLength: 9 },
  { code: "+91", iso: "in", country: "India", maxLength: 10 },
];

const FLAG_CDN = "https://flagcdn.com/w40";

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: "100vh",
    background:
      "linear-gradient(160deg, #f0f4ff 0%, #fef9f3 40%, #f5f7fa 100%)",
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(4),
    position: "relative",
    overflow: "hidden",
    "&::before": {
      content: '""',
      position: "absolute",
      top: -80,
      right: -80,
      width: 240,
      height: 240,
      borderRadius: "50%",
      background:
        "radial-gradient(circle, rgba(255,117,4,0.08) 0%, transparent 70%)",
      pointerEvents: "none",
    },
    "&::after": {
      content: '""',
      position: "absolute",
      bottom: -60,
      left: -60,
      width: 200,
      height: 200,
      borderRadius: "50%",
      background:
        "radial-gradient(circle, rgba(59,130,246,0.06) 0%, transparent 70%)",
      pointerEvents: "none",
    },
  },
  container: {
    position: "relative",
    zIndex: 1,
    maxWidth: 920,
  },
  backLink: {
    display: "inline-flex",
    alignItems: "center",
    gap: theme.spacing(0.5),
    color: theme.palette.text.secondary,
    textDecoration: "none",
    marginBottom: theme.spacing(2),
    fontSize: "0.85rem",
    fontWeight: 500,
    padding: theme.spacing(0.25, 0),
    borderRadius: 6,
    transition: "background-color 0.2s ease, color 0.2s ease",
    "&:hover": {
      color: theme.palette.primary.main,
      backgroundColor: "rgba(255, 117, 4, 0.06)",
    },
    "&:hover *": {
      color: "inherit",
    },
  },
  header: {
    marginBottom: theme.spacing(2),
    animation: "$fadeSlide 0.5s ease-out",
  },
  "@keyframes fadeSlide": {
    from: { opacity: 0, transform: "translateY(-8px)" },
    to: { opacity: 1, transform: "translateY(0)" },
  },
  pageTitle: {
    fontFamily: '"Fira Sans", sans-serif',
    fontWeight: 700,
    marginBottom: theme.spacing(0.25),
    color: theme.palette.text.primary,
    letterSpacing: "-0.02em",
    fontSize: "1.4rem",
  },
  pageSubtitle: {
    fontFamily: '"Roboto", sans-serif',
    color: theme.palette.text.secondary,
    fontSize: "0.85rem",
    lineHeight: 1.45,
    marginBottom: theme.spacing(0.5),
  },
  steps: {
    display: "flex",
    alignItems: "center",
    gap: theme.spacing(1),
    marginBottom: theme.spacing(1.5),
    flexWrap: "wrap",
  },
  step: {
    display: "flex",
    alignItems: "center",
    gap: theme.spacing(0.5),
    fontSize: "0.75rem",
    color: theme.palette.text.secondary,
  },
  stepDot: {
    width: 5,
    height: 5,
    borderRadius: "50%",
    backgroundColor: theme.palette.primary.main,
    opacity: 0.6,
  },
  stepDotActive: {
    opacity: 1,
    transform: "scale(1.2)",
    boxShadow: `0 0 0 2px ${theme.palette.primary.main}20`,
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "1fr 320px",
    gap: theme.spacing(2.5),
    alignItems: "start",
    [theme.breakpoints.down("md")]: {
      gridTemplateColumns: "1fr",
    },
  },
  billingCard: {
    borderRadius: 12,
    overflow: "hidden",
    boxShadow: "0 2px 16px rgba(0,0,0,0.06)",
    border: "1px solid rgba(0,0,0,0.06)",
    transition: "box-shadow 0.3s ease",
    animation: "$cardIn 0.5s ease-out 0.1s both",
    "&:hover": {
      boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
    },
  },
  "@keyframes cardIn": {
    from: { opacity: 0, transform: "translateY(12px)" },
    to: { opacity: 1, transform: "translateY(0)" },
  },
  billingCardTop: {
    height: 4,
    background: `linear-gradient(90deg, ${theme.palette.primary.main}, #ff9f43)`,
  },
  billingCardContent: {
    padding: theme.spacing(2.5),
  },
  sectionTitle: {
    display: "flex",
    alignItems: "center",
    gap: theme.spacing(1),
    fontFamily: '"Fira Sans", sans-serif',
    fontWeight: 600,
    marginBottom: theme.spacing(2),
    fontSize: "1rem",
    color: theme.palette.text.primary,
  },
  sectionIcon: {
    width: 32,
    height: 32,
    borderRadius: 10,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255, 117, 4, 0.12)",
    color: theme.palette.primary.main,
  },
  field: {
    marginBottom: theme.spacing(1.5),
    "& .MuiOutlinedInput-root": {
      borderRadius: 10,
      backgroundColor: "#fafbfc",
      transition: "all 0.2s ease",
      "&.Mui-focused": { backgroundColor: "#fff" },
      "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
        borderColor: theme.palette.primary.main,
        borderWidth: 2,
      },
    },
  },
  fieldHelper: {
    marginTop: theme.spacing(0.25),
    marginBottom: theme.spacing(1.25),
    marginLeft: theme.spacing(1.5),
    fontSize: "0.7rem",
    color: theme.palette.text.secondary,
    lineHeight: 1.35,
    display: "block",
  },
  fieldHelperSecure: {
    display: "flex",
    alignItems: "center",
    gap: theme.spacing(0.5),
    "& svg": {
      fontSize: 14,
      color: theme.palette.text.secondary,
      flexShrink: 0,
    },
  },
  locationButtonWrap: {
    marginTop: theme.spacing(0.5),
    marginBottom: theme.spacing(0.25),
    display: "flex",
    alignItems: "center",
    gap: theme.spacing(1),
  },
  locationError: {
    fontSize: "0.7rem",
    color: theme.palette.error.main,
  },
  paymentNote: {
    display: "flex",
    alignItems: "flex-start",
    gap: theme.spacing(0.75),
    marginTop: theme.spacing(1.5),
    padding: theme.spacing(1, 1.5),
    borderRadius: 8,
    backgroundColor: "rgba(34, 197, 94, 0.08)",
    border: "1px solid rgba(34, 197, 94, 0.2)",
    fontSize: "0.75rem",
    color: "rgba(0,0,0,0.7)",
    lineHeight: 1.45,
  },
  summaryCard: {
    borderRadius: 12,
    overflow: "hidden",
    boxShadow: "0 2px 16px rgba(0,0,0,0.06)",
    border: "1px solid rgba(0,0,0,0.06)",
    position: "sticky",
    top: theme.spacing(2),
    transition: "box-shadow 0.3s ease",
    animation: "$cardIn 0.5s ease-out 0.2s both",
    "&:hover": {
      boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
    },
    [theme.breakpoints.down("md")]: {
      position: "static",
    },
  },
  summaryCardTop: {
    height: 4,
    background: "linear-gradient(90deg, #64748b, #94a3b8)",
  },
  summaryContent: {
    padding: theme.spacing(2),
  },
  summaryTitle: {
    display: "flex",
    alignItems: "center",
    gap: theme.spacing(0.75),
    fontFamily: '"Fira Sans", sans-serif',
    fontWeight: 600,
    marginBottom: theme.spacing(1.5),
    fontSize: "1rem",
  },
  planSwitcherLabel: {
    fontFamily: '"Roboto", sans-serif',
    fontSize: "0.75rem",
    color: theme.palette.text.secondary,
    marginBottom: theme.spacing(0.5),
    fontWeight: 500,
  },
  nativeSelectWrap: {
    marginBottom: theme.spacing(1.5),
    "& label": {
      display: "block",
      fontSize: "0.7rem",
      color: theme.palette.text.secondary,
      marginBottom: theme.spacing(0.25),
      transform: "none",
    },
  },
  phoneRow: {
    display: "flex",
    gap: theme.spacing(1),
    marginBottom: theme.spacing(1.5),
  },
  phoneCountryWrap: {
    display: "flex",
    alignItems: "center",
    borderRadius: 10,
    backgroundColor: "#fafbfc",
    border: "1px solid rgba(0,0,0,0.23)",
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(0.5),
    gap: theme.spacing(0.75),
    flexShrink: 0,
    minHeight: 48,
    transition: "border-color 0.2s ease",
    "&:focus-within": {
      borderColor: theme.palette.primary.main,
      borderWidth: 2,
    },
  },
  phoneCountrySelect: {
    border: "none",
    background: "transparent",
    padding: "8px 4px 8px 0",
    fontSize: "0.9rem",
    fontFamily: "inherit",
    color: theme.palette.text.primary,
    cursor: "pointer",
    outline: "none",
    minWidth: 52,
  },
  phoneFlag: {
    width: 28,
    height: 21,
    objectFit: "cover",
    borderRadius: 2,
    flexShrink: 0,
    border: "1px solid rgba(0,0,0,0.1)",
  },
  phoneInput: {
    flex: 1,
    minWidth: 0,
  },
  nativeSelect: {
    width: "100%",
    padding: "10px 12px",
    borderRadius: 10,
    backgroundColor: "#fafbfc",
    border: "1px solid rgba(0,0,0,0.23)",
    fontSize: "0.9rem",
    fontFamily: "inherit",
    color: theme.palette.text.primary,
    cursor: "pointer",
    transition: "border-color 0.2s ease, background-color 0.2s ease",
    "&:focus": {
      outline: "none",
      borderColor: theme.palette.primary.main,
      borderWidth: 2,
      padding: "9px 11px",
    },
  },
  nativeSelectSmall: {
    padding: "6px 10px",
    fontSize: "0.85rem",
    borderRadius: 10,
    backgroundColor: "#f8fafc",
    "&:focus": {
      padding: "5px 9px",
    },
  },
  planSwitcher: {
    marginBottom: theme.spacing(1.5),
  },
  planSummaryBox: {
    padding: theme.spacing(1.5),
    borderRadius: 10,
    marginBottom: theme.spacing(1.5),
    border: "2px solid transparent",
    transition: "all 0.2s ease",
    backgroundColor: "rgba(0,0,0,0.02)",
  },
  planBadge: {
    display: "inline-flex",
    alignItems: "center",
    padding: "4px 10px",
    borderRadius: 16,
    color: "#fff",
    fontWeight: 600,
    fontSize: "0.75rem",
    marginBottom: theme.spacing(0.75),
    boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
  },
  planName: {
    fontFamily: '"Fira Sans", sans-serif',
    fontWeight: 600,
    fontSize: "0.95rem",
    marginBottom: theme.spacing(0.25),
  },
  planDescription: {
    fontFamily: '"Roboto", sans-serif',
    fontSize: "0.75rem",
    color: theme.palette.text.secondary,
    marginBottom: theme.spacing(0.75),
  },
  planPrice: {
    fontFamily: '"Fira Sans", sans-serif',
    fontWeight: 600,
    fontSize: "1rem",
    color: theme.palette.text.primary,
  },
  totalRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: theme.spacing(1.5),
    paddingBottom: theme.spacing(1.5),
    borderTop: "1px solid rgba(0,0,0,0.08)",
    marginBottom: theme.spacing(0.5),
  },
  totalLabel: {
    fontFamily: '"Fira Sans", sans-serif',
    fontWeight: 600,
    fontSize: "0.9rem",
  },
  totalAmount: {
    fontFamily: '"Fira Sans", sans-serif',
    fontWeight: 700,
    fontSize: "1.2rem",
    color: theme.palette.primary.main,
    letterSpacing: "-0.02em",
  },
  confirmBtn: {
    width: "100%",
    padding: theme.spacing(1.5, 2),
    borderRadius: 10,
    fontWeight: 600,
    textTransform: "none",
    fontSize: "0.95rem",
    boxShadow: "0 4px 16px rgba(255, 117, 4, 0.35)",
    transition: "all 0.2s ease",
    "&:hover:not(:disabled)": {
      boxShadow: "0 6px 24px rgba(255, 117, 4, 0.45)",
      transform: "translateY(-1px)",
    },
    "&:active:not(:disabled)": { transform: "translateY(0)" },
  },
  secureBadge: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: theme.spacing(0.5),
    marginTop: theme.spacing(1),
    padding: theme.spacing(1),
    fontSize: "0.75rem",
    color: theme.palette.text.secondary,
    backgroundColor: "rgba(0,0,0,0.02)",
    borderRadius: 8,
  },
  benefitsList: {
    listStyle: "none",
    padding: 0,
    margin: 0,
    marginTop: theme.spacing(1),
  },
  benefitItem: {
    display: "flex",
    alignItems: "center",
    gap: theme.spacing(0.5),
    fontSize: "0.75rem",
    color: theme.palette.text.secondary,
    marginBottom: theme.spacing(0.5),
    "& svg": { fontSize: 14, color: "#22c55e", flexShrink: 0 },
  },
  paymentDetailsBox: {
    marginTop: theme.spacing(1.5),
    padding: theme.spacing(1.5),
    borderRadius: 10,
    backgroundColor: "rgba(0,0,0,0.03)",
    border: "1px solid rgba(0,0,0,0.08)",
  },
  paymentDetailsTitle: {
    fontFamily: '"Fira Sans", sans-serif',
    fontSize: "0.8rem",
    fontWeight: 600,
    marginBottom: theme.spacing(1),
    color: theme.palette.text.primary,
  },
  qrBox: {
    marginTop: theme.spacing(1.5),
    padding: theme.spacing(2),
    borderRadius: 10,
    backgroundColor: "#fff",
    border: "1px solid rgba(0,0,0,0.08)",
    textAlign: "center",
  },
  qrImage: {
    width: 200,
    height: 200,
    display: "block",
    margin: "0 auto",
    marginBottom: theme.spacing(1.5),
  },
  qrLabel: {
    fontFamily: '"Roboto", sans-serif',
    fontSize: "0.85rem",
    fontWeight: 600,
    marginBottom: theme.spacing(0.25),
  },
  qrHint: {
    fontFamily: '"Roboto", sans-serif',
    fontSize: "0.75rem",
    color: theme.palette.text.secondary,
  },
  qrOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.5)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1300,
    padding: theme.spacing(2),
  },
  qrModal: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: theme.spacing(3),
    maxWidth: 360,
    width: "100%",
    textAlign: "center",
    boxShadow: "0 24px 48px rgba(0,0,0,0.2)",
  },
  qrModalTitle: {
    fontFamily: '"Fira Sans", sans-serif',
    fontSize: "1rem",
    fontWeight: 600,
    marginBottom: theme.spacing(1.5),
  },
  qrModalAmount: {
    fontFamily: '"Roboto", sans-serif',
    fontSize: "1.25rem",
    fontWeight: 700,
    color: theme.palette.primary.main,
    marginBottom: theme.spacing(2),
  },
}));

function getPlanFromSearch(search) {
  const params = new URLSearchParams(search);
  const plan = (params.get("plan") || "professional").toLowerCase();
  return PLANS[plan] ? plan : "professional";
}

export default function Checkout() {
  const classes = useStyles();
  const location = useLocation();
  const navigate = useNavigate();
  const planKey = getPlanFromSearch(location.search);
  const plan = PLANS[planKey];

  const [form, setForm] = useState({
    fullName: "",
    workEmail: "",
    companyName: "",
    phone: "",
    phoneCountryCode: "+63",
    billingAddress: "",
    paymentMethod: "card",
  });
  const [paymentDetails, setPaymentDetails] = useState({
    cardNumber: "",
    cardExpiry: "",
    cardCvv: "",
    nameOnCard: "",
  });
  const [errors, setErrors] = useState({});
  // eslint-disable-next-line
  const [touched, setTouched] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [showQrStep, setShowQrStep] = useState(false);
  const [qrStepReceiptState, setQrStepReceiptState] = useState(null);
  const [locationLoading, setLocationLoading] = useState(false);
  const [locationError, setLocationError] = useState(null);

  const handleChange = (field) => (e) => {
    const value = e?.target?.value;
    if (value === undefined) return;
    setForm((prev) => {
      const next = { ...prev, [field]: value };
      if (field === "phoneCountryCode") {
        const maxLen =
          COUNTRY_CODES.find((c) => c.code === value)?.maxLength ?? 11;
        next.phone = (prev.phone || "").replace(/\D/g, "").slice(0, maxLen);
      }
      return next;
    });
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const handlePhoneChange = (e) => {
    const raw = e?.target?.value ?? "";
    const digits = raw.replace(/\D/g, "");
    const maxLen =
      COUNTRY_CODES.find((c) => c.code === form.phoneCountryCode)?.maxLength ??
      11;
    setForm((prev) => ({ ...prev, phone: digits.slice(0, maxLen) }));
    if (errors.phone) setErrors((prev) => ({ ...prev, phone: "" }));
  };

  const handlePaymentDetailsChange = (field) => (e) => {
    const value = e?.target?.value;
    if (value === undefined) return;
    setPaymentDetails((prev) => ({ ...prev, [field]: value }));
    const errKey = `payment_${field}`;
    if (errors[errKey]) setErrors((prev) => ({ ...prev, [errKey]: "" }));
  };

  const handleBlur = (field) => () =>
    setTouched((prev) => ({ ...prev, [field]: true }));

  const getBillingAddressFromGPS = () => {
    setLocationError(null);
    setLocationLoading(true);
    if (!navigator.geolocation) {
      setLocationError("Geolocation is not supported by your browser.");
      setLocationLoading(false);
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        fetch(
          `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`,
          {
            headers: {
              "Accept-Language": "en",
              "User-Agent": "Batch11Checkout/1.0",
            },
          },
        )
          .then((res) => res.json())
          .then((data) => {
            const a = data.address || {};
            const parts = [
              a.road,
              a.suburb || a.village || a.town,
              a.city || a.municipality,
              a.state || a.province,
              a.postcode,
              a.country,
            ].filter(Boolean);
            const address = parts.join(", ");
            setForm((prev) => ({ ...prev, billingAddress: address }));
            setLocationError(null);
          })
          .catch(() =>
            setLocationError("Could not resolve address from location."),
          )
          .finally(() => setLocationLoading(false));
      },
      () => {
        setLocationError("Location access denied or unavailable.");
        setLocationLoading(false);
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 60000 },
    );
  };

  const validate = () => {
    const next = {};
    if (!form.fullName.trim()) next.fullName = "Please enter your full name";
    if (!form.workEmail.trim()) next.workEmail = "Work email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.workEmail)) {
      next.workEmail = "Please enter a valid email address";
    }
    if (!form.companyName.trim())
      next.companyName = "Please enter your company name";
    if (form.paymentMethod === "card") {
      if (!paymentDetails.cardNumber?.trim())
        next.payment_cardNumber = "Card number is required";
      if (!paymentDetails.cardExpiry?.trim())
        next.payment_cardExpiry = "Expiry (MM/YY) is required";
      if (!paymentDetails.cardCvv?.trim())
        next.payment_cardCvv = "CVV is required";
      if (!paymentDetails.nameOnCard?.trim())
        next.payment_nameOnCard = "Name on card is required";
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    const receiptId = `UPR-${Date.now().toString(36).toUpperCase()}`;
    const date = new Date().toLocaleString("en-PH", {
      dateStyle: "medium",
      timeStyle: "short",
    });
    const receiptState = {
      form: { ...form },
      planKey,
      plan: { ...plan },
      paymentMethod: form.paymentMethod,
      receiptId,
      date,
    };

    const isEwallet =
      form.paymentMethod === "gcash" || form.paymentMethod === "paymaya";
    if (isEwallet) {
      try {
        sessionStorage.setItem(
          PENDING_RECEIPT_KEY + receiptId,
          JSON.stringify(receiptState),
        );
      } catch (_) {}
      setTimeout(() => {
        setSubmitting(false);
        setQrStepReceiptState(receiptState);
        setShowQrStep(true);
      }, 800);
    } else {
      setTimeout(() => {
        setSubmitting(false);
        navigate("/reciept", { state: receiptState });
      }, 1800);
    }
  };

  const handleQrDone = () => {
    if (qrStepReceiptState) {
      try {
        sessionStorage.removeItem(
          PENDING_RECEIPT_KEY + qrStepReceiptState.receiptId,
        );
      } catch (_) {}
      navigate("/reciept", { state: qrStepReceiptState });
      setShowQrStep(false);
      setQrStepReceiptState(null);
    }
  };

  const handlePlanChange = (e) => {
    const newPlan = e?.target?.value;
    if (newPlan)
      navigate({ pathname: "/checkout", search: `?plan=${newPlan}` });
  };

  const formatPrice = (amount) => `₱${amount.toLocaleString("en-PH")}/month`;

  return (
    <Box className={classes.root}>
      <Container maxWidth="lg" className={classes.container}>
        <RouterLink to="/pricing" className={classes.backLink}>
          <ArrowBack fontSize="small" style={{ flexShrink: 0 }} />
          <span>Back to plans</span>
        </RouterLink>

        <Box className={classes.header}>
          <Typography variant="h1" className={classes.pageTitle}>
            Complete Your Purchase
          </Typography>
          <Typography variant="body1" className={classes.pageSubtitle}>
            Enter your billing details to subscribe to UlapPayroll. We’ll send
            your receipt and next steps to your email.
          </Typography>
          <Box className={classes.steps}>
            <Box className={classes.step}>
              <Box className={`${classes.stepDot} ${classes.stepDotActive}`} />
              <span>Your details</span>
            </Box>
            <Box className={classes.step}>
              <Box className={classes.stepDot} />
              <span>Review & pay</span>
            </Box>
          </Box>
        </Box>

        <form onSubmit={handleSubmit}>
          <Box className={classes.grid}>
            {/* Billing Information */}
            <Paper className={classes.billingCard} elevation={0}>
              <Box className={classes.billingCardTop} />
              <Box className={classes.billingCardContent}>
                <Typography component="div" className={classes.sectionTitle}>
                  <Box className={classes.sectionIcon}>
                    <Person fontSize="small" />
                  </Box>
                  Billing Information
                </Typography>

                <TextField
                  className={classes.field}
                  fullWidth
                  variant="outlined"
                  label="Full Name"
                  placeholder="e.g. Juan Dela Cruz"
                  value={form.fullName}
                  onChange={handleChange("fullName")}
                  onBlur={handleBlur("fullName")}
                  error={!!errors.fullName}
                  helperText={errors.fullName}
                  required
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Person
                          fontSize="small"
                          style={{ color: "rgba(0,0,0,0.35)" }}
                        />
                      </InputAdornment>
                    ),
                  }}
                />

                <TextField
                  className={classes.field}
                  fullWidth
                  variant="outlined"
                  type="email"
                  label="Work Email"
                  placeholder="you@company.com"
                  value={form.workEmail}
                  onChange={handleChange("workEmail")}
                  onBlur={handleBlur("workEmail")}
                  error={!!errors.workEmail}
                  helperText={errors.workEmail}
                  required
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Email
                          fontSize="small"
                          style={{ color: "rgba(0,0,0,0.35)" }}
                        />
                      </InputAdornment>
                    ),
                  }}
                />
                <Typography className={classes.fieldHelper}>
                  We’ll use this for your receipt and account login.
                </Typography>

                <TextField
                  className={classes.field}
                  fullWidth
                  variant="outlined"
                  label="Company Name"
                  placeholder="e.g. Acme Inc."
                  value={form.companyName}
                  onChange={handleChange("companyName")}
                  onBlur={handleBlur("companyName")}
                  error={!!errors.companyName}
                  helperText={errors.companyName}
                  required
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Business
                          fontSize="small"
                          style={{ color: "rgba(0,0,0,0.35)" }}
                        />
                      </InputAdornment>
                    ),
                  }}
                />

                <Box className={classes.phoneRow}>
                  {(() => {
                    const current = COUNTRY_CODES.find(
                      (c) => c.code === form.phoneCountryCode,
                    );
                    return (
                      <Box className={classes.phoneCountryWrap}>
                        <img
                          src={`${FLAG_CDN}/${current ? current.iso : "ph"}.png`}
                          alt=""
                          className={classes.phoneFlag}
                          aria-hidden
                        />
                        <select
                          className={classes.phoneCountrySelect}
                          aria-label="Country code"
                          value={form.phoneCountryCode}
                          onChange={handleChange("phoneCountryCode")}
                        >
                          {COUNTRY_CODES.map(({ code, iso }) => (
                            <option key={code} value={code}>
                              {code} {iso.toUpperCase()}
                            </option>
                          ))}
                        </select>
                      </Box>
                    );
                  })()}
                  <TextField
                    className={`${classes.field} ${classes.phoneInput}`}
                    fullWidth
                    variant="outlined"
                    label="Phone Number"
                    placeholder={
                      form.phoneCountryCode === "+63"
                        ? "912 345 6789"
                        : "Phone number"
                    }
                    value={form.phone}
                    onChange={handlePhoneChange}
                    onBlur={handleBlur("phone")}
                    inputProps={{
                      maxLength:
                        COUNTRY_CODES.find(
                          (c) => c.code === form.phoneCountryCode,
                        )?.maxLength ?? 11,
                      inputMode: "numeric",
                      pattern: "[0-9]*",
                    }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Phone
                            fontSize="small"
                            style={{ color: "rgba(0,0,0,0.35)" }}
                          />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Box>
                <Typography className={classes.fieldHelper}>
                  Optional. For delivery updates and support.
                </Typography>

                <TextField
                  className={classes.field}
                  fullWidth
                  variant="outlined"
                  label="Billing Address"
                  placeholder="Street, Barangay, City, Province, ZIP Code"
                  multiline
                  minRows={3}
                  maxRows={6}
                  value={form.billingAddress}
                  onChange={handleChange("billingAddress")}
                  onBlur={handleBlur("billingAddress")}
                  inputProps={{
                    maxLength: 500,
                    autoComplete: "billing street-address",
                    "aria-describedby": "billing-address-helper",
                  }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment
                        position="start"
                        style={{ alignSelf: "flex-start", marginTop: 12 }}
                      >
                        <LocationOn
                          fontSize="small"
                          style={{ color: "rgba(0,0,0,0.35)" }}
                        />
                      </InputAdornment>
                    ),
                  }}
                />
                <Box className={classes.locationButtonWrap}>
                  <Button
                    size="small"
                    color="primary"
                    startIcon={
                      locationLoading ? (
                        <CircularProgress size={14} color="inherit" />
                      ) : (
                        <MyLocation fontSize="small" />
                      )
                    }
                    onClick={getBillingAddressFromGPS}
                    disabled={locationLoading}
                    aria-label="Use my current location for billing address"
                  >
                    Use my location
                  </Button>
                  {locationError && (
                    <Typography
                      className={classes.locationError}
                      component="span"
                    >
                      {locationError}
                    </Typography>
                  )}
                </Box>
                <Typography
                  id="billing-address-helper"
                  className={`${classes.fieldHelper} ${classes.fieldHelperSecure}`}
                >
                  <Lock fontSize="inherit" />
                  Optional. Used only for official invoices and tax records.
                  Your address is kept confidential and transmitted securely.
                  {form.billingAddress.length > 0 && (
                    <span style={{ marginLeft: 4 }}>
                      ({form.billingAddress.length}/500)
                    </span>
                  )}
                </Typography>

                <Box className={`${classes.field} ${classes.nativeSelectWrap}`}>
                  <label htmlFor="payment-method">Payment Method</label>
                  <select
                    id="payment-method"
                    className={classes.nativeSelect}
                    value={form.paymentMethod}
                    onChange={handleChange("paymentMethod")}
                    aria-label="Payment Method"
                  >
                    {PAYMENT_METHODS.map((pm) => (
                      <option key={pm.value} value={pm.value}>
                        {pm.label}
                      </option>
                    ))}
                  </select>
                </Box>

                {form.paymentMethod === "card" && (
                  <Box className={classes.paymentDetailsBox}>
                    <Typography className={classes.paymentDetailsTitle}>
                      Card information
                    </Typography>
                    <>
                      <TextField
                        className={classes.field}
                        fullWidth
                        variant="outlined"
                        label="Card number"
                        placeholder="1234 5678 9012 3456"
                        value={paymentDetails.cardNumber}
                        onChange={handlePaymentDetailsChange("cardNumber")}
                        error={!!errors.payment_cardNumber}
                        helperText={errors.payment_cardNumber}
                      />
                      <Box
                        style={{ display: "flex", gap: 12, flexWrap: "wrap" }}
                      >
                        <TextField
                          className={classes.field}
                          style={{ flex: "1 1 120px" }}
                          variant="outlined"
                          label="Expiry (MM/YY)"
                          placeholder="MM/YY"
                          value={paymentDetails.cardExpiry}
                          onChange={handlePaymentDetailsChange("cardExpiry")}
                          error={!!errors.payment_cardExpiry}
                          helperText={errors.payment_cardExpiry}
                        />
                        <TextField
                          className={classes.field}
                          style={{ flex: "1 1 100px" }}
                          variant="outlined"
                          label="CVV"
                          placeholder="123"
                          value={paymentDetails.cardCvv}
                          onChange={handlePaymentDetailsChange("cardCvv")}
                          error={!!errors.payment_cardCvv}
                          helperText={errors.payment_cardCvv}
                        />
                      </Box>
                      <TextField
                        className={classes.field}
                        fullWidth
                        variant="outlined"
                        label="Name on card"
                        placeholder="As shown on card"
                        value={paymentDetails.nameOnCard}
                        onChange={handlePaymentDetailsChange("nameOnCard")}
                        error={!!errors.payment_nameOnCard}
                        helperText={errors.payment_nameOnCard}
                      />
                    </>
                  </Box>
                )}

                <Box className={classes.paymentNote}>
                  <CheckCircle
                    style={{
                      color: "#22c55e",
                      fontSize: 20,
                      flexShrink: 0,
                      marginTop: 2,
                    }}
                  />
                  <span>
                    Payment instructions will be sent to your email after you
                    confirm. You can pay via e-wallet or card depending on your
                    selection.
                  </span>
                </Box>
              </Box>
            </Paper>

            {/* Order Summary */}
            <Paper className={classes.summaryCard} elevation={0}>
              <Box className={classes.summaryCardTop} />
              <Box className={classes.summaryContent}>
                <Typography component="div" className={classes.sectionTitle}>
                  <Box
                    className={classes.sectionIcon}
                    style={{
                      backgroundColor: "rgba(100, 116, 139, 0.12)",
                      color: "#64748b",
                    }}
                  >
                    <ShoppingCart fontSize="small" />
                  </Box>
                  Order Summary
                </Typography>

                <Typography className={classes.planSwitcherLabel}>
                  Selected plan — change anytime below
                </Typography>
                <Box className={classes.planSwitcher}>
                  <select
                    id="change-plan"
                    className={`${classes.nativeSelect} ${classes.nativeSelectSmall}`}
                    value={planKey}
                    onChange={handlePlanChange}
                    aria-label="Change plan"
                  >
                    <option value="starter">Starter — ₱2,999 + ₱79/employee/mo</option>
                    <option value="professional">
                      Professional — ₱4,999 + ₱109/employee/mo
                    </option>
                    <option value="enterprise">Enterprise — ₱10,000 + ₱179/employee/mo</option>
                  </select>
                </Box>

                <Box
                  className={classes.planSummaryBox}
                  style={{
                    backgroundColor: plan.lightColor,
                    borderColor: plan.lightColor,
                  }}
                >
                  <Chip
                    size="small"
                    label={plan.name}
                    className={classes.planBadge}
                    style={{ backgroundColor: plan.color }}
                  />
                  <Typography className={classes.planName}>
                    {plan.label}
                  </Typography>
                  <Typography className={classes.planDescription}>
                    {plan.description}
                  </Typography>
                  <Typography className={classes.planPrice}>
                    ₱{plan.basePrice.toLocaleString("en-PH")} + ₱{plan.perEmployee}/employee/month
                  </Typography>
                </Box>

                <Box className={classes.totalRow}>
                  <Typography className={classes.totalLabel}>
                    Total due today (base)
                  </Typography>
                  <Typography className={classes.totalAmount}>
                    ₱{plan.basePrice.toLocaleString("en-PH")}/mo + ₱{plan.perEmployee}/employee
                  </Typography>
                </Box>

                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  className={classes.confirmBtn}
                  disabled={submitting}
                  startIcon={
                    submitting ? (
                      <CircularProgress size={20} color="inherit" />
                    ) : null
                  }
                >
                  {submitting ? "Processing…" : "Confirm Purchase"}
                </Button>

                <Box className={classes.secureBadge}>
                  <Lock fontSize="small" />
                  Secure checkout · Your data is protected
                </Box>

                <ul className={classes.benefitsList}>
                  {BENEFITS.map((benefit, i) => (
                    <li key={i} className={classes.benefitItem}>
                      <CheckCircle />
                      {benefit}
                    </li>
                  ))}
                </ul>
              </Box>
            </Paper>
          </Box>
        </form>

        {showQrStep && qrStepReceiptState && (
          <Box
            className={classes.qrOverlay}
            onClick={(e) =>
              e.target === e.currentTarget && setShowQrStep(false)
            }
          >
            <Box
              className={classes.qrModal}
              onClick={(e) => e.stopPropagation()}
            >
              <Typography className={classes.qrModalTitle}>
                Scan to pay with{" "}
                {form.paymentMethod === "gcash" ? "GCash" : "Maya"}
              </Typography>
              <Typography className={classes.qrModalAmount}>
                {formatPrice(plan.basePrice)} + ₱{plan.perEmployee}/employee/mo
              </Typography>
              <Typography
                className={classes.qrHint}
                style={{ marginBottom: 16 }}
              >
                Open your app, scan to pay, then open the link to complete. Or
                click below when done.
              </Typography>
              <img
                className={classes.qrImage}
                src={`${QR_CODE_BASE}?size=200x200&data=${encodeURIComponent(
                  typeof window !== "undefined"
                    ? `${window.location.origin}/payment-complete?ref=${qrStepReceiptState.receiptId}`
                    : `UlapPayroll-${plan.label}-${plan.basePrice}-${qrStepReceiptState.receiptId}`,
                )}`}
                alt="Payment QR Code"
              />
              <Typography
                variant="body2"
                color="textSecondary"
                style={{ marginTop: 8, marginBottom: 4 }}
              >
                Simulate:{" "}
                <Typography
                  component="a"
                  href={`${typeof window !== "undefined" ? window.location.origin : ""}/payment-complete?ref=${qrStepReceiptState.receiptId}`}
                  color="primary"
                  style={{ cursor: "pointer", textDecoration: "underline" }}
                >
                  I scanned and paid (open link)
                </Typography>
              </Typography>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={handleQrDone}
                className={classes.confirmBtn}
                style={{ marginTop: 8 }}
              >
                I've completed payment
              </Button>
            </Box>
          </Box>
        )}
      </Container>
    </Box>
  );
}
