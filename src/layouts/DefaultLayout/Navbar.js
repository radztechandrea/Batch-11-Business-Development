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
    "&:hover": {
      color: "#FF7704",
    },
  },
  activeLink: {
    color: "#FF7704 !important",
    fontWeight: 700,
    borderBottom: "2px solid #FF7704",
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
            {/* LEFT - LOGO */}
            <Box
              sx={{
                flex: 1,
                display: "flex",
                alignItems: "center",
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
            </Box>

            {/* MOBILE MENU BUTTON */}
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

            {/* CENTER NAV ITEMS */}
            {!isXs && (
              <>
                <Box
                  sx={{
                    flex: 1,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: "1.8rem",
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

                {/* RIGHT SPACER */}
                <Box sx={{ flex: 1 }} />
              </>
            )}
          </Box>
        </Toolbar>

        {/* MOBILE MENU */}
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
                  color="textPrimary"
                  onClick={() => setOpen(false)}
                  className={`${isActive(page) ? classes.activeLink : ""} ${classes.navLink}`}
                  style={{ fontSize: "1rem" }}
                >
                  {page}
                </Link>
              ))}
            </Box>
          )}
        </Collapse>
      </Container>
    </AppBar>
  );
};

export default Navbar;
