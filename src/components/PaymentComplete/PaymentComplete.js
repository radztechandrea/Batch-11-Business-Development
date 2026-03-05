import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams, Link as RouterLink } from "react-router-dom";
import { Box, CircularProgress, Container, Typography, Link } from "@material-ui/core";

const PENDING_KEY = "ulap_pending_receipt_";

export default function PaymentComplete() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const ref = searchParams.get("ref");
  const [status, setStatus] = useState("loading"); // 'loading' | 'processing' | 'invalid'

  useEffect(() => {
    if (!ref) {
      setStatus("invalid");
      return;
    }
    const key = PENDING_KEY + ref;
    const raw = typeof window !== "undefined" ? sessionStorage.getItem(key) : null;
    const state = raw ? (() => { try { return JSON.parse(raw); } catch { return null; } })() : null;

    if (!state) {
      setStatus("invalid");
      return;
    }

    setStatus("processing");
    const timer = setTimeout(() => {
      try {
        sessionStorage.removeItem(key);
      } catch (_) {}
      navigate("/reciept", { state, replace: true });
    }, 2000);

    return () => clearTimeout(timer);
  }, [ref, navigate]);

  if (status === "invalid") {
    return (
      <Box minHeight="100vh" display="flex" alignItems="center" justifyContent="center" bgcolor="#f5f7fa" p={3}>
        <Container maxWidth="xs">
          <Typography variant="h6" align="center" gutterBottom>
            Invalid or expired payment link
          </Typography>
          <Typography variant="body2" align="center" color="textSecondary">
            Please complete checkout again from the checkout page.
          </Typography>
          <Box mt={2} display="flex" justifyContent="center">
            <Link component={RouterLink} to="/checkout" color="primary">
              Back to Checkout
            </Link>
          </Box>
        </Container>
      </Box>
    );
  }

  return (
    <Box minHeight="100vh" display="flex" flexDirection="column" alignItems="center" justifyContent="center" bgcolor="#f5f7fa" p={3}>
      <CircularProgress size={48} style={{ marginBottom: 16 }} />
      <Typography variant="h6" align="center">
        Processing payment…
      </Typography>
      <Typography variant="body2" color="textSecondary" align="center" style={{ marginTop: 8 }}>
        Redirecting to your receipt.
      </Typography>
    </Box>
  );
}
