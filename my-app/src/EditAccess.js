import React, { useState } from 'react';
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import axios from 'axios';
import Alert from '@mui/material/Alert';

import AddButtonGroup from './AddButtonGroup';

const facility = ["Hospice", "Hospital"];
const facilityName = [ "Garden City General Hospital", "Like Home Hospice", "Mineral Hospital", "Restful Retreat Hospice", "Tiny Oasis Hospice","Horizon Hospital"];
const department = ["Admissions", "Anesthetics", "Burn Center", "Cardiology", "Coronary Care Unit", "Emergency", "Gynecology", "Neonatal", "Oncology", "Pharmacy", "Urology"];
const position = ["Aide", "Bereavement Specialist", "Chaplain", "Dietitian", "Doctor", "Interpreter", "Nurse", "Occupational Therapist", "Patient Advocate", "Pharmacist", "Physical Therapist", "Physician", "Social Worker", "Specialist", "Speech Pathologist", "Voluneer"];
const symbols = ["AND", "OR", "(", ")"];

const EditAccess = (props) => {
    const [array, updateArray] = useState([]);
    const [isCorrectTree, setIsCorrectTree] = useState(false);
    const [validateMsg, setValidateMsg] = useState("");

    function handleSubmit(event) {

        // validate the input
        // const validArr = [];
        // for (let i = 0; i < array.length; i++) {
        //     if (array[i].length > 3) {
        //         validArr.push(1);
        //     } else if(array[i] === "AND" || array[i] === "OR") {
        //         validArr.push(2);
        //     } else if(array[i] === "("){
        //         validArr.push(3);
        //     } else if(array[i] === ")"){
        //         validArr.push(4);
        //     }
        // }

        // console.log(validArr);

        axios({
            method: "POST",
            url:"/access",
            data:{
                list: array,
            },
            headers: {
                Authorization: 'Bearer ' + props.token
            }
        })
        .then((response) => {
            console.log(response.data.msg)
            // window.location.href = '/dashboard';
        }).catch((error) => {
            if (error.response) {
                console.log(error.response)
                console.log(error.response.status)
                console.log(error.response.headers)
            }
        })

        updateArray([]);
    
        event.preventDefault()
    };
    
    return (
        <Box component="form" onSubmit={handleSubmit}>
            {isCorrectTree ?
                <Alert variant="outlined" severity="success"> Attributes to access your PHR were updated! </Alert>
            :
                validateMsg.length > 0 && <Alert variant="outlined" severity="error">{validateMsg}</Alert>
            }

            <h1 align="center">Edit Access</h1>

            <TextField fullWidth sx={{ mt: 6, mb: 4 }}
                id="read-only-input"
                label="Access Policy"
                name="list"
                value={array.join(' ')}
                InputProps={{
                    readOnly: true,
                }}
                variant="filled"
            />

            <AddButtonGroup options={facility} id="facility-type" name="Facility Type" updateArray={updateArray} />
            <AddButtonGroup options={facilityName} id="facility-name" name="Facility Name" updateArray={updateArray}/>
            <AddButtonGroup options={department} id="dept" name="Department Name" updateArray={updateArray}/>
            <AddButtonGroup options={position} id="position" name="Position Type" updateArray={updateArray} />
            <AddButtonGroup options={symbols} name="Symbols" updateArray={updateArray} />
            
            <hr />
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', m:5}}>
                <Button color="secondary" variant="outlined" onClick={() => updateArray([])} sx={{mr:2}}>Clear</Button>
                <Button color="secondary" type="submit" variant="contained">Sumbit</Button>
            </Box>

        </Box>
    );
}

export default EditAccess;
