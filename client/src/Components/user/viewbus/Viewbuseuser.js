import { useTheme } from '@mui/material/styles';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import AirlineSeatReclineExtraOutlinedIcon from '@mui/icons-material/AirlineSeatReclineExtraOutlined';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import Notfound from './Notfound';
import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import Divider from '@mui/material/Divider';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import Grid from "@mui/material/Grid";
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Input from "@mui/material/Input";

import CircularProgress from '@mui/material/CircularProgress';
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";

import AddLocationIcon from "@mui/icons-material/AddLocation";
import Button from "@mui/material/Button";
import CardActions from '@mui/material/CardActions';
import "../../forms.css";
import "../searchBar/search.css";
import Backdrop from "@mui/material/Backdrop";

import { Oval } from 'react-loading-icons'

const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
);



const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  backgroundColor: "#012169",
  "@media all": {
    minHeight: 100,
  },
}));

const Wraper = {
  padding: 10,
  border: 20,
};

const inputStyle = {
  color: "black",
  fontWeight: "bold",
  minHeight: 50,
};

const black = {
  color: "black",
};
const outerWrapper = {
  paddingBottom: 0,
  paddingTop: 0,
  paddingLeft: 10,
  paddingRight: 10,
};

const searchButton = {
  display: 'block'
}




function Viewbusesuser(props) {
  const theme = useTheme();


  const navigate = useNavigate();

  const [status, setStatus] = useState()
  const [busResult, setBusResult] = useState()
  const [click, setClick] = React.useState(false)
  const [from, setFrom] = React.useState("");
  const [to, setTo] = React.useState("");
  const [date, setDate] = React.useState("");

  const [open, setOpen] = React.useState(false);
  const [fromErr, setFromErr] = React.useState(false)
  const [toErr, setToErr] = React.useState(false)
  const [dateErr, setDateErr] = React.useState(false)





  const handleClose = () => {
    setOpen(false);
  };
  const handleToggle = () => {
    setOpen(!open);
  };





  const inputEvent = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    if (name === "from") {
      setFrom(value);
    }
    if (name === "to") {
      setTo(value);
    }

    if (name === "date") {
      setDate(value);
    }


  };



  const submitForm = (e) => {
    e.preventDefault();
    let error = false;

    if (from.trim() === "") {
      setFromErr(true);
      error = true;
    } else {
      setFromErr(false);
    }

    if (to.trim() === "") {
      setToErr(true);
      error = true;
    } else {
      setToErr(false);
    }
    if (date === "") {
      setDateErr(true);
      error = true;
    } else {
      setDateErr(false);
    }

    if (!error) {

      setClick(true)
      setOpen(!open)
      axios
        .post("http://localhost:3001/user/bus/search", { from, to, date }).then((response) => {
          setOpen(false)
          setStatus(response.data.status)
          if (response.data.status) {
            setBusResult(response.data.result)
          } else {
            console.log("no result", response.data.status);
            navigate('/user/search/notfoud')
          }
        })


    } else {
      console.log('form full requerd')
    }
  };

  useEffect(() => {
    setOpen(!open)
    axios
      .post("http://localhost:3001/user/bus/search", props).then((response) => {
        console.log(response.data);
        setOpen(false)
        setStatus(response.data.status)
        if (response.data.status) {
          setBusResult(response.data.result)
        } else {
          navigate('/user/search/notfoud')
        }
      })
  }, [])

  console.log("------", busResult);

  return status ?
    (
      <>
        <StyledToolbar style={outerWrapper}>
          <Box
            style={{
              backgroundColor: "#fff",

              border: 10,
              borderRadius: 20,
            }}
            sx={{
              flexGrow: 1,
              marginLeft: { md: "20px" },
              marginRight: { md: "20px" },
            }}
          >

            <Grid style={Wraper} container spacing={2}>
              <Grid item xs={12} sm={3} md={3} lg={2}>
                <FormControl className="input" variant="standard">

                  <Input
                    className={` ${fromErr ? "warning" : "nowarning"}`}
                    style={inputStyle}
                    placeholder="From"
                    name="from"
                    value={from}
                    onChange={inputEvent}
                    id="input-with-icon-adornment"
                    startAdornment={
                      <InputAdornment position="start">
                        <AddLocationIcon style={black} />
                      </InputAdornment>
                    }
                  />

                </FormControl>
              </Grid>
              <Grid item xs={12} sm={3} md={3} lg={2}>
                <FormControl className="input" variant="standard">
                  <Input
                    className={` ${toErr ? "warning" : "nowarning"}`}
                    style={inputStyle}
                    placeholder="To"
                    name="to"
                    value={to}
                    onChange={inputEvent}
                    id="input-with-icon-adornment"
                    startAdornment={
                      <InputAdornment position="start">
                        <AddLocationIcon style={black} />
                      </InputAdornment>
                    }
                  />

                </FormControl>
              </Grid>
              <Grid item xs={12} sm={3} md={3} lg={2}>
                <FormControl className="input" variant="standard">
                  <Input
                    className={` ${dateErr ? "warning" : "nowarning"}`}
                    name="date"
                    value={date}
                    style={inputStyle}
                    placeholder="Travel Date"
                    id="input-with-icon-adornment"
                    type="date"
                    onChange={inputEvent}
                    startAdornment={
                      <InputAdornment position="start"></InputAdornment>
                    }
                  />

                </FormControl>
              </Grid>
              <Grid item xs={12} sm={3} md={3} lg={2}>
                <Button onClick={submitForm} sx={{ width: { sm: '100%', xs: '100%' }, marginTop: { sm: "10px" } }} variant="contained" disableElevation>

                  <strong>SEARCH</strong>
                </Button>
              </Grid>

            </Grid>

          </Box>
          <Backdrop
            sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={open}
            onClick={handleClose}
          >
            <Oval Height={"3em"} stroke="#06bcee" strokeOpacity={1} speed={1} strokeWidth={2} fillOpacity={1} fill={"rgba(0, 0, 0, 1)"} />
          </Backdrop>
        </StyledToolbar>



        <Container>
          {busResult.map((bus) => {
            return <> <Card sx={{ display: 'flex' }}>
              <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <CardContent sx={{ flex: '1 0 auto' }}>
                  <Grid style={Wraper} container spacing={2}>
                    <Grid item xs={12} sm={3} md={3} lg={3}>
                      <Typography component="div" variant="h6">
                        <strong>{bus.busname}</strong>
                      </Typography>
                      <Typography color="text.secondary" component="div">
                        {bus.bustype} BUS
                      </Typography>
                      <Typography variant="subtitle1" color="text.secondary" component="div">
                        <strong> {bus.fromstart} <ArrowRightAltIcon style={{ position: 'relative', top: "6px" }} /> {bus.toend} </strong>

                        <strong style={{ display: "block" }}> <AirlineSeatReclineExtraOutlinedIcon style={{ backgroundColor: "black", color: "white" }} /> 30 seats left </strong>
                      </Typography>
                    </Grid>


                    <Grid item xs={12} sm={6} md={6} lg={7} style={{ padding: 20 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
                        <Typography component="div" variant="h6">
                          <strong>{bus.departuretime}</strong>  <i style={{ color: "gray" }} class="fa-solid fa-grip-lines-vertical"></i> <strong>{bus.days}</strong> <i style={{ color: "gray" }} class="fa-solid fa-grip-lines-vertical"></i>  <strong>{bus.arraivaltime} </strong>
                        </Typography>
                      </Box>
                      <div style={{ display: "flex", justifyContent: "end", alignItems: "center", width: "100%", height: "80%" }}>
                        <div style={{ display: "block", marginRight: 50 }}>
                          <Stack direction="row" spacing={1}>
                            <Chip label="Review" />
                            <Chip label="Bus Photos" />
                          
                          </Stack>
                        </div>
                      </div>

                    </Grid>



                    <Grid item xs={12} sm={2} md={2} lg={2}>
                    <div sx={{marginTop:"10px"}}>
                    <Chip  sx={{  fontSize: 20,fontWeight:"border" }} label={`₹${bus.prize}`} />
                      
                      <button style={{backgroundColor:"#012169",color:"white", padding:"5px",borderRadius:5,cursor:'pointer'}}>Select seats</button>
                   


                    </div>
                     
                    </Grid>

                  </Grid>


                </CardContent> 

              </Box>




            </Card>
              <Divider /></>
          })}






        </Container>
      </>
    ) :
    <>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
        onClick={handleClose}
      >
        <Oval Height={"3em"} stroke="#06bcee" strokeOpacity={1} speed={1} strokeWidth={2} fillOpacity={1} fill={"rgba(0, 0, 0, 1)"} />
      </Backdrop>
    </>


}

export default Viewbusesuser;



