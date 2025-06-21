import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

const RootLayout = () => {
  return (
    <main className="bg-white">
      <Navbar />
      <Outlet />
    </main>
  );
};

export default RootLayout;
