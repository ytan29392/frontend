import React, { useEffect, useState } from "react";
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  MenuItem,
  LinearProgress
} from "@mui/material";
import subtaskApi from "../api/subtaskApi";
import alarmApi from "../api/alarmApi";

export default function SubtaskDetailModal({ open, subtaskId, alarmId, onClose, onUpdated }) {
  const [subtask, setSubtask] = useState(null);
  const [editNotes, setEditNotes] = useState("");
  const [learned, setLearned] = useState("");

  useEffect(() => {
    if (subtaskId && open) {
      subtaskApi.getOne(subtaskId).then((res) => {
        setSubtask(res.data);
        setEditNotes(res.data.notes || "");
        setLearned(res.data.learned_summary || "");
      });
    }
  }, [subtaskId, open]);

  if (!subtask) return null;

  const handleSave = () => {
    subtaskApi.update(subtaskId, {
      notes: editNotes,
      learned_summary: learned
    }).then(() => {
      onUpdated();
      onClose();
    });
  };

  const handleMarkDone = () => {
    subtaskApi.update(subtaskId, {
      status: "Done",
      learned_summary: learned
    }).then(() => {
      onUpdated();
      onClose();
    });
  };

  const handleReschedule = () => {
    const newTime = prompt("Enter new date/time (YYYY-MM-DD HH:MM):");
    if (newTime) {
      alarmApi.updateAlarm(alarmId, {
        trigger_time: newTime
      }).then(() => {
        onUpdated();
        onClose();
      });
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={{
        backgroundColor: "white",
        padding: 3,
        width: 500,
        margin: "120px auto",
        borderRadius: 3
      }}>
        <Typography variant="h5">{subtask.title}</Typography>

        <Typography sx={{ mt: 2 }}><strong>Description:</strong> {subtask.description}</Typography>
        <Typography sx={{ mt: 1 }}><strong>Objective:</strong> {subtask.objective}</Typography>
        <Typography sx={{ mt: 1 }}><strong>Status:</strong> {subtask.status}</Typography>

        <Typography sx={{ mt: 2 }}>
          <strong>Total Timeline:</strong> {subtask.total_timeline || "Not Set"}
        </Typography>

        <Typography sx={{ mt: 1 }}>
          <strong>Time Spent:</strong> {subtask.time_spent_minutes} min
        </Typography>

        <LinearProgress
          variant="determinate"
          value={subtask.status === "Done" ? 100 : subtask.time_spent_minutes}
          sx={{ mt: 2 }}
        />

        <TextField
          label="Notes"
          multiline
          fullWidth
          rows={3}
          sx={{ mt: 2 }}
          value={editNotes}
          onChange={(e) => setEditNotes(e.target.value)}
        />

        <TextField
          label="What did you learn?"
          multiline
          fullWidth
          rows={3}
          sx={{ mt: 2 }}
          value={learned}
          onChange={(e) => setLearned(e.target.value)}
        />

        <Box sx={{ mt: 3, display: "flex", justifyContent: "space-between" }}>
          <Button variant="outlined" onClick={handleReschedule}>
            Reschedule
          </Button>

          <Button variant="contained" color="primary" onClick={handleSave}>
            Save Notes
          </Button>

          <Button variant="contained" color="success" onClick={handleMarkDone}>
            Mark Done
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}
