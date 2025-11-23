import React, { useEffect, useState } from "react";
import dashboardApi from "../api/dashboardApi";

export default function DashboardPage() {
  const [summary, setSummary] = useState(null);

  useEffect(() => {
    dashboardApi.summary().then((res) => setSummary(res.data));
  }, []);

  if (!summary) return <p>Loading...</p>;

  return (
    <div style={{ padding: 20 }}>
      <h2>Dashboard</h2>
      <pre>{JSON.stringify(summary, null, 2)}</pre>
    </div>
  );
}
