import Tabs from "../Tabs/Tabs";
import Navbar from "../navbar/Navbar";
import React, { useState, useEffect, useReducer } from "react";
import { AppBar, Button } from "@mui/material";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import "./style.css";
import DirectionsBusIcon from "@mui/icons-material/DirectionsBus";
import { useNavigate, Link } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import axios from "axios";
import { DataGrid } from "@mui/x-data-grid";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Modal from '@mui/material/Modal'
import { styled, alpha } from '@mui/material/styles';
import Divider from '@mui/material/Divider';
import ArchiveIcon from '@mui/icons-material/Archive';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { useConfirm } from "material-ui-confirm";
const settings = ["Profile", "Account", "Logout"];



const StyledMenu = styled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'right',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'right',
    }}
    {...props}
  />
))(({ theme }) => ({
  '& .MuiPaper-root': {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color:
      theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
    boxShadow:
      'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
    '& .MuiMenu-list': {
      padding: '4px 0',
    },
    '& .MuiMenuItem-root': {
      '& .MuiSvgIcon-root': {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      '&:active': {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity,
        ),
      },
    },
  },
}));




function setData(state, action) {
  return action
}




function LocalUser() {


  const confirm = useConfirm();
  const navigate = useNavigate();
  const [editobj, dispath] = useReducer(setData, {})
  const [records, setRecords] = useState();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [openLoder, setOpensLoder] = useState(false)
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const openOpt = Boolean(anchorEl);


  const ManageUsers = () => {

 
    setAnchorEl(null);
  };
  const handleClose = () => {
    setAnchorEl(null);


  };


  const columns = [


    { field: "id", headerName: "USERS ID", width: 150 },
    { field: "name", headerName: "USERS NAME", width: 250 },

    { field: "email", headerName: "USERS EMAIL", width: 300 },
    { field: "mobile", headerName: "USERS MOB", width: 200, },
   { field: "OPTIONS",
      renderCell: (cellValues) => {

        const block = (event) => {

          confirm({ description: `Are you sure to block ${ cellValues.row.name } ?` })

          .then(() =>{
            axios.put('http://localhost:3001/super/admin/blockUser',{id:cellValues.row.id}).then((res) => {
          
              console.log('successfully blocked');
          });
      
          } )
          .catch(() => console.log("Block cancelled."));
      
      
          
      

        };
        
        const unBlock =()=>{
          confirm({ description: `Are you sure to Unblock ${cellValues.row.name} ?` })
          .then(() =>{
            axios.put('http://localhost:3001/super/admin/unBlockOwner',{id:cellValues.row.id}).then((res) => {
          
              console.log('successfully unblocked');
          });
      
          } )
          .catch(() => console.log("unBlock cancelled."));
      
      
         


        }


        return cellValues.row.blocked ? (<Button
          id="demo-customized-button"
          aria-controls={openOpt ? 'demo-customized-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={openOpt ? 'true' : undefined}
          variant="contained"
          disableElevation
          onClick={unBlock}

        >
          Unblock
        </Button>) : (

          <Button
            id="demo-customized-button"
            aria-controls={openOpt ? 'demo-customized-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={openOpt ? 'true' : undefined}
            variant="contained"
            style={{ backgroundColor: "green" }}
            disableElevation
            onClick={block}

          >
            Block
          </Button>
        );
      },
      width: 200

    }
    

  ];


  useEffect(() => {
    axios.get("http://localhost:3001/super/admin/localusers").then((res) => {
      
      setRecords(res.data.rows);
    });
  },[]);


  





  return (
    <>
      <Navbar />
      <Tabs tab1hover="tab" tab2hover="tab" tab3hover="tab"  tab4hover="nohover" tab5hover="tab" tab1="#012169" tab2="#012169" tab3="#012169" tab4="gray" tab5="#012169"/>

      <Typography
        sx={{ marginTop: 2, fontWeight: 900, fontSize: 25 }}
        align="center"
      >
        MANAGE USERS
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



      {/* loder */}

      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={openLoder}
        onClick={handleClose}
      >
        <CircularProgress color="inherit" />
      </Backdrop>

    </>
  );
}

export default LocalUser;
