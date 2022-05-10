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
import jwt_decode from "jwt-decode";
import  AdminNavbar from "../navbar/Navbar"

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
           
           <AdminNavbar tab1hover="tab" tab2hover="tab" tab3hover="nohover" tab4hover="tab" tab1="#012169" tab2="#012169" tab3="gray" tab4="#012169" />

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
