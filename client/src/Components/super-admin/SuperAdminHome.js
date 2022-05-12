
import Tabs from "./Tabs/Tabs";
import Navbar from "./navbar/Navbar";

import React ,{useState,useEffect}from "react";
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
  const handleManageCompanies=()=>{
    navigate('/super/admin/managecompanies')
  }
  const handleManageUsers=()=>{
    navigate('/admin/viewbus')
  }
  






  return (
    <>
    
      <Navbar />
      <Tabs tab1hover="nohover" tab2hover="tab" tab3hover="tab" tab4hover="tab" tab1="gray" tab2="#012169" tab3="#012169" tab4="#012169" />

       

    
    </>
  );
};

export default SuperAdminHome;
