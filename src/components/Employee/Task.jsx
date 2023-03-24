import React, { useRef, useState } from "react";
import { Dialog, DialogTitle, DialogContent, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { Link } from "react-router-dom";
import axios from "axios";
import { baseURL } from "../../apiURL";
import { useSnackbar } from "notistack";

const Task = ({
  task,
  open,
  handleClose,
  getAllTasks,
  startTimer,
  pauseTimer,
  continueTimer,
  stopTimer,
  timerCount,
  status,
}) => {
  const { enqueueSnackbar } = useSnackbar();

  const [openCamera, setOpenCamera] = useState(false);

  function getFormattedDate() {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");
    const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    return formattedDate;
  }

  const taskStart = async () => {
    await axios
      .post(`${baseURL}/task/start`, {
        id: task._id,
        startTime: getFormattedDate(),
      })
      .then((res) => {
        if (res.status === 200) {
          enqueueSnackbar("Task started.", {
            variant: "success",
          });
          startTimer();
          getAllTasks();
        }
      })
      .catch((err) => {
        enqueueSnackbar("Try again", {
          variant: "error",
        });
        console.log(err.response);
        getAllTasks();
      });
  };
  const taskPause = async () => {
    await axios
      .post(`${baseURL}/task/pause`, {
        id: task._id,
        pauseTime: getFormattedDate(),
      })
      .then((res) => {
        if (res.status === 200) {
          enqueueSnackbar("Task paused.", {
            variant: "success",
          });
          pauseTimer();
          getAllTasks();
        }
      })
      .catch((err) => {
        enqueueSnackbar("Try again", {
          variant: "error",
        });
        console.log(err.response);
        getAllTasks();
      });
  };
  const continueTask = async () => {
    await axios
      .post(`${baseURL}/task/start_pause`, {
        id: task._id,
        startTime: getFormattedDate(),
      })
      .then((res) => {
        if (res.status === 200) {
          enqueueSnackbar("Task start again.", {
            variant: "success",
          });
          continueTimer();
          getAllTasks();
        }
      })
      .catch((err) => {
        enqueueSnackbar("Try again", {
          variant: "error",
        });
        console.log(err.response);
        getAllTasks();
      });
  };

  const stopTask = async () => {
    await axios
      .post(`${baseURL}/task/end`, {
        id: task._id,
        endTime: getFormattedDate(),
      })
      .then((res) => {
        if (res.status === 200) {
          enqueueSnackbar("Task stopped.", {
            variant: "success",
          });
          stopTimer();
          getAllTasks();
        }
      })
      .catch((err) => {
        enqueueSnackbar("Try again", {
          variant: "error",
        });
        console.log(err.response);
        getAllTasks();
      });
  };
  return (
    <Dialog open={open} onClose={handleClose} fullWidth>
      <DialogTitle id="alert-dialog-title">
        <span className="font-bold">{task.taskName}</span>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent className="w-full">
        <div className="w-full mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
          <div
            className="flex items-center justify-start bg-gray-200 h-auto w-full gap-4 py-4
            "
          >
            <img
              className="h-24 w-24 rounded-full object-cover"
              src={`https://picsum.photos/id/1/150`}
              alt="Task"
            />
            <div>
              {" "}
              <p className="text-gray-700 text-xl mb-2">{task.desc}</p>
              <p className="text-gray-900 text-xl font-medium mb-2">
                Due: {task.submissionDate}
              </p>
            </div>
          </div>
          <div className="p-4">
            {task.attachment && (
              <Link
                to={task.path_to_file + task.attachment}
                className="text-blue-500 hover:underline"
                target={"_blank"}
                download
              >
                Download Attachment
              </Link>
            )}
            <Timer timerCount={timerCount} />
            <div>
              <span>Task status : </span>
              <span className="font-semibold">{status.toUpperCase()}</span>
            </div>
            <div className="flex justify-between mt-4">
              {!task.isTaskStart ? (
                <button
                  onClick={() => {
                    taskStart();
                  }}
                  disabled={task.isTaskComplete || task.isTaskStart}
                  className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded cursor-pointer"
                >
                  Start
                </button>
              ) : (
                <button
                  onClick={() => {
                    continueTask();
                  }}
                  disabled={
                    task.isTaskComplete || (task.isTaskStart && !task.isPause)
                  }
                  className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded cursor-pointer"
                >
                  Continue
                </button>
              )}
              <button
                onClick={() => {
                  setOpenCamera(true);
                  taskPause();
                }}
                disabled={task.isTaskComplete || task.isPause}
                className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded cursor-pointer"
              >
                Pause
              </button>
              <button
                onClick={() => stopTask()}
                disabled={task.isTaskComplete}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded cursor-pointer"
              >
                Stop
              </button>
            </div>
          </div>
          {openCamera && open  ? (
            <Webcam openCamera={openCamera} closeCamera={setOpenCamera} />
          ) : (
            false
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default Task;

const Webcam = () => {
  const videoRef = useRef();
  const canvasRef = useRef();
  const [photo, setPhoto] = useState(null);

  const handleCaptureClick = () => {
    const canvas = canvasRef.current;
    const video = videoRef.current;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    const dataUrl = canvas.toDataURL();
    setPhoto(dataUrl);
    const stream = video.srcObject;
    const tracks = stream.getTracks();
    tracks.forEach((track) => {
      track.stop();
    });
  };

  navigator.mediaDevices
    .getUserMedia({ video: true })
    .then((stream) => {
      videoRef.current.srcObject = stream;
      videoRef.current.play();
    })
    .catch((err) => console.error(err));

  return (
    <div className="flex flex-col justify-center items-center gap-2">
  
        <video ref={videoRef} />
        <canvas ref={canvasRef} style={{ display: "none" }} />
        <button
          className="bg-blue-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded cursor-pointer"
          onClick={handleCaptureClick}
        >
          Capture
        </button>
        {photo && (
          <>
            <img src={photo} />
            <button
              className="bg-blue-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded cursor-pointer"
              onClick={()=>console.log("call modal here")}
            >
              Send
            </button>
          </>
        )}
    </div>
  );
};

const Timer = ({ timerCount }) => {
  return (
    <div>
      <span>Time spent : </span>
      <span className="font-semibold">{timerCount}</span>
    </div>
  );
};
