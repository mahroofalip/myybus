import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import FormControl from "@mui/material/FormControl";
import OtpInput from "react-otp-input";
import '../../forms.css'
export default function MaxWidthDialog() {
  const [open, setOpen] = React.useState(false);
  const [fullWidth, setFullWidth] = React.useState(true);
  const [maxWidth, setMaxWidth] = React.useState("xs");
  const [otp, setOtp] = React.useState("");
  const [otpErr,seOtptErr]=React.useState(false)
  const [otpValidErr,setOtpValidErr]=React.useState(false)

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  return (
    <React.Fragment>
      <Button variant="outlined" onClick={handleClickOpen}>
        Open 
      </Button>
      <Dialog
        fullWidth={fullWidth}
        maxWidth={maxWidth}
        open={open}
        onClose={handleClose}
      >
        <DialogContent>
          <DialogContentText align="center">
            we sent otp in your phone number Enter here
          </DialogContentText>
         
          <Box
            noValidate
            component="form"
            sx={{
              display: "flex",
              flexDirection: "column",
              m: "auto",
              width: "fit-content",
            }}
          >
         
            <FormControl sx={{ mt: 2, minWidth: 120 }}>
            <p className={otpErr ? "incorrect" : "correct"} align='center' style={{color:'red'}}>  Entered otp is incorrect</p>
            <p className={otpValidErr? "incorrect" : "correct"} align='center' style={{color:'red'}}>  Otp Must be 4 charactor</p>
              <OtpInput
                inputStyle={{
                  width: "3rem",
                  height: "3rem",
                  margin: "30px 5px",
                  fontSize: "1rem",
                  borderRadius: 4,
                  border: "2px solid rgba(0,0,0,0.3)",
                }}
                onChange={(otp) => {
                  setOtp(otp);
                
                }}
                numInputs={4}
                separator={<span> &ensp; </span>}
                value={otp}
              />
            </FormControl>
          </Box>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
}
