import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

const DefaultLayout = () => {
  return (
    <div>
      <Navbar />
      <div style={{ marginTop: 80 }}>
        <Outlet />
      </div>
    </div>
  );
};

export default DefaultLayout;
