import React, { useEffect, useState } from "react";
import { Bar, Line, Pie } from "react-chartjs-2";
import analyticsApi from "../api/analyticsApi";
import { Typography, TextField, Button, Box } from "@mui/material";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement, PointElement, LineElement);

export default function AnalyticsPage() {
  const [data, setData] = useState([]);
  const [year, setYear] = useState(new Date().getFullYear());

  const loadData = () => {
    analyticsApi.monthlySummary(year).then(res => setData(res.data));
  };

  useEffect(() => {
    loadData();
  }, []);

  const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  const labels = data.map(d => months[d.month - 1]);
  const completedCounts = data.map(d => d.completed_count);
  const totalMinutes = data.map(d => d.total_minutes);

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" gutterBottom>Learning Analytics</Typography>

      <Box sx={{ mb: 2 }}>
        <TextField label="Year" value={year} onChange={(e)=>setYear(e.target.value)} sx={{ mr:2 }} />
        <Button variant="contained" onClick={loadData}>Load</Button>
      </Box>

      <Typography variant="h6">Monthly Completed Sessions</Typography>
      <Bar
        data={{
          labels: labels,
          datasets: [{ label: "Completed Sessions", data: completedCounts, backgroundColor: "#4CAF50" }]
        }}
        options={{ responsive: true, plugins: { legend: { display: true } } }}
      />

      <Typography variant="h6" sx={{ mt:3 }}>Total Time Spent (minutes)</Typography>
      <Line
        data={{
          labels: labels,
          datasets: [{ label: "Time Spent", data: totalMinutes, borderColor: "#2196F3", backgroundColor: "#2196F3" }]
        }}
        options={{ responsive: true, plugins: { legend: { display: true } } }}
      />

      <Typography variant="h6" sx={{ mt:3 }}>Session Status Distribution</Typography>
      <Pie
        data={{
          labels: ["Done", "In Progress", "To Do", "Overdue"],
          datasets: [{
            label: "Status Distribution",
            data: [completedCounts.reduce((a,b)=>a+b,0), 0, 0, 0],
            backgroundColor: ["#4CAF50","#FF9800","#2196F3","#F44336"]
          }]
        }}
      />
    </Box>
  );
}
