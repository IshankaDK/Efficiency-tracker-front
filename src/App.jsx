import React, { useState, useEffect } from "react";
import { SnackbarProvider } from "notistack";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import About from "./components/About";
import EmployeeDashBoard from "./components/Employee/EmployeeDashBoard";
import MyTask from "./components/Employee/MyTask";
import Profile from "./components/Employee/Profile";
import SubmitTask from "./components/Employee/SubmitTask";
import AllTasks from "./components/Employer/AllTasks";
import CreateTask from "./components/Employer/CreateTask";
import EmployeeList from "./components/Employer/EmployeeList";
import EmployerDashBoard from "./components/Employer/EmployerDashBoard";
import WelcomeNote from "./components/Employer/WelcomeNote";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import Contact from "./components/Contact";

function App() {
  // const [currentUserRole, setCurrentUserRole] = useState(
  //   localStorage.getItem("role")
  // );
  // useEffect(() => {
  //   setCurrentUserRole(localStorage.getItem("role"));
  // }, []);
  return (
    <>
      <SnackbarProvider maxSnack={3} autoHideDuration={3000}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<SignUp />} />
            <Route
              path="/dashboard-employer"
              element={
                <EmployerDashBoard
                  children={
                    <>
                      <WelcomeNote />
                      <AllTasks />
                    </>
                  }
                />
              }
            />{" "}
            <Route
              path="/dashboard-employee"
              element={
                <EmployeeDashBoard
                  children={
                    <>
                      <WelcomeNote />
                      <MyTask />
                    </>
                  }
                />
              }
            />
            {/* {currentUserRole === "Employer" && ( */}
              <>
                <Route
                  path="/create-task"
                  element={
                    <EmployerDashBoard
                      children={
                        <>
                          <CreateTask />
                        </>
                      }
                    />
                  }
                />
                <Route
                  path="/all-tasks"
                  element={
                    <EmployerDashBoard
                      children={
                        <>
                          <AllTasks />
                        </>
                      }
                    />
                  }
                />
                <Route
                  path="/employees"
                  element={
                    <EmployerDashBoard
                      children={
                        <>
                          <EmployeeList />
                        </>
                      }
                    />
                  }
                />
                <Route
                  path="/about"
                  element={<EmployerDashBoard children={<About />} />}
                />
                <Route
                  path="/contact"
                  element={<EmployerDashBoard children={<Contact />} />}
                />
              </>
            {/* )} */}
            {/* {currentUserRole === "Employee" && ( */}
              <>
                <Route
                  path="/my-tasks"
                  element={
                    <EmployeeDashBoard
                      children={
                        <>
                          <MyTask />
                        </>
                      }
                    />
                  }
                />
                <Route
                  path="/submit-task"
                  element={
                    <EmployeeDashBoard
                      children={
                        <>
                          <SubmitTask />
                        </>
                      }
                    />
                  }
                />
                <Route
                  path="/profile"
                  element={
                    <EmployeeDashBoard
                      children={
                        <>
                          <Profile />
                        </>
                      }
                    />
                  }
                />
                <Route
                  path="/about"
                  element={<EmployeeDashBoard children={<About />} />}
                />
                <Route
                  path="/contact"
                  element={<EmployeeDashBoard children={<Contact />} />}
                />
              </>
            {/* )} */}
          </Routes>
        </BrowserRouter>
      </SnackbarProvider>
    </>
  );
}

export default App;
