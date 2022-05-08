
import React, { useState } from 'react';
import axios from 'axios'
import Grid from "@mui/material/Grid";
import { Box, Button, Container, Typography } from '@mui/material';
import { borderRadius, display, padding } from '@mui/system';
import ManageSearchIcon from '@mui/icons-material/ManageSearch';
import TextField from '@mui/material/TextField';
import { useNavigate } from "react-router-dom";
import MenuItem from '@mui/material/MenuItem';
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

const Mstatus = [{
    value: 'Single',
    label: 'Single',
},
{
    value: 'Married',
    label: 'Married',
}]

function EditProfile() {
  
    const navigate = useNavigate();
   
    const [name, setName] = useState(localStorage.getItem("name_user"))
    const [dob, setDob] = useState(localStorage.getItem("dob_user"))
    const [id, setId] = useState(localStorage.getItem("id_user"))
    const [gender, setGender] = useState(localStorage.getItem("gender_user"))
    const [matrialstatus, setMatrialstatus]  =useState(localStorage.getItem("matrialstatus_user"))
  
    const [imageprivew, setimageprivew]=useState(localStorage.getItem("image1_user"));

         
    const editProfile = () => {
        

        axios
            .put("http://localhost:3001/edit/profile", { status: "user", id, name, dob, gender, matrialstatus,image1:imageprivew }).then((res) => {
               
                console.log(res.data.updatedData, ":   this is updated data");
                if (res.data.updatedData.status==='user') {
                    console.log("this is user profile");
                    navigate("/user/profile/"+res.data.updatedData.id);
                }else{
                   console.log("this is admin profile");
                }

               



            })

    }





    const inputHandle = (e) => {

        console.log("value    :", e.target.value);
        console.log("name    :", e.target.name);
        if (e.target.name === 'name') {

            setName(e.target.value)
        }
        if (e.target.name === 'dob') {
            setDob(e.target.value)
        }
        if (e.target.name === 'gender') {
            setGender(e.target.value)
        }
        if (e.target.name === 'matrialStatus') {
            setMatrialstatus(e.target.value)
        }
        if (e.target.name === 'image1') {
            const file = e.target.files[0];
            previewProfile(file);

        }
    }

    const previewProfile = (file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setimageprivew(reader.result);
        };
    };

   
    return (
        <>
            <div style={WraperA}>


                <Container style={Wraper}>  <Typography style={{ marginBottom: "20px", marginLeft: "60px", marginTop: "20px" }} component="h2" > <h2>EDIT ACCOUNT </h2> </Typography></Container>
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
                                    {imageprivew && (
                                        <img
                                            src={imageprivew}
                                            alt="chosen"
                                            style={{ width: "150px", height: "150px" }}
                                        />
                                    )}
                                </div>
                                </div>

                                <div style={{ display: "block" }}><Typography align="center" component="h5" > <h2>{name}</h2> </Typography></div>
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
                                minHeight: "450px"

                            }}>

                                <div style={{ display: "flex", justifyContent: "space-between" }}><Typography component="h5" > <h1>Edit Profile </h1> </Typography>
                                    <Button onClick={editProfile} variant="contained" disableElevation>
                                        Save </Button>  </div>
                                <div style={{ display: "block", color: "gray" }}><Typography> Basic info, for a faster booking experience </Typography></div>
                                <div style={{ display: "block", color: "gray", fontSize: "10px", padding: "5px" }}>

                                    <div style={{ display: "inline", color: "black", fontWeight: "bold" }}>
                                        <TextField
                                            fullWidth
                                            id="outlined-required"
                                            label="Edit name"
                                            name="name"
                                            value={name}
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            onChange={inputHandle}

                                        />


                                    </div>

                                </div>


                                <div style={{ display: "block", color: "gray", fontSize: "10px", padding: "5px" }}>

                                    <div style={{ display: "inline", marginBottom: "20px", color: "black", fontWeight: "bold" }}>
                                        <TextField
                                            type="date"
                                            fullWidth
                                            id="outlined-required"
                                            label="Edit birthday"
                                            name='dob'
                                            value={dob}
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            onChange={inputHandle}
                                        />


                                    </div>

                                </div>


                                <div style={{ display: "block", color: "gray", fontSize: "10px", padding: "5px" }}>

                                    <div style={{ display: "inline", marginBottom: "20px", color: "black", fontWeight: "bold" }}>
                                        {/* <TextField
                                            fullWidth
                                            id="outlined-required"
                                            label="Edit gender"
                                            name="gender"
                                            value={gender}
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            onChange={inputHandle}

                                        /> */}
                                        <TextField
                                            fullWidth
                                            id="outlined-select-currency"
                                            select
                                            name="gender"
                                            label="Edit gender"
                                            value={gender}
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            onChange={inputHandle}
                                        >
                                            {Gender.map((option) => (
                                                <MenuItem key={option.value} value={option.value}>
                                                    {option.label}
                                                </MenuItem>
                                            ))}
                                        </TextField>

                                    </div>

                                </div>


                                <div style={{ display: "block", color: "gray", fontSize: "10px", padding: "5px" }}>

                                    <div style={{ display: "inline", color: "black", fontWeight: "bold" }}>
                                        {/* <TextField
                                            fullWidth
                                            id="outlined-required"
                                            label="Edit matrial status"
                                            value={matrialstatus}
                                            name='matrialStatus'
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            onChange={inputHandle}

                                        /> */}
                                        <TextField
                                            fullWidth
                                            id="outlined-select-currency"
                                            select
                                            label="Edit matrial status"
                                            value={matrialstatus}
                                            name='matrialStatus'
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            onChange={inputHandle}
                                        >
                                            {Mstatus.map((option) => (
                                                <MenuItem key={option.value} value={option.value}>
                                                    {option.label}
                                                </MenuItem>
                                            ))}
                                        </TextField>

                                    </div>

                                </div>


                                <div style={{ display: "block", color: "gray", fontSize: "10px", padding: "5px" }}>

                                    <div style={{ display: "inline", color: "black", fontWeight: "bold" }}>
                                        <TextField
                                            fullWidth
                                            id="file"
                                            label="Edit Profile image"
                                            type="file"
                                            name="image1"
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            onChange={inputHandle}
                                        />


                                    </div>

                                </div>




                            </div>

                        </Grid>

                    </Grid>
                </Container>

            </div>




        </>
    )
}

export default EditProfile;