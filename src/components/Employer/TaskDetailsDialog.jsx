import { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  TextField,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";
import { baseURL } from "../../apiURL";
import { useSnackbar } from "notistack";
import { Link } from "react-router-dom";

const TaskDetailsDialog = ({ open, onClose, task }) => {
  const [feedback, setFeedback] = useState("");
  const [name, setName] = useState("");
  const { enqueueSnackbar } = useSnackbar();

  const handleFeedbackChange = (e) => {
    setFeedback(e.target.value);
  };

  const getUser = async () => {
    await axios
      .get(`${baseURL}/user/find`, {
        params: { user: task.userId },
      })
      .then((res) => {
        if (res.status == 200) {
          setName(res.data.username);
        }
      })
      .catch((err) => console.log(err));
  };

  const submitFeedback = async () => {
    await axios
      .put(`${baseURL}/task/update_feedback`, {
        id: task._id,
        feedback: feedback,
      })
      .then((res) => {
        if (res.status == 200) {
          enqueueSnackbar("Feedback submitted.", {
            variant: "success",
          });
          onClose();
        }
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getUser();
  }, []);

  let statusColor = "text-gray-500";
  let status = "todo";
  if (task.isTaskStart && !task.isPause) {
    statusColor = "text-yellow-500";
    status = "in progress";
  } else if (task.isPause) {
    statusColor = "text-orange-500";
    status = "paused";
  } else if (task.isTaskComplete) {
    statusColor = "text-green-500";
    status = "completed";
  } else {
    statusColor = "text-gray-500";
    status = "todo";
  }
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
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle id="alert-dialog-title">
        <span className="font-bold">{task.taskName}</span>
        <IconButton
          aria-label="close"
          onClick={onClose}
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
      <DialogContent className="space-y-4">
        <DialogContentText className="space-y-2">
          <p>
            Description: <strong>{task.desc}</strong>
          </p>
          <p>
            Submission Date: <strong>{task.submissionDate}</strong>
          </p>
          <p>
            Status:{" "}
            <strong className={statusColor}>{status.toUpperCase()}</strong>
          </p>
          <p>
            Employee Name: <strong>{name}</strong>
          </p>
          <p>
            Time spend: <strong>{formatTime(task.spendTime)}</strong>
          </p>
          <p>
            Additional Info:{" "}
            <strong>{task.additionalInfo ? task.additionalInfo : "-"}</strong>
          </p>
          {task.submittedFiles && (
            <p>
              Submitted Files:{" "}
              <Link target="_blank" className="font-bold" to={task.submittedFiles}>See Submitted Files</Link>
            </p>
          )}
         {task.feedback && <p>
            Feedback: <strong>{task.feedback}</strong>
          </p>}
        </DialogContentText>
        {task.submitted && task.feedback == null && (
          <TextField
            label="Feedback"
            fullWidth
            multiline
            rows={4}
            variant="outlined"
            value={feedback}
            onChange={handleFeedbackChange}
          />
        )}
      </DialogContent>
      {task.submitted && task.feedback == null && (
        <DialogActions>
          <Button onClick={onClose}>Close</Button>
          <Button
            variant="contained"
            disabled={status !== "completed"}
            onClick={() => {
              submitFeedback(feedback);
              onClose();
            }}
          >
            Submit Feedback
          </Button>
        </DialogActions>
      )}
    </Dialog>
  );
};

export default TaskDetailsDialog;
