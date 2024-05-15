import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MessageRoundedIcon from "@mui/icons-material/MessageRounded";
import { useNavigate } from "react-router-dom";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { useState } from "react";
import Brightness1TwoToneIcon from '@mui/icons-material/Brightness1TwoTone';
import {socket} from '../dependencies/socketConnection'

const drawerWidth = 300;

export default function PermanentDrawerLeft({ setModalOpen }): JSX.Element {
  const navigate = useNavigate();
  const [onlineUsers, setOnlineUsers] = useState<string[]>(JSON.parse(localStorage.getItem("onlineUsers") || "[]"));
  socket.on("online", (users : string[]) => {
    localStorage.setItem("onlineUsers", JSON.stringify(users.filter((user) => user != socket.id)));
    setOnlineUsers(users.filter((user) => user != socket.id));
  });
  return (
    <Box sx={{ display: "flex"}}>
      <CssBaseline />
      <Drawer
        sx={{
          // width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Toolbar />
        <Divider />
        <List>
          <ListItem key={"Chat"} disablePadding>
            <ListItemButton
              onClick={() => {
                navigate("/chat");
              }}
            >
              <ListItemIcon>
                <MessageRoundedIcon sx={{ color: "#1976d2" }} />
              </ListItemIcon>
              <ListItemText primary={"Chat"} />
            </ListItemButton>
          </ListItem>
          <ListItem key={"AddItem"} disablePadding>
            <ListItemButton
              onClick={() => {
                setModalOpen(true);
              }}
            >
              <ListItemIcon>
                <AddCircleIcon sx={{ color: "#1976d2" }} />
              </ListItemIcon>
              <ListItemText primary={"Add Item"} />
            </ListItemButton>
          </ListItem>
          <div className="m-4 text-xl" >Online Users</div>
          {onlineUsers.map((user) => {
            return (
              <ListItem key={user} disablePadding>
                <ListItemButton
                  onClick={() => {
                    sessionStorage.setItem("friendId", user);
                    navigate("/chat");
                  }}
                >
                  <ListItemIcon>
                    <Brightness1TwoToneIcon sx={{ color: "#56f218" }} />
                  </ListItemIcon>
                  <ListItemText primary={user} />
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
      </Drawer>
    </Box>
  );
}
