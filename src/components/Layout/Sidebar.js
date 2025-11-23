import React from "react";
import { Drawer, List, ListItem, ListItemText } from "@mui/material";

export default function Sidebar({ onNavigate }) {
  return (
    <Drawer variant="permanent" anchor="left">
      <List sx={{ width: 240, mt: 10 }}>
        <ListItem button onClick={() => onNavigate("home")}>
          <ListItemText primary="Home" />
        </ListItem>
        <ListItem button onClick={() => onNavigate("dashboard")}>
          <ListItemText primary="Dashboard" />
        </ListItem>
        <ListItem button onClick={() => onNavigate("history")}>
          <ListItemText primary="History" />
        </ListItem>
        <ListItem button onClick={() => onNavigate("analytics")}>
          <ListItemText primary="Analytics" />
        </ListItem>

      </List>
    </Drawer>
  );
}
