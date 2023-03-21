import { Button } from "@mui/material";
import axios from "axios";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { baseURL } from "../../apiURL";
import PageHeader from "../PageHeader";

const CreateTask = () => {
  // define state variables for form fields
  const [employee, setEmployee] = useState("");
  const [taskName, setTaskName] = useState("");
  const [desc, setDesc] = useState("");
  const [attachment, setAttachment] = useState("");
  const [dueDate, setDueDate] = useState("");
  const { enqueueSnackbar } = useSnackbar();

  const createTask = () => {
    const data = {
      userId: employee,
      taskName,
      desc,
      submissionDate: dueDate,
    };
    const formData = new FormData();

    formData.append("data", JSON.stringify(data));
    formData.append("attachment", attachment);
    axios
      .post(`${baseURL}/task/create`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then(
        (res) =>
          res.status == 200 &&
          enqueueSnackbar("Task Created.", {
            variant: "success",
          })
      )
      .catch((err) => enqueueSnackbar("Task Creation Failed with" + err, {
        variant: "error",
      }));
  };

  const [employeeList, setEmployeeList] = useState([]);
  useEffect(() => {
    axios
      .get(`${baseURL}/user`)
      .then((res) => res.data && setEmployeeList(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <PageHeader title={"Create Task"} />
      <div className="max-w-lg mx-auto mt-8">
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
            <option value="" disabled>
              Select an employee
            </option>
            {employeeList.map((val) => (
              <option value={val._id} key={val._id}>
                {val.username}
              </option>
            ))}
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
          <label htmlFor="desc" className="block text-gray-700 font-bold mb-2">
            Task Description
          </label>
          <textarea
            id="desc"
            name="desc"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
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
          <Button onClick={() => createTask()} variant="contained">
            Create Task
          </Button>
        </div>
      </div>
    </>
  );
};

export default CreateTask;
