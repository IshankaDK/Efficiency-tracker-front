import React from "react";
import PageHeader from "../PageHeader";
const employeeData = [
  {
    id: 1,
    name: "John Doe",
    department: "Marketing",
    role: "Marketing Manager",
    image: "https://randomuser.me/api/portraits/med/men/19.jpg",
    pendingTasks: 3,
  },
  {
    id: 2,
    name: "Jane Smith",
    department: "Sales",
    role: "Sales Representative",
    image: "https://randomuser.me/api/portraits/med/men/18.jpg",
    pendingTasks: 5,
  },
  {
    id: 3,
    name: "Bob Johnson",
    department: "Human Resources",
    role: "HR Manager",
    image: "https://randomuser.me/api/portraits/med/men/12.jpg",
    pendingTasks: 2,
  },
  {
    id: 4,
    name: "Sara Lee",
    department: "Operations",
    role: "Operations Manager",
    image: "https://randomuser.me/api/portraits/med/women/14.jpg",
    pendingTasks: 1,
  },
  {
    id: 5,
    name: "Tom Wilson",
    department: "Engineering",
    role: "Software Engineer",
    image: "https://randomuser.me/api/portraits/med/men/15.jpg",
    pendingTasks: 0,
  },
  {
    id: 6,
    name: "Tom Wilson",
    department: "Engineering",
    role: "Software Engineer",
    image: "https://randomuser.me/api/portraits/med/men/20.jpg",
    pendingTasks: 0,
  },
];
const EmployeeList = () => {
  return (
    <>
    <PageHeader title={"Employee List"}/>
    
    <div className="flex flex-wrap justify-center">
      {employeeData.map((employee) => (
        <div
          key={employee.id}
          className="max-w-sm w-full sm:w-1/2 lg:w-1/3 py-4 px-8"
        >
          <div className="bg-white shadow-lg rounded-lg overflow-hidden">
            <img
              className="w-full h-48 object-cover object-center"
              src={employee.image}
              alt={`${employee.name}`}
            />
            <div className="py-4 px-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                {employee.name}
              </h2>
              <p className="text-gray-600 text-sm mb-2">
                {employee.department} - {employee.role}
              </p>
              <div className="flex items-center">
                <svg
                  className="w-4 h-4 fill-current text-gray-500 mr-2"
                  viewBox="0 0 24 24"
                >
                  <path d="M9 16h6v1H9zM8 16h1v1H8zM16.5 8.5l-1.4-1.4-4.6 4.6 4.6 4.6 1.4-1.4L13.4 12l3.1-3.1z" />
                </svg>
                <p className="text-gray-600 text-sm">
                  {employee.pendingTasks} Pending Tasks
                </p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
    </>
  );
};

export default EmployeeList;
