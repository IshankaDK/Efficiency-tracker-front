import React from "react";
import EmployerHeader from "./EmployerHeader";
import Footer from "../Footer";

const EmployerDashBoard = ({ children }) => {
  return (
    <div className="h-screen">
      <EmployerHeader />
      <div className="h-screen">{children}</div>
      <div className="fixed bottom-0 w-full">
        <Footer />
      </div>
    </div>
  );
};

export default EmployerDashBoard;
