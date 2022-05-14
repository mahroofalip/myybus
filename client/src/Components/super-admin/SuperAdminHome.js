
import Tabs from "./Tabs/Tabs";
import Navbar from "./navbar/Navbar";
import { PieChart } from 'react-minimal-pie-chart';
import axios from "axios";
import { Chart } from "react-google-charts";
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
const settings = ["Profile", "Account", "Logout"];



const SuperAdminHome = () => {
  const navigate = useNavigate();
  const handleManageCompanies = () => {
    navigate('/super/admin/managecompanies')
  }
  const handleManageUsers = () => {
    navigate('/admin/viewbus')
  }

  const [first, setFirstCompany] = useState(60)
  const [second, setSecond] = useState(60)
  const [third, setThird] = useState(60)
  const [totaCompanies, setTotalComanies] = useState(0)
  const [totalBuses, setTotalBuses] = useState(0)
  const [totalUsers, setUsers] = useState(0)
  const [totProfit, setTotProfit] = useState(0)
  const [data, setData] = useState([])
  useEffect(() => {
    axios.post("http://localhost:3001/super/admin/dashboard").then((response) => {
      console.log(response.data);
      setTotalComanies(response.data.totaCompnies)
      setTotalBuses(response.data.totalBuses)
      setUsers(response.data.totalUsers)
      setTotProfit(response.data.totProfit)
      setFirstCompany(response.data.Top_Three_company[0])
      setSecond(response.data.Top_Three_company[1])
      setThird(response.data.Top_Three_company[2])
    }).then(() => {
      axios.post("http://localhost:3001/super/admin/dashboard/barchart").then((response2) => {

        setData(response2.data.data)
      })
    })
  }, [])

  // const data = [
  //   ["Monthly Income", "Total Earnings", "Expenses", "Profit"],
  //   ["jan", 1000, 400, 200],
  //   ["feb", 1170, 460, 250],
  //   ["mar", 660, 1120, 300],
  //   ["april", 1030, 540, 350],
  //   ["may", 1000, 400, 200],
  //   ["june", 1170, 460, 250],
  //   ["julay", 660, 1120, 300],
  //   ["aug", 1030, 540, 350],
  //   ["sep", 1000, 400, 200],
  //   ["oct", 1170, 460, 250],
  //   ["nov", 660, 1120, 300],
  //   ["dec", 1030, 540, 350],
  // ];

  const options = {
    chart: {
      title: "Company Performance",
      subtitle: "Total Earnings, Expenses, and Profit",
    },
  };




  return (
    <>

      <Navbar />
      <Tabs tab1hover="nohover" tab2hover="tab" tab3hover="tab" tab4hover="tab" tab1="gray" tab2="#012169" tab3="#012169" tab4="#012169" />
      <Container>

        <div style={{ marginTop: "50px" }}>

          <Grid sx={{ marginTop: 0 }} container spacing={2}>
            <Grid item xs={12} sm={8} md={8}>

              <div style={{ display: "flex", justifyContent: "space-around" }}>

                <Box sx={{
                  width: "300px"
                }}>
                  <Typography align="center">Top Performing Companies</Typography>
                  <PieChart
                    data={[
                      { title: `${first.company} : (${first.number_of_seat})`, value: first.number_of_seat, color: '#ca498c' },
                      { title: `${second.company} : (${second.number_of_seat})`, value: second.number_of_seat, color: '#e6bfcb' },
                      { title: `${third.company} : (${third.number_of_seat})`, value: third.number_of_seat, color: '#fde3df' }
                    ]}
                  />


                </Box>

                <div style={{ width: "300px", height: "300px", display: "flex", justifyContent: "center", alignItems: "center" }}>

                  <div>
                    <div > <div style={{ height: "20px", width: "20px", backgroundColor: "#ca498c", display: "inline-block" }}></div>  <span> {first.company}</span></div>
                    <div style={{ marginTop: "20px" }}> <div style={{ height: "20px", width: "20px", backgroundColor: "#e6bfcb", display: "inline-block" }}></div> <span> {second.company}</span> </div>
                    <div style={{ marginTop: "20px" }}> <div style={{ height: "20px", width: "20px", backgroundColor: "#fde3df", display: "inline-block" }}></div> <span>{third.company}</span> </div>

                  </div>

                </div>


              </div>


            </Grid>
            <Grid item xs={12} sm={4} md={4}>

              <div style={{ height: "75px", backgroundColor: "#4d566a", marginBottom: "10px", padding: "10px" }}>
                <h2 style={{ color: "white" }}><span >Total Companies</span></h2>
                <h2 style={{ color: "white" }}><span >{totaCompanies}</span></h2>
              </div>
              <div style={{ height: "75px", backgroundColor: "#4d566a", marginBottom: "10px", padding: "10px" }}>
                <h2 style={{ color: "white" }}><span >Total Buses</span></h2>
                <h2 style={{ color: "white" }}><span >{totalBuses}</span></h2>
              </div>
              <div style={{ height: "75px", backgroundColor: "#545d73", marginBottom: "10px", padding: "10px" }}>
                <h2 style={{ color: "white" }}>Total Users</h2>
                <h2 style={{ color: "white" }}>{totalUsers}</h2>
              </div>
              <div style={{ height: "75px", backgroundColor: "#606b85", marginBottom: "10px", padding: "10px" }}>
                <h2 style={{ color: "white" }}>Total Profit</h2>
                <h2 style={{ color: "white" }}>{totProfit}</h2>
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
  );
};

export default SuperAdminHome;
