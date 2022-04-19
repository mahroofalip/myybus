import React, { useState, useEffect, useReducer } from "react";
import { useParams } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import AddIcon from "@mui/icons-material/Add";
import CancelIcon from "@mui/icons-material/Cancel";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { styled } from "@mui/material/styles";
import "../style.css";
import DirectionsBusIcon from "@mui/icons-material/DirectionsBus";
import { useNavigate } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import Divider from "@mui/material/Divider";
import TextField from "@mui/material/TextField";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@mui/material/Button";
import "../adminForm.css";
import axios from "axios";
import { color, height } from "@mui/system";
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import moment from 'moment'
import jwt_decode from "jwt-decode";


const Input = styled("input")({
  display: "none",
});

const settings = ["Profile", "Account", "Logout"];
const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiFormLabel-root": {
      color: "green", // or black
    },
  },
}));

const types = [
  {
    value: "AC",
    label: "AC",
  },
  {
    value: "NON AC",
    label: "NON AC",
  },
];

const Editbus = () => {


  const navigate = useNavigate();
  const classes = useStyles();

  // bus details
  const [busname, setBusname] = React.useState("");
  const [registerNUmber, setRegisterNUmber] = React.useState("");
  const [busType, setBusType] = React.useState("");
  const [seats, setSeates] = React.useState("");
  const [from, setFrom] = React.useState("");
  const [to, setTo] = React.useState("");
  const [duration, setDuration] = useState("");
  const [depDate, setDepDate] = useState("");
  const [depTime, setDepTime] = useState("");
  const [arrivDate, setArraivDate] = useState("");
  const [arrivTime, setArraivTime] = useState("");
  // image details
  // const [permit, setPermit] = useState("");  value={permit}
  const [image1, setImage1] = useState("");
  const [image2, setImage2] = useState("");
  const [image3, setImage3] = useState("");
  const [image4, setImage4] = useState("");
   

  //permit

  const [previewPermitSource, setPermitPreviewSource] = useState("");

  // //image1

  const [image1privew, setimage1privew] = useState("");
  // image 2
  const [image2privew, setimage2privew] = useState("");
  // image3
  const [image3privew, setimage3privew] = useState("");
  // image 4
  const [image4privew, setimage4privew] = useState("");


  //errors
  const [busnameErr, setBusnameErr] = React.useState(false);
  const [registerNUmberErr, setRegisterNUmberErr] = React.useState(false);
  const [busTypeErr, setBusTypeErr] = React.useState(false);
  const [seatsErr, setSeatesErr] = React.useState(false);
  const [fromErr, setFromErr] = React.useState(false);
  const [toErr, setToErr] = React.useState(false);
  const [durationErr, setDurationErr] = useState(false);
  const [depDateErr, setDepDateErr] = useState(false);
  const [depTimeErr, setDepTimeErr] = useState(false);
  const [arrivDateErr, setArraivDateErr] = useState(false);
  const [arrivTimeErr, setArraivTimeErr] = useState(false);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [email, setEmail] = useState("")
  const [open, setOpen] = useState(false)
  // const [editobj, dispath] = useReducer(setData, {})


  const [owner_id,setOwnerid]=useState("");
  useEffect(() => {

    let token = localStorage.getItem("token")
    if(token){
      var decoded = jwt_decode(token);
      if (decoded) {
        setEmail(decoded.email)
        setOwnerid(decoded.id)
      }
    }else{
      setEmail("")
      return navigate("/admin/login")
    }
   
   
  }, [email,owner_id])




  

  const { busId } = useParams()
    

  useEffect(() => {
    setOpen(!open);

    axios
      .post("http://localhost:3001/admin/editbus", {
        busId
      })
      .then((res) => {
        setOpen(false);
      
         
        const bus=res.data.bus
         bus.departuredate = moment(bus.departuredate).format('L');
         bus.arraivaldate= moment(bus.arraivaldate).format('L');
        console.log(bus);
        setBusname(bus.busname)
        setRegisterNUmber(bus.registernumber)
        setBusType(bus.bustype)
        setSeates(bus.seats)
        setFrom(bus.fromstart)
        setTo(bus.toend)
        setDuration(bus.duration)
        setDepDate(bus.departuredate)
        setDepTime(bus.departuretime)
        setArraivDate(bus.arraivaldate)
        setArraivTime(bus.arraivaltime)
        setPermitPreviewSource(bus.permit)
        setimage1privew(bus.image1)
        setimage2privew(bus.image2)
        setimage3privew(bus.image3)
        setimage4privew(bus.image4)
        
       
      });
  }, [])





  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  // useEffect(() => {

  //   let token = localStorage.getItem("token")
  //   if(token){
  //     var decoded = jwt_decode(token);
  //     if (decoded.email) setEmail(decoded.email)
  //   }else{
  //     setEmail("")
  //   }
   
   
  // }, [email])


  const navigateTo = (e) => {
    if (e.target.innerText === "Account") {
      navigate("/admin/login")
    }
    
    if (e.target.innerText === "Logout") {
     
      localStorage.setItem("token","");
      setEmail(false)
      navigate("/admin/login")
  
    }
  };
  
  const populateHome = () => {
    navigate("/admin/home");
  };

  const handlViewBus = () => {
    navigate('/admin/viewbus/' + owner_id)
  }






  // preview

  const previewFilePermit = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPermitPreviewSource(reader.result);
    };
  };
  const previewFileImage1 = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      console.log(reader.result);
      setimage1privew(reader.result);
    };
  };
  const previewFileImage2 = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setimage2privew(reader.result);
    };
  };
  const previewFileImage3 = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setimage3privew(reader.result);
    };
  };

  const previewFileImage4 = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setimage4privew(reader.result);
    };
  };

  const inputEvent = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    if (name === "busname") {
      setBusname(value);
    }
    if (name === "registerNUmber") {
      setRegisterNUmber(value);
    }

    if (name === "busType") {
      setBusType(value);
    }

    if (name === "seats") {
      setSeates(value);
    }

    if (name === "from") {
      setFrom(value);
    }
    if (name === "to") {
      setTo(value);
    }
    if (name === "duration") {
      setDuration(value);
    }
    if (name === "depDate") {
      setDepDate(value);
    }
    if (name === "depTime") {
      setDepTime(value);
    }

    if (name === "arrivDate") {
      setArraivDate(value);
    }
    if (name === "arrivTime") {
      setArraivTime(value);
    }

    if (name === "permit") {
      const file = event.target.files[0];
      previewFilePermit(file);
      // setPermit(value);
    }
    if (name === "image1") {
      const file = event.target.files[0];
      previewFileImage1(file);
      setImage1(value);
    }
    if (name === "image2") {
      const file = event.target.files[0];
      previewFileImage2(file);
      setImage2(value);
    }
    if (name === "image3") {
      const file = event.target.files[0];
      previewFileImage3(file);
      setImage3(value);
    }
    if (name === "image4") {
      const file = event.target.files[0];
      previewFileImage4(file);
      setImage4(value);
    }
  };

  // add form validation

  const submitForm = (e) => {
    e.preventDefault();

  

    let error = false;
    if (busname.trim() === "") {
     
      setBusnameErr(true);
      error = true;
    } else {
     
      setBusnameErr(false);
    }
    if (registerNUmber.trim() === "") {
    
      setRegisterNUmberErr(true);
      error = true;
    } else {
     
      setRegisterNUmberErr(false);
    }
    if (seats == "") {
     
      setSeatesErr(true);
      error = true;
    } else {
     
      setSeatesErr(false);
    }
    if (from.trim() === "") {
      setFromErr(true);
      error = true;
    } else {
      setFromErr(false);
    }
    if (to.trim() === "") {
      setToErr(true);
      error = true;
    } else setToErr(false);
    if (duration== "") {
      setDurationErr(true);
      error = true;
    } else {
      setDurationErr(false);
    }
    if (depDate.trim() === "") {
      setDepDateErr(true);
      error = true;
    } else {
      setDepDateErr(false);
    }
    if (depTime.trim() === "") {
      setDepTimeErr(true);
      error = true;
    } else {
      setDepTimeErr(false);
    }
    if (arrivDate.trim() === "") {
      setArraivDateErr(true);
      error = true;
    } else {
      setArraivDateErr(false);
    }
    if (arrivTime.trim() === "") {
      setArraivTimeErr(true);
      error = true;
    } else {
      setArraivTimeErr(false);
    }
    if (busType.trim() === "") {
      setBusTypeErr(true);
      error = true;
    } else {
      setBusTypeErr(false);
    }
    

    if (error) {

      console.log("not submit field required");
    } else {
     
    
  
      setOpen(!open);

      axios
        .put("http://localhost:3001/admin/editsubmit", {
          busname,
          registerNUmber,
          busType,
          seats,
          from,
          to,
          duration,
          depDate,
          depTime,
          arrivDate,
          arrivTime,
          permit: previewPermitSource,
          image1: image1privew,
          image2: image2privew,
          image3: image3privew,
          image4: image4privew,
          id:busId
        })
        .then((res) => {
          setOpen(false);
          if (res.data.status) {
            navigate('/admin/viewbus/' + owner_id)
          }

        });
    }
  };



  return (
    <>

      <AppBar sx={{ backgroundColor: "#fff" }} position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Box
              sx={{
                flexGrow: 1,
                display: {
                  xs: "flex",
                  md: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                },
              }}
            >
              <DirectionsBusIcon style={{ color: "gray", fontSize: 40 }} />

              <span className="mybus">
                <strong style={{ color: "gray", fontWeight: 900 }}>
                  ADMIN PANEL
                </strong>
              </span>
            </Box>

            <Box sx={{ flexGrow: 0 }}>
            <span style={{ marginRight: 20,color:"#012169" }}>{email ? email : ""}</span>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="Remy Sharp" src="" />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <MenuItem key={setting} onClick={navigateTo}>
                    <Typography textAlign="center">{setting}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <div>
        <Grid
          sx={{ backgroundColor: "#012169", marginTop: 0 }}
          container
          spacing={2}
        >
          <Grid
            onClick={populateHome}
            className="tab"
            sx={{
              backgroundColor: "#012169",
              border: "solid white",
              cursor: "pointer",
            }}
            item
            xs={12}
            sm={2}
            md={2}
          >
            <strong style={{ color: "white", margin: 40 }}>DASHBOARD</strong>
          </Grid>
          <Grid></Grid>
          <Grid
            sx={{
              color: "#fff",
              backgroundColor: "gray",
              border: "solid white",
            }}
            item
            xs={12}
            sm={2}
            md={2}
          >
            <strong style={{ margin: 40 }}>EDIT BUS</strong>
          </Grid>
          <Grid onClick={handlViewBus}
            className="tab"
            sx={{
              color: "#fff",
              backgroundColor: "#012169",
              border: "solid white",
              cursor: "pointer",
            }}
            item
            xs={12}
            sm={2}
            md={2}
          >
            <strong style={{ margin: 40 }}>VIEW BUS</strong>
          </Grid>
          <Grid
            className="tab"
            sx={{
              color: "#fff",
              backgroundColor: "#012169",
              border: "solid white",
              cursor: "pointer",
            }}
            item
            xs={12}
            sm={2}
            md={2}
          >
            <strong style={{ margin: 40 }}>REPORTS</strong>
          </Grid>
        </Grid>
      </div>
      <Typography
        sx={{ marginTop: 2, fontWeight: 900, fontSize: 25 }}
        align="center"
      >
        EDIT THE BUS DETAILS
      </Typography>
      <Container>
        {" "}
        <Divider sx={{ height: 3, marginTop: 1, backgroundColor: "gray" }} />
      </Container>

      <Container>
        <Grid sx={{ marginTop: 1 }} container spacing={3}>
          <Grid item xs={12} sm={6} md={4} lg={4}>
            <TextField
              fullWidth
              className={classes.root}
              id="outlined-required"
              name="busname"
              label="EDIT BUS NAME"
              value={busname}
              onChange={inputEvent}
              InputLabelProps={{
                shrink: true,
              }}
            />

            <p className={`${busnameErr ? "dangerText" : "notDanger"}`}>
              <i className="fa fa-warning"></i>This field is required.
            </p>
          </Grid>

          <Grid item xs={12} sm={6} md={4} lg={4}>
            <TextField
              fullWidth
              className={classes.root}
              name="registerNUmber"
              value={registerNUmber}
              label="EDIT REGISTER NUMBER"
              id="outlined-required"
              InputLabelProps={{
                shrink: true,
              }}
              onChange={inputEvent}
            />

            <p className={`${registerNUmberErr ? "dangerText" : "notDanger"}`}>
              <i className="fa fa-warning"></i>This field is required.
            </p>
          </Grid>

          <Grid item xs={6} sm={4} md={2} lg={2}>
            <TextField
              id="outlined-required"
              select
              label="EDIT BUS TYPE"
              name="busType"
              value={busType}
              fullWidth
              defaultValue={busType}
              className={classes.root}
              onChange={inputEvent}
              InputLabelProps={{
                shrink: true,
              }}
            > 
              {   types.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            
            </TextField>
            <p
              align="center"
              className={`${busTypeErr ? "dangerText" : "notDanger"}`}
            >
              <i className="fa fa-warning"></i>This field is required.
            </p>
          </Grid>
          <Grid item xs={6} sm={4} md={2} lg={2}>
            <TextField
              id="outlined-number"
             label="EDIT SEATS"
              name="seats"
              value={seats}
              type="number"
              className={classes.root}
              onChange={inputEvent}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <p
              align="center"
              className={`${seatsErr ? "dangerText" : "notDanger"}`}
            >
              <i className="fa fa-warning"></i>This field is required.
            </p>
          </Grid>

          <Grid item xs={12} sm={6} md={3} lg={3}>
            <TextField
              fullWidth
              id="outlined-required"
              label="EDIT FROM PLACE"
              name="from"
              value={from}
              className={classes.root}
              onChange={inputEvent}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <p
              align="center"
              className={`${fromErr ? "dangerText" : "notDanger"}`}
            >
              <i className="fa fa-warning"></i>This field is required.
            </p>
          </Grid>
          <Grid item xs={12} sm={6} md={3} lg={3}>
            <TextField
              fullWidth
              id="outlined-required"
              label="EDIT END PLACE"
              name="to"
              value={to}
              className={classes.root}
              onChange={inputEvent}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <p
              align="center"
              className={`${toErr ? "dangerText" : "notDanger"}`}
            >
              <i className="fa fa-warning"></i>This field is required.
            </p>
          </Grid>
          <Grid item xs={12} sm={4} md={2} lg={2}>
            <TextField
              fullWidth
              id="outlined-number"
              label="EDIT DURATION"
              type="number"
              name="duration"
              value={duration}
              className={classes.root}
              onChange={inputEvent}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <p
              align="center"
              className={`${durationErr ? "dangerText" : "notDanger"}`}
            >
              <i className="fa fa-warning"></i>This field is required.
            </p>
          </Grid>

          <Grid item xs={12} sm={6} md={3} lg={3}>
            <TextField
              fullWidth
              id="file"
              label="PERMIT"
              type="file"
              name="permit"
             
              className={classes.root}
              InputLabelProps={{
                shrink: true,
              }}
              onChange={inputEvent}
            />
           
          </Grid>
          <Grid item xs={12} sm={6} md={1} lg={1}>
            {previewPermitSource && (
              <div>
                <img
                  src={previewPermitSource}
                  alt="permit"
                  style={{ width: "75px", height: "55px" }}
                />
              </div>
            )}
          </Grid>
          <Grid item xs={12} sm={6} md={3} lg={3}>
            <TextField
              fullWidth
              id="date"
              label={`EDIT DEPARTURE DATE :(${depDate})`}
              type="date"
              defaultValue={depDate}
              name="depDate"
              value={depDate}
              
              className={classes.root}
              InputLabelProps={{
                shrink: true,
              }}
              onChange={inputEvent}
            />
            <p
              align="center"
              className={`${depDateErr ? "dangerText" : "notDanger"}`}
            >
              <i className="fa fa-warning"></i>This field is required.
            </p>
          </Grid>

          <Grid item xs={12} sm={6} md={3} lg={3}>
            <TextField
              fullWidth
              id="time"
              label="DEPARTURE TIME"
              type="time"
              name="depTime"
              value={depTime}
              defaultValue={depTime}
              className={classes.root}
              InputLabelProps={{
                shrink: true,
              }}
              onChange={inputEvent}
            />
            <p
              align="center"
              className={`${depTimeErr ? "dangerText" : "notDanger"}`}
            >
              <i className="fa fa-warning"></i>This field is required.
            </p>
          </Grid>

          <Grid item xs={12} sm={6} md={3} lg={3}>
            <TextField
              fullWidth
              id="date"
              label={`EDT ARRIVAL DATE (${arrivDate})`}
              type="date"
              name="arrivDate"
              value={arrivDate}
              defaultValue={arrivDate}
              className={classes.root}
              InputLabelProps={{
                shrink: true,
              }}
             
           onChange={inputEvent}
            />
           
            <p
              align="center"
              className={`${arrivDateErr ? "dangerText" : "notDanger"}`}
            >
              <i className="fa fa-warning"></i>This field is required.
            </p>
          </Grid>

          <Grid item xs={12} sm={6} md={3} lg={3}>
            <TextField
              fullWidth
              id="time"
              label="ARRIVAL TIME"
              type="time"
              name="arrivTime"
              value={arrivTime}
              defaultValue={arrivTime}
              className={classes.root}
              InputLabelProps={{
                shrink: true,
              }}
              onChange={inputEvent}
            />
            <p
              align="center"
              className={`${arrivTimeErr ? "dangerText" : "notDanger"}`}
            >
              <i className="fa fa-warning"></i>This field is required.
            </p>
          </Grid>
        </Grid>
      </Container>

      <Container>
        <Typography sx={{ padding: 2, fontWeight: 900 }}>ADD IMAGES</Typography>

        <Grid sx={{ marginTop: 0 }} container spacing={3}>
          <Grid item xs={12} sm={6} md={3} lg={3}>
            <div style={{ display: "flex", justifyContent: "end" }}>
            
                <img
                  src={image1privew}
                  alt="chosen"
                  style={{ width: "80px", marginBottom: "4px" }}
                />
             
            </div>
            <TextField
              fullWidth
              id="file"
              label="IMAGE 1"
              type="file"
              name="image1"
              value={image1}
              className={classes.root}
              InputLabelProps={{
                shrink: true,
              }}
              onChange={inputEvent}
            />
           
          </Grid>
          <Grid item xs={12} sm={6} md={3} lg={3}>
            <div style={{ display: "flex", justifyContent: "end" }}>
            
                <img
                  src={image2privew }
                  alt="chosen"
                  style={{ width: "80px", marginBottom: "4px" }}
                />
           
            </div>
            <TextField
              fullWidth
              id="file"
              label="IMAGE 2"
              type="file"
              name="image2"
              value={image2}
              className={classes.root}
              InputLabelProps={{
                shrink: true,
              }}
              onChange={inputEvent}
            />
           
          </Grid>{" "}
          <Grid item xs={12} sm={6} md={3} lg={3}>
            <div style={{ display: "flex", justifyContent: "end" }}>
            
                <img
                  src={image3privew}
                  alt="chosen"
                  style={{ width: "80px", marginBottom: "4px" }}
                />
          
            </div>
            <TextField
              fullWidth
              id="file"
              label="IMAGE 3"
              type="file"
              name="image3"
              value={image3}
              className={classes.root}
              InputLabelProps={{
                shrink: true,
              }}
              onChange={inputEvent}
            />
           
          </Grid>{" "}
          <Grid item xs={12} sm={6} md={3} lg={3}>
            <div style={{ display: "flex", justifyContent: "end" }}>
             
                <img
                  src={image4privew}
                  alt="chosen"
                  style={{ width: "80px", marginBottom: "4px" }}
                />
            
            </div>
            <TextField
              fullWidth
              id="file"
              label="IMAGE 4"
              type="file"
              name="image4"
              value={image4}
              className={classes.root}
              InputLabelProps={{
                shrink: true,
              }}
              onChange={inputEvent}
            />
            
          </Grid>
        </Grid>
      </Container>

      <Container>
        <Box
          alignItems="center"
          display="flex"
          justifyContent="center"
          flexDirection="column"
        >
          <Box>
            <Button
              type="submit"
              variant="contained"
              sx={{ margin: 2 }}
              endIcon={<AddIcon />}
              onClick={submitForm}
            >
              <strong>ADD BUS</strong>
            </Button>

            <Button variant="outlined" endIcon={<CancelIcon />}>
              <strong>CANCEL</strong>
            </Button>
          </Box>
        </Box>
      </Container>
      {/* loder */}
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
       
      >
        <CircularProgress color="inherit" />
      </Backdrop>

    </>
  );

};

export default Editbus;
