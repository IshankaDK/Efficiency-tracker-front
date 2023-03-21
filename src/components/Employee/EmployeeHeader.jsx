import React from "react";
import { Link, useNavigate } from "react-router-dom";

const EmployeeHeader = () => {
  
  const navigate = useNavigate();
  const logout = () =>{
    localStorage.setItem('role', undefined);
    localStorage.clear()
    navigate('/')
  }
  return (
    <>
      <nav className="relative flex flex-wrap items-center justify-between px-2 py-3 bg-blue-700 mb-3">
        <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
          <div className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
            <Link
              className="text-lg font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase text-white"
              to="/dashboard-employee"
            >
              Efficiency Tracker
            </Link>
          </div>
          <div
            className={"lg:flex flex-grow items-center flex"}
            id="example-navbar-danger"
          >
            <ul className="flex flex-col lg:flex-row list-none lg:ml-auto">
              <li className="nav-item">
                <Link
                  className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75"
                  to="/my-tasks"
                >
                  <span className="ml-2 text-base">My Tasks</span>
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75"
                  to="/submit-task"
                >
                  <span className="ml-2 text-base">Submit Task</span>
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75"
                  to="/profile"
                >
                  <span className="ml-2 text-base">My Profile</span>
                </Link>
              </li>
              <li className="nav-item">
                <button onClick={()=>logout()}
                  className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75"
                >
                  <span className="ml-2 text-base">Log out</span>
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default EmployeeHeader;
