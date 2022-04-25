import { AppBar } from '@mui/material';
import axios from 'axios'

import Navbar from '../navbar/Navbar'

import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";

import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import { useNavigate } from "react-router-dom";
import Typography from "@mui/material/Typography";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import MoreIcon from "@mui/icons-material/MoreVert";
import { fontSize, margin, minWidth } from "@mui/system";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import AddLocationIcon from "@mui/icons-material/AddLocation";
import Button from "@mui/material/Button";

import "../../forms.css";
import "../searchBar/search.css";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress"
import { Puff, Oval } from 'react-loading-icons'

import Viewbusesuser from '../viewbus/Viewbuseuser'



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
  paddingBottom: 10,
  paddingTop: 0,
  paddingLeft: 10,
  paddingRight: 10,
};

const searchButton = {
  display: 'block'
}









function Notfound(props){

 
    const navigate = useNavigate();

    const [from, setFrom] = React.useState("");
    const [to, setTo] = React.useState("");
    const [date, setDate] = React.useState("");
   
    const [open, setOpen] = React.useState(false);
    const [fromErr, setFromErr] = React.useState(false)
    const [toErr, setToErr] = React.useState(false)
    const [dateErr, setDateErr] = React.useState(false)
    
    const [click,setClick]=  React.useState(false)
  
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
       
       
      
      } else {
        console.log('form full requerd')
      }
    };
  
  console.log(from ,to , date);




return click ? (
    <Viewbusesuser from={from} to={to} date={date} />
): (
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



                    
    <h1> NOT FOUND</h1>


  </>
);
}

export default Notfound;
