import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import Typography from "@mui/material/Typography";

import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

import ListIcon from "@mui/icons-material/List";
import DirectionsRunIcon from "@mui/icons-material/DirectionsRun";
import DoneIcon from "@mui/icons-material/Done";

import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

import axios from "axios";

const Edit = ({ todo }) => {
  const { user } = useContext(AuthContext);

  const handleStatus = (event, newStatus) => {
    setStatus(newStatus);
  };

  const config = {
    headers: { token: `bearer ${user.accessToken}` },
  };

  const handleSubmit = async (e) => {
    console.log(config);
    e.preventDefault();
    const updatedTodo = {
      title: title,
      status: status,
    };
    console.log(updatedTodo);
    try {
      await axios.put(`/api/todo/${user._id}/${todo._id}`, updatedTodo, config);
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  const [title, setTitle] = useState("");
  const [status, setStatus] = useState("");

  useEffect(() => {
    setTitle(todo.title);
    setStatus(todo.status);
  }, [todo._id]);

  const handletitle = (e) => {
    setTitle(e.target.value);
  };

  return (
    <ThemeProvider>
      <Container component="main" maxWidth="lg" style={{ width: "100%" }}>
        <CssBaseline />
        <Box
          sx={{
            marginTop: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h4" sx={{ color: "#000" }}>
            Edit Todo
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="title"
              label="Title"
              name="title"
              value={title}
              onChange={handletitle}
              autoFocus
            />
            <ToggleButtonGroup value={status} exclusive onChange={handleStatus}>
              <ToggleButton value="Todo" aria-label="left aligned">
                <ListIcon />
              </ToggleButton>
              <ToggleButton value="On Going" aria-label="centered">
                <DirectionsRunIcon />
              </ToggleButton>
              <ToggleButton value="Done" aria-label="right aligned">
                <DoneIcon />
              </ToggleButton>
            </ToggleButtonGroup>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Edit Todo
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default Edit;
