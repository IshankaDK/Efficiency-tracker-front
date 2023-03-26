import React from "react";
import Footer from "../Footer";
import EmployeeHeader from "./EmployeeHeader";

const EmployeeDashBoard = ({ children }) => {
  return (
    <>
      <EmployeeHeader />
      <div className="h-full mb-48">{children}</div>
      <div className="fixed bottom-0 w-full">
        <Footer />
      </div>
    </>
  );
};

export default EmployeeDashBoard;
