import { BrowserRouter, Routes, Route } from "react-router-dom";
import About from "./components/About";
import AllTasks from "./components/Employer/AllTasks";
import CreateTask from "./components/Employer/CreateTask";
import EmployeeList from "./components/Employer/EmployeeList";
import EmployerDashBoard from "./components/Employer/EmployerDashBoard";
import WelcomeNote from "./components/Employer/WelcomeNote";
import Login from "./components/Login";
import SignUp from "./components/SignUp";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<SignUp />} />
          <Route
            path="/dashboard"
            element={
              <EmployerDashBoard
                children={
                  <>
                    <WelcomeNote />
                    <div className="px-6 pt-6 text-xl font-bold "> Latests submits</div>
                    <AllTasks />
                  </>
                }
              />
            }
          />
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
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
