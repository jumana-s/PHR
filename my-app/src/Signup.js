import * as React from 'react';
import { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import ListItemText from '@mui/material/ListItemText';
import Box from '@mui/material/Box';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety';
import axios from 'axios';


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

const attributes_list = [
    "Hospice",
    "Hospital",
    "Garden City General Hospital",
    "Like Home Hospice",
    "Mineral Hospital",
    "Restful Retreat Hospice",
    "Tiny Oasis Hospice",
    "Horizon Hospital",
    "Admissions",
    "Anesthetics",
    "Burn Center",
    "Cardiology",
    "Coronary Care Unit",
    "Emergency",
    "Gynecology",
    "Neonatal",
    "Oncology",
    "Pharmacy",
    "Urology",
    "Aide",
    "Bereavement Specialist",
    "Chaplain",
    "Dietitian",
    "Doctor",
    "Interpreter",
    "Nurse",
    "Occupational Therapist",
    "Patient Advocate",
    "Pharmacist",
    "Physical Therapist",
    "Physician",
    "Social Worker",
    "Specialist",
    "Speech Pathologist",
    "Volunteer"
]

const Signup = (props) => {
    // const [authenticated, setauthenticated] = useState(localStorage.getItem(localStorage.getItem("authenticated")|| false));
    const [registerForm, setRegisterForm] = useState({
        username: "",
        password: "",
        fname: "",
        lname: ""
    });

    const [attributes, setAttributes] = useState([]);

    const handleAttributes = (event) => {
        const {
          target: { value },
        } = event;
        setAttributes(
          typeof value === 'string' ? value.split(',') : value,
        );
      };


    function handleSubmit(event) {
        axios({
            method: "POST",
            url:"/register",
            data:{
                username: event.target.username.value,
                password: event.target.password.value,
                fname: event.target.fname.value,
                lname: event.target.lname.value,
                attr: attributes
            }
        })
        .then((response) => {
            console.log(response.data.msg)
            window.location.href = '/';
        }).catch((error) => {
            if (error.response) {
                console.log(error.response)
                console.log(error.response.status)
                console.log(error.response.headers)
            }
        })

        setRegisterForm(({
            username: "",
            password: "",
            fname: "",
            lname: ""
        }))
        
        setAttributes([]);
    
        event.preventDefault()
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
                        <PersonAddIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Register
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit}  sx={{ mt: 1 }}> 
                        <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="username"
                        label="Username"
                        name="username"
                        autoComplete="username"
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
                        <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="fname"
                        label="First Name"
                        name="fname"
                        autoFocus
                        />
                        <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="lname"
                        label="Last Name"
                        name="lname"
                        autoFocus
                        />

                        <InputLabel id="attr-label">Attributes</InputLabel>
                        <Select
                        labelId="attr-label"
                        id="attr-checkbox"
                        multiple
                        value={attributes}
                        onChange={handleAttributes}
                        input={<OutlinedInput label="Attributes" />}
                        renderValue={(selected) => selected.join(', ')}
                        >
                        {attributes_list.map((attr) => (
                            <MenuItem key={attr} value={attr}>
                            <Checkbox checked={attributes.indexOf(attr) > -1} />
                            <ListItemText primary={attr} />
                            </MenuItem>
                        ))}
                        </Select>
                        
                        <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                        >
                            Create Account
                        </Button>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}

export default Signup;