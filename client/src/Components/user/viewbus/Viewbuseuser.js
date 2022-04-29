import { useTheme } from '@mui/material/styles';
import AirlineSeatReclineExtraOutlinedIcon from '@mui/icons-material/AirlineSeatReclineExtraOutlined';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
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
import ManageSearchIcon from '@mui/icons-material/ManageSearch';
import List from '@mui/material/List';
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import AddLocationIcon from "@mui/icons-material/AddLocation";
import Button from "@mui/material/Button";
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import "../../forms.css";
import "../searchBar/search.css";
import Backdrop from "@mui/material/Backdrop";
import { Oval } from 'react-loading-icons'
import { ListItemText } from '@mui/material';

import Seats from "./buslayout/Seats"


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
  const [state, setState] = React.useState({ top: false });
  const [AC, setAc] = React.useState(true);
  const [NonAC, setNoneAc] = React.useState(true)
  const [dense, setDense] = React.useState(false)
  const [secondary, setSecondary] = React.useState(false);
  const [fiveAmToTenAm, setFiveAmToTenAm] = React.useState(true);
  const [tenAmToFivePm, setTenAmToFivePm] = React.useState(true);
  const [fivePmToElevenPm, setFivePmToElevenPm] = React.useState(true);
  const [afterElevenToFiveAm, setAfterElevenToFiveAm] = React.useState(true);
  const [pic, setPic] = React.useState(true);
  const [SelectSeats, setSelectSeats] = React.useState(false);

  // const [HtoL, setHtoL] = React.useState(false);
  // const [LtoH, setLtoH] = React.useState(false);
  // const [none, setNone] = React.useState(false);

  // useEffect(() => {
  //   console.log(selectedSeates);
  // }, [selectedSeates])


  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  // function listSort() {
  //   if (!none) {
  //     setLtoH(false)
  //     setHtoL(true)
  //   } else {
  //     setLtoH(false)
  //     setHtoL(false)
  //   }

  //   if (HtoL) {
  //     busResult.sort((a, b) => {
  //       return a.prize - b.prize;


  //     });
  //   } else if (LtoH) {
  //     busResult.sort((a, b) => {
  //       return b.prize - a.prize;


  //     });
  //   }

  // }





  const list = (anchor) => (
    <Box
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
      role="presentation"
    // onClick={toggleDrawer(anchor, false)}

    >
      <List>

        <ListItem >
          <ListItemIcon>
            <ManageSearchIcon />
          </ListItemIcon>
          <strong>Filters</strong>

        </ListItem>

      </List>
      <Divider />
      <List>
        <strong style={{ marginLeft: "20px" }}>Bus Type</strong>
        <ListItem >

          <FormGroup row>


            <FormControlLabel
              control={
                <Checkbox
                  checked={AC}
                  onChange={(event) => setAc(event.target.checked)}
                />
              }
              label="AC"

            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={NonAC}
                  onChange={(event) => setNoneAc(event.target.checked)}
                />
              }
              label="Non AC"
            />
          </FormGroup>


        </ListItem>

      </List>
      <Divider />
      <List>
        <strong style={{ marginLeft: "20px" }}>Departure Time</strong>
        <ListItem >

          <FormGroup row>


            <FormControlLabel
              control={
                <Checkbox
                  checked={fiveAmToTenAm}
                  onChange={(event) => setFiveAmToTenAm(event.target.checked)}
                />
              }
              label="Before 10 am"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={tenAmToFivePm}
                  onChange={(event) => setTenAmToFivePm(event.target.checked)}
                />
              }
              label="10 to 5 pm"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={fivePmToElevenPm}
                  onChange={(event) => setFivePmToElevenPm(event.target.checked)}
                />
              }
              label="5 to 11 pm"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={afterElevenToFiveAm}
                  onChange={(event) => setAfterElevenToFiveAm(event.target.checked)}
                />
              }
              label="After 11 pm"
            />
          </FormGroup>


        </ListItem>

      </List>
      <Divider />
      {/* <List>
        <strong style={{ marginLeft: "20px" }}> Price</strong>
        <ListItem >

          <FormGroup row>


            <FormControlLabel
              control={
                <Checkbox
                  checked={LtoH}
                  onChange={(event) => {

                    setLtoH(event.target.checked)
                    setHtoL(!event.target.checked)

                   
                    // show()
                  }}
                />
              }
              label="Low to High"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={HtoL}
                  onChange={(event) => {

                    setHtoL(event.target.checked)
                    setLtoH(!event.target.checked)
                    
                 
                  }}
                />
              }
              label="High to Low"
            />
           

          </FormGroup>


        </ListItem>

      </List> */}

    </Box>
  );



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

            for (let i = 0; i < busResult.lenght; i++) {
              console.log(busResult[i].prize, "========*", i);

            }
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

          for (let i = 0; i < busResult.lenght; i++) {
            console.log(busResult[i].prize, "========*", i);

          }
        } else {
          navigate('/user/search/notfoud')
        }
      })
  }, [])

  console.log("------", busResult);

  // let selectedList =(a)=>{
  //   alert("hai")
  //   console.log(a);
  //   return (
  //     <>
    
  //   <span>{a}</span>
    
    
  //     </>
  //   )
  // }



  let busList = (bus) => {
    return (
      <>  <Card sx={{ display: 'flex' }}>
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
                    <strong>{bus.dTime}</strong>  <i style={{ color: "gray" }} class="fa-solid fa-grip-lines-vertical"></i> <strong>{bus.days}</strong> <i style={{ color: "gray" }} class="fa-solid fa-grip-lines-vertical"></i>  <strong>{bus.arraivaltime} </strong>
                  </Typography>
                </Box>
                <div style={{ display: "flex", justifyContent: "end", alignItems: "center", width: "100%", height: "80%" }}>
                  <div style={{ display: "block", marginRight: 50 }}>
                    <Stack direction="row" spacing={1}>
                      {pic ? (<Chip onClick={() => {
                        setPic(!pic)
                        setSelectSeats(false)
                      }} label="Hide Images" />) : (
                        <Chip onClick={() => {
                          setPic(!pic)
                          setSelectSeats(false)
                        }} label="Show Images" />
                      )}
                      < Chip style={{ cursor: 'pointer' }} label="Review" />

                      <Chip onClick={() => {
                         navigate(`/seatslayout/${bus.id}`)
                        // setPic(false)
                        // setSelectSeats(true)
                      }} style={{ backgroundColor: "#2b5ebd", color: "white", cursor: 'pointer' }} label="Select seats" />

                    </Stack>
                  </div>
                </div>

              </Grid>



              <Grid item xs={12} sm={2} md={2} lg={2}>

                <Chip align="center" sx={{ fontSize: 20, fontWeight: "border", marginRight: "5px" }} label={`₹${bus.prize}`} />



              </Grid>




            </Grid>

          </CardContent>

        </Box>




      </Card>

        <Grid style={Wraper} container spacing={2}>
          <Grid item xs={12} sm={12} md={12} lg={12}>

            {pic ? (<Accordion>
              <AccordionSummary

                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Chip label="Bus Photos" />
              </AccordionSummary>

              <Grid style={Wraper} container spacing={2}>



                <Grid item xs={12} sm={6} md={3} lg={3}>
                  <img
                    src={bus.image1}
                    alt="chosen"
                    style={{ width: "250px", marginBottom: "4px" }}
                  />
                </Grid>


                <Grid item xs={12} sm={6} md={3} lg={3}>
                  <img
                    src={bus.image2}
                    alt="chosen"
                    style={{ width: "250px", marginBottom: "4px" }}
                  />
                </Grid>


                <Grid item xs={12} sm={6} md={3} lg={3}>
                  <img
                    src={bus.image3}
                    alt="chosen"
                    style={{ width: "250px", marginBottom: "4px" }}
                  />
                </Grid>



                <Grid item xs={12} sm={6} md={3} lg={3}>
                  <img
                    src={bus.image4}
                    alt="chosen"
                    style={{ width: "250px", marginBottom: "4px" }}
                  />
                </Grid>



              </Grid>




            </Accordion>) 
            : ""}

            {/* {SelectSeats ? (<Accordion >
              <AccordionSummary

                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Chip label="Click to select your seat  " />
              </AccordionSummary>

              



            </Accordion>) : ""} */}

          </Grid>

        </Grid>

      </>
    )
  }



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
              marginBottom: "20px"
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
              <Grid item xs={12} sm={2} md={2} lg={2}>
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
              <Grid item xs={12} sm={2} md={2} lg={2}>
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
              <Grid item xs={12} sm={2} md={2} lg={2}>
                <Button onClick={submitForm} sx={{ width: { sm: '100%', xs: '100%' }, marginTop: { sm: "10px" } }} variant="contained" disableElevation>

                  <strong>SEARCH</strong>
                </Button>
              </Grid>

              <Grid item xs={12} sm={2} md={2} lg={2}>
                <React.Fragment key="left">

                  <Button sx={{ width: { sm: '100%', xs: '100%' }, marginTop: { sm: "10px" } }} variant="outlined" disableElevation onClick={toggleDrawer("left", true)}>
                    <ManageSearchIcon /> Filter </Button>
                  <Drawer
                    anchor={"left"}
                    open={state["left"]}
                    onClose={toggleDrawer("left", false)}
                  >
                    {list("left")}
                  </Drawer>
                </React.Fragment>

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



        <Container sx={{
          marginTop: "20px"
        }}>

          {


            (
              busResult.map((bus) => {

                if (AC && bus.bustype === "AC") {
                  if (fiveAmToTenAm && bus.fiveAmToTenAm) {
                    return busList(bus)
                  } else if (tenAmToFivePm && bus.tenAmToFivePm) {
                    return busList(bus)
                  } else if (fivePmToElevenPm && bus.fivePmToElevenPm) {
                    return busList(bus)
                  } else if (afterElevenToFiveAm && bus.afterElevenToFiveAm) {
                    return busList(bus)
                  }

                } else if (NonAC && bus.bustype === "NON AC") {
                  if (fiveAmToTenAm && bus.fiveAmToTenAm) {
                    return busList(bus)
                  } else if (tenAmToFivePm && bus.tenAmToFivePm) {
                    return busList(bus)
                  } else if (fivePmToElevenPm && bus.fivePmToElevenPm) {
                    return busList(bus)
                  } else if (afterElevenToFiveAm && bus.afterElevenToFiveAm) {
                    return busList(bus)
                  }
                }

              }))

          }







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



