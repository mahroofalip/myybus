import React, { useState, useEffect } from "react";
import { AppBar } from "@mui/material";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";

import DirectionsBusIcon from "@mui/icons-material/DirectionsBus";
import { useNavigate, Link } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import axios from "axios";
import { DataGrid } from "@mui/x-data-grid";
import { styled, alpha } from '@mui/material/styles';

import jwt_decode from "jwt-decode";


const settings = ["Profile", "Account", "Logout"];









function SeatLayout() {



    const navigate = useNavigate();

    const [records, setRecords] = useState();



    const [email, setEmail] = useState("")

    const [blockErr, setBlockErr] = useState(false)

    const [date, setDate] = useState("")
  
 
    useEffect(() => {
        let busId = localStorage.getItem("busId_toGet_seatLayout_admin")
        let date = localStorage.getItem("busDepDate_toGet_seatLayout_admin")
        axios.post('http://localhost:3001/admin/View/Passangers', { busId, date }).then((res) => {
            console.log(res.data.result);
          
            setDate(res.data.date)
            setRecords(res.data.result)

        });
    }, [])


    const populateHome = () => {
        navigate("/admin/home");
    };

    const handleAddBus = () => {
        navigate("/admin/addbus");
    };






    const columns = [
        { field: "NO", headerName: "NO", width: 100 },
        { field: "passanger_name", headerName: "PASSANGER NAME", width: 190, },
        { field: "passanger_gender", headerName: "PASSANGER SEATS", width: 200, },
        { field: "passanger_seat", headerName: "PASSANGER SEAT", width: 200 },
        { field: "email", headerName: "PASSANGER EMAIL", width: 200 },
        { field: "mobile", headerName: "PASSANGER MOBILE", width: 200 }
    ];






    const [anchorElUser, setAnchorElUser] = React.useState(null);

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };


    useEffect(() => {

        let token = localStorage.getItem("token")
        if (token) {
            var decoded = jwt_decode(token);

            if (decoded.email) setEmail(decoded.email)
        } else {
            setEmail("")
            return navigate("/admin/login")
        }
        
    }, [email])


    const navigateTo = (e) => {
        if (e.target.innerText === "Account") {
            navigate("/admin/login")
        }

        if (e.target.innerText === "Logout") {

            localStorage.setItem("token", "");
            setEmail(false)
            navigate("/admin/login")

        }
    };





    return (
        <>
            <AppBar sx={{ backgroundColor: "#fff" }} position="static">
                <Container maxWidth="xl">
                    <Toolbar disableGutters>
                        <Box
                            sx={{
                                flexGrow: 1,
                                display: {
                                    xs: "flex",
                                    md: "flex",
                                    alignItems: "center",

                                },
                            }}
                        >
                            <DirectionsBusIcon style={{ color: "gray", fontSize: 40 }} />

                            <span className="mybus">
                                <strong style={{ color: "gray", fontWeight: 900 }}>
                                    ADMIN PANEL
                                </strong>
                            </span>
                            {blockErr ? <span style={{ color: "red", marginLeft: "150px" }}><i className="fa fa-warning"></i> {blockErr}</span> : ""}

                        </Box>

                        <Box sx={{ flexGrow: 0 }}>
                            <span style={{ marginRight: 20, color: "#012169" }}>{email ? email : ""}</span>
                            <Tooltip title="Open settings">
                                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                    <Avatar alt="Remy Sharp" src="" />
                                </IconButton>
                            </Tooltip>
                            <Menu
                                sx={{ mt: "45px" }}
                                id="menu-appbar"
                                anchorEl={anchorElUser}
                                anchorOrigin={{
                                    vertical: "top",
                                    horizontal: "right",
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: "top",
                                    horizontal: "right",
                                }}
                                open={Boolean(anchorElUser)}
                                onClose={handleCloseUserMenu}
                            >
                                {settings.map((setting) => (
                                    <MenuItem key={setting} onClick={navigateTo}>
                                        <Typography textAlign="center">{setting}</Typography>
                                    </MenuItem>
                                ))}
                            </Menu>
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>
            <div>
                <Grid
                    sx={{ backgroundColor: "#012169", marginTop: 0 }}
                    container
                    spacing={2}
                >
                    <Grid onClick={populateHome}
                        className="tab"
                        sx={{
                            color: "#fff",
                            backgroundColor: "#012169",
                            border: "solid white",
                            cursor: "pointer",
                        }}
                        item
                        xs={12}
                        sm={2}
                        md={2}
                    >
                        <strong style={{ color: "white", margin: 40 }}>DASHBOARD</strong>
                    </Grid>
                    <Grid></Grid>

                    <Grid
                        onClick={handleAddBus}
                        className="tab"
                        sx={{
                            color: "#fff",
                            backgroundColor: "#012169",
                            border: "solid white",
                            cursor: "pointer",
                        }}
                        item
                        xs={12}
                        sm={2}
                        md={2}
                    >
                        <strong className="tab" style={{ margin: 40 }}>
                            ADD BUS
                        </strong>
                    </Grid>

                    <Grid
                        sx={{ backgroundColor: "gray", border: "solid white" }}
                        item
                        xs={12}
                        sm={2}
                        md={2}
                    >
                        <strong style={{ margin: 40 }}>VIEW BUS</strong>
                    </Grid>
                    <Grid
                        className="tab"
                        sx={{
                            color: "#fff",
                            backgroundColor: "#012169",
                            border: "solid white",
                            cursor: "pointer",
                        }}
                        item
                        xs={12}
                        sm={2}
                        md={2}
                    >
                        <strong className="tab" style={{ margin: 40 }}>
                            REPORTS
                        </strong>
                    </Grid>
                </Grid>
            </div>
            <Typography
                sx={{ marginTop: 2 }}
                align="center"
            >
                <span style={{fontWeight: 900, fontSize: 25}}>VIEW PASSANGERS</span>
                <span style={{fontWeight: 900, fontSize: 25,marginLeft:"20px"}}>({date})</span> 
               
            </Typography>
           
            {/* table */}

            <Container>
                <div style={{ height: 400, width: "100%", marginTop: 10 }}>
                    <DataGrid
                        rows={records}
                        columns={columns}
                        pageSize={5}
                        rowsPerPageOptions={[5]}

                    />
                </div>
            </Container>



        </>
    );
}

export default SeatLayout;
