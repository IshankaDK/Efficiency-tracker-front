import { Button } from "@mui/material";
import { useState } from "react";
import PageHeader from "../PageHeader";

const CreateTask = () => {
  // define state variables for form fields
  const [employee, setEmployee] = useState("");
  const [taskName, setTaskName] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [attachment, setAttachment] = useState("");
  const [dueDate, setDueDate] = useState("");

  // handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: implement form submission logic
  };

  return (
    <>
      <PageHeader title={"Create Task"} />
      <form onSubmit={handleSubmit} className="max-w-lg mx-auto mt-8">
        <div className="mb-4">
          <label
            htmlFor="employee"
            className="block text-gray-700 font-bold mb-2"
          >
            Employee
          </label>
          <select
            id="employee"
            name="employee"
            value={employee}
            onChange={(e) => setEmployee(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          >
            <option value="">Select an employee</option>
            <option value="employee1">Employee 1</option>
            <option value="employee2">Employee 2</option>
            <option value="employee3">Employee 3</option>
          </select>
        </div>
        <div className="mb-4">
          <label
            htmlFor="taskName"
            className="block text-gray-700 font-bold mb-2"
          >
            Task Name
          </label>
          <input
            type="text"
            id="taskName"
            name="taskName"
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="taskDescription"
            className="block text-gray-700 font-bold mb-2"
          >
            Task Description
          </label>
          <textarea
            id="taskDescription"
            name="taskDescription"
            value={taskDescription}
            onChange={(e) => setTaskDescription(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="attachment"
            className="block text-gray-700 font-bold mb-2"
          >
            Attachment
          </label>
          <input
            type="file"
            id="attachment"
            name="attachment"
            onChange={(e) => setAttachment(e.target.files[0])}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="dueDate"
            className="block text-gray-700 font-bold mb-2"
          >
            Due Date
          </label>
          <input
            type="date"
            id="dueDate"
            name="dueDate"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mt-8 mb-4 flex justify-end">
          <Button variant="contained">Create Task</Button>
        </div>
      </form>
    </>
  );
};

export default CreateTask;
