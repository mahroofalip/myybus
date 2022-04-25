import React, { useState, useEffect } from "react";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import AddIcon from "@mui/icons-material/Add";
import CancelIcon from "@mui/icons-material/Cancel";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { styled } from "@mui/material/styles";
import "./style.css";
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
import "./adminForm.css";
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import axios from "axios";
import { color, height } from "@mui/system";
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
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

const currencies = [
  {
    value: "AC",
    label: "AC",
  },
  {
    value: "NON AC",
    label: "NON AC",
  },
];

const AddBus = () => {
  const navigate = useNavigate();
  const classes = useStyles();
  // bus details
  const [busname, setBusname] = React.useState("");
  const [registerNUmber, setRegisterNUmber] = React.useState("");
  const [busType, setBusType] = React.useState("");
  const [seats, setSeates] = React.useState("");
  const [from, setFrom] = React.useState("");
  const [to, setTo] = React.useState("");
  const [prize, setPrize] = useState("");

  const [depTime, setDepTime] = useState(new Date());

  const [arrivTime, setArraivTime] =  useState(new Date());
  // image details
  const [permit, setPermit] = useState("");
  const [image1, setImage1] = useState("");
  const [image2, setImage2] = useState("");
  const [image3, setImage3] = useState("");
  const [image4, setImage4] = useState("");
  //permit
  const [previewPermitSource, setPermitPreviewSource] = useState("");
  //image1
  const [image1privew, setimage1privew] = useState("");
  // image 2
  const [image2privew, setimage2privew] = useState("");
  // image3
  const [image3privew, setimage3privew] = useState("");
  // image 4
  const [image4privew, setimage4privew] = useState("");
  //errors

  const [depTimeErr, setDepTimeErr] = useState(false)
  const [busnameErr, setBusnameErr] = React.useState(false);
  const [registerNUmberErr, setRegisterNUmberErr] = React.useState(false);
  const [busTypeErr, setBusTypeErr] = React.useState(false);
  const [seatsErr, setSeatesErr] = React.useState(false);
  const [fromErr, setFromErr] = React.useState(false);
  const [toErr, setToErr] = React.useState(false);
  const [prizeErr, setPrizeErr] = useState(false);
  const [arrivTimeErr, setArrivTimeErr] = useState(false)
  const [permitErr, setPermitErr] = useState(false);
  const [image1Err, setImage1Err] = useState(false);
  const [image2Err, setImage2Err] = useState(false);
  const [image3Err, setImage3Err] = useState(false);
  const [image4Err, setImage4Err] = useState(false);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [owner_id, setOwnerid] = useState("");
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("")
  const clearForm = () => {
    setBusname("")
    setRegisterNUmber("")
    setBusType("")
    setSeates("")
    setFrom("")
    setTo("")
    setPrize("")
    setDepTime("")
    setArraivTime("")
    setImage1("")
    setImage2("")
    setImage3("")
    setImage4("")
    setPermit("")
    setPermitPreviewSource("")
    setimage1privew("")
    setimage2privew("")
    setimage3privew("")
    setimage4privew("")
  }



  const handleClose = () => {
    setOpen(false);
  };
  const handleToggle = () => {
    setOpen(!open);
  };



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
      if (decoded) {
        setEmail(decoded.email)
        setOwnerid(decoded.id)
      }
    } else {
      setEmail("")
      return navigate("/admin/login")

    }


  }, [email, owner_id])


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
    if (name === "prize") {
      setPrize(value);
    }

    // if (name === "depTime") {
    //   setDepTime(value);
    // }

    // if (name === "arrivTime") {
    //   setArraivTime(value);
    // }

    if (name === "permit") {
      const file = event.target.files[0];
      previewFilePermit(file);
      setPermit(value);
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
    if (seats.trim() === "") {
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
    if (prize.trim() === "") {
      setPrizeErr(true);
      error = true;
    } else {
      setPrizeErr(false);
    }

    if (busType.trim() === "") {
      setBusTypeErr(true);
      error = true;
    } else {
      setBusTypeErr(false);
    }
    if (permit === "") {
      setPermitErr(true);
      error = true;
    } else {
      setPermitErr(false);
    }
    if (image1 === "") {
      setImage1Err(true);
      error = true;
    } else {
      setImage1Err(false);
    }
    if (image2 === "") {
      setImage2Err(true);
      error = true;
    } else {
      setImage2Err(false);
    }
    if (image3 === "") {
      setImage3Err(true);
      error = true;
    } else {
      setImage3Err(false);
    }
    if (image4 === "") {
      setImage4Err(true);
      error = true;
    } else {
      setImage4Err(false);
    }

    if (arrivTime === "") {
      setArrivTimeErr(true)
    } else {
      setArrivTimeErr(false)
    }
    if (depTime === "") {
      setDepTimeErr(true)
    } else {
      setDepTimeErr(false)
    }


    if (error) {

      console.log("not submit field required");
    } else {



      setOpen(!open);

      axios
        .post("http://localhost:3001/admin/addbus", {
          owner_id,
          busname,
          registerNUmber,
          busType,
          seats,
          from,
          to,
          prize,
          depTime,
          arrivTime,
          permit: previewPermitSource,
          image1: image1privew,
          image2: image2privew,
          image3: image3privew,
          image4: image4privew,
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
              <span style={{ marginRight: 20, color: "#012169" }}>{email ? email : ""}</span>
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
            <strong style={{ margin: 40 }}>ADD BUS</strong>
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
        ADD BUS
      </Typography>
      <Container>
        {" "}
        <Divider sx={{ height: 3, marginTop: 1, backgroundColor: "gray" }} />
      </Container>

      <Container>
        <Typography sx={{ padding: 2, fontWeight: 900 }}>1:  ENTER THE BUS DETAILS</Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3} lg={3}>
            <p className={`${busnameErr ? "dangerText" : "notDanger"}`}>
              <i className="fa fa-warning"></i>This field is required.
            </p>
            <TextField
              fullWidth
              className={classes.root}
              id="outlined-required"
              label="ENTER BUS NAME"
              name="busname"
              value={busname}
              onChange={inputEvent}
            />


          </Grid>

          <Grid item xs={12} sm={6} md={3} lg={3}>

            <p className={`${registerNUmberErr ? "dangerText" : "notDanger"}`}>
              <i className="fa fa-warning"></i>This field is required.
            </p>

            <TextField
              fullWidth
              className={classes.root}
              name="registerNUmber"
              value={registerNUmber}
              id="outlined-required"
              label="REGISTER NUMBER"
              onChange={inputEvent}
            />


          </Grid>

          <Grid item xs={12} sm={6} md={3} lg={3}>
            <p

              className={`${busTypeErr ? "dangerText" : "notDanger"}`}
            >
              <i className="fa fa-warning"></i>This field is required.
            </p>
            <TextField
              id="outlined-required"
              select
              label="BUS TYPE"
              name="busType"
              value={busType}
              fullWidth
              className={classes.root}
              onChange={inputEvent}
            >
              {currencies.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>

          </Grid>
          <Grid item xs={12} sm={6} md={3} lg={3}>

            <p

              className={`${prizeErr ? "dangerText" : "notDanger"}`}
            >
              <i className="fa fa-warning"></i>This field is required.
            </p>

            <TextField
              fullWidth
              id="outlined-number"
              label="PRIZE (Ticket)"
              type="number"
              name="prize"
              value={prize}
              className={classes.root}
              onChange={inputEvent}
            />








          </Grid>

          <Grid item xs={12} sm={6} md={3} lg={3}>
            <p

              className={`${fromErr ? "dangerText" : "notDanger"}`}
            >
              <i className="fa fa-warning"></i>This field is required.
            </p>

            <TextField
              fullWidth
              id="outlined-required"
              label="FROM"
              name="from"
              value={from}
              className={classes.root}
              onChange={inputEvent}
            />

          </Grid>
          <Grid item xs={12} sm={6} md={3} lg={3}>
            <p

              className={`${toErr ? "dangerText" : "notDanger"}`}
            >
              <i className="fa fa-warning"></i>This field is required.
            </p>
            <TextField
              fullWidth
              id="outlined-required"
              label="TO"
              name="to"
              value={to}
              className={classes.root}
              onChange={inputEvent}
            />

          </Grid>

          <Grid item xs={12} sm={6} md={3} lg={3}>
            <p

              className={`${depTimeErr ? "dangerText" : "notDanger"}`}
            >
              <i className="fa fa-warning"></i>This field is required.
            </p>

            {/* <TextField
              fullWidth
              id="datetime"
              label="DEPARTURE TIME"
              type="datetime"
              defaultValue="2017-05-24"
              name="depTime"
              value={depTime}
              className={classes.root}
              InputLabelProps={{
                shrink: true,
              }}
              onChange={inputEvent}
            />
          */}

            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DateTimePicker
                renderInput={(props) => <TextField  fullWidth size='medium' className={classes.root} {...props} />}
                label="DEPARTURE TIME"
                 value={depTime}
                  onChange={(newValue) => {
                  setDepTime(newValue);
                }}
              />

            </LocalizationProvider>

          </Grid>
          <Grid item xs={12} sm={6} md={3} lg={3}>
            <p

              className={`${arrivTimeErr ? "dangerText" : "notDanger"}`}
            >
              <i className="fa fa-warning"></i>This field is required.
            </p>

            {/* <TextField
              fullWidth
              id="datetime"
              label="ARRIVAL TIME"
              type="datetime"
              name="arrivTime"
              value={arrivTime}

              className={classes.root}
              InputLabelProps={{
                shrink: true,
              }}
              onChange={inputEvent}
            /> */}

            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DateTimePicker
                renderInput={(props) => <TextField  fullWidth size='medium' className={classes.root} {...props} />}
                label="ARRIVAL TIME"

                value={arrivTime}
                onChange={(newValue) => {
                  setArraivTime(newValue);
                }}
              />

            </LocalizationProvider>

          </Grid>



        </Grid>
      </Container>





      <Container>

        <Grid sx={{ marginTop: 0 }} container spacing={3}>
          <Grid item xs={12} sm={6} md={3} lg={3}>
            <div style={{ display: "flex", justifyContent: "end" }}>
              {image1privew && (
                <img
                  src={image1privew}
                  alt="chosen"
                  style={{ width: "80px", marginBottom: "4px" }}
                />
              )}
            </div>
            <p className={`${image1Err ? "dangerText" : "notDanger"}`}>
              <i className="fa fa-warning"></i>This field is required.
            </p>
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
              {image2privew && (
                <img
                  src={image2privew}
                  alt="chosen"
                  style={{ width: "80px", marginBottom: "4px" }}
                />
              )}
            </div>
            <p className={`${image2Err ? "dangerText" : "notDanger"}`}>
              <i className="fa fa-warning"></i>This field is required.
            </p>
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
              {image3privew && (
                <img
                  src={image3privew}
                  alt="chosen"
                  style={{ width: "80px", marginBottom: "4px" }}
                />
              )}
            </div>
            <p className={`${image3Err ? "dangerText" : "notDanger"}`}>
              <i className="fa fa-warning"></i>This field is required.
            </p>
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
              {image4privew && (
                <img
                  src={image4privew}
                  alt="chosen"
                  style={{ width: "80px", marginBottom: "4px" }}
                />
              )}
            </div>
            <p className={`${image4Err ? "dangerText" : "notDanger"}`}>
              <i className="fa fa-warning"></i>This field is required.
            </p>
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

          <Grid item xs={12} sm={6} md={3} lg={3}>
            <p

              className={`${seatsErr ? "dangerText" : "notDanger"}`}
            >
              <i className="fa fa-warning"></i>This field is required.
            </p>
            <TextField
              fullWidth
              id="outlined-number"
              label="SEATS"
              name="seats"
              value={seats}
              type="number"
              className={classes.root}
              onChange={inputEvent}
            />



            <Typography sx={{ padding: 2, fontWeight: 900 }}>2: ADD PERMIT</Typography>
            <p className={`${permitErr ? "dangerText" : "notDanger"}`}>
              <i className="fa fa-warning"></i>This field is required.
            </p>
            <TextField
              fullWidth
              id="file"
              label="PERMIT"
              type="file"
              name="permit"
              value={permit}
              className={classes.root}
              InputLabelProps={{
                shrink: true,
              }}
              onChange={inputEvent}
            />


          </Grid>

          <Grid item xs={12} sm={6} md={3} lg={3}>
            {previewPermitSource && (
              <div>
                <img
                  src={previewPermitSource}
                  alt="permit"
                  style={{ width: "120px", border: "solid 3px orange" }}
                />
              </div>
            )}

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

            <Button variant="outlined" onClick={clearForm} endIcon={<CancelIcon />}>
              <strong>CANCEL</strong>
            </Button>
          </Box>
        </Box>
      </Container>
      {/* loder */}
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
        onClick={handleClose}
      >
        <CircularProgress color="inherit" />
      </Backdrop>

    </>
  );

};

export default AddBus;
