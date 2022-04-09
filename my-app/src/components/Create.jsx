import React, { useState } from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

import ListIcon from "@mui/icons-material/List";
import DirectionsRunIcon from "@mui/icons-material/DirectionsRun";
import DoneIcon from "@mui/icons-material/Done";

import axios from "axios";

const Create = () => {
  const { user } = useContext(AuthContext);

  const config = {
    headers: { token: `bearer ${user.accessToken}` },
  };

  const handleSubmit = async (e) => {
    console.log(config);
    e.preventDefault();
    const newTodo = {
      title: title,
      status: status,
      postedBy: user._id,
    };
    console.log(newTodo);
    try {
      await axios.post(
        "https://todo-app-dist.azurewebsites.net/api/todo/create",
        newTodo,
        config
      );
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  const [title, setTitle] = useState("");
  const [status, setStatus] = useState("");

  const handletitle = (e) => {
    e.preventDefault();
    setTitle(e.target.value);
  };

  const handleStatus = (e, newStatus) => {
    setStatus(newStatus);
  };

  return (
    <ThemeProvider>
      <Container component="main" maxWidth="false" style={{ width: "100%" }}>
        <CssBaseline />
        <Box
          sx={{
            marginTop: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
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
              Create Todo
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default Create;
