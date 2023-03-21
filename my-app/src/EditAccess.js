import React, { useState } from 'react';
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import axios from 'axios';
import Alert from '@mui/material/Alert';
import Typography from '@mui/material/Typography';

import AddButtonGroup from './AddButtonGroup';

import { facility, facilityName, department, position, symbols, keys } from './lists';

const EditAccess = (props) => {
    const [array, updateArray] = useState([]);
    const [isReqSuccess, setIsReqSuccess] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    function handleSubmit(event) {

        // create proper access tree
        let access = '( '+props.id+' or ( ';

        for(let i = 0; i < array.length; i++) {
            if(array[i] !== "(" && array[i] !== "AND" && array[i] !== "OR" && array[i] !== ")") {
                access += keys[array[i]];
            } else {
                access += array[i];
            }

            access += ' ';
        }

        access += ' ))';

        axios({
            method: "POST",
            url:"/access",
            data:{
                list: access,
                id: props.id,
            },
            headers: {
                Authorization: 'Bearer ' + props.token
            }
        })
        .then((response) => {
            setIsReqSuccess(true)
            console.log(response.data.msg)
            // window.location.href = '/dashboard';
        }).catch((error) => {
            if (error.response) {
                setErrorMessage(error.response.data.msg || error.response.statusText)
                console.log(error.response)
                console.log(error.response.status)
                console.log(error.response.headers)
            }
        })

        updateArray([]);
    
        event.preventDefault()
    };
    
    return (
        <Box m="auto" align="center" component="form" onSubmit={handleSubmit} sx={{ width: 3 / 4 }}>
            {isReqSuccess ?
                <Alert variant="outlined" severity="success" sx={{mb: 3}}> Attributes to access your PHR were updated! </Alert>
            :
            errorMessage.length > 0 && <Alert variant="outlined" severity="error" sx={{mb: 3}}>{errorMessage}</Alert>
            }

            <Typography variant="h4" gutterBottom> Edit Access of Your PHR</Typography>

            <TextField fullWidth sx={{ mt: 5, mb: 5 }}
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
            
            {/* <hr /> */}
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', m:5}}>
                <Button color="secondary" variant="outlined" onClick={() => updateArray([])} sx={{mr:3}}>Clear</Button>
                <Button color="secondary" type="submit" variant="contained">Submit</Button>
            </Box>

        </Box>
    );
}

export default EditAccess;
