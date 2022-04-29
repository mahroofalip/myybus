import ModalImage from "react-modal-image";
import { useParams } from "react-router-dom";
import Tabs from "../Tabs/Tabs";
import Navbar from "../navbar/Navbar";
import React, { useState, useEffect, useReducer } from "react";
import { AppBar, Button } from "@mui/material";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import Slide from '@mui/material/Slide';
import "./style.css";
import CloseIcon from '@mui/icons-material/Close';
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
import Dialog from '@mui/material/Dialog';



const settings = ["Profile", "Account", "Logout"];

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

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




function Displaybus() {
  const confirm = useConfirm();
  const navigate = useNavigate();
  const [editobj, dispath] = useReducer(setData, {})
  const [records, setRecords] = useState();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [openLoder, setOpensLoder] = useState(false)
  const [smallImage, setSmallImage] = useState("")
  const [largeImage, setlargeImage] = useState("")

  const [open, setOpen] = React.useState(false);
  const [imgUrl, setImgUrl] = useState("")
  const handleClickOpen = (src) => {
    setImgUrl(src)
    setOpen(true);
  };

  const handleCloseimg = () => {
    setOpen(false);
  };





  const openOpt = Boolean(anchorEl);


  const handleManageCompanies = () => {
    navigate('/super/admin/managecompanies')
  }
  const handleManageUsers = () => {
    navigate('/admin/viewbus')
  }







  const deleteBus = () => {

    confirm({ description: `This will permanently delete ${editobj.busname} ?` })
      .then(() => {
        axios.delete(`http://localhost:3001/admin/deletebus/${editobj.id}`).then((res) => {

          console.log('successfully deleted');
        });

      })
      .catch(() => console.log("Deletion cancelled."));


    setAnchorEl(null);

  }


  const { ownerId } = useParams()


  useEffect(() => {


    axios
      .post("http://localhost:3001/super/admin/viewbuses", {
        ownerId
      })
      .then((res) => {

        setRecords(res.data.buses);




      });
  }, [])


  console.log('============', records);

  const editBus = () => {


    navigate('/admin/editbus/' + editobj.id)

    setAnchorEl(null);
  };
  const handleClose = () => {
    setAnchorEl(null);


  };


  const columns = [


    { field: "busname", headerName: "BUS NAME", width: 250 },
    { field: "registernumber", headerName: "REG NUMBER", width: 250 },
    {
      field: "permit", headerName: "PERMIT", width: 250, editable: true, renderCell: (params) =>  <div style={{display:"flex",justifyContent:"center"}}> <img  onClick={() => handleClickOpen(params.row.permit)} style={{border:"solid orange"}}  width={50} src={params.row.permit} /> </div> ,
    },

    { field: "bustype", headerName: "TYPE", width: 250 },
    { field: "seats", headerName: "SEATS", width: 150 },


  ];



  console.log("uuuuu000     : ", records);
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

  const handleAddBus = () => {
    navigate("/admin/addbus");
  };





  return (
    <>
      <Navbar />
      <div>
        <Grid sx={{ backgroundColor: '#012169', marginTop: 0 }} container spacing={3}>
          <Grid sx={{ color: '#fff', backgroundColor: '#012169', border: "solid white", cursor: "pointer" }} item xs={12} sm={2} md={3}>
            <strong style={{ color: 'white', margin: 40 }}>DASHBOARD</strong>
          </Grid>
          <Grid></Grid>
          <Grid onClick={handleManageCompanies} className="tab" sx={{ backgroundColor: 'gray', border: "solid white" }} item xs={12} sm={3} md={3}>
            <strong className="tab" style={{ margin: 40, }} >MANAGE COMPANY</strong>
          </Grid>
          <Grid onClick={handleManageUsers} className="tab" sx={{ color: '#fff', backgroundColor: '#012169', border: "solid white", cursor: "pointer" }} item xs={12} sm={3} md={3}>
            <strong style={{ margin: 40, }}>MANAGE USERS</strong>
          </Grid>
          <Grid className="tab" sx={{ color: '#fff', backgroundColor: '#012169', border: "solid white", cursor: "pointer" }} item xs={12} sm={3} md={3}>
            <strong className="tab" style={{ margin: 40, }}>REPORTS</strong>
          </Grid>
        </Grid>
      </div>

      {/* <Typography
        sx={{ marginTop: 2, fontWeight: 900, fontSize: 25 }}
        align="center"
      >
        MANAGE BUS DETAILS
      </Typography> */}
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



      {/* menu */}


      <StyledMenu
        id="demo-customized-menu"
        MenuListProps={{
          'aria-labelledby': 'demo-customized-button',
        }}
        anchorEl={anchorEl}
        open={openOpt}
        onClose={handleClose}
      >
        <MenuItem onClick={editBus} disableRipple>
          <EditIcon />
          Edit
        </MenuItem>
        <MenuItem onClick={deleteBus} disableRipple>
          <DeleteIcon />
          Delete
        </MenuItem>

      </StyledMenu>

      {/* loder */}

      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={openLoder}
        onClick={handleClose}
      >
        <CircularProgress color="inherit" />
      </Backdrop>

      {/* zoom */}
      <Dialog
        fullScreen
        open={open}
        onClose={handleCloseimg}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: 'relative',backgroundColor:"#012169" }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleCloseimg}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            
          </Toolbar>
        </AppBar>
        <div style={{ display: "flex", justifyContent: "center" }}>

          <ModalImage
            hideDownload={true}
            small={imgUrl}
            large={imgUrl}
            alt="Hello World!"
          />;

        </div>


      </Dialog>

    </>
  );
}

export default Displaybus;




