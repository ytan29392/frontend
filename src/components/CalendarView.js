// import React, { useEffect, useState } from "react";
// import FullCalendar from "@fullcalendar/react";
// import dayGridPlugin from "@fullcalendar/daygrid";
// import timeGridPlugin from "@fullcalendar/timegrid";
// import interactionPlugin from "@fullcalendar/interaction";
// import subtaskApi from "../api/subtaskApi";
// import alarmApi from "../api/alarmApi";
// import statusColors from "../utils/statusColors";
// import { Modal, Box, Typography } from "@mui/material";

// export default function CalendarView() {
//   const [events, setEvents] = useState([]);
//   const [selectedEvent, setSelectedEvent] = useState(null);
//   const [detailModalOpen, setDetailModalOpen] = useState(false);
//   const [selectedSubtaskId, setSelectedSubtaskId] = useState(null);
//   const [selectedAlarmId, setSelectedAlarmId] = useState(null);


//   // Fetch subtasks for the calendar
//   useEffect(() => {
//     loadEvents();
//   }, []);

//   const loadEvents = () => {
//     alarmApi.getTodayAlarms().then((res) => {
//       const alarms = res.data.upcoming_sessions;

//       const formattedEvents = alarms.map((a) => ({
//         id: a.subtask_id,
//         title: `Subtask #${a.subtask_id}`,
//         start: a.trigger_time,
//         backgroundColor: statusColors["To Do"], // default
//         borderColor: statusColors["To Do"],
//         extendedProps: {
//           alarmId: a.alarm_id,
//           subtaskId: a.subtask_id,
//         },
//       }));

//       setEvents(formattedEvents);
//     });
//   };

//   // Handle click on event
//   const handleEventClick = (info) => {
//     const event = info.event;
//     setSelectedEvent({
//       id: event.id,
//       title: event.title,
//       start: event.start,
//       alarmId: event.extendedProps.alarmId,
//       subtaskId: event.extendedProps.subtaskId
//     });

//     const handleEventClick = (info) => {
//       setSelectedSubtaskId(info.event.extendedProps.subtaskId);
//       setSelectedAlarmId(info.event.extendedProps.alarmId);
//       setDetailModalOpen(true);
//     };

//   };

//   // Handle drag & drop to reschedule
//   const handleEventDrop = (info) => {
//     const newDate = info.event.start;

//     // Call backend to update alarm's trigger_time
//     alarmApi.updateAlarm(info.event.extendedProps.alarmId, {
//       trigger_time: newDate
//     });

//     loadEvents();
//   };

//   return (
//     <>
//       <FullCalendar
//         plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
//         initialView="timeGridWeek"
//         editable={true}
//         selectable={true}
//         events={events}
//         eventClick={handleEventClick}
//         eventDrop={handleEventDrop}
//         height="90vh"
//       />
//       <SubtaskDetailModal
//         open={detailModalOpen}
//         subtaskId={selectedSubtaskId}
//         alarmId={selectedAlarmId}
//         onClose={() => setDetailModalOpen(false)}
//          onUpdated={() => loadEvents()}
//        />


//       {/* Modal for event details */}
//       <Modal
//         open={Boolean(selectedEvent)}
//         onClose={() => setSelectedEvent(null)}
//       >
//         <Box
//           sx={{
//             backgroundColor: "white",
//             padding: 3,
//             width: 400,
//             margin: "150px auto",
//             borderRadius: 2
//           }}
//         >
//           <Typography variant="h6">Schedule Details</Typography>
//           {selectedEvent && (
//             <>
//               <p><strong>Title:</strong> {selectedEvent.title}</p>
//               <p><strong>Start:</strong> {selectedEvent.start.toString()}</p>
//               <p><strong>Subtask ID:</strong> {selectedEvent.subtaskId}</p>
//               <p><strong>Alarm ID:</strong> {selectedEvent.alarmId}</p>
//               <p>More details coming (notes, objectives)...</p>
//             </>
//           )}
//         </Box>
//       </Modal>
//     </>
//   );
// }


import React, { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import subtaskApi from "../api/subtaskApi";
import alarmApi from "../api/alarmApi";
import statusColors from "../utils/statusColors";
import { Modal, Box, Typography } from "@mui/material";
import SubtaskDetailModal from "./SubtaskDetailModal"; // Make sure this exists

export default function CalendarView() {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [detailModalOpen, setDetailModalOpen] = useState(false);
  const [selectedSubtaskId, setSelectedSubtaskId] = useState(null);
  const [selectedAlarmId, setSelectedAlarmId] = useState(null);

  // Fetch subtasks for the calendar
  useEffect(() => {
    loadEvents();
  }, []);

  const loadEvents = () => {
    alarmApi.getTodayAlarms().then((res) => {
      const alarms = res.data.upcoming_sessions;

      const formattedEvents = alarms.map((a) => ({
        id: a.subtask_id,
        title: `Subtask #${a.subtask_id}`,
        start: a.trigger_time,
        backgroundColor: statusColors["To Do"], // default
        borderColor: statusColors["To Do"],
        extendedProps: {
          alarmId: a.alarm_id,
          subtaskId: a.subtask_id,
        },
      }));

      setEvents(formattedEvents);
    });
  };

  // Handle click on event
  const handleEventClick = (info) => {
    setSelectedSubtaskId(info.event.extendedProps.subtaskId);
    setSelectedAlarmId(info.event.extendedProps.alarmId);
    setSelectedEvent({
      id: info.event.id,
      title: info.event.title,
      start: info.event.start,
      alarmId: info.event.extendedProps.alarmId,
      subtaskId: info.event.extendedProps.subtaskId,
    });
    setDetailModalOpen(true);
  };

  // Handle drag & drop to reschedule
  const handleEventDrop = (info) => {
    const newDate = info.event.start;

    // Call backend to update alarm's trigger_time
    alarmApi.updateAlarm(info.event.extendedProps.alarmId, {
      trigger_time: newDate,
    });

    loadEvents();
  };

  return (
    <>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="timeGridWeek"
        editable={true}
        selectable={true}
        events={events}
        eventClick={handleEventClick}
        eventDrop={handleEventDrop}
        height="90vh"
      />

      <SubtaskDetailModal
        open={detailModalOpen}
        subtaskId={selectedSubtaskId}
        alarmId={selectedAlarmId}
        onClose={() => setDetailModalOpen(false)}
        onUpdated={() => loadEvents()}
      />

      {/* Modal for event details */}
      <Modal
        open={Boolean(selectedEvent)}
        onClose={() => setSelectedEvent(null)}
      >
        <Box
          sx={{
            backgroundColor: "white",
            padding: 3,
            width: 400,
            margin: "150px auto",
            borderRadius: 2,
          }}
        >
          <Typography variant="h6">Schedule Details</Typography>
          {selectedEvent && (
            <>
              <p>
                <strong>Title:</strong> {selectedEvent.title}
              </p>
              <p>
                <strong>Start:</strong> {selectedEvent.start.toString()}
              </p>
              <p>
                <strong>Subtask ID:</strong> {selectedEvent.subtaskId}
              </p>
              <p>
                <strong>Alarm ID:</strong> {selectedEvent.alarmId}
              </p>
              <p>More details coming (notes, objectives)...</p>
            </>
          )}
        </Box>
      </Modal>
    </>
  );
}
