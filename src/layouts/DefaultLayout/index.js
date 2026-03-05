import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  outletWrap: {
    animation: "$pageFadeIn 0.35s ease-out forwards",
  },
  "@keyframes pageFadeIn": {
    "0%": {
      opacity: 0,
      transform: "translateY(8px)",
    },
    "100%": {
      opacity: 1,
      transform: "translateY(0)",
    },
  },
}));

const DefaultLayout = () => {
  const classes = useStyles();
  const location = useLocation();

  return (
    <div>
      <Navbar />
      <div key={location.pathname} className={classes.outletWrap} style={{ marginTop: 60 }}>
        <Outlet />
      </div>
    </div>
  );
};

export default DefaultLayout;
