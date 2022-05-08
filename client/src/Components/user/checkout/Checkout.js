import React, { useEffect, useState } from 'react'
import Navbar from '../navbar/Navbar'
import Grid from "@mui/material/Grid";
import { Button, Box, Container, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Divider from '@mui/material/Divider';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import DirectionsBusIcon from "@mui/icons-material/DirectionsBus";
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AirlineSeatReclineExtraOutlinedIcon from '@mui/icons-material/AirlineSeatReclineExtraOutlined';
import PersonIcon from '@mui/icons-material/Person';
import { toast } from "react-toastify";
import axios from "axios";
import StripeCheckout from "react-stripe-checkout";
import "react-toastify/dist/ReactToastify.css";
import DialogActions from '@mui/material/DialogActions';
import Switch from '@mui/material/Switch';
import Dialog from '@mui/material/Dialog';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
const Wraper = {
    backgroundColor: "#fff",
    padding: 10,
    border: 20
}
export default function Checkout({ bookInfo }) {


    const navigate = useNavigate();

    const [open, setOpen] = React.useState(false);
    const [fullWidth, setFullWidth] = React.useState(true);
    const [maxWidth, setMaxWidth] = React.useState('sm');


    const handleClose = () => {
        setOpen(false);
    };



    const handleManageBook = (e) => {
        e.preventDefault();
       
        navigate('/user/managebooking')
    }

    toast.configure()



    async function handleToken(token, addresses) {
        await axios.post(
            "http://localhost:3001/checkout",
            { token, bookInfo }
        ).then((response) => {


            if (response.status === 200) {

                toast("Successfully paid !", { type: "success" });
                setOpen(true)

            } else {
                toast("Something went wrong", { type: "error" });
            }
        })


    }


    console.log(bookInfo, ':    This is state ticket details');
    return (
        <>

            <Navbar />
            <Grid style={Wraper} container spacing={2}>
                <Grid item xs={12} sm={12} md={6} lg={6}>

                    <Box
                        sx={{
                            // width: "100%",

                            backgroundColor: "white",
                            height: "auto",
                            boxShadow: 7,

                        }}
                    >

                        <div style={{ padding: "5%" }}>

                            <Typography component="h4"> <strong> Your Booking </strong> </Typography>
                            <Divider sx={{ marginTop: "10px", marginBottom: "8px" }} />
                            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "flex" } }}>
                                <DirectionsBusIcon />

                                <h2>
                                    <span style={{ color: "brown" }} > {bookInfo.busname}</span>   <span style={{ color: "gray", marginLeft: "10px", fontSize: "15px" }} >{bookInfo.bustype} Bus
                                    </span>
                                </h2>
                            </Box>


                            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "flex" } }}>
                                <AccessTimeIcon />

                                <h5>
                                    <span > {bookInfo.departuretime}</span>

                                </h5>
                                <ArrowRightAltIcon sx={{ ml: "10px", mr: "10px" }} />
                                <h5>
                                    <span > {bookInfo.arraivaltime}</span>

                                </h5>
                            </Box>
                            <Divider sx={{ marginTop: "10px", marginBottom: "15px" }} />
                            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "flex" } }}>
                                <LocationOnIcon />

                                <h2>
                                    <span > {bookInfo.fromstart} </span>

                                </h2>

                                <h2 style={{ marginLeft: "15px" }}>
                                    <span > -------- </span>

                                </h2>
                                <LocationOnIcon sx={{ ml: "10px", mr: "10px" }} />
                                <h2>
                                    <span > {bookInfo.toend}</span>

                                </h2>
                            </Box>
                            <Divider sx={{ marginTop: "10px", marginBottom: "15px" }} />
                            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "flex" } }}>
                                <AirlineSeatReclineExtraOutlinedIcon />

                                <h2>
                                    <span >Seats </span>

                                </h2>



                            </Box>
                            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "flex" } }}>
                                <Typography style={{ color: "gray", marginLeft: "20px" }}>

                                    <small > Seat : {bookInfo.SelectedSeats.length} -- {bookInfo.SelectedSeats.map((stNo) => {
                                        return (
                                            <>{stNo},</>
                                        )
                                    })}</small>

                                </Typography>

                            </Box>
                            <Divider sx={{ marginTop: "10px", marginBottom: "15px" }} />
                            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "flex" } }}>
                                <PersonIcon />

                                <h2>
                                    <span >Travvelers ({bookInfo.SelectedSeats.length}) </span>

                                </h2>



                            </Box>
                            <Box >

                                {bookInfo.TicketsInfo.map((person, index) => {
                                    return (<Typography component="div" style={{ color: "gray", marginLeft: "35px" }}> {index + 1} . {person.Name} <span style={{ marginLeft: "20px" }}>({person.gender}, {person.Age})</span> </Typography>)
                                })}





                            </Box>
                            <Divider sx={{ marginTop: "10px", marginBottom: "15px" }} />
                            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "flex" } }}>
                                <PersonIcon />

                                <h2>
                                    <span >Contact  </span>

                                </h2>




                            </Box>
                            <Box >


                                <Typography component="div" style={{ color: "black", marginLeft: "35px" }}> Email :  {bookInfo.userContact.email}</Typography>

                                <Typography component="div" style={{ color: "black", marginLeft: "35px" }}> Mobile :  {bookInfo.userContact.mobile}</Typography>




                            </Box>
                        </div>

                    </Box>

                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={6}>
                    <Box
                        sx={{
                            // width: "100%",

                            backgroundColor: "white",
                            height: "auto",
                            boxShadow: 7,

                        }}
                    >

                        <div style={{ padding: "5%" }}>


                            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "flex" } }}>


                                <h2>
                                    <span  > Billing Details</span>

                                </h2>
                            </Box>



                            <Divider sx={{ marginTop: "10px", marginBottom: "15px" }} />
                            <Box style={{ display: "flex", justifyContent: "space-between" }}>

                                <h4 >
                                    <span >Base fare </span>

                                </h4>
                                <h4 style={{ marginRight: "100px" }}>
                                    <span >₹{bookInfo.Total}</span>

                                </h4>

                            </Box>
                            <Divider sx={{ marginTop: "10px", marginBottom: "15px" }} />
                            <Divider sx={{ marginTop: "10px", marginBottom: "15px" }} />
                            <Box style={{ display: "flex", justifyContent: "space-between" }}>

                                <h4 >
                                    <span >Service charge  </span>

                                </h4>
                                <h4 style={{ marginRight: "100px" }}>
                                    <span style={{ color: "green" }}>Free</span>

                                </h4>

                            </Box>
                            <Divider sx={{ marginTop: "10px", marginBottom: "15px" }} />
                            <Divider sx={{ marginTop: "10px", marginBottom: "15px" }} />
                            <Box style={{ display: "flex", justifyContent: "space-between" }}>

                                <h4 >
                                    <span >Total  </span>

                                </h4>
                                <h4 style={{ marginRight: "100px" }}>
                                    <span style={{ color: "green" }}>₹{bookInfo.Total}</span>

                                </h4>

                            </Box>
                            <Divider sx={{ marginTop: "10px", marginBottom: "15px" }} />
                            <Divider sx={{ marginTop: "10px", marginBottom: "15px" }} />
                            <Box style={{ display: "flex" }}>


                                <StripeCheckout
                                    className="center"
                                    stripeKey="pk_test_51KvIy4FoKu84MaPXQUsyaT3tAjxLmA37pifzJUQDkADWERVhfaebrqlyw7YCHbDQoMPau7zP8P6AFZCAIpGaUfkA00FuaHXRLl"
                                    token={handleToken}
                                    amount={bookInfo.Total * 100}
                                    name="Mybus Booking"
                                    billingAddress
                                    shippingAddress
                                />
                                {/* <Button  variant='contained'>PayNow</Button> */}

                            </Box>
                            <Divider sx={{ marginTop: "10px", marginBottom: "15px" }} />
                        </div>

                    </Box>


                </Grid>
            </Grid>



            <Dialog
                fullWidth={fullWidth}
                maxWidth={maxWidth}
                open={open}
                onClose={handleClose}
            >
                <DialogTitle align="center"><h2><strong style={{ color: "green" }}>Booking Success !!</strong></h2></DialogTitle>
                <DialogContent>
                    <DialogContentText align="center">
                        <h4> <strong style={{ color: "green" }}> Enjoy your dream journy</strong></h4>
                    </DialogContentText>
                    <Box
                        noValidate
                        component="form"
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            m: 'auto',
                            width: 'fit-content',
                        }}
                    >
                        <FormControl sx={{ mt: 2, minWidth: 120 }}>



                            <Button onClick={handleManageBook} variant='contained' style={{ backgroundColor: "green", color: "white", padding: "5px", borderRadius: "5px" }}> Manage Booking</Button>


                        </FormControl>

                    </Box>
                </DialogContent>

            </Dialog>

        </>
    )


}