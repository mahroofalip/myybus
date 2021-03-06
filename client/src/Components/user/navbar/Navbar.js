import React, { useEffect, useState } from "react";
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
import { Button } from "@mui/material"
import "./nav.css";
import DirectionsBusIcon from "@mui/icons-material/DirectionsBus";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import TourIcon from '@mui/icons-material/Tour';
const settings = ["Profile", "Account", "Logout"];

function Navbar() {

  const navigate = useNavigate();

  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [email, setEmail] = useState("")
  const [name,setName] = useState("")
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  useEffect(() => {

    let token = localStorage.getItem("userToken")
    if (token) {
      var decoded = jwt_decode(token);
      console.log("THIS IS USER INFORMATION .....", decoded)
      if (decoded.email) {
        setEmail(decoded.email)
       
        setName(decoded.name)
    } else {
      setEmail("")
    }
  }

  }, [email])


  const myTrip = () => {
    let token = localStorage.getItem("userToken")
    if (token) {
      navigate('/user/managebooking')
    } else {
      navigate("/login");
    }


  }


  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const navigateTo = (e) => {

    if (e.target.innerText === 'Profile') {
      let token = localStorage.getItem("userToken")
      if (token) {
        var decoded = jwt_decode(token);
        const { id } = decoded
      
        navigate("/user/profile/" + id);
      } else {
        navigate("/login");
      }

    }


    if (e.target.innerText === 'Account') {
      navigate("/login");
    }


    if (e.target.innerText === "Logout") {

      localStorage.setItem("userToken", "");
      setEmail(false)

    }


  }

  const home = () => {
    navigate("/");
  }



  return (
    <AppBar sx={{ backgroundColor: "#012169", paddingBottom: "15px" }} position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "flex" } }}>
            <DirectionsBusIcon />

            <h2 className="mybus">

              <Button onClick={home} variant="outlined" className="letterStyle"> <span className="letterStyle">MYBUS</span></Button>


            </h2>
          </Box>


          <TourIcon />
          <div style={{ marginRight: "12px" }}>
            <h5 className="mybus">
              <Button onClick={myTrip} variant="outlined" className="letterStyle">MYTRIPS</Button>
            </h5>
          </div>
          <Box sx={{ flexGrow: 0 }}><span style={{ marginRight: 20 }}>{name?name:""}</span><Tooltip title="Open settings">
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
