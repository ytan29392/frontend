// 


import React, { useState, useEffect } from "react";
import Sidebar from "./components/Layout/Sidebar";
import Topbar from "./components/Layout/Topbar";
import HomePage from "./pages/HomePage";
import DashboardPage from "./pages/DashboardPage";
import HistoryPage from "./pages/HistoryPage";
import notificationApi from "./api/notificationApi";
import alarmApi from "./api/alarmApi"; // make sure this exists
import NotificationPopup from "./components/NotificationPopup";
import AnalyticsPage from "./pages/AnalyticsPage"; // make sure this exists

export default function App() {
  const [page, setPage] = useState("home");
  const [notification, setNotification] = useState(null);

  // Request notification permission once
  useEffect(() => {
    if ("Notification" in window) {
      Notification.requestPermission();
    }
  }, []);

  // Poll notifications every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      notificationApi.fetch().then((res) => {
        const { triggered, missed } = res.data;

        if (triggered.length > 0) {
          const n = triggered[0];
          showBrowserNotification(
            "Learning Session Started",
            `Subtask #${n.subtask_id} is ready.`
          );
          setNotification({
            type: "start",
            message: `Learning session for Subtask #${n.subtask_id} has started.`,
            alarmId: n.alarm_id, // assuming this exists
          });
        }

        if (missed.length > 0) {
          const n = missed[0];
          showBrowserNotification(
            "Missed Learning Session",
            `You missed Subtask #${n.subtask_id}. Please reschedule.`
          );
          setNotification({
            type: "missed",
            message: `You missed Subtask #${n.subtask_id}. Please reschedule.`,
            alarmId: n.alarm_id,
          });
        }
      });
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const showBrowserNotification = (title, body) => {
    if (Notification.permission === "granted") {
      new Notification(title, { body });
    }
  };

  return (
    <div style={{ display: "flex" }}>
      <Topbar />
      <Sidebar onNavigate={setPage} />

      <main style={{ marginLeft: 260, marginTop: 80, width: "100%" }}>
        {page === "home" && <HomePage />}
        {page === "dashboard" && <DashboardPage />}
        {page === "history" && <HistoryPage />}
        {page === "analytics" && <AnalyticsPage />}
      </main>

      <NotificationPopup
        open={Boolean(notification)}
        type={notification?.type}
        message={notification?.message}
        onClose={() => setNotification(null)}
        onReschedule={(newTime) => {
          // call backend
          alarmApi.updateAlarm(notification.alarmId, {
            trigger_time: newTime,
            reschedule_prompted: false,
          });
          setNotification(null);
        }}
      />
    </div>
  );
}
