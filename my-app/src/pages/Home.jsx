import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import FormatListBulletedOutlinedIcon from "@mui/icons-material/FormatListBulletedOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Link } from "react-router-dom";

export default function Home() {
  const theme = createTheme();

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <FormatListBulletedOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h4">
            To Do List Application
          </Typography>

          <Typography component="h3" variant="h5" mt={3}>
            What this application offers
          </Typography>
          <Stack spacing={2} mt={5}>
            <Item>Create New ToDos</Item>
            <Item>Update and Change the Status of ToDos</Item>
            <Item>Delete Your Todos</Item>
          </Stack>
          <Link to="/login" style={{ textDecoration: "none", color: "white" }}>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Login to continue
            </Button>
          </Link>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
