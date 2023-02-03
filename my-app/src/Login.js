import * as React from 'react';
import { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety';
import axios from 'axios';
import { Navigate } from 'react-router-dom';

const theme = createTheme({
    palette: {
        mode: 'light',
        primary: {
        main: '#2c59a2',
        },
        secondary: {
        main: '#a2752c',
        },
    },
});

const Login = (props) => {
    const [authenticated, setauthenticated] = useState(localStorage.getItem(localStorage.getItem("authenticated")|| false));
    const [loginForm, setloginForm] = useState({
        email: "",
        password: ""
    })

    function handleSubmit(event) {
        axios({
            method: "POST",
            url:"/token",
            data:{
                email: event.target.email.value,
                password: event.target.password.value
            }
        })
        .then((response) => {
            props.setToken(response.data.access_token)
            setauthenticated(true)
            localStorage.setItem("authenticated", true)
        }).catch((error) => {
            if (error.response) {
                console.log(error.response)
                console.log(error.response.status)
                console.log(error.response.headers)
            }
        })

        setloginForm(({
            email: "",
            password: ""}))
    
        event.preventDefault()
        return <Navigate replace to="/dashboard" />;
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
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
                        <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        />
                        <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        />
                        <FormControlLabel
                        control={<Checkbox value="remember" color="primary" />}
                        label="Remember me"
                        />
                        <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                        >
                            Sign In
                        </Button>
                        <Grid container>
                            <Grid item xs></Grid>
                            <Grid item>
                                <Link href="/signup" variant="body2">
                                {"Don't have an account? Sign Up"}
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}

export default Login;