import { useState, useEffect } from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import CircularProgress from "@mui/material/CircularProgress";
import InputAdornment from "@mui/material/InputAdornment";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { DataGrid } from "@mui/x-data-grid";
import Alert from "@mui/material/Alert";

import PersonIcon from "@mui/icons-material/Person";
import BloodtypeIcon from "@mui/icons-material/Bloodtype";
import HeightIcon from "@mui/icons-material/Height";
import MonitorWeightIcon from "@mui/icons-material/MonitorWeight";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import ContactEmergencyIcon from "@mui/icons-material/ContactEmergency";
import LocalPharmacyIcon from "@mui/icons-material/LocalPharmacy";

const chronicTableColumns = [
  { field: "name", headerName: "Name", width: 180, editable: false },
  {
    field: "startDate",
    headerName: "Start Date",
    type: "date",
    width: 100,
    editable: false,
  },
  {
    field: "endDate",
    headerName: "End Date",
    type: "date",
    width: 100,
    editable: false,
  },
  { field: "physician", headerName: "Physician", width: 150, editable: false },
  {
    field: "notes",
    headerName: "Treatment Notes",
    width: 200,
    editable: false,
  },
];
const medicationTableColumns = [
  { field: "name", headerName: "Name", width: 180 },
  {
    field: "startDate",
    headerName: "Start Date",
    type: "date",
    width: 100,
  },
  {
    field: "endDate",
    headerName: "End Date",
    type: "date",
    width: 100,
  },
  {
    field: "dosage",
    headerName: "Dosage/Frequency",
    width: 150,
  },
  { field: "purpose", headerName: "Purpose", width: 200 },
];

const ViewPHR = (props) => {
  const [isLoading, setLoading] = useState(true); // Loading state

  // PHR attributes
  const [fname, setFname] = useState();
  const [lname, setLname] = useState();
  const [birthday, setBirthday] = useState();
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

  const [errorMessage, setErrorMessage] = useState("");

  // fetch user data
  useEffect(() => {
    setTimeout(() => {
      // simulate a delay
      axios({
        method: "POST",
        url: "/view",
        headers: {
          Authorization: "Bearer " + props.token,
        },
        data: {
          id: props.id,
          phr_id: props.userID,
        },
      })
        .then((response) => {
          setFname(response.data.fname);
          setLname(response.data.lname);
          setBirthday(response.data.birth);
          setBloodType(response.data.bT);
          setHeight(response.data.height);
          setWeight(response.data.weight);
          setEmail(response.data.email);
          setPhoneNumber(response.data.num);
          setEmergencyContactName(response.data.ecName);
          setEmergencyContactNumber(response.data.ecNum);
          setPrimaryDoctor(response.data.doctor);
          setPrimaryDoctorNumber(response.data.doctorNum);
          setPharmacy(response.data.pharmacy);
          setchronicConds(response.data.condList);
          setMedications(response.data.medList);

          setLoading(false);
          setErrorMessage("");
        })
        .catch((error) => {
          if (error.response) {
            console.log(error.response);
            console.log(error.response.status);
            console.log(error.response.headers);

            setLoading(false);
            setErrorMessage(
              error.response.data.msg || error.response.statusText
            );
          }
        });
    }, 3000);
  }, []);

  // show loading screen while user data is fetched
  if (isLoading) {
    return (
      <Box m="auto" align="center" sx={{ m: 2 }}>
        <CircularProgress color="secondary" />
      </Box>
    );
  }

  if (errorMessage.length > 0) {
    return (
      <Alert key={props.userID} severity="error" sx={{ m: 3 }}>
        {errorMessage}
      </Alert>
    );
  }

  return (
    <Box m="auto" align="center" key={props.userID} sx={{ m: 3 }}>
      <Typography variant="h4" gutterBottom sx={{ mt: 5, mb: 5 }}>
        {" "}
        {fname} {lname}'s PHR{" "}
      </Typography>

      <Grid
        container
        justifyContent="space-evenly"
        alignItems="center"
        spacing={4}
      >
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
            variant="standard"
          />
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
            variant="standard"
          />
        </Grid>

        {birthday && (
          <Grid item xs={8} sm={6} md={4} lg={3}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Birthday"
                value={birthday}
                readOnly
                onChange={(newValue) => {}}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
          </Grid>
        )}

        {height && (
          <Grid item xs={8} sm={6} md={4} lg={3}>
            <TextField
              label="Height"
              value={height}
              InputProps={{
                readOnly: true,
                startAdornment: (
                  <InputAdornment position="start">
                    <HeightIcon />
                  </InputAdornment>
                ),
              }}
            ></TextField>
          </Grid>
        )}

        {weight && (
          <Grid item xs={8} sm={6} md={4} lg={3}>
            <TextField
              label="Weight"
              value={weight}
              InputProps={{
                readOnly: true,
                startAdornment: (
                  <InputAdornment position="start">
                    <MonitorWeightIcon />
                  </InputAdornment>
                ),
              }}
            ></TextField>
          </Grid>
        )}

        {bloodType && (
          <Grid item xs={8} sm={6} md={4} lg={3}>
            <TextField
              label="Blood Type"
              value={bloodType}
              InputProps={{
                readOnly: true,
                startAdornment: (
                  <InputAdornment position="start">
                    <BloodtypeIcon />
                  </InputAdornment>
                ),
              }}
            ></TextField>
          </Grid>
        )}

        {email && (
          <Grid item xs={8} sm={6} md={4} lg={3}>
            <TextField
              label="Email"
              value={email}
              InputProps={{
                readOnly: true,
                startAdornment: (
                  <InputAdornment position="start">
                    <EmailIcon />
                  </InputAdornment>
                ),
              }}
            ></TextField>
          </Grid>
        )}

        {phoneNumber && (
          <Grid item xs={8} sm={6} md={4} lg={3}>
            <TextField
              label="Phone Number"
              value={phoneNumber}
              InputProps={{
                readOnly: true,
                startAdornment: (
                  <InputAdornment position="start">
                    <PhoneIcon />
                  </InputAdornment>
                ),
              }}
            ></TextField>
          </Grid>
        )}

        {emergencyContactName && (
          <Grid item xs={8} sm={6} md={4} lg={3}>
            <TextField
              label="Emergency Contact Name"
              value={emergencyContactName}
              InputProps={{
                readOnly: true,
                startAdornment: (
                  <InputAdornment position="start">
                    <ContactEmergencyIcon />
                  </InputAdornment>
                ),
              }}
            ></TextField>
          </Grid>
        )}

        {emergencyContactNumber && (
          <Grid item xs={8} sm={6} md={4} lg={3}>
            <TextField
              label="Emergency Contact Phone #"
              value={emergencyContactNumber}
              InputProps={{
                readOnly: true,
                startAdornment: (
                  <InputAdornment position="start">
                    <PhoneIcon />
                  </InputAdornment>
                ),
              }}
            ></TextField>
          </Grid>
        )}

        {primaryDoctor && (
          <Grid item xs={8} sm={6} md={4} lg={3}>
            <TextField
              label="Primary Doctor"
              value={primaryDoctor}
              InputProps={{
                readOnly: true,
                startAdornment: (
                  <InputAdornment position="start">
                    <PersonIcon />
                  </InputAdornment>
                ),
              }}
            ></TextField>
          </Grid>
        )}

        {primaryDoctorNumber && (
          <Grid item xs={8} sm={6} md={4} lg={3}>
            <TextField
              label="Primary Doctor Phone #"
              value={primaryDoctorNumber}
              InputProps={{
                readOnly: true,
                startAdornment: (
                  <InputAdornment position="start">
                    <PhoneIcon />
                  </InputAdornment>
                ),
              }}
            ></TextField>
          </Grid>
        )}

        {pharmacy && (
          <Grid item xs={8} sm={6} md={4} lg={3}>
            <TextField
              label="Pharmacy"
              value={pharmacy}
              InputProps={{
                readOnly: true,
                startAdornment: (
                  <InputAdornment position="start">
                    <LocalPharmacyIcon />
                  </InputAdornment>
                ),
              }}
            ></TextField>
          </Grid>
        )}

        {chronicConds && (
          <Grid item xs={12} sx={{ height: 400, width: "100%" }}>
            <Typography variant="h5" align="left" gutterBottom>
              Chronic Conditions
            </Typography>
            <DataGrid rows={chronicConds} columns={chronicTableColumns} />
          </Grid>
        )}

        {medications && (
          <Grid item xs={12} sx={{ height: 400, width: "100%", mt: 4 }}>
            <Typography variant="h5" align="left" gutterBottom>
              Medications
            </Typography>
            <DataGrid rows={medications} columns={medicationTableColumns} />
          </Grid>
        )}
      </Grid>
    </Box>
  );
};

export default ViewPHR;
