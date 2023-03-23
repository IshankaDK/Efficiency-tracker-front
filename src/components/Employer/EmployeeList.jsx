import axios from "axios";
import React, { useEffect, useState } from "react";
import { baseURL } from "../../apiURL";
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
]

const EmployeeList = () => {

  const [employees, setEmployees] = useState([])
  useEffect(() => {
    axios
      .get(`${baseURL}/user`)
      .then((res) => res.data && setEmployees(res.data))
      .catch((err) => console.log(err));
  }, []);
  return (
    <>
      <PageHeader title={"Employee List"} />

      <div className="flex flex-wrap justify-center">
        {employees.map((employee) => (
          <div
            key={employee.id}
            className="max-w-sm w-full sm:w-1/2 lg:w-1/3 py-4 px-8"
          >
            <div className="bg-white shadow-lg rounded-lg overflow-hidden">
              <img
                className="w-full h-48 object-cover object-center "
                src={`https://randomuser.me/api/portraits/men/${Math.floor(Math.random() * 100) + 1}.jpg`}
                alt={`${employee.username}`}
              />
              <div className="py-4 px-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">
                  {employee.username}
                </h2>
                <p className="text-gray-600 text-sm mb-2">
                  {employee.email}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default EmployeeList;
