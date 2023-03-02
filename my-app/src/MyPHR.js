import { useState, useEffect } from 'react';
import axios from 'axios';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import CircularProgress from '@mui/material/CircularProgress';
import InputAdornment from '@mui/material/InputAdornment';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';

import PersonIcon from '@mui/icons-material/Person';
import BloodtypeIcon from '@mui/icons-material/Bloodtype';
import HeightIcon from '@mui/icons-material/Height';
import MonitorWeightIcon from '@mui/icons-material/MonitorWeight';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import ContactEmergencyIcon from '@mui/icons-material/ContactEmergency';
import LocalPharmacyIcon from '@mui/icons-material/LocalPharmacy';

import DynamicTable from './DynamicTable'

const bloodTyes = ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'];
const chronicTableColumns = [
  { field: 'name', headerName: 'Name', width: 180, editable: true },
  {
      field: 'startDate',
      headerName: 'Start Date',
      type: 'date',
      width: 100,
      editable: true,
  },
  {
      field: 'endDate',
      headerName: 'End Date',
      type: 'date',
      width: 100,
      editable: true,
  },
  { field: 'physician', headerName: 'Physician', width: 150, editable: true },
  { field: 'notes', headerName: 'Treatment Notes', width: 200, editable: true },
]
const medicationTableColumns = [
  { field: 'name', headerName: 'Name', width: 180, editable: true },
  {
      field: 'startDate',
      headerName: 'Start Date',
      type: 'date',
      width: 100,
      editable: true,
  },
  {
      field: 'endDate',
      headerName: 'End Date',
      type: 'date',
      width: 100,
      editable: true,
  },
  { field: 'dosage', headerName: 'Dosage/Frequency', width: 150, editable: true },
  { field: 'purpose', headerName: 'Purpose', width: 200, editable: true },
]

const MyPHR = (props) => {
  const [isLoading, setLoading] = useState(true); // Loading state
  
  // PHR attributes
  const [fname, setFname] = useState();
  const [lname, setLname] = useState();
  const [birthday, setBirthday] = useState(null);
  const [bloodType, setBloodType] = useState();
  const [height, setHeight] = useState();
  const [weight, setWeight] = useState();
  const [email, setEmail] = useState();
  const [phoneNumber, setPhoneNumber] = useState();
  const [emergencyContactName, setEmergencyContactName] = useState();
  const [emergencyContactNumber, setEmergencyContactNumber] = useState();
  const [primaryDoctor, setPrimaryDoctor] = useState();
  const [primaryDoctorNumber, setPrimaryDoctorNumber] = useState();
  const [pharmacy, setPharmacy] = useState();
  const [chronicConds, setchronicConds] = useState([]);
  const [medications, setMedications] = useState([]);

  // fetch user data
  useEffect(() => {
    setTimeout(() => { // simulate a delay
      axios({
        method: "POST",
        url: "/profile",
        headers: {
          Authorization: 'Bearer ' + props.token
        },
        data:{
          id: props.id
        }
      })
        .then((response) => {
          setFname(response.data.fname)
          setLname(response.data.lname)
          setLoading(false);
          // TODO: set rest of PHR attributes
          console.log(response.data.lname)
        }).catch((error) => {
          if (error.response) {
            console.log(error.response)
            console.log(error.response.status)
            console.log(error.response.headers)
          }
        });
      }, 3000);
    }, []);
    
  // show loading screen while user data is fetched
  if (isLoading) {
    return (
      <Box m="auto" align="center" sx={{ width: 3/4, height: 3/4 }}>
        <CircularProgress color="secondary" />
      </Box>
    );
  }

  function savePHR(event) {
    axios({
      method: "POST",
      url:"/updatePHR",
      data:{
        id: props.id,
        fname: fname,
        lname: lname,
        birth: birthday,
        bT: bloodType,
        height: height,
        weight: weight,
        email: email,
        num: phoneNumber,
        ecName: emergencyContactName,
        ecNum: emergencyContactNumber,
        doctor: primaryDoctor,
        doctorNum: primaryDoctorNumber,
        pharmacy: pharmacy,
        condList: chronicConds,
        medList: medications
      }
    })
    .then((response) => {
        window.location.href = '/';
    }).catch((error) => {
        if (error.response) {
            console.log(error.response)
            console.log(error.response.status)
            console.log(error.response.headers)
        }
    })

    event.preventDefault()
  }

  return (
    <Box m="auto" align="center" component="form" sx={{width: 3/4}}>
      <Typography variant="h4" gutterBottom sx={{ mt: 5, mb: 5 }}> Your Personal Health Record </Typography>
      
      <Grid container justifyContent="space-evenly" alignItems="center" spacing={4}>
        <Grid item xs={8} sm={6} md={4} lg={3}>
          <TextField
            label="First Name"
            defaultValue={fname}
            InputProps={{
              readOnly: true,
              startAdornment: (
                <InputAdornment position="start">
                  <PersonIcon />
                </InputAdornment>
              ),
            }}
            variant="standard" />
        </Grid>

        <Grid item xs={8} sm={6} md={4} lg={3}>
        <TextField
            label="Last Name"
            defaultValue={lname}
            InputProps={{
              readOnly: true,
              startAdornment: (
                <InputAdornment position="start">
                  <PersonIcon />
                </InputAdornment>
              ),
            }}
            variant="standard" />
        </Grid>

        <Grid item xs={8} sm={6} md={4} lg={3}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              // disableFuture="true"
              label="Birthday"
              value={birthday}
              onChange={(newValue) => {
                setBirthday(newValue);
                console.log(newValue.format('MM/DD/YYYY'));
              }}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
        </Grid>

        <Grid item xs={8} sm={6} md={4} lg={3}>
          <TextField
            label="Height"
            value={height}
            onChange={(event) => setHeight(event.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <HeightIcon />
                </InputAdornment>
              ),
            }}
          ></TextField>
        </Grid>

        <Grid item xs={8} sm={6} md={4} lg={3}>
          <TextField
            label="Weight"
            value={weight}
            onChange={(event) => setWeight(event.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <MonitorWeightIcon />
                </InputAdornment>
              ),
            }}
          ></TextField>
        </Grid>

        <Grid item xs={8} sm={6} md={4} lg={3}>
          <TextField
            select
            label="Blood Type"
            value={bloodType ?? "A-"}
            onChange={(event) => setBloodType(event.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <BloodtypeIcon />
                </InputAdornment>
              ),
            }}
          >
            {bloodTyes.map((option) => (
              <MenuItem key={option} value={option} >
                {option}
              </MenuItem>
            ))}
          </TextField>
        </Grid>

        <Grid item xs={8} sm={6} md={4} lg={3}>
          <TextField
            label="Email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <EmailIcon />
                </InputAdornment>
              ),
            }}
          ></TextField>
        </Grid>

        <Grid item xs={8} sm={6} md={4} lg={3}>
          <TextField
            label="Phone Number"
            value={phoneNumber}
            onChange={(event) => setPhoneNumber(event.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PhoneIcon />
                </InputAdornment>
              ),
            }}
          ></TextField>
        </Grid>

        <Grid item xs={8} sm={6} md={4} lg={3}>
          <TextField
            label="Emergency Contact Name"
            value={emergencyContactName}
            onChange={(event) => setEmergencyContactName(event.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <ContactEmergencyIcon />
                </InputAdornment>
              ),
            }}
          ></TextField>
        </Grid>

        <Grid item xs={8} sm={6} md={4} lg={3}>
          <TextField
            label="Emergency Contact Phone #"
            value={emergencyContactNumber}
            onChange={(event) => setEmergencyContactNumber(event.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PhoneIcon />
                </InputAdornment>
              ),
            }}
          ></TextField>
        </Grid>

        <Grid item xs={8} sm={6} md={4} lg={3}>
          <TextField
            label="Primary Doctor"
            value={primaryDoctor}
            onChange={(event) => setPrimaryDoctor(event.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PersonIcon />
                </InputAdornment>
              ),
            }}
          ></TextField>
        </Grid>
        
        <Grid item xs={8} sm={6} md={4} lg={3}>
          <TextField
            label="Primary Doctor Phone #"
            value={primaryDoctorNumber}
            onChange={(event) => setPrimaryDoctorNumber(event.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PhoneIcon />
                </InputAdornment>
              ),
            }}
          ></TextField>
        </Grid>

        <Grid item xs={8} sm={6} md={4} lg={3}>
          <TextField
            label="Pharmacy"
            value={pharmacy}
            onChange={(event) => setPharmacy(event.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LocalPharmacyIcon />
                </InputAdornment>
              ),
            }}
          ></TextField>
        </Grid>

        <Grid item xs={12}>
          <Typography variant="h5" align="left" gutterBottom>Chronic Conditions</Typography>
          <DynamicTable rows={chronicConds} setRows={setchronicConds} columns={chronicTableColumns} />
        </Grid>

        <Grid item xs={12}>
          <Typography variant="h5" align="left" gutterBottom>Medications</Typography>
          <DynamicTable rows={medications} setRows={setMedications} columns={medicationTableColumns} />
        </Grid>
                
      </Grid>

      <Button variant="contained" sx={{m:3}} onClick={savePHR}>Save</Button>

      
      </Box>
  );
}

export default MyPHR;
