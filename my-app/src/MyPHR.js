import { useState } from 'react';
import axios from 'axios';
import { Fragment } from 'react';

const MyPHR = (props) => {
    const [profileData, setProfileData] = useState(null)

  function getData() {
    axios({
      method: "GET",
        url: "/profile",
        headers: {
            Authorization: 'Bearer ' + props.token
        }
    })
    .then((response) => {
        const res =response.data
        res.access_token && props.setToken(res.access_token)
        setProfileData(({
          profile_name: res.name}))
      }).catch((error) => {
          if (error.response) {
            console.log(props.token)
          console.log(error.response)
          console.log(error.response.status)
          console.log(error.response.headers)
          }
      })} 
    
    return (
        <Fragment>
        <h1 align="center">Your PHR</h1>
        <p>To get your profile details: </p><button onClick={getData}>Click me</button>
         {profileData && <div>
               <p>Profile name: {profileData.profile_name}</p>
             </div>
            }
            </Fragment>
    );
}

export default MyPHR;
