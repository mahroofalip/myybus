import React, { useState, useEffect, useReducer } from "react";
import { AppBar, Button } from "@mui/material";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import DirectionsBusIcon from "@mui/icons-material/DirectionsBus";
import { useNavigate, Link } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import axios from "axios";
import { DataGrid } from "@mui/x-data-grid";
import LocalParkingIcon from '@mui/icons-material/LocalParking';
import { styled, alpha } from '@mui/material/styles';
import Divider from '@mui/material/Divider';
import BusAlertIcon from '@mui/icons-material/BusAlert';
import AirlineSeatReclineNormalIcon from '@mui/icons-material/AirlineSeatReclineNormal';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { useConfirm } from "material-ui-confirm";
import jwt_decode from "jwt-decode";
import { useParams } from "react-router-dom";
import AdminNavbar from "../navbar/Navbar"
const settings = ["Profile", "Account", "Logout"];



const StyledMenu = styled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'right',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'right',
    }}
    {...props}
  />
))(({ theme }) => ({
  '& .MuiPaper-root': {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color:
      theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
    boxShadow:
      'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
    '& .MuiMenu-list': {
      padding: '4px 0',
    },
    '& .MuiMenuItem-root': {
      '& .MuiSvgIcon-root': {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      '&:active': {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity,
        ),
      },
    },
  },
}));




function setData(state, action) {
  return action
}




function Tripdetails() {

  const { busId } = useParams()
  const confirm = useConfirm();
  const navigate = useNavigate();
  const [editobj, dispath] = useReducer(setData, {})
  const [records, setRecords] = useState();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const [openLoder, setOpensLoder] = useState(false)
  const [email, setEmail] = useState("")
  const [id, setId] = useState("");
  const [state, setState] = useState("")
  const { ownerId } = useParams()
  const [blockErr, setBlockErr] = useState(false)



  useEffect(() => {
    axios.post('http://localhost:3001/admin/tripdetails', { busId }).then((res) => {
      console.log(res.data.result);
      setRecords(res.data.result)
    });
  }, [])

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };


  const ChangeToUpcoming = () => {


    axios.put('http://localhost:3001/admin/statusChangeToUpcoming', { busId: editobj.bus_id, depdate: editobj.depdate }).then((res) => {
      console.log(res.data.result);
      setState(res.data.result.tripstataus)

    });

    setAnchorEl(null);
  };
  const ChangeToCompleted = () => {

    axios.put('http://localhost:3001/admin/statusChangeToCompleted', { busId: editobj.bus_id, depdate: editobj.depdate }).then((res) => {
      console.log(res.data.result);
      setState(res.data.result.tripstataus)
    });

    setAnchorEl(null);
  };

  const SeatView = () => {
    localStorage.setItem("busId_toGet_seatLayout_admin", editobj.bus_id);
    localStorage.setItem("busDepDate_toGet_seatLayout_admin", editobj.depdate);
    navigate("/admin/seatLayout");

    setAnchorEl(null);
  }


  const handleClose = () => {

    setAnchorEl(null);

  }


  const columns = [


    // { field: "id", headerName: "TRIP ID", width: 100 },
    { field: "dep_place", headerName: "FROM", width: 150 },
    { field: "arr_place", headerName: "TO", width: 150 },
    { field: "depdate", headerName: "DEPARTURE TIME", width: 190 },
    { field: "arrivdate", headerName: "ARRIVAL TIME", width: 190, },
    { field: "booked", headerName: "BOOKED SEATS", width: 150, },
    { field: "tripstataus", headerName: "Status", width: 100, },



    {
      field: "OPTIONS",
      renderCell: (cellValues) => {

        const onclick = (event) => {
          setAnchorEl(event.currentTarget);
          dispath(cellValues.row)

        };
        return (
          <Button
            id="demo-customized-button"
            aria-controls={open ? 'demo-customized-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            variant="contained"
            disableElevation
            onClick={onclick}
            endIcon={<KeyboardArrowDownIcon />}
          >
            Options
          </Button>
        );
      },
      width: 200

    },



  ];






  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };


  useEffect(() => {

    let token = localStorage.getItem("token")
    if (token) {
      var decoded = jwt_decode(token);

      if (decoded.email) setEmail(decoded.email)
    } else {
      setEmail("")
      return navigate("/admin/login")
    }
  }, [email])


  const navigateTo = (e) => {
    if (e.target.innerText === "Account") {
      navigate("/admin/login")
    }

    if (e.target.innerText === "Logout") {

      localStorage.setItem("token", "");
      setEmail(false)
      navigate("/admin/login")

    }
  };



  const populateHome = () => {
    navigate("/admin/home");
  };

  const handleAddBus = () => {
    navigate("/admin/addbus");
  };




  return (
    <>
    
      <AdminNavbar tab1hover="tab" tab2hover="tab" tab3hover="nohover" tab4hover="tab" tab1="#012169" tab2="#012169" tab3="gray" tab4="#012169" />


      
      <Typography
        sx={{ marginTop: 2, fontWeight: 900, fontSize: 25 }}
        align="center"
      >
        MANAGE TRIP DETAILS
      </Typography>
      {/* table */}

      <Container>
        <div style={{ height: 400, width: "100%", marginTop: 10 }}>
          <DataGrid
            rows={records}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}

          />
        </div>
      </Container>


      <StyledMenu
        id="demo-customized-menu"
        MenuListProps={{
          'aria-labelledby': 'demo-customized-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <MenuItem >
          Change Status
        </MenuItem>

        <MenuItem onClick={ChangeToUpcoming} disableRipple>
          <BusAlertIcon />
          Upcoming
        </MenuItem>
        <MenuItem onClick={ChangeToCompleted} disableRipple>
          <CheckCircleIcon />
          Completed
        </MenuItem>
        <Divider sx={{ my: 0.5 }} />
        <MenuItem >

          More Details
        </MenuItem>
        <MenuItem onClick={SeatView} disableRipple>
          <AirlineSeatReclineNormalIcon />
          Seat View
        </MenuItem>
      </StyledMenu>
    </>
  );
}

export default Tripdetails;
