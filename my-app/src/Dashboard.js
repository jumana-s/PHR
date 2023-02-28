import * as React from 'react';
import { useState } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import DashboardDrawer from './Drawer';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';

import MyPHR from './MyPHR';
import EditAccess from './EditAccess';
import ViewPHRs from './ViewOtherPHR';

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
    const [tab, setTab] = useState('phr');

        return (
            <ThemeProvider theme={theme}>
                <Box sx={{ display: 'flex' }}>
                    <CssBaseline />
                    
                    <DashboardDrawer removeToken={props.removeToken} setTab={setTab} />

                    <Box 
                        component="main"
                        sx={{
                        //   backgroundColor: (theme) =>
                            // theme.palette.mode === 'light'
                            //   ? theme.palette.grey[100]
                            //   : theme.palette.grey[900],
                          flexGrow: 1,
                          height: '100vh',
                          overflow: 'auto',
                        }}
                    >
                        <Toolbar />
                        <Container maxWidth="lg" sx={{ mt: 10, mb: 4 }}>
                            {
                                {
                                    'phr': <MyPHR token={props.token} id={props.id} />,
                                    'access': <EditAccess token={props.token} id={props.id} />,
                                    'other':  <ViewPHRs id={props.id}/>
                                }[tab] 
                            }
                        </Container>

                    </Box>
                </Box>
   
            </ThemeProvider>
        );
}

export default Dashboard;