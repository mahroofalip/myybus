import * as React from "react";
import { styled } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import MoreIcon from "@mui/icons-material/MoreVert";
import { fontSize, margin, minWidth } from "@mui/system";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import AddLocationIcon from "@mui/icons-material/AddLocation";
import Button from "@mui/material/Button";


import "./search.css";
const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  backgroundColor: "#012169",
  "@media all": {
    minHeight: 200,
  },
}));

const Wraper = {
  padding: 20,
  border: 20,
};

const inputStyle = {
  color: "black",
  fontWeight: "bold",
  minHeight: 50,
};

const black = {
  color: "black",
};
const outerWrapper = {
  paddingBottom: 40,
  paddingTop: 20,
  paddingLeft: 10,
  paddingRight: 10,
};

const searchButton={
  display:'block'
}

function SearchBar() {
  const [value, setValue] = React.useState(null);

  return (
    <StyledToolbar style={outerWrapper}>
      <Box
        style={{
          backgroundColor: "#fff",
          padding: 50,
          border: 10,
          borderRadius: 20,
        }}
        sx={{
          flexGrow: 1,
          marginLeft: { md: "100px" },
          marginRight: { md: "100px" },
        }}
      >
        <h3 align={"center"}>Select the Place to Travel</h3>
        <Grid style={Wraper} container spacing={2}>
          <Grid item xs={12} sm={4} md={4}>
            <FormControl className="input" variant="standard">
              <Input
                style={inputStyle}
                placeholder="From"
                id="input-with-icon-adornment"
                startAdornment={
                  <InputAdornment position="start">
                    <AddLocationIcon style={black} />
                  </InputAdornment>
                }
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={4} md={4}>
            <FormControl className="input" variant="standard">
              <Input
                style={inputStyle}
                placeholder="To"
                id="input-with-icon-adornment"
                startAdornment={
                  <InputAdornment position="start">
                    <AddLocationIcon style={black} />
                  </InputAdornment>
                }
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={4} md={4}>
            <FormControl className="input" variant="standard">
              <Input
                style={inputStyle}
                placeholder="Travel Date"
                id="input-with-icon-adornment"
                type="date"
                startAdornment={
                  <InputAdornment position="start"></InputAdornment>
                }
              />
            </FormControl>
          </Grid>
        
         
        </Grid>
        <div align={"center"}>
         <Button sx={{ width: { sm: '20%', xs: '100%' }, }} variant="contained" disableElevation>

           <strong>SEARCH</strong>
         </Button>
        
         </div>
      </Box>
    </StyledToolbar>
  );
}

export default SearchBar;
