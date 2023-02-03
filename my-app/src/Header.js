import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety';
import axios from "axios";

const Header = (props) => {
    function logMeOut() {
        axios({
          method: "POST",
          url:"/logout",
        })
        .then((response) => {
           props.token()
        }).catch((error) => {
          if (error.response) {
            console.log(error.response)
            console.log(error.response.status)
            console.log(error.response.headers)
            }
        })
    }
    
    return (
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
                    <Button color="inherit" onClick={logMeOut}>Logout</Button>
                </Toolbar>
            </AppBar>
        </Box>
    );
}

export default Header;
