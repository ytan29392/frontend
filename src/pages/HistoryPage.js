import React, { useEffect, useState } from "react";
import historyApi from "../api/historyApi";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, TextField, Button } from "@mui/material";

export default function HistoryPage() {
  const [subtasks, setSubtasks] = useState([]);
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");

  const loadHistory = () => {
    const m = month ? parseInt(month) : undefined;
    const y = year ? parseInt(year) : undefined;

    historyApi.fetch(m, y).then((res) => setSubtasks(res.data));
  };

  useEffect(() => {
    loadHistory();
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <Typography variant="h4" gutterBottom>Learning History</Typography>

      <div style={{ marginBottom: 20 }}>
        <TextField
          label="Month (1-12)"
          value={month}
          onChange={(e) => setMonth(e.target.value)}
          sx={{ mr: 2 }}
        />
        <TextField
          label="Year (YYYY)"
          value={year}
          onChange={(e) => setYear(e.target.value)}
          sx={{ mr: 2 }}
        />
        <Button variant="contained" onClick={loadHistory}>Filter</Button>
      </div>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Objective</TableCell>
              <TableCell>Notes</TableCell>
              <TableCell>Learned Summary</TableCell>
              <TableCell>Time Spent (min)</TableCell>
              <TableCell>Completed At</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {subtasks.map((s) => (
              <TableRow key={s.id}>
                <TableCell>{s.title}</TableCell>
                <TableCell>{s.objective}</TableCell>
                <TableCell>{s.notes}</TableCell>
                <TableCell>{s.learned_summary}</TableCell>
                <TableCell>{s.time_spent_minutes}</TableCell>
                <TableCell>{new Date(s.completed_at).toLocaleString()}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
