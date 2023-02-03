import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';

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

const Dashboard = (props) => {

//   const [profileData, setProfileData] = useState(null)

//   function getData() {
//     axios({
//       method: "GET",
//         url: "/profile",
//         headers: {
//             Authorization: 'Bearer ' + props.token
//         }
//     })
//     .then((response) => {
//         const res =response.data
//         res.access_token && props.setToken(res.access_token)
//         setProfileData(({
//           profile_name: res.name,
//           about_me: res.about}))
//       }).catch((error) => {
//         if (error.response) {
//           console.log(error.response)
//           console.log(error.response.status)
//           console.log(error.response.headers)
//           }
//       })} 

        return (
            <ThemeProvider theme={theme}>
                <Box component="form"  sx={{ mt: 1 }}>
                        <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="text"
                        label="Text"
                        name="text"
                        autoFocus
                        />
                        <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                        >
                            Send Attributes
                        </Button>

                    </Box>
   
            </ThemeProvider>
        );
}

export default Dashboard;