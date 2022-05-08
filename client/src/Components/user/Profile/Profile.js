
import Navbar from '../navbar/Navbar';

import { useParams } from "react-router-dom";
import { Identity } from '@mui/base';
import React, { useEffect, useState } from 'react';
import axios from 'axios'
import Grid from "@mui/material/Grid";
import { Box, Button, Container, Typography } from '@mui/material';
import { borderRadius, display, padding } from '@mui/system';
import ManageSearchIcon from '@mui/icons-material/ManageSearch';
import EditIcon from '@mui/icons-material/Edit';
import Divider from '@mui/material/Divider';
import { useNavigate } from "react-router-dom";
const profileInfo = React.createContext({})
const Wraper = {
    backgroundColor: "#d1d4c3",
    padding: 10,
    border: 20
}

const WraperA = {
    backgroundColor: "#d1d4c3",
    padding: 10,
    border: 20,
    width: "100%"
}

function Profile() {

    console.log(("THIS IS PROFILE OF USER "));

    const navigate = useNavigate();
    const [status, setStatus] = useState(false)
    const { id } = useParams()
    console.log("this is id of profiel   :", id);
    const [profile, setUserProfile] = useState()

   
    useEffect(() => {
        console.log("this is profile   idddddddddddddd :", id);
        axios
            .post("http://localhost:3001/user/profile", { id }).then((response) => {
                setStatus(true)
                setUserProfile(response.data.profile)
            })

    },[id])


    // console.log("This is profile   :" + profile.status + "   ", profile);
    const editProfile = () => {
        console.log(profile, ':          gggggggggggggggggggggg');
        localStorage.setItem("dob_user", profile.birthday);
        localStorage.setItem("name_user", profile.name);
        localStorage.setItem("gender_user", profile.gender);
        localStorage.setItem("id_user", profile.id);
        localStorage.setItem("image1_user", profile.image1);
        localStorage.setItem("matrialstatus_user", profile.matrialstatus);
       
        navigate('/user/editprofile')

    }



    return (
        <>
            <Navbar />

           {status ?  <div style={WraperA}>
                <Container style={Wraper}>  <Typography style={{ marginBottom: "20px", marginLeft: "60px", marginTop: "20px" }} component="h2" > <h2>MY ACCOUNT</h2> </Typography></Container>
                <Container style={Wraper}>
                    <Grid container spacing={1}>

                        <Grid item xs={12} sm={3} md={3} lg={3} >
                            <div style={{
                                width: "100%",
                                backgroundColor: "white",
                                height: "auto",
                                boxShadow: 7,
                                marginBottom: "10px",
                                borderRadius: "2px",
                                padding: "20px",
                                minHeight: "300px"

                            }}>

                                <div style={{ display: "flex", justifyContent: "center" }}>  <div style={{ width: "150px", height: "150px", backgroundColor: "green", borderRadius: "5px", marginBottom: "10px" }}>
                                    {profile.image1 && (
                                        <img
                                            src={profile.image1}
                                            alt="chosen"
                                            style={{ width: "150px", height: "150px" }}
                                        />
                                    )}
                                </div>
                                </div>

                                <div style={{ display: "block" }}><Typography align="center" component="h5" > <h2>{profile.name}</h2> </Typography></div>
                                <div style={{ display: "block", color: "gray" }}><Typography align="center" component="h5" > <h5>PERSONAL PROFILE</h5> </Typography></div>
                            </div>

                        </Grid>
                        <Grid item xs={12} sm={9} md={9} lg={9}>
                            <div style={{
                                width: "100%",
                                backgroundColor: "white",
                                height: "auto",
                                boxShadow: 7,
                                borderRadius: "2px",
                                padding: "20px",
                                minHeight: "400px"
                            }}>
                                <div style={{ display: "flex", justifyContent: "space-between" }}><Typography component="h5" > <h1> Profile </h1> </Typography>
                                    <Button onClick={editProfile} variant="outlined" disableElevation>
                                        <EditIcon /> Edit </Button>  </div>
                                <div style={{ display: "block", color: "gray", marginBottom: "20px" }}><Typography> Basic info, for a faster booking experience </Typography></div>
                                <div style={{ display: "block", color: "gray", fontSize: "10px", marginBottom: "15px", marginTop: "15px" }}><Typography sx={{ display: "inline" }}><small>NAME</small></Typography><Typography sx={{ display: "inline", position: "absolute", left: "45%", color: "black", fontWeight: "bold" }}><small>{profile.name}</small></Typography></div>
                                <Divider />
                                <div style={{ display: "block", color: "gray", fontSize: "10px", marginBottom: "15px", marginTop: "15px" }}><Typography sx={{ display: "inline" }}><small>BIRTHDAY</small></Typography><Typography sx={{ display: "inline", position: "absolute", left: "45%", color: "black", fontWeight: "bold" }}><small>{profile.birthday}</small></Typography></div>
                                <Divider />
                                <div style={{ display: "block", color: "gray", fontSize: "10px", marginBottom: "15px", marginTop: "15px" }}><Typography sx={{ display: "inline" }}><small>GENDER</small></Typography><Typography sx={{ display: "inline", position: "absolute", left: "45%", color: "black", fontWeight: "bold" }}><small>{profile.gender}</small></Typography></div>
                                <Divider />
                                <div style={{ display: "block", color: "gray", fontSize: "10px", marginBottom: "15px", marginTop: "15px" }}><Typography sx={{ display: "inline" }}><small>MARITAL STATUS</small></Typography><Typography sx={{ display: "inline", position: "absolute", left: "45%", color: "black", fontWeight: "bold" }}><small>{profile.matrialstatus}</small></Typography></div>
                                <Divider />
                            </div>
                        </Grid>
                    </Grid>
                </Container>
            </div> : ""
}

        </>
    )
}

export default Profile
