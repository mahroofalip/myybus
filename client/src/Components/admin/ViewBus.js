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




function ViewBus() {
  const confirm = useConfirm();
  const navigate = useNavigate();
  const [editobj, dispath] = useReducer(setData, {})
  const [records, setRecords] = useState();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [openLoder, setOpensLoder] = useState(false)

  const openOpt = Boolean(anchorEl);


  const deleteBus = () => {
         
    confirm({ description: `This will permanently delete ${editobj.busname} ?` })
    .then(() =>{
      axios.delete(`http://localhost:3001/admin/deletebus/${editobj.id}`).then((res) => {
    
        console.log('successfully deleted');
    });

    } )
    .catch(() => console.log("Deletion cancelled."));


    setAnchorEl(null);

  }




  const editBus = () => {

    console.log("view bus   ", editobj);
    navigate('/admin/editbus/' + editobj.id)

    setAnchorEl(null);
  };
  const handleClose = () => {
    setAnchorEl(null);


  };
  console.log("uuuuu", editobj);

  const columns = [


    { field: "id", headerName: "BUS ID", width: 100 },
    { field: "busname", headerName: "BUS NAME", width: 250 },
    { field: "registernumber", headerName: "REGISTER NO", width: 250 },
    { field: "bustype", headerName: "TYPE BUS", width: 150 },
    { field: "seats", headerName: "SEATS", width: 150, },
    {
      field: "OPTIONS",
      renderCell: (cellValues) => {

        const onclick = (event) => {
          setAnchorEl(event.currentTarget);
          dispath(cellValues.row)

        };

        return (

          <Button
            id="demo-customized-button"
            aria-controls={openOpt ? 'demo-customized-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={openOpt ? 'true' : undefined}
            variant="contained"
            disableElevation
            onClick={onclick}
            endIcon={<KeyboardArrowDownIcon />}
          >
            Options
          </Button>
        );
      },
      width: 200

    }

  ];






  useEffect(() => {
    axios.get("http://localhost:3001/admin/getbuses").then((res) => {
      console.log("get bus function ");
      setRecords(res.data.result);
    });
  },[records]);


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




  //  useEffect(()=>{
  //   let response=records.map((record)=>{
  //     return {id:record.id,busname:record.busname,regnumber:record.registernumber,bustype:record.bustype,seats:record.seats,}
  //  }) 
  //  response.push(rows)

  //  },[])





  // const handleSearch = (e) => {
  //   let target = e.target;
  //   setFilterFn({
  //     fn: (items) => {
  //       if (target.value === "") return items;
  //       else
  //         return items.filter((x) =>
  //           x.fullName.toLowerCase().includes(target.value)
  //         );
  //     },
  //   });
  // };

  return (
    <>
      <AppBar sx={{ backgroundColor: "#fff" }} position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Box
              sx={{
                flexGrow: 1,
                display: {
                  xs: "flex",
                  md: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                },
              }}
            >
              <DirectionsBusIcon style={{ color: "gray", fontSize: 40 }} />

              <span className="mybus">
                <strong style={{ color: "gray", fontWeight: 900 }}>
                  ADMIN PANEL
                </strong>
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
        <Grid
          sx={{ backgroundColor: "#012169", marginTop: 0 }}
          container
          spacing={2}
        >
          <Grid
            className="tab"
            sx={{
              color: "#fff",
              backgroundColor: "#012169",
              border: "solid white",
              cursor: "pointer",
            }}
            item
            xs={12}
            sm={2}
            md={2}
          >
            <strong style={{ color: "white", margin: 40 }}>DASHBOARD</strong>
          </Grid>
          <Grid></Grid>

          <Grid
            onClick={handleAddBus}
            className="tab"
            sx={{
              color: "#fff",
              backgroundColor: "#012169",
              border: "solid white",
              cursor: "pointer",
            }}
            item
            xs={12}
            sm={2}
            md={2}
          >
            <strong className="tab" style={{ margin: 40 }}>
              ADD BUS
            </strong>
          </Grid>

          <Grid
            sx={{ backgroundColor: "gray", border: "solid white" }}
            item
            xs={12}
            sm={2}
            md={2}
          >
            <strong style={{ margin: 40 }}>VIEW BUS</strong>
          </Grid>
          <Grid
            className="tab"
            sx={{
              color: "#fff",
              backgroundColor: "#012169",
              border: "solid white",
              cursor: "pointer",
            }}
            item
            xs={12}
            sm={2}
            md={2}
          >
            <strong className="tab" style={{ margin: 40 }}>
              REPORTS
            </strong>
          </Grid>
        </Grid>
      </div>
      <Typography
        sx={{ marginTop: 2, fontWeight: 900, fontSize: 25 }}
        align="center"
      >
        MANAGE BUS DETAILS
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

    </>
  );
}

export default ViewBus;
