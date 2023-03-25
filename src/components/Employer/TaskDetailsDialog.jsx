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

const TaskDetailsDialog = ({ open, onClose, task }) => {
  const [feedback, setFeedback] = useState("");
  const [name, setName] = useState("");

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

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm">
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
          <p>Employee Name: {name}</p>
        </DialogContentText>
        <TextField
          label="Feedback"
          fullWidth
          multiline
          rows={4}
          variant="outlined"
          value={feedback}
          onChange={handleFeedbackChange}
        />
      </DialogContent>
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
    </Dialog>
  );
};

export default TaskDetailsDialog;
