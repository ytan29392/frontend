import React from "react";
import { AppBar, Toolbar, Typography } from "@mui/material";

export default function Topbar() {
  return (
    <AppBar position="fixed">
      <Toolbar>
        <Typography variant="h6">Learning Scheduler</Typography>
      </Toolbar>
    </AppBar>
  );
}
