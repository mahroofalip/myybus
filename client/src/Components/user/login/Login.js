import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../../forms.css";
import { useNavigate } from "react-router-dom";
import CircularProgress from '@mui/material/CircularProgress';
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import FormControl from "@mui/material/FormControl";
import OtpInput from "react-otp-input";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Backdrop from '@mui/material/Backdrop';
import { GoogleLogin } from 'react-google-login';
function Login() {

  const navigate = useNavigate();
  const { useState } = React;

  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");

  const [emailErr, setEmailErr] = useState(false);
  const [PasswordErr, setPasswordErr] = useState(false);
  const [mobileNumber, setMobileNumber] = useState("");
  const [eye, seteye] = useState(true);
  const [open, setOpen] = useState(false)
  const [pass, setpass] = useState("password");
  const [warning, setWarning] = useState("")

  const [exist, setExist] = useState("")
  const [openOtp, setOpenOtp] = useState(false);
  const [fullWidth, setFullWidth] = React.useState(true);
  const [maxWidth, setMaxWidth] = React.useState("xs");
  const [otp, setOtp] = React.useState("");
  const [otpErr, seOtptErr] = React.useState(false);
  const [otpValidErr, setOtpValidErr] = React.useState(false);
  // err
  const [mobileErr, setMobileErr] = useState(false);
  const [mobileValidErr, setmobileValidErr] = useState(false);
  const [counter, setCounter] = React.useState();
  // Timer 

  React.useEffect(() => {
    let token = localStorage.getItem("userToken")
    if (token) {
      return navigate("/")
    }
  }, [])



  React.useEffect(() => {
    const timer =
      counter > 0 && setInterval(() => setCounter(counter - 1), 1000);
    if (counter === 0) {
      setExist("  OTP time out please try again")
      setOpenOtp(false);
    }
    return () => clearInterval(timer);
  }, [counter]);



  const handleCloseOtp = () => {
    setOpenOtp(false);
  };

  const handleClickOpen = () => {

    setOpenOtp(true);
    setCounter(100)

  };





  const handleClose = () => {
    setOpen(false);
  };
  const handleToggle = () => {
    setOpen(!open);
  };





  console.log(Email, Password);
  console.log(Email, Password);

  const inputEvent = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
    if (name === "mobile") {
      setMobileNumber(value);
    }
  };

  const submitForm = (e) => {
    e.preventDefault();

    let error = false

    if (Email.length < 1) {
      setEmailErr(true);
      error = true

    } else {
      setEmailErr(false);
    }
    if (Email === "") {
      setEmailErr(true);
      error = true
    } else {
      setEmailErr(false);
    }
    if (Password === "") {
      setPasswordErr(true);
      error = true
    } else {
      setPasswordErr(false);
    }
    if (mobileNumber === "") {
      setMobileErr(true);
      setmobileValidErr(false);
      error = true;
    } else {
      setMobileErr(false);
      if (mobileNumber.length <= 9 || mobileNumber.length >= 11) {
        setmobileValidErr(true);
        error = true;
      } else if (isNaN(mobileNumber)) {
        setmobileValidErr(true);
        error = true;
      } else {
        setmobileValidErr(false);
      }
    }


    if (!error) {

      setOpen(!open);
      axios
        .post("http://localhost:3001/user/Login", { Email, Password, mobileNumber })
        .then((res) => {
          setOpen(false);

          console.log(res.data.status,'  :uuuuuuuuuuuuuuuuuuuuuuuuuu');


          if (res.data.status === 0) {

            setWarning("Entered password is incorrect !")
          } else if (!res.data.status) {
            console.log("invalid user ...........................")
            setWarning("Invalid user !")
          } else {

            localStorage.setItem("userToken", res.data.userToken);
            navigate("/");
          }
        });
    }
  };
  // otp login

  const OtpSubmitForm = (e) => {
    e.preventDefault();

    let error = false


    if (!Email || Email) {
      setEmailErr(false);
    }

    if (!Password || Password) {

      setPasswordErr(false);
    }
    if (mobileNumber === "") {
      setMobileErr(true);
      setmobileValidErr(false);
      error = true;
    } else {
      setMobileErr(false);
      if (mobileNumber.length <= 9 || mobileNumber.length >= 11) {
        setmobileValidErr(true);
        error = true;
      } else if (isNaN(mobileNumber)) {
        setmobileValidErr(true);
        error = true;
      } else {
        setmobileValidErr(false);
      }
    }


    if (!error) {

      setOpen(!open);
      axios
        .post("http://localhost:3001/user/otp/Login", { mobileNumber })
        .then((res) => {
          setOpen(false);
          console.log(res.data.status);

          let user = res.data.status;
          if (!user) {
            setWarning(" This mobile is not registered !")
          } else {
            setWarning("")

            handleClickOpen();


          }
        });
    }
  };


  const submitCode = (number) => {
    setOpen(!open);
    axios
      .post("http://localhost:3001/user/otp/login/verify", {

        OTP: number,
        MOB: mobileNumber
      })
      .then((response) => {
        setOpen(false);
        console.log(response);

        if (response.data.status) {

          localStorage.setItem("userToken", response.data.userToken);

          navigate("/");
        } else {

          setExist(" Entered otp code is incorrect please try again")
        }
      });
  };





  const Eye = () => {
    if (pass === "password") {
      setpass("text");
      seteye(false);
    } else {
      setpass("password");
      seteye(true);
    }
  };


  const responseSuccesGoogle = (response) => {
    console.log("google success :", response);
    setOpen(!open);
    axios
      .post("http://localhost:3001/user/google/authentication", {

        token: { tokenId: response.tokenId }
      }).then((res) => {

        console.log(res.data.status);
        if (res.data.status) {

          localStorage.setItem("userToken", res.data.userToken);
          setOpen(false);
          navigate("/");


        }
      })

  }

  const responseErrorGoogle = (response) => {
    console.log("google error :", response);
  }




  return (
    <>
      <div className="wraper">
        <div className="container">
          <div className="card">
            <div className="form">
              <div className="left-side">
                <img
                  className="imagebus"
                  src="https://images.unsplash.com/photo-1632276536839-84cad7fd03b0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8YnVzfGVufDB8fDB8fA%3D%3D&w=1000&q=80"
                  alt=""
                />
              </div>

              <div className="right-side">
                <div className="register">
                  <p>
                    New User ?<Link to="/signup">Signup Now</Link>
                  </p>
                </div>

                <div className="hello">
                  <h2>Login</h2>
                </div>

                <form onSubmit={submitForm}>
                  <p align="center" className={` ${exist ? "danger" : "nodanger"}`} style={{ color: "red", paddingTop: 5 }}>
                    <i className="fa fa-warning"></i> {exist}
                  </p>
                  <p align="center" className={` ${warning ? "danger" : "nodanger"}`} style={{ color: "red", paddingTop: 5 }}>
                    <i className="fa fa-warning"></i> {warning}
                  </p>
                  <div className="input_text">
                    <input
                      style={{ color: "black" }}
                      className={` ${emailErr ? "warning" : "nowarning"}`}
                      type="email"
                      placeholder="Enter Email"
                      name="email"
                      value={Email}
                      onChange={inputEvent}
                    />
                    <p className={` ${emailErr ? "danger" : "nodanger"}`}>
                      <i className="fa fa-warning"></i>Please enter your
                      email address.
                    </p>
                  </div>
                  <div className="input_text">
                    <input
                      className={` ${PasswordErr ? "warning" : "nowarning"}`}
                      type={pass}
                      placeholder="Enter Password"
                      name="password"
                      value={Password}
                      onChange={inputEvent}
                    />
                    <i
                      onClick={Eye}
                      className={`fa ${eye ? "fa-eye-slash" : "fa-eye"}`}
                    ></i>

                    <p className={` ${PasswordErr ? "danger" : "nodanger"}`}>
                      <i className="fa fa-warning"></i>Please enter password
                    </p>
                  </div>
                  <div className="input_text">
                    <input
                      className={` ${mobileErr ? "warning" : "nowarning"}`}
                      type="text"
                      placeholder="Enter your Mobile"
                      name="mobile"
                      value={mobileNumber}
                      onChange={inputEvent}
                    />
                    <p className={` ${mobileValidErr ? "danger" : "nodanger"}`}>
                      <i className="fa fa-warning"></i>Please enter your a valid
                      mobile number
                    </p>
                    <p className={` ${mobileErr ? "danger" : "nodanger"}`}>
                      <i className="fa fa-warning"></i>Please enter your mobile
                      number.
                    </p>
                  </div>

                  <div className="btn">
                    <button type="submit">SIGN IN</button>
                  </div>
                  <div className="btn">
                    <button onClick={OtpSubmitForm} style={{ backgroundColor: "#069e3b" }} type="button">OR OTP SIGN IN</button>
                    <Dialog
                      fullWidth={fullWidth}
                      maxWidth={maxWidth}
                      open={openOtp}
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
                            <Typography fontWeight={500} align="center" color='textSecondary'> Resend OTP in <span style={{ color: "green", fontWeight: "bold" }}> 00:{counter}</span> </Typography>
                            <p
                              className={otpErr ? "incorrect" : "correct"}
                              align="center"
                              style={{ color: "red" }}
                            >
                              {" "}
                              Entered otp is incorrect
                            </p>
                            <p
                              className={otpValidErr ? "incorrect" : "correct"}
                              align="center"
                              style={{ color: "red" }}
                            >
                              {" "}
                              Otp Must be 4 charactor
                            </p>
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
                                seOtptErr(false);
                                if (otp.length === 4) {
                                  handleCloseOtp();

                                  submitCode(otp);

                                } else {
                                  console.log("not reached 4 character");
                                }
                              }}
                              numInputs={4}
                              separator={<span> &ensp; </span>}
                              value={otp}
                              shouldAutoFocus
                            />
                          </FormControl>

                        </Box>



                      </DialogContent>
                    </Dialog>
                  </div>
                  <div style={{ display: "grid", marginTop: 10, color: "black" }}>
                    <GoogleLogin
                      theme="dark"
                      clientId="308398325326-d8vr61d3g6v4drv1r91hj5j13locln01.apps.googleusercontent.com"
                      buttonText="SIGN IN WITH GOOGLE"
                      onSuccess={responseSuccesGoogle}
                      onFailure={responseErrorGoogle}
                      cookiePolicy={'single_host_origin'}
                    />
                  </div>
                </form>

                <hr />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
        onClick={handleClose}
      >
        <CircularProgress color="inherit" />
      </Backdrop>

    </>
  );
}
export default Login;
