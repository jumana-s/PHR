import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import HealthAndSafetyIcon from "@mui/icons-material/HealthAndSafety";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import { useNavigate } from "react-router-dom";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#2c59a2",
    },
    secondary: {
      main: "#a2752c",
    },
  },
});

const Home = () => {
  let navigate = useNavigate();
  const routeChangeLogin = () => {
    let path = "/login";
    navigate(path);
  };

  const routeChangeSignup = () => {
    let path = "/signup";
    navigate(path);
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ flexGrow: 2 }}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <HealthAndSafetyIcon />
            </IconButton>
            <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
              PHR System
            </Typography>
          </Toolbar>
        </AppBar>
      </Box>

      <main>
        <Box
          sx={{
            bgcolor: "background.paper",
            pt: 16,
            pb: 6,
          }}
        >
          <Container maxWidth="sm">
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="text.primary"
              gutterBottom
            >
              Personal Health Record (PHR)
            </Typography>
            <Typography
              variant="h5"
              align="center"
              color="text.secondary"
              paragraph
            >
              An application for managing your Personal Health Record. You can
              edit this PHR and add attributes of users allowed to access this
              private information.
            </Typography>
            <Stack
              sx={{ pt: 4 }}
              direction="row"
              spacing={2}
              justifyContent="center"
            >
              <Button variant="contained" onClick={routeChangeLogin}>
                Login
              </Button>
              <Button variant="outlined" onClick={routeChangeSignup}>
                Register
              </Button>
            </Stack>
          </Container>
        </Box>
      </main>
    </ThemeProvider>
  );
};

export default Home;
