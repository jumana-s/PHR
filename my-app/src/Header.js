import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import HealthAndSafetyIcon from "@mui/icons-material/HealthAndSafety";
import axios from "axios";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import { API_URL } from "./lists";

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

const Header = (props) => {
  function logMeOut() {
    axios({
      method: "POST",
      url: `${API_URL}/logout`,
    })
      .then((response) => {
        props.removeToken();
        props.removeId();
        window.location.href = "/";
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response);
          console.log(error.response.status);
          console.log(error.response.headers);
        }
      });
  }

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
            <Button color="inherit" variant="outlined" onClick={logMeOut}>
              Logout
            </Button>
          </Toolbar>
        </AppBar>
      </Box>
    </ThemeProvider>
  );
};

export default Header;
