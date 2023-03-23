import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import PageHeader from "../PageHeader";
import { baseURL } from "../../apiURL";
import Task from "./Task";

const MyTask = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    getAllTasks();
  }, []);

  const getAllTasks = () => {
    console.log(localStorage.getItem("user"));
    axios
      .get(`${baseURL}/task/find_by_user`, {
        params: { user: localStorage.getItem("user") },
      })
      .then((res) => {
        res.status === 200 && setTasks(res.data), console.log(res.data);
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <PageHeader title={"Your Tasks"} />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 m-4">
        {tasks.map((task) => (
          <TaskCard task={task} key={task._id} getAllTasks={getAllTasks} />
        ))}
      </div>
    </>
  );
};
const TaskCard = ({ task, getAllTasks }) => {
  let statusColor = "bg-gray-500";
  let status = "todo";
  if (task.isTaskStart && !task.isPause) {
    statusColor = "bg-yellow-500";
    status = "in progress";
  } else if (task.isPause) {
    statusColor = "bg-orange-500";
    status = "paused";
  } else if (task.isTaskComplete) {
    statusColor = "bg-green-500";
    status = "completed";
  } else {
    statusColor = "bg-gray-500";
    status = "todo";
  }

  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };

  const [timerCount, setTimerCount] = useState(task.spendTime || 0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const intervalRef = useRef(null);

  useEffect(() => {
    return () => clearInterval(intervalRef.current);
  }, []);

  const startTimer = () => {
    if (!isTimerRunning) {
      setIsTimerRunning(true);
      intervalRef.current = setInterval(() => {
        setTimerCount((prevCount) => prevCount + 1);
      }, 1000);
    }
  };

  const pauseTimer = () => {
    if (isTimerRunning) {
      clearInterval(intervalRef.current);
      setIsTimerRunning(false);
    }
  };

  const continueTimer = () => {
    if (!isTimerRunning) {
      setIsTimerRunning(true);
      intervalRef.current = setInterval(() => {
        setTimerCount((prevCount) => prevCount + 1);
      }, 1000);
    }
  };

  const stopTimer = () => {
    clearInterval(intervalRef.current);
    setIsTimerRunning(false);
    setTimerCount(task.spendTime);
  };

  const formatTime = (time) => {
    const hours = Math.floor(time / 3600)
      .toString()
      .padStart(2, "0");
    const minutes = Math.floor((time % 3600) / 60)
      .toString()
      .padStart(2, "0");
    const seconds = Math.floor(time % 60)
      .toString()
      .padStart(2, "0");
    return `${hours}:${minutes}:${seconds}`;
  };

  return (
    <>
      <div
        className="max-w-sm rounded overflow-hidden shadow-lg cursor-pointer"
        onClick={handleOpen}
      >
        <div className="px-6 py-4 space-y-2">
          <div className="font-bold text-xl mb-2">{task.taskName}</div>
          <p className="text-gray-700 text-base font-semibold">{`Due Date : ${task.submissionDate}`}</p>
          <p className="text-gray-700 text-base overflow-hidden whitespace-nowrap overflow-ellipsis">
            {task.desc}
          </p>
        </div>
        <div className="px-6 py-2 space-y-2">
          <span>Time spent : </span>
          <span className="font-semibold">{formatTime(timerCount)}</span>
        </div>
        <div
          className={`bg-gray-200 px-6 py-4 ${statusColor} relative bottom-0`}
        >
          <p className="text-white font-bold text-base">
            {status.toUpperCase()}
          </p>
        </div>
      </div>
      <Task
        task={task}
        open={open}
        handleClose={handleClose}
        getAllTasks={getAllTasks}
        startTimer={startTimer}
        pauseTimer={pauseTimer}
        continueTimer={continueTimer}
        stopTimer={stopTimer}
        timerCount={formatTime(timerCount)}
        status={status}
      />
    </>
  );
};
export default MyTask;
