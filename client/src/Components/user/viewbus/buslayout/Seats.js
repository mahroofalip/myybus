import Grid from "@mui/material/Grid";
import React, { useEffect, useState } from "react";
import SquareIcon from '@mui/icons-material/Square';
import AirlineSeatReclineExtraOutlinedIcon from '@mui/icons-material/AirlineSeatReclineExtraOutlined';
import './seats.css'
import Box from "@mui/material/Box";
import { Button, Container, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom"
import { useParams } from "react-router-dom";
import axios from "axios";
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import Navbar from "../../navbar/Navbar"
import AddPassangers from "../enterdetails/BookSeat";
import jwt_decode from "jwt-decode";

const Wraper = {
  backgroundColor: "#d1d4c3",
  padding: 10,
  border: 20
}
export default function SeatSelection() {
  const navigate = useNavigate()
  const [name, setName] = useState([]);
  const [gender, setGender] = useState([]);
  const [busResult, setBusResult] = useState()
  const [seatNumber, setSeatnumber] = useState([]);
  const [next, setNext] = useState(false)
  const { selectedBusId } = useParams()
  const [reservedSeat, setReservedSeat] = useState("");
  const [from, setFrom] = useState("")
  const [to, setTo] = useState("")
  const [busname, setBusName] = useState("")
  const [seatsCont, setSeats] = useState(0)
  const [seatsArray, setSeatsArray] = useState([])
  const [ticketInfo, setTicketInfo] = useState([])
  const [userInfo, setUserInfo] = useState()
  const [baseDate, setBaseDate] = useState()
  const [bookedsts, setBookedSts] = useState([])
  useEffect(() => {

    axios.post("http://localhost:3001/user/bus/getOne", { id: selectedBusId }).then(async (response) => {

      console.log(response.data, ': yyyyyyyyyyyyyyyyyyyyyyyyyytt');
      setBusResult(response.data.bus)
      setFrom(response.data.bus.fromstart)
      setTo(response.data.bus.toend)
      setSeats(response.data.bus.seats)
      setBusName(response.data.bus.busname)
      setBusName(response.data.bus.busname)
      setBaseDate(response.data.bus.baseDpDate)

      let token = localStorage.getItem("userToken")
      if (token) {
        var decoded = jwt_decode(token);
        setUserInfo(decoded)
      } else {
        navigate('/login')
      }

      let bookeds = await axios.post("http://localhost:3001/bookedSeates", { id: selectedBusId, dDate: response.data.bus.departuretime }).then((response) => {

        setBookedSts(response.data.bookedseats)
      })


      if (!seatsArray[1]) {
        let st = parseInt(response.data.bus.seats) // totl seat

        while (st > 0) {

          let smallArray = []
          for (let j = 0; j < 4; j++) {
            if (st === 0) {

            } else {
              smallArray.push(st)
              st--
            }


          }
          seatsArray.push(smallArray)


        }

      }



    })
  }, [])

  // console.log(seatsArray, 'ppppppppppppppppppppppppppppppppp');

  console.log(bookedsts, 'Booeked seats state yyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy');
  const getSeatNumber = (e) => {

    let newSeat = e.target.value;



    if (seatNumber.includes(newSeat)) {

      let index = seatNumber.indexOf(newSeat)

      seatNumber.splice(index, 1)
      ticketInfo.splice(index, 1)
      setSeatnumber([...seatNumber]);
      setTicketInfo([...ticketInfo])

    } else {

      let obj = {
        seatNo: newSeat,
        Name: "",
        Age: "",
        gender: "Male",
        NameErr: '',
        NameStatusErr: false,
        AgeErr: '',
        AgeStatusErr: false

      }

      setSeatnumber([...seatNumber, newSeat]);
      setTicketInfo([...ticketInfo, obj])

    }
  }
  console.log(seatNumber);
  const handleGender = (e, seatNo) => {
    const { value } = e.target;
    setGender(gender.concat(value));

  };

  const handlePassengerName = (e, seatNo) => {
    e.preventDefault();
    let value = e.target.value;

    if (!value) {
      return setName("name is required");
    } else {
      setName(name.concat(value));
      // setPassengers(prevState => ({ ...prevState, SeatNo: seatNo, Name: value }))
    }
  };
  const handleSubmitDetails = (e) => {
    if (seatNumber[0]) {

      busResult.SelectedSeats = seatNumber
      busResult.TicketsInfo = ticketInfo
      busResult.Total = busResult.prize * seatNumber.length
      busResult.userInfo = userInfo
      busResult.userContact = { email: "", mobile: "" }
      busResult.baseDate = baseDate

      setNext(true)
    } else {
      alert("please select atleast one seat")
    }

  }




  console.log(busResult, 'kkkkkkkuuuuuttettettggf');

  return next ? (<AddPassangers data={busResult} />) : (
    <>


      <Navbar />
      <div style={{ backgroundColor: "#d1d4c3" }}>
        <Container style={{ color: "brown" }}> <h1 align="center" >{from} <ArrowRightAltIcon /> {to}</h1> </Container>
        <Container style={{ color: "black" }}> <h1 align="center" >{busname} </h1> </Container>
      </div>

      <Grid style={Wraper} container spacing={2}>

        <Grid item xs={12} sm={12} md={2} lg={2}>
          <div> <SquareIcon style={{ color: "blue" }} />  <Typography component="span">Booked Seats</Typography> </div>
          <div> <SquareIcon style={{ color: "#00771a" }} /> <Typography component="span">Selected Seats</Typography> </div>
          <div> <SquareIcon style={{ color: "#9cc613" }} />  <Typography component="span">Avalable Seats</Typography> </div>
          <div>  <AirlineSeatReclineExtraOutlinedIcon /> <Typography component="span"><span>Total Seats : {seatsCont}</span></Typography> </div>
        </Grid>
        <Grid item xs={12} sm={12} md={3} lg={3}>
          <div className="column1">
            <div className="plane">
              <form onChange={(e) => getSeatNumber(e)}>


                <ol className="cabin fuselage">

                  {seatsArray.map((array) => {
                    return (
                      <>
                        <li className="row row--1">
                          <ol className="seats" type="A">


                            {

                              array.map((seat) => {

                                for (let i = 0; i < bookedsts.length; i++) {

                                  if (bookedsts[i] === seat) {

                                    console.log(seat, ":   44444444444444444444444444  :", bookedsts[i]);

                                    return (
                                      <li className="seat">

                                        <label style={{ backgroundColor: "blue", color: "white" }} htmlFor={seat}>{seat}</label>
                                      </li>
                                    )
                                  }

                                }


                                return (
                                  <li className="seat">
                                    {reservedSeat.indexOf(seat) >= 0 ? <input disabled type="checkbox" value={seat} id={seat} /> : <input type="checkbox" value={seat} id={seat} />}
                                    <label htmlFor={seat}>{seat}</label>
                                  </li>

                                )



                              })
                            }

                          </ol>
                        </li>

                      </>
                    )

                  })

                  }

                </ol>

              </form>
            </div>
          </div>
        </Grid>
        <Grid item xs={12} sm={12} md={3} lg={3}>


          <div className="column2">
            <Box
              sx={{
                width: 300,
                backgroundColor: "white",
                height: 300,

                boxShadow: 7,
              }}
            >
              <Typography align="center" sx={{ fontWeight: 650, pt: 4 }}>
                Seats Sealected
              </Typography>

              <Box sx={{ display: "flex", gap: 1, ml: 5, width: "250px" }}>




                <div class="ex4"> <h6>
                  {seatNumber.map(data => (
                    <span> {data}, &nbsp;</span>
                  ))}
                </h6> </div>



              </Box>

              <div>
                <Button
                  onClick={(e) => handleSubmitDetails(e)}
                  sx={{ backgroundColor: "yellow", mt: 20, ml: 15 }}
                >
                  Book Now
                </Button>
              </div>

            </Box>


          </div>






        </Grid>
      </Grid>


    </>
  );
}







