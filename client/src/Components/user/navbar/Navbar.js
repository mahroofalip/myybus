import React,{useEffect, useState} from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import "./nav.css";
import DirectionsBusIcon from "@mui/icons-material/DirectionsBus";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
const settings = ["Profile", "Account", "Logout"];

function Navbar() {

  const navigate = useNavigate();

  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [email,setEmail]=useState("")
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  useEffect(()=>{
    let token = localStorage.getItem("userToken")
    var decoded = jwt_decode(token);
     if(decoded.email)  setEmail(decoded.email)
  },[email])


  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  
   

  const navigateTo=(e)=>{
    
     if(e.target.innerText==='Account'){
      navigate("/login");
     }
  }
 



  return (
    <AppBar sx={{ backgroundColor: "#012169" }} position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "flex" } }}>
            <DirectionsBusIcon />

            <h2 className="mybus">
              <span className="letterStyle">MYBUS</span>
             
            </h2>
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <span style={{marginRight:20}}>{email ? email : ""}</span>
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
  );
}

export default Navbar;
