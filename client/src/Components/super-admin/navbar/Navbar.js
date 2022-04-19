
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

const Navbar = () => {
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
      navigate("/super/admin/login")
  
    }
  };

const handleAddBus=()=>{
  navigate('/admin/addbus')
}
const handlViewBus=()=>{
  navigate('/admin/viewbus')
}




  return (
    <>
      <AppBar sx={{ backgroundColor: "#fff" }} position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "flex" ,alignItems:"center", justifyContent:"center" } }}>
              <DirectionsBusIcon style={{color:"gray",fontSize:40}} />
             
              <span className="mybus">
                <strong style={{color:"gray",fontWeight:900}}>SUPER ADMIN PANEL</strong>
              </span>
              
            </Box>

            <Box sx={{ flexGrow: 0 }}>
            <span style={{ marginRight: 20,color:"#012169" }}>{email ? email : ""}</span>
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
  
    </>
  );
};

export default Navbar;
