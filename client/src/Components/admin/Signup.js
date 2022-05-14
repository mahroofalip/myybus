import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../forms.css";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
function Signup() {
  const { useState } = React;

  const [Name, setName] = useState("");
  const [company,setCompanyName]=useState("")
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [nameErr, setNameErr] = useState(false);
  const [companyNameErr,setCompanyNameErr]=useState("")
  const [emailErr, setEmailErr] = useState(false);
  const [PasswordErr, setPasswordErr] = useState(false);
  const [mobileNumber, setMobileNumber] = useState("");
  const [eye, seteye] = useState(true);
  const [pass, setpass] = useState("password");
  const [mobileErr, setMobileErr] = useState(false);
  const [mobileValidErr, setmobileValidErr] = useState(false);
  const [exist, setExist] = useState("")
  console.log(Email, Name, Password);
  console.log(Name, Email, Password);

  const inputEvent = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    if (name === "email") {
      setEmail(value);
    }
    if (name === "name") {
      setName(value);
    }
    if (name === "company") {
      setCompanyName(value);
    }
    if (name === "mobile") {
      setMobileNumber(value);
    }
    if (name === "password") {
      setPassword(value);
    }
  };

  const navigate = useNavigate();

  const submitForm = (e) => {
    e.preventDefault();
   let error = false;
    if (Name.length < 1) {
      setNameErr(true);
    error=true
    } else {
      setNameErr(false);
      setEmailErr(true);
    }

    if (Name === "") {
      setNameErr(true);
      error=true
    } else {
      setNameErr(false);
    }
    if(company==="")

    if (Email.length < 1) {
      setEmailErr(true);
      error=true
    } else {
      setEmailErr(false);
    }

    if (Email === "") {
      setEmailErr(true);
      error=true
    } else {
      setEmailErr(false);
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
    if(company===''){
      setCompanyNameErr(true)
    }else{
      setCompanyNameErr(false)
    }

    if (Password === "") {
      error=true
      setPasswordErr(true);
    } else {
      setPasswordErr(false);
    }

    if (!error) {
      axios
        .post("http://localhost:3001/admin/signup", { Name, Email, Password ,mobileNumber,company})
        .then((res) => {
          console.log(res.data.user);
          localStorage.setItem("token", res.data.user);

          if (res.data.user) {
            var decoded = jwt_decode(res.data.user);
              navigate("/admin/home/"+decoded.id);
          
          } else {
            setExist("  This user already exist")
          }
        });
    }
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
  return (
    <>
      <div className="wraper">
        <div className="container">
          <div className="card">
            <div className="form">
              <div className="left-side">
                <img
                  src="https://images.unsplash.com/photo-1632276536839-84cad7fd03b0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8YnVzfGVufDB8fDB8fA%3D%3D&w=1000&q=80"
                  alt=""
                />
              </div>

              <div className="right-side">
                <div className="register">
                  <p>
                    Have you already Account ?{" "}
                    <Link to="/admin/login">Login</Link>
                  </p>
                </div>

                <div className="hello">
                  <h2>Admin Signup</h2>
                </div>

                <form onSubmit={submitForm}>
                <p align="center" className={` ${exist ? "danger" : "nodanger"}`} style={{ color: "red", paddingTop: 5 }}>
                    <i className="fa fa-warning"></i> {exist}
                  </p>
                  <div className="input_text">
                    <input
                      className={` ${nameErr ? "warning" : ""}`}
                      type="text"
                      placeholder="Enter Name"
                      name="name"
                      value={Name}
                      onChange={inputEvent}
                    />
                    <p className={`${nameErr ? "danger" : "nodanger"}`}>
                      <i className="fa fa-warning"></i>Please enter your name .
                    </p>
                  </div>
                  <div className="input_text">
                    <input
                      className={` ${emailErr ? "warning" : ""}`}
                      type="email"
                      placeholder="Enter Email"
                      name="email"
                      value={Email}
                      onChange={inputEvent}
                    />
                    <p className={` ${emailErr ? "danger" : "nodanger"}`}>
                      <i className="fa fa-warning"></i>Please enter a valid
                      email address.
                    </p>
                  </div>
                  <div className="input_text">
                    <input
                      className={` ${companyNameErr ? "warning" : ""}`}
                      type="text"
                      placeholder="Enter Company"
                      name="company"
                      value={company}
                      onChange={inputEvent}
                    />
                    <p className={`${companyNameErr ? "danger" : "nodanger"}`}>
                      <i className="fa fa-warning"></i>Please enter your company name .
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
                  <div className="input_text">
                    <input
                      className={` ${PasswordErr ? "warning" : ""}`}
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
                
                  <div className="btn">
                    <button type="submit">Sign in</button>
                  </div>
                </form>

                <hr />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Signup;
