import React from "react";
import PageHeader from "../PageHeader";
const tasks = [
  {
    id: 1,
    employee: "John Smith",
    taskName: "Complete project proposal",
    taskDescription: "Write a project proposal for the new client",
    attachment: "",
    dueDate: "2023-04-15",
    status: "pending",
  },
  {
    id: 2,
    employee: "Jane Doe",
    taskName: "Update website design",
    taskDescription: "Create a new design for the website homepage",
    attachment: "",
    dueDate: "2023-04-10",
    status: "completed",
  },
  {
    id: 3,
    employee: "Bob Johnson",
    taskName: "Fix bug in app",
    taskDescription: "Debug and fix the issue with the login page",
    attachment: "",
    dueDate: "2023-04-20",
    status: "todo",
  },
];
const MyTask = () => {
  return (
    <>
      <PageHeader title={"Your Tasks"} />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 m-4">
        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            taskName={task.taskName}
            dueDate={task.dueDate}
            taskDescription={task.taskDescription}
            status={task.status}
          />
        ))}
      </div>
    </>
  );
};
const TaskCard = ({ taskName, dueDate,taskDescription, status }) => {
  // define task status color based on status prop
  let statusColor = "bg-yellow-500";
  switch (status) {
    case "completed":
      statusColor = "bg-green-500";
      break;
    case "pending":
      statusColor = "bg-yellow-500";
      break;
    case "todo":
      statusColor = "bg-red-500";
      break;
    default:
      break;
  }

  return (
    <>
      <div className="max-w-sm rounded overflow-hidden shadow-lg cursor-pointer">
        <div className="px-6 py-4 space-y-2">
          <div className="font-bold text-xl mb-2">{taskName}</div>
          <p className="text-gray-700 text-base font-semibold">{dueDate}</p>
          <p className="text-gray-700 text-base">{taskDescription}</p>
        </div>
        <div className={`bg-gray-200 px-6 py-4 ${statusColor}`}>
          <p className="text-white font-bold text-base">
            {status.toUpperCase()}
          </p>
        </div>
      </div>
    </>
  );
};
export default MyTask;
