import React from "react";
import PageHeader from "../PageHeader";
const tasks = [
  {
    id: 1,
    employeeName: "John Doe",
    employeeImage: "https://picsum.photos/id/1/150",
    taskTitle: "Complete project report",
    taskDescription: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    dateSubmitted: "2023-03-17",
  },
  {
    id: 2,
    employeeName: "Jane Smith",
    employeeImage: "https://picsum.photos/id/1/150",
    taskTitle: "Prepare presentation slides",
    taskDescription:
      "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    dateSubmitted: "2023-03-16",
  },
  {
    id: 3,
    employeeName: "Jane Smith",
    employeeImage: "https://picsum.photos/id/1/150",
    taskTitle: "Prepare presentation slides",
    taskDescription:
      "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    dateSubmitted: "2023-03-16",
  },
  {
    id: 4,
    employeeName: "Jane Smith",
    employeeImage: "https://picsum.photos/id/1/150",
    taskTitle: "Prepare presentation slides",
    taskDescription:
      "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    dateSubmitted: "2023-03-16",
  },
  {
    id: 5,
    employeeName: "Jane Smith",
    employeeImage: "https://picsum.photos/id/1/150",
    taskTitle: "Prepare presentation slides",
    taskDescription:
      "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    dateSubmitted: "2023-03-16",
  },
  {
    id: 6,
    employeeName: "Jane Smith",
    employeeImage: "https://picsum.photos/id/1/150",
    taskTitle: "Prepare presentation slides",
    taskDescription:
      "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    dateSubmitted: "2023-03-16",
  },
  // add more tasks here as needed
];
const AllTasks = () => {
  return (
    <>
      <PageHeader title={"All Task"} />
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 m-4">
        {tasks.map((task) => (
          <div key={task.id} className="p-4 bg-gray-200 rounded-lg shadow-lg">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center">
                <img
                  src={task.employeeImage}
                  alt={task.employeeName}
                  className="w-16 h-216 rounded-full mr-2"
                />
                <span className="text-xl font-bold">{task.employeeName}</span>
              </div>
              <span className="text-base font-bold">{task.dateSubmitted}</span>
            </div>
            <div className="mb-4">
              <h3 className="text-lg font-medium">{task.taskTitle}</h3>
              <p className="text-gray-600 mt-2">{task.taskDescription}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default AllTasks;
