import * as React from 'react';
import { useState, useRef, Fragment } from 'react';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';


export default function AddButtonGroup(props) {
    const [open, setOpen] = useState(false);
    const anchorRef = useRef(null);
    const [selectedIndex, setSelectedIndex] = useState(1);
    const options = props.options;

    const handleClick = () => {
        props.updateArray(arr => [...arr, `${options[selectedIndex]}`]);
        console.info(`You clicked ${options[selectedIndex]}`);
    };

    const handleMenuItemClick = (event, index) => {
        setSelectedIndex(index);
        setOpen(false);
    };

    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    const handleClose = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }

        setOpen(false);
    };

  return (
    <Fragment>
        <ButtonGroup variant="text" ref={anchorRef} aria-label="split button" sx={{m:2}}>
            <Button onClick={handleClick}>{options[selectedIndex]}</Button>
            <Button
            size="small"
            aria-controls={open ? 'split-button-menu' : undefined}
            aria-expanded={open ? 'true' : undefined}
            aria-label="select merge strategy"
            aria-haspopup="menu"
            onClick={handleToggle}
                >
                <ArrowDropDownIcon />
            </Button>
      </ButtonGroup>
      <Popper
        sx={{
          zIndex: 1,
        }}
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === 'bottom' ? 'center top' : 'center bottom',
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList id="split-button-menu" autoFocusItem>
                  {options.map((option, index) => (
                    <MenuItem
                      key={option}
                      selected={index === selectedIndex}
                      onClick={(event) => handleMenuItemClick(event, index)}
                    >
                      {option}
                    </MenuItem>
                  ))}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </Fragment>
  );
}

// import React, { useState, useRef } from 'react';
// import Button from '@mui/material/Button';
// import ButtonGroup from '@mui/material/ButtonGroup';
// import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
// import ClickAwayListener from '@mui/material/ClickAwayListener';
// import Grow from '@mui/material/Grow';
// import Paper from '@mui/material/Paper';
// import Popper from '@mui/material/Popper';
// import MenuItem from '@mui/material/MenuItem';
// import MenuList from '@mui/material/MenuList';

// const AddButtonGroup = (props) => {
//     const [open, setOpen] = useState(false);
//     const anchorRef = useRef(null);
//     const [selectedIndex, setSelectedIndex] = useState(1);
//     const options = props.options;

//     // const handleClick = () => {
//     //     console.info(`You clicked ${options[selectedIndex]}`);
//     // };

//     const handleMenuItemClick = () => {
//         // props.updateArray(arr => [...arr, `${options[selectedIndex]}`]);
//         console.info(`You clicked ${options[selectedIndex]}`);
//     };

//     const handleToggle = () => {
//         setOpen((prevOpen) => !prevOpen);
//     };
    
//     const handleClose = (event) => {
//         if (anchorRef.current && anchorRef.current.contains(event.target)) {
//             return;
//         }

//         setOpen(false);
//     };

//     return (
//         <React.Fragment>
//             <Button
//             size="small"
//             aria-expanded={open ? 'true' : undefined}
//             aria-haspopup="menu"
//             onClick={handleToggle}
//             >
//                 {props.name}
//             <KeyboardArrowDownIcon />
//             </Button>
             
//             <ClickAwayListener onClickAway={handleClose}>
//                 <MenuList id="split-button-menu" autoFocusItem>
//                 {options.map((option, index) => (
//                     <MenuItem
//                     key={option}
//                     onClick={handleMenuItemClick()}
//                     >
//                     {option}
//                     </MenuItem>
//                 ))}
//                 </MenuList>
//             </ClickAwayListener>
              
//         </React.Fragment>
//     );

// }

// export default AddButtonGroup;

// import React, { useState, useRef } from 'react';
// import Button from '@mui/material/Button';
// import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
// import MenuItem from '@mui/material/MenuItem';
// import Menu from '@mui/material/MenuList';

// const AddButtonGroup = (props) => {
//     // const [open, setOpen] = useState(false);
//     // const anchorRef = useRef(null);
//     const [selectedIndex, setSelectedIndex] = useState(1);
//     const options = props.options;

//     const [anchorEl, setAnchorEl] = useState(null);
//     const open = Boolean(anchorEl);
//     const handleClick = (event) => {
//         setAnchorEl(event.currentTarget);
//     };
//     const handleClose = () => {
//         setAnchorEl(null);
//     };

//     const handleMenuItemClick = () => {
//         props.updateArray(arr => [...arr, `${options[selectedIndex]}`]);
//         // console.info(`You clicked ${options[selectedIndex]}`);
//     };

//     // const handleToggle = () => {
//     //     setOpen((prevOpen) => !prevOpen);
//     // };

//     return (
//         <div>
//             <Button
//                 id="facility-name"
//                 aria-expanded={open ? 'true' : undefined}
//                 aria-haspopup="true"
//                 aria-controls={open ? 'basic-menu' : undefined}
//                 onClick={handleClick}
//             >
//                 {props.name}
//                 <KeyboardArrowDownIcon />
//             </Button>
//             <Menu
//                 id="basic-menu"
//                 anchorEl={anchorEl}
//                 open={open}
//                 onClose={handleClose}
//                 MenuListProps={{
//                     'aria-labelledby': 'facility-name',
//                 }}
//             >
//                 {/* {options.map((option, index) => (
//                     <MenuItem
//                         key={option}
//                         // onClick={handleMenuItemClick()}
//                     >
//                         {option}
//                     </MenuItem>
//                 ))} */}
//                 <MenuItem onClick={handleClose}>Profile</MenuItem>
//                 <MenuItem onClick={handleClose}>My account</MenuItem>
//                 <MenuItem onClick={handleClose}>Logout</MenuItem>
//             </Menu>
              
//         </div>
//     );

// }

// export default AddButtonGroup;

// import React, { useState, useRef } from 'react';
// import Button from '@mui/material/Button';
// import Menu from '@mui/material/Menu';
// import MenuItem from '@mui/material/MenuItem';
// import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

// export default function AddButtonGroup(props) {
//     const [anchorEl, setAnchorEl] = useState(null);
//     const open = Boolean(anchorEl);
//     const [selectedIndex, setSelectedIndex] = useState(1);
//     const options = props.options;

//     const handleClick = (event) => {
//         setAnchorEl(event.currentTarget);
//     };

//     const handleClose = () => {
//         setAnchorEl(null);
//     };

//     const handleMenuItemClick = () => {
//         // props.updateArray(arr => [...arr, `${options[selectedIndex]}`]);
//         console.info(`You clicked ${options[selectedIndex]}`);
//     };

//     return (
//         <div>
//             <Button
//             // variant="contained"
//             id="basic-button"
//             aria-controls={open ? 'basic-menu' : undefined}
//             aria-haspopup="true"
//             aria-expanded={open ? 'true' : undefined}
//             onClick={handleClick}
//             >
//                 {props.name}
//                 <KeyboardArrowDownIcon />
//             </Button>
//             <Menu
//                 id="basic-menu"
//                 anchorEl={anchorEl}
//                 open={open}
//                 onClose={handleClose}
//                 MenuListProps={{
//                     'aria-labelledby': 'basic-button',
//                 }}
//             >
//                 {options.map((option, index) => (
//                     <MenuItem
//                         key={option}
//                         onClick={handleMenuItemClick()}
//                     >
//                         {option}
//                     </MenuItem>
//                 ))}
//             </Menu>
//         </div>
//     );
// }
