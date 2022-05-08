import Grid from "@mui/material/Grid";
import React, { useEffect, useState, useReducer } from "react";
import { Button, Box, Container, Typography } from "@mui/material";
import Navbar from "../../navbar/Navbar";
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import TextField from '@mui/material/TextField';
import { useNavigate } from "react-router-dom";
import MenuItem from '@mui/material/MenuItem';
import Checkout from '../../checkout/Checkout'
// import './bookseat.css'
// import Store from '../../../../redux/Store'
// import { useDispatch } from 'react-redux'
// import { setBookDetails } from '../../../../redux/checkoutState/checkoutSlice'
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
  // let dispatch = useDispatch()
  const navigate = useNavigate();
  const [from, setFrom] = useState(data.fromstart)
  const [to, setTo] = useState(data.toend)
  const [busname, setBusName] = useState(data.busname)
  const [passangers, setPassenger] = useState([...data.TicketsInfo])
  const [email, setEmail] = useState("")
  const [mobile, setMobile] = useState("")
  const [emErr, setEmErr] = useState('')
  const [mbErr, setMbErr] = useState('')

  const [click, setClick] = useState(false)

  const updateFieldChanged = index => e => {
    console.log('index: ' + index);

    let newArr = [...passangers];
    if (e.target.name === 'name') newArr[index].Name = e.target.value;
    if (e.target.name === 'age') newArr[index].Age = e.target.value;
    if (e.target.name === 'gender') newArr[index].gender = e.target.value;

    setPassenger(newArr);
  }


  const submitForm = (e) => {
    e.preventDefault();



    let flag = 0
    for (let i = 0; i < passangers.length; i++) {

      if (passangers[i].Name === '') {
        passangers[i].NameErr = 'Name is required'
        passangers[i].NameStatusErr = true
        flag++
      } else {
        passangers[i].NameErr = ''
        passangers[i].NameStatusErr = false

      }
      if (passangers[i].Age === '') {
        passangers[i].AgeErr = 'Age is required'
        passangers[i].AgeStatusErr = true
        flag++
      } else {
        passangers[i].AgeErr = ''
        passangers[i].AgeStatusErr = false
      }

    }



    if (email === '') {
      setEmErr('Fild required')
      flag = 1
    } else {

      let em = email.split("").reverse().join("");

      if (em.length < 6) {

        setEmErr('Enter Valid email')
        flag = 1

      } else {

        let em1 = em.includes("@");
        let em2 = em.includes('moc.')
        if (em1 && em2) {
          setEmErr('')
        } else {
          flag = 1
          setEmErr('Enter valid email')
        }

      }

    }
    if (mobile === '') {
      flag = 1
      setMbErr('Fild required')
    } else {

      if (mobile.length === 10) {

        setMbErr('')

      } else {

        flag = 1
        setMbErr('Enter valid number')

      }

    }

    if (flag === 0) {

      data.userContact.email = email
      data.userContact.mobile = mobile

      setPassenger([...passangers])
    
      // dispatch(setBookDetails({data:data}))

      setClick(true)
    } else {
     
      // setClick(false)
      setPassenger([...passangers])
    }

    flag = 0

  };


  console.log(data, 'ALL DETAILS');


  const InputContact = (e) => {
    if (e.target.name === 'email') {
      setEmail(e.target.value)
    } else if (e.target.name === 'mobile') {
      setMobile(e.target.value)
    }
  }


  return click ? (
    <Checkout bookInfo={data} />
  ) : (
    <>

      <Navbar />

      <div style={{ backgroundColor: "#fff" }}>

        <Container>


          <Grid style={Wraper} container spacing={2}>

            <Grid item xs={12} sm={12} md={7} lg={7}>
              <Typography style={{ color: "brown" }}> <h1  >{from} <ArrowRightAltIcon style={{ color: "brown" }} /> {to}</h1> </Typography>
              <Typography > <h1 style={{ color: "black" }}  >{busname} </h1> </Typography>
              <Typography component="div" variant="h6">
                <strong>{data.departuretime}</strong>  <ArrowRightAltIcon style={{ marginTop: "20px" }} />  <strong>{data.arraivaltime} </strong>
              </Typography>




            </Grid>

            <Grid item xs={12} sm={12} md={5} lg={5}>

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
                    onClick={submitForm}
                  >
                    CONTINUE TO BOOK NOW
                  </Button>
                </div>
                <strong style={{ padding: "20px" }}>
                  <Container style={{ display: "flex", justifyContent: "space-between" }}>

                    <span>Total fare</span>
                    <span>₹{data.Total}</span>
                  </Container>
                  <Container style={{ display: "flex", justifyContent: "space-between" }}>

                    <span>Service charge</span>
                    <span style={{ color: "green" }}>Free</span>
                  </Container>
                  <Container style={{ display: "flex", justifyContent: "space-between" }}>

                    <span>Total Base fare</span>
                    <span>₹{data.Total}</span>
                  </Container>
                </strong>

              </Box>

            </Grid>

          </Grid>
          <Grid style={Wraper} container spacing={2}>
            <Grid item xs={12} sm={12} md={6} lg={6}>

              <Typography ><strong>Enter Traveller Details</strong> </Typography>


              {passangers.map((passanger, index) => {



                return (
                  <div style={{ marginTop: "20px" }}>

                    <Typography sty><strong> Seat No :{passanger.seatNo}</strong> </Typography>

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
                              value={passanger.Name}
                              required
                              id="outlined-required"
                              label="Name"
                              defaultValue="Enter your name"
                              onChange={updateFieldChanged(index)}

                            />
                            {passanger.NameStatusErr ? <p style={{ color: "red", marginTop: "5px" }}>Field required</p> : ""}
                          </Grid>
                          <Grid item xs={12} sm={4} md={4} lg={4}>

                            <TextField
                              name="age"
                              fullWidth
                              id="outlined-number"
                              value={passanger.Age}
                              label="Age"
                              type="number"
                              InputLabelProps={{
                                shrink: true,
                              }}

                              onChange={updateFieldChanged(index)}
                            />
                            {passanger.AgeStatusErr ? <p style={{ color: "red", marginTop: "5px" }}>Field required</p> : ""}
                          </Grid>
                          <Grid item xs={12} sm={3} md={3} lg={3}>
                            <TextField
                              fullWidth
                              id="outlined-select-currency"
                              select
                              name="gender"
                              label="Gender"
                              value={passanger.gender}

                              onChange={updateFieldChanged(index)}
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

            <Grid item xs={12} sm={12} md={6} lg={6}>

              <div style={{ marginTop: "45px" }}>
                <Typography sty><strong>Enter Contact Details</strong> </Typography>
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
                      <Grid item xs={12} sm={12} md={6} lg={6}>

                        <TextField
                          name="email"
                          fullWidth
                          type="email"
                          required
                          id="outlined-required"
                          label="Enter your email"
                          value={email}
                          onChange={InputContact}

                        />
                        {emErr ? <p style={{ color: "red", marginTop: "5px" }}>{emErr}</p> : ""}
                      </Grid>
                      <Grid item xs={12} sm={12} md={6} lg={6}>

                        <TextField
                          name="mobile"
                          fullWidth
                          required
                          id="outlined-required"
                          label="Enter your mobile"
                          value={mobile}
                          onChange={InputContact}


                        />
                        {mbErr ? <p style={{ color: "red", marginTop: "5px" }}>{mbErr}</p> : ""}
                      </Grid>
                    </Grid>
                  </div>



                </Box>
              </div>
            </Grid>

          </Grid>
        </Container>



      </div >

    </>
  );
}







