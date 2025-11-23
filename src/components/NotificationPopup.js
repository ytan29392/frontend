// import React from "react";
// import { Snackbar, Alert } from "@mui/material";
// import { Button } from "@mui/material";

// export default function NotificationPopup({ open, type, message, onClose }) {
//   return (
//     <Snackbar
//       open={open}
//       autoHideDuration={6000}
//       onClose={onClose}
//       anchorOrigin={{ vertical: "top", horizontal: "right" }}
//     >
//       <Alert
//         onClose={onClose}
//         severity={type === "start" ? "info" : "warning"}
//         sx={{ width: "100%" }}
//       >
//         {message}
//       </Alert>
//     </Snackbar>
//   );
// }


// export default function NotificationPopup({ open, type, message, onClose, onReschedule }) {

// {type === "missed" && (
//   <Button
//     variant="outlined"
//     onClick={() => {
//       const newTime = prompt("Enter new date/time (YYYY-MM-DD HH:MM):");
//       if (newTime) onReschedule(newTime);
//     }}
//   >
//     Reschedule
//   </Button>
// )}



import React from "react";
import { Snackbar, Alert, Button } from "@mui/material";

export default function NotificationPopup({ open, type, message, onClose, onReschedule }) {
  return (
    <Snackbar
      open={open}
      autoHideDuration={6000}
      onClose={onClose}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
    >
      <Alert
        onClose={onClose}
        severity={type === "start" ? "info" : "warning"}
        sx={{ width: "100%" }}
        action={
          type === "missed" ? (
            <Button
              color="inherit"
              size="small"
              onClick={() => {
                const newTime = prompt("Enter new date/time (YYYY-MM-DD HH:MM):");
                if (newTime && typeof onReschedule === "function") onReschedule(newTime);
              }}
            >
              Reschedule
            </Button>
          ) : null
        }
      >
        {message}
      </Alert>
    </Snackbar>
  );
}