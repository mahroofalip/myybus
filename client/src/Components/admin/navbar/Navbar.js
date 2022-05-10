import React,{useState,useEffect} from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import "../style.css";
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

const AdminNavbar = (props) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("")
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [owner_id,setOwnerid]=useState("");
  useEffect(() => {

    let token = localStorage.getItem("token")
    if(token){
      var decoded = jwt_decode(token);
      if (decoded) {
        setEmail(decoded.email)
        setOwnerid(decoded.id)
      }
    }else{
      setEmail("")
      return navigate("/admin/login")
    }
   
   
  }, [email,owner_id])







  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };


  

  const navigateTo = (e) => {
    if (e.target.innerText === "Account") {
      navigate("/admin/login")
    }
    
    if (e.target.innerText === "Logout") {
     
      localStorage.setItem("token","");
      setEmail(false)
      navigate("/admin/login")
  
    }
  };
  

const handleAddBus=()=>{
  
   
 
  navigate('/admin/addbus')
}
const handlViewBus = () => {
  navigate('/admin/viewbus/' + owner_id)
}

const handleReport =()=>{

  navigate('/admin/incomreport/' +owner_id)

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
    <div>
      <Grid sx={{backgroundColor:'#012169', marginTop: 0}} container spacing={2}>
        <Grid sx={{backgroundColor:props.tab1}} className={props.tab1hover} item xs={12} sm={2} md={2}>
         <strong style={{color:'white',margin:40}}>DASHBOARD</strong> 
        </Grid>
       
        <Grid onClick={handleAddBus} className={props.tab2hover} sx={{ color:'#fff',backgroundColor:props.tab2,border:"solid white",cursor:"pointer"}}  item xs={12} sm={2} md={2}>
        <strong className="tab" style={{margin:40,}} >ADD BUS</strong>
        </Grid>
        <Grid onClick={handlViewBus} className={props.tab3hover} sx={{color:'#fff',backgroundColor:props.tab3,border:"solid white",cursor:"pointer"}}  item xs={12} sm={2} md={2}>
        <strong  style={{margin:40,}}>VIEW BUS</strong>
        </Grid>
        <Grid onClick={handleReport} className={props.tab4hover} sx={{color:'#fff',backgroundColor:props.tab4,border:"solid white",cursor:"pointer"}}  item xs={12} sm={2} md={2}>
        <strong className="tab" style={{margin:40,}}>REPORTS</strong>
        </Grid>
      </Grid>
      </div>
    </>
  );
};

export default AdminNavbar;
