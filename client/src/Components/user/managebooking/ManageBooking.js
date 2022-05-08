import React, { useEffect, useState } from 'react'
import Navbar from '../navbar/Navbar'
import Grid from "@mui/material/Grid";
import Divider from '@mui/material/Divider';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Chip from '@mui/material/Chip';
import TextField from '@mui/material/TextField';
import { Container, Button } from '@mui/material';
import axios from "axios"
import jwt_decode from "jwt-decode";
const Wraper = {
    backgroundColor: "#fff",
    padding: 10,
    border: 20
}

export default function ManageBooking() {

    const [bookingDetails, setBookingDetails] = useState([])


    const cancelBooking = (tripid) => {

        axios
            .put("http://localhost:3001/bookingcancel", {
                tripid
            })
            .then((res) => {

                if (res.data.status) {

                }

            });


    }






    useEffect(() => {

        let token = localStorage.getItem("userToken")
        if (token) {
            var decoded
            decoded = jwt_decode(token);
            let id = decoded.id
            axios
                .post("http://localhost:3001/user/managebooking", {
                    id
                })
                .then((res) => {

                    let result = res.data.result
                    console.log(result, 'THIS IS RESULT PPPPPPPPP t');
                    if (result) {
                        setBookingDetails(result)
                    }



                });
        } else {
            console.log("no user token");
        }


    }, [])

    console.log(bookingDetails, 'uuuuuuuuuuuuuuuuu');

    return (
        <>

            <Navbar />
            <Container style={{ marginTop: "30px" }}>

                {bookingDetails.map((details, index) => {


                    return (
                        <Box
                            sx={{
                                width: "100%",
                                backgroundColor: "white",
                                height: "auto",
                                boxShadow: 7,
                                marginBottom: "10px"

                            }}
                            key={index}
                        >

                            <div style={{ padding: "30px" }}>
                                <Grid style={Wraper} container spacing={2}>
                                    <Grid item xs={12} sm={4} md={4} lg={4}>
                                        <Typography><strong>From</strong></Typography>
                                        <TextField
                                           
                                            fullWidth
                                            value={details.depdate}

                                            id="outlined-required"

                                        />
                                        <TextField
                                            sx={{ mt: "5px" }}
                                           
                                            fullWidth
                                            value={details.dep_place}

                                            id="outlined-required"
                                        />

                                    </Grid>
                                   

                                    <Grid item xs={12} sm={4} md={4} lg={4}>
                                        <Typography><strong>To</strong></Typography>
                                        <TextField
                                           
                                            fullWidth
                                            value={details.arrivdate}

                                            id="outlined-required"
                                        />
                                        <TextField
                                            sx={{ mt: "5px" }}
                                           
                                            fullWidth
                                            value={details.arr_place}

                                            id="outlined-required"



                                        />
                                    </Grid>
                                   
                                    <Grid item xs={12} sm={4} md={4} lg={4}>
                                        <Typography><strong>Action</strong></Typography>

                                        {details.status === 1 ? <Button sx={{minWidth:"200px"}} onClick={() => {
                                            cancelBooking(details.tripid)
                                        }} variant='contained'>cancel Trip</Button> : ""}

                                        {details.status === 0 ? <Button  sx={{ backgroundColor: "red",minWidth:"200px" }} variant="contained">Trip Canceld</Button> : ""}
                                        {details.status === 2 ? <Button  sx={{ backgroundColor: "green",minWidth:"200px" }} variant="contained">Trip Completed</Button> : ""}

                                    </Grid>
                                </Grid>
                            </div>



                        </Box>
                    )


                })}



            </Container>

        </>
    )


}


