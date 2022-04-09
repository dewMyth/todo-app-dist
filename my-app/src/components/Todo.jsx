import React, { useState } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";

import Badge from "@mui/material/Badge";
import Stack from "@mui/material/Stack";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

import Backdrop from "@mui/material/Backdrop";

import CloseIcon from "@mui/icons-material/Close";

import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

import ListIcon from "@mui/icons-material/List";
import DirectionsRunIcon from "@mui/icons-material/DirectionsRun";
import DoneIcon from "@mui/icons-material/Done";

import { Link } from "react-router-dom";

import Edit from "./Edit";

import axios from "axios";

import "./mobile.css";

const Todo = ({ todo }) => {
  const { user } = useContext(AuthContext);

  const config = {
    headers: { token: `bearer ${user.accessToken}` },
  };

  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleToggle = () => {
    setOpen(!open);
  };

  return (
    <React.Fragment>
      <List
        sx={{
          width: "100%",
          maxWidth: 360,
          bgcolor: "background.paper",
          alignItems: "center",
        }}
      >
        <ListItem>
          <ListItemAvatar>
            <Avatar>
              {todo.status === "Todo" ? <ListIcon /> : ""}
              {todo.status === "On Going" ? <DirectionsRunIcon /> : ""}
              {todo.status === "Done" ? <DoneIcon /> : ""}
              {/* <WorkIcon /> */}
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary={todo.title} secondary={todo.status} />
          <Stack spacing={2} direction="row">
            <Badge color="secondary">
              {/* <Link to={`/edit/${todo._id}`}>
              <EditIcon />
            </Link> */}
              <EditIcon onClick={handleToggle} />
            </Badge>
            <Badge color="secondary">
              <DeleteIcon
                sx={{ color: "red" }}
                onClick={async () => {
                  console.log(todo);
                  await axios.delete(
                    `https://todo-app-dist.azurewebsites.net/api/todo/${user._id}/${todo._id}`,
                    config
                  );
                  window.location.reload();
                }}
              />
            </Badge>
          </Stack>
        </ListItem>
      </List>
      <Backdrop
        id="backdrop"
        sx={{
          backgroundColor: "#fff",
          margin: "100px 300px",
          boxShadow: "0px 0px 7px #000",
          color: "#fff",
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
        open={open}
      >
        <Badge
          color="primary"
          sx={{ backgroundColor: "red", top: "0px", right: "0px" }}
        >
          <CloseIcon sx={{ color: "#fff" }} onClick={handleClose} />
        </Badge>
        <Edit todo={todo} />
      </Backdrop>
    </React.Fragment>
  );
};

export default Todo;
