import React from "react";
import EmployerHeader from "./EmployerHeader";
import Footer from "../Footer";

const EmployerDashBoard = ({ children }) => {
  return (
    <>
      <EmployerHeader />
      <div >{children}</div>
      <div className="fixed bottom-0 w-full">
        <Footer />
      </div>
    </>
  );
};

export default EmployerDashBoard;
