import { useState } from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import Modal from "@mui/material/Modal";

import ViewPHR from "./ViewPHR";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  backgroundColor: "white",
  border: "1px solid #000",
  width: "60%",
  overflow: "scroll",
  height: "100%",
  boxShadow: 24,
  p: 4,
};

const ViewOtherPHR = (props) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [users, setUsers] = useState([]);
  const [userPhrId, setUserPhrID] = useState();
  const [errorMessage, setErrorMessage] = useState("");
  const [open, setOpen] = useState(false);
  const handleOpen = (u_id) => {
    setUserPhrID(u_id);
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  function handleSearch(event) {
    axios({
      method: "POST",
      url: "/list",
      data: {
        id: props.id,
        search: searchTerm,
      },
      headers: {
        Authorization: "Bearer " + props.token,
      },
    })
      .then((response) => {
        setUsers(response.data.options);
        setErrorMessage("");
      })
      .catch((error) => {
        if (error.response) {
          setErrorMessage(error.response.data.msg || error.response.statusText);
          setUsers([]);
          console.log(error.response);
          console.log(error.response.status);
          console.log(error.response.headers);
        }
      });

    // event.preventDefault();
  }

  return (
    <Box m="auto" align="center" sx={{ width: 3 / 4 }}>
      {errorMessage.length > 0 && (
        <Alert severity="error" sx={{ mt: 3, mb: 3 }}>
          {errorMessage}
        </Alert>
      )}
      <TextField
        id="search-users"
        className="text"
        label="Enter a Full Name"
        variant="outlined"
        placeholder="Bob Ross"
        onInput={(e) => {
          setSearchTerm(e.target.value);
        }}
        size="small"
      />
      <IconButton onClick={handleSearch}>
        <SearchIcon color="secondary" />
      </IconButton>

      <Box sx={{ m: 3 }}>
        {users.map((user) => (
          <Button
            key={user[0]}
            size="large"
            onClick={() => {
              handleOpen(user[0]);
            }}
          >
            {user[1]} {user[2]}
          </Button>
        ))}
      </Box>

      <Modal open={open} onClose={handleClose}>
        <Box style={style}>
          <ViewPHR token={props.token} id={props.id} userID={userPhrId} />
        </Box>
      </Modal>
    </Box>
  );
};

export default ViewOtherPHR;
