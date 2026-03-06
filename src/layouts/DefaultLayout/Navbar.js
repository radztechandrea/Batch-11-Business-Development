import React, { useState } from "react";
import { Link as RouterLink, useLocation } from "react-router-dom";
import UlapBizIcon from "../../images/ulapbiz.png";
import UlapBizLogo from "../../images/Ulap_Biz.png";
import MenuIcon from "@material-ui/icons/Menu";
import CloseIcon from "@material-ui/icons/Close";

import {
  AppBar,
  Toolbar,
  makeStyles,
  Link,
  Box,
  Container,
  Collapse,
  useMediaQuery,
  useTheme,
} from "@material-ui/core";

const pages = ["Home", "Pricing", "Contact Us"];

const useStyles = makeStyles((theme) => ({
  toolbar: {
    background: "#fff",
    height: 60,
  },
  appBar: {
    [theme.breakpoints.down("md")]: {
      height: "100%",
    },
    "@media print": {
      display: "none !important",
    },
  },
  iconContainer: {
    display: "flex",
    gap: ".3em",
    alignItems: "center",
    filter: "grayscale(10%)",
    transition: "all 500ms ease-in-out",
    [theme.breakpoints.down("md")]: {
      flexGrow: 1,
    },
    "&:hover": {
      filter: "grayscale(0)",
    },
  },
  logoImg: {
    height: 38,
    width: "auto",
    display: "block",
  },
  logoWordmark: {
    height: 22,
    width: "auto",
    display: "block",
  },

  navLink: {
    fontWeight: 600,
    transition: "color 0.25s ease",
  },
  activeLink: {
    color: "#FF7704 !important",
    fontWeight: 700,
    textShadow: "0 0 12px rgba(255, 119, 4, 0.7), 0 0 24px rgba(255, 119, 4, 0.4)",
  },
}));

const Navbar = () => {
  const classes = useStyles();
  const theme = useTheme();
  const location = useLocation();

  const [open, setOpen] = useState(false);
  const isXs = useMediaQuery(theme.breakpoints.down("xs"));

  const getPathFromPage = (page) => {
    if (page === "Home") return "/";
    if (page === "Pricing") return "/pricing";
    if (page === "Contact Us") return "/contact-us";
    return `/${page.toLowerCase().replace(/\s+/g, "-")}`;
  };

  const isActive = (page) => {
    if (page === "Home") {
      return (
        location.pathname === "/" &&
        (!location.hash || location.hash === "#hero")
      );
    }
    return location.pathname === getPathFromPage(page);
  };

  return (
    <AppBar elevation={2} color="inherit" className={classes.appBar}>
      <Container maxWidth="lg">
        <Toolbar disableGutters className={classes.toolbar}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              width: "100%",
            }}
          >
            <Box className={classes.iconContainer}>
              <RouterLink
                to="/"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: theme.spacing(1),
                }}
              >
                <img src={UlapBizIcon} alt="" className={classes.logoImg} />
                <img
                  src={UlapBizLogo}
                  alt="UlapBiz"
                  className={classes.logoWordmark}
                />
              </RouterLink>
            </Box>
            {isXs && (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  flex: 1,
                }}
              >
                {open ? (
                  <CloseIcon color="primary" onClick={() => setOpen(false)} />
                ) : (
                  <MenuIcon color="primary" onClick={() => setOpen(true)} />
                )}
              </Box>
            )}
            {!isXs && (
              <>
                <Box sx={{ flex: 1 }} />
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: "1.5rem",
                    "& :hover": {
                      color: "#FF7704",
                    },
                  }}
                >
                  {pages.map((page, index) => (
                    <Link
                      key={index}
                      component={RouterLink}
                      variant="h6"
                      to={getPathFromPage(page)}
                      underline="none"
                      color="textPrimary"
                      className={`${isActive(page) ? classes.activeLink : ""} ${classes.navLink}`}
                      style={{ fontSize: ".8rem" }}
                    >
                      {page}
                    </Link>
                  ))}
                </Box>
                <Box sx={{ flex: 1 }} />
              </>
            )}
          </Box>
        </Toolbar>
        <Collapse in={open}>
          {isXs && (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                width: "100%",
                gap: "1rem",
                marginBottom: "1rem",
                height: "100vh",
              }}
            >
              {pages.map((page, index) => (
                <Link
                  key={index}
                  component={RouterLink}
                  variant="h6"
                  to={getPathFromPage(page)}
                  underline="none"
                  color="primary"
                  onClick={() => setOpen(false)}
                  className={`${isActive(page) ? classes.activeLink : ""} ${classes.navLink}`}
                  style={{ fontSize: "1rem" }}
                >
                  {page}
                </Link>
              ))}
              <Link
                key="signin"
                component={RouterLink}
                variant="h6"
                to="test"
                underline="none"
                color="textPrimary"
                onClick={() => setOpen(false)}
                className={classes.navLink}
                style={{
                  color: theme.palette.primary.main,
                }}
              >
                Sign In
              </Link>
              <Link
                key="signup"
                component={RouterLink}
                variant="h6"
                to="test"
                underline="none"
                color="textPrimary"
                onClick={() => setOpen(false)}
                className={classes.navLink}
                style={{
                  color: theme.palette.primary.main,
                }}
              >
                Sign Up
              </Link>
            </Box>
          )}
        </Collapse>
      </Container>
    </AppBar>
  );
};

export default Navbar;
