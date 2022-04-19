
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

const Tabs = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("")
  const [anchorElUser, setAnchorElUser] = React.useState(null);


  useEffect(() => {

    let token = localStorage.getItem("superAdminToken")
    if(token){
      var decoded = jwt_decode(token);
      if (decoded.email) setEmail(decoded.email)
    }else{
      setEmail("")
    }
   
   
  }, [email])



  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const navigateTo = (e) => {
    if (e.target.innerText === "Account") {
      navigate("/super/admin/login");
    }
    
    if (e.target.innerText === "Logout") {
     
      localStorage.setItem("superAdminToken","");
      setEmail(false)
  
    }
  };

const handleManageOwners=()=>{
  navigate('/super/admin/managecompanies')
}
const handleManageUsers=()=>{
  navigate('/admin/viewbus')
}




  return (
    <>
     
    <div>
      <Grid sx={{backgroundColor:'#012169', marginTop: 0}} container spacing={3}>
        <Grid sx={{backgroundColor:'gray',border:"solid white"}} item xs={12} sm={2} md={3}>
         <strong style={{color:'white',margin:40}}>DASHBOARD</strong> 
        </Grid>
         <Grid></Grid>
        <Grid onClick={handleManageOwners} className="tab" sx={{ color:'#fff',backgroundColor:'#012169',border:"solid white",cursor:"pointer"}}  item xs={12} sm={3} md={3}>
        <strong className="tab" style={{margin:40,}} >MANAGE OWNERS</strong>
        </Grid>
        <Grid onClick={handleManageUsers} className="tab" sx={{color:'#fff',backgroundColor:'#012169',border:"solid white",cursor:"pointer"}}  item xs={12} sm={3} md={3}>
        <strong  style={{margin:40,}}>MANAGE USERS</strong>
        </Grid>
        <Grid className="tab" sx={{color:'#fff',backgroundColor:'#012169',border:"solid white",cursor:"pointer"}}  item xs={12} sm={3} md={3}>
        <strong className="tab" style={{margin:40,}}>REPORTS</strong>
        </Grid>
      </Grid>
      </div>
    </>
  );
};

export default Tabs;
