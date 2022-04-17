import React from "react";
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

const settings = ["Profile", "Account", "Logout"];

const AdminHome = () => {
  const navigate = useNavigate();

  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const navigateTo = (e) => {
    if (e.target.innerText === "Account") {
      navigate("/admin/login");
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
                <strong style={{color:"gray",fontWeight:900}}>ADMIN PANEL</strong>
              </span>
              
            </Box>

            <Box sx={{ flexGrow: 0 }}>
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
      <Grid sx={{backgroundColor:'#012169', marginTop: 0}} container spacing={2}>
        <Grid sx={{backgroundColor:'gray'}} item xs={12} sm={2} md={2}>
         <strong style={{color:'white',margin:40}}>DASHBOARD</strong> 
        </Grid>
         <Grid></Grid>
        <Grid onClick={handleAddBus} className="tab" sx={{ color:'#fff',backgroundColor:'#012169',border:"solid white",cursor:"pointer"}}  item xs={12} sm={2} md={2}>
        <strong className="tab" style={{margin:40,}} >ADD BUS</strong>
        </Grid>
        <Grid onClick={handlViewBus} className="tab" sx={{color:'#fff',backgroundColor:'#012169',border:"solid white",cursor:"pointer"}}  item xs={12} sm={2} md={2}>
        <strong  style={{margin:40,}}>VIEW BUS</strong>
        </Grid>
        <Grid className="tab" sx={{color:'#fff',backgroundColor:'#012169',border:"solid white",cursor:"pointer"}}  item xs={12} sm={2} md={2}>
        <strong className="tab" style={{margin:40,}}>REPORTS</strong>
        </Grid>
      </Grid>
      </div>
    </>
  );
};

export default AdminHome;
