import React, { useState, useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import "./style.css";
import DirectionsBusIcon from "@mui/icons-material/DirectionsBus";
import { useNavigate } from "react-router-dom";
import Grid from "@mui/material/Grid";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import jwt_decode from "jwt-decode";
import { useParams } from "react-router-dom";
import AdminNavbar from "./navbar/Navbar";
import { PieChart } from 'react-minimal-pie-chart';
import axios from "axios";
import { Chart } from "react-google-charts";


const settings = ["Profile", "Account", "Logout"];

const AdminHome = () => {
  const [upcoming, setUpcoming] = useState(0)
  const [completed, setCompleted] = useState(0)
  const [cancelled, setCancelled] = useState(0)
  const [totalearnings, setTotalErnings] = useState(0)
  const [totcancel, setTotalCancel] = useState(0)
  const [total, setTotal] = useState(0)
  const [data, setData] = useState([])
  const { owner_id } = useParams()

  useEffect(() => {
    axios
      .post("http://localhost:3001/admin/dashboard/bookings", { owner_id })
      .then((res) => {
        console.log(res.data, 'lllllllllllllllllloi');
        setUpcoming(res.data.upcoming)
        setCompleted(res.data.completed)
        setCancelled(res.data.cancelled)
        setTotal(res.data.total)
        setTotalErnings(res.data.totalErnings)
        setTotalCancel(res.data.totcancel)
        axios.post("http://localhost:3001/admin/dashboard/barchart", { owner_id }).then((res2) => {
          setData(res2.data.data)
        })
      }
      )
  }, [])







  const options = {
    chart: {
      title: "Company Performance",
      subtitle: "Total Earnings, Expenses, and Profit",
    },
  };

  return (
    <>
      <AdminNavbar tab1hover="nohover" tab2hover="tab" tab3hover="tab" tab4hover="tab" tab1="gray" tab2="#012169" tab3="#012169" tab4="#012169" />

      <Container>

        <div style={{ marginTop: "50px" }}>

          <Grid sx={{ marginTop: 0 }} container spacing={2}>
            <Grid item xs={12} sm={8} md={8}>

              <div style={{ display: "flex", justifyContent: "space-around" }}>

                <Box sx={{
                  width: "300px"
                }}>
                  <Typography align="center">Monthly Bookings</Typography>
                  <PieChart
                    data={[
                      { title: 'Upcoming', value: upcoming, color: '#ca498c' },
                      { title: 'Completed', value: completed, color: '#e6bfcb' },
                      { title: 'Cancelled', value: cancelled, color: '#fde3df' }
                    ]}
                  />


                </Box>

                <div style={{ width: "300px", height: "300px", display: "flex", justifyContent: "center", alignItems: "center" }}>

                  <div>
                    <div > <div style={{ height: "20px", width: "20px", backgroundColor: "#ca498c", display: "inline-block" }}></div>  <span> UPCOMING BOOKINGS</span></div>
                    <div style={{ marginTop: "20px" }}> <div style={{ height: "20px", width: "20px", backgroundColor: "#e6bfcb", display: "inline-block" }}></div> <span> COMPLETED BOOKINGS</span> </div>
                    <div style={{ marginTop: "20px" }}> <div style={{ height: "20px", width: "20px", backgroundColor: "#fde3df", display: "inline-block" }}></div> <span> CANCELLED BOOKINGS</span> </div>

                  </div>

                </div>


              </div>


            </Grid>
            <Grid item xs={12} sm={4} md={4}>

              <div style={{ height: "100px", backgroundColor: "#4d566a", marginBottom: "10px", padding: "20px" }}>
                <h2 style={{ color: "white" }}>Total Bookings</h2>
                <h2 style={{ color: "white" }}>{total}</h2>
              </div>
              <div style={{ height: "100px", backgroundColor: "#545d73", marginBottom: "10px", padding: "20px" }}>
                <h2 style={{ color: "white" }}>Total Earnings</h2>
                <h2 style={{ color: "white" }}>{totalearnings}</h2>
              </div>
              <div style={{ height: "100px", backgroundColor: "#606b85", marginBottom: "10px", padding: "20px" }}>
                <h2 style={{ color: "white" }}>Cancelled Bookings</h2>
                <h2 style={{ color: "white" }}>{totcancel}</h2>
              </div>


            </Grid>


          </Grid>

        </div>





      </Container>

      <Container>

        <div style={{ marginTop: "50px" }}>

          <Chart
            chartType="Bar"
            width="100%"
            height="400px"
            data={data}
            options={options}

          />


        </div>


      </Container>



    </>
  )
};

export default AdminHome;
