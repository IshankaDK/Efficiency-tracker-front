import axios from "axios";
import { useSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import { baseURL } from "../../apiURL";
import PageHeader from "../PageHeader";

const SubmitTask = () => {
  const [tasks, setTasks] = useState([]);
  const [taskDetails, setTaskDetails] = useState({});
  const [info, setInfo] = useState(null);
  const [files, setFiles] = useState(null);

  useEffect(() => {
    getCompleteTasks();
  }, []);

  const getCompleteTasks = async () => {
    await axios
      .get(`${baseURL}/task/find_by_status`, {
        params: {
          user: localStorage.getItem("user"),
        },
      })
      .then((res) => {
        console.log(res);
        setTasks(res.data);
      })
      .catch((err) => console.log(err));
  };

  const fetchTaskById = async (id) => {
    console.log(id);
    try {
      const response = await axios.get(`${baseURL}/task/find_by_id`, {
        params: {
          id: id,
        },
      });
      console.log(response);
      setTaskDetails(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const { enqueueSnackbar } = useSnackbar();
  const submitInfo = () => {
    axios
      .put(`${baseURL}/task/additional_info`, {
        id: taskDetails._id,
        info: info,
        submittedFiles:files
      })
      .then((response) => {
        console.log(response);
        enqueueSnackbar("Submitted.!", {
          variant: "success",
        });
        getCompleteTasks()
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <>
      <PageHeader title={"Submit Task"} />
      <div className="max-w-md mx-auto flex flex-col space-y-4 mt-8">
        <div className="flex flex-col space-y-2">
          <label htmlFor="task" className="text-lg font-medium">
            Select Task
          </label>
          <select
            id="task"
            name="task"
            className="border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            onChange={(e) => {
              fetchTaskById(e.target.value);
            }}
          >
            <option value="">Select a task</option>
            {tasks.map((task) => (
              <option value={task._id} key={task._id}>
                {task.taskName}
              </option>
            ))}
          </select>
        </div>

        {/* Task details section */}
        <div className="flex flex-col space-y-2">
          <p className="text-lg font-medium">Task Details:</p>
          <p className="text-gray-600">
            Task Name: <strong>{taskDetails.taskName}</strong>
          </p>
          <p className="text-gray-600">
            Description: <strong>{taskDetails.desc}</strong>
          </p>
          <p className="text-gray-600">
            Submission Date: <strong>{taskDetails.submissionDate}</strong>
          </p>
          <p className="text-gray-600">
            Task Status:{" "}
            <strong>
              {taskDetails.isTaskComplete ? "Completed" : "Not Completed"}
            </strong>
          </p>
        </div>
        <div className="flex flex-col space-y-2">
          <label htmlFor="info" className="text-lg font-medium">
            Your files
          </label>
          <input
            id="files"
            name="files"
            className="border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            onChange={(e) => setFiles(e.target.value)}
            placeholder="Upload your files to a cloud storage and paste the link here"
            
          />
        </div>
        <div className="flex flex-col space-y-2">
          <label htmlFor="info" className="text-lg font-medium">
            Additional Information
          </label>
          <textarea
            id="info"
            name="info"
            rows="3"
            className="border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            onChange={(e) => setInfo(e.target.value)}
          ></textarea>
        </div>

        <button
          onClick={() => {
            submitInfo();
          }}
          className="bg-blue-500 text-white py-2 px-4 rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Submit
        </button>
      </div>
    </>
  );
};

export default SubmitTask;
