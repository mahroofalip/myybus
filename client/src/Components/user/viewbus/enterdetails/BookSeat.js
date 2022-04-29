import Grid from "@mui/material/Grid";
import React, { useEffect, useState, useReducer } from "react";
import { Button, Box, Container, Typography } from "@mui/material";
import Navbar from "../../navbar/Navbar";
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
const Wraper = {
  backgroundColor: "#fff",
  padding: 10,
  border: 20
}

const Gender = [
  {
    value: 'Male',
    label: 'Male',
  },
  {
    value: 'Female',
    label: 'Female',
  },
  {
    value: 'Other',
    label: 'Other',
  }
];




export default function AddPassangers({ data }) {


   


  const [from, setFrom] = useState(data.fromstart)
  const [to, setTo] = useState(data.toend)
  const [busname, setBusName] = useState(data.busname)
  const [seats, setSeats] = useState(data.SelectedSeats)
  const [passangersDetails, dispath] = useReducer(reducer, data.TicketsInfo)


  const InputHandle = (key, value, index) => {

    dispath({ key, value, index })

  }




  function reducer(state, action) {
    console.log("state   :", state);
    console.log("action  :", action);
    let arr1 = state
    let inputName = action.key
    let inputValue = action.value
    let ind = action.index
  
    switch (ind) {
      case 0:
   
  
       
        if (inputName === "name") {
          arr1[ind].Name = inputValue
         
        } else if (inputName === "age") {
          arr1[ind].Age = inputValue
         
        } else {
          arr1[ind].gender = inputValue
          return arr1
        }
  
  
        break;
      case 1:
     
       
       
        if (inputName === "name") {
          arr1[ind].Name = inputValue
          return arr1
        } else if (inputName === "age") {
          arr1[ind].Age = inputValue
          return arr1
        } else {
          arr1[ind].gender = inputValue
         
        }
  
        break;
      case 2:
      
       
       
        if (inputName === "name") {
          arr1[ind].Name = inputValue
         
        } else if (inputName === "age") {
          arr1[ind].Age = inputValue
         
        } else {
          arr1[ind].gender = inputValue
         
        }
  
        break;
      default:
        alert("Nothing to update")
    }
  
   
    return arr1
  }
  


  
  console.log(passangersDetails, ":    ***************  ");
  
  return (
    <>
      <Navbar />

      <div style={{ backgroundColor: "#fff" }}>

        <Container>


          <Grid style={Wraper} container spacing={2}>

            <Grid item xs={12} sm={7} md={7} lg={7}>
              <Typography style={{ color: "brown" }}> <h1  >{from} <ArrowRightAltIcon style={{ color: "brown" }} /> {to}</h1> </Typography>
              <Typography > <h1 style={{ color: "black" }}  >{busname} </h1> </Typography>
              <Typography component="div" variant="h6">
                <strong>{data.departuretime}</strong>  <ArrowRightAltIcon style={{ marginTop: "20px" }} />  <strong>{data.arraivaltime} </strong>
              </Typography>




            </Grid>

            <Grid item xs={12} sm={5} md={5} lg={5}>

              <Box
                sx={{
                  width: "100%",
                  backgroundColor: "white",
                  height: 200,

                  boxShadow: 7,
                }}
              >


                <div style={{ padding: "10px", backgroundColor: "#d7f6fa", display: "flex", justifyContent: "center" }}>
                  <Button
                    variant="contained"
                    sx={{ backgroundColor: "blue", color: "white" }}
                  >
                    CONTINUE TO BOOK NOW
                  </Button>
                </div>
                <strong style={{ padding: "20px" }}>
                  <Container style={{ display: "flex", justifyContent: "space-between" }}>

                    <span>Total fare</span>
                    <span>₹ 565</span>
                  </Container>
                  <Container style={{ display: "flex", justifyContent: "space-between" }}>

                    <span>Searvice charge</span>
                    <span>₹ 774</span>
                  </Container>
                  <Container style={{ display: "flex", justifyContent: "space-between" }}>

                    <span>Total Base fare</span>
                    <span>₹ 255</span>
                  </Container>
                </strong>

              </Box>

            </Grid>

          </Grid>
          <Grid style={Wraper} container spacing={2}>
            <Grid item xs={12} sm={12} md={6} lg={6}>

              <Typography ><strong>Enter Traveller Details</strong> </Typography>

              {passangersDetails.map((ticket, index) => {
              
           

                return (
                  <div style={{ marginTop: "20px" }}>

                    <Typography sty><strong> Seat No :{ticket.seatNo}</strong> </Typography>

                    <Box
                      sx={{
                        width: "100%",
                        backgroundColor: "white",
                        height: "auto",
                        boxShadow: 7,
                      }}
                    >

                      <div style={{ padding: "30px" }}>
                        <Grid style={Wraper} container spacing={2}>
                          <Grid item xs={12} sm={5} md={5} lg={5}>
                            <TextField
                              name="name"
                              fullWidth
                              value={ticket.Name}
                              required
                              id="outlined-required"
                              label="Name"
                              defaultValue="Enter your name"
                              onChange={(e) => {

                                InputHandle(e.target.name, e.target.value, index)
                              }
                              }
                            />
                          </Grid>
                          <Grid item xs={12} sm={4} md={4} lg={4}>
                            <TextField
                              name="age"
                              fullWidth
                              id="outlined-number"
                              value={ticket.Age}
                              label="Age"
                              type="number"
                              InputLabelProps={{
                                shrink: true,
                              }}
                              onChange={(e) => {
                                InputHandle(e.target.name, e.target.value, index)
                              }
                              }

                            />
                          </Grid>
                          <Grid item xs={12} sm={3} md={3} lg={3}>
                            <TextField
                              fullWidth
                              id="outlined-select-currency"
                              select
                              name="gender"
                              label="Gender"
                              value={ticket.gender}
                              onChange={(e) => {

                                InputHandle(e.target.name, e.target.value, index)
                              }
                              }

                            >
                              {Gender.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                  {option.label}
                                </MenuItem>
                              ))}
                            </TextField>
                          </Grid>
                        </Grid>
                      </div>



                    </Box>
                  </div>
                )
              })}

            </Grid>
          </Grid>
        </Container>



      </div>

    </>
  );
}







