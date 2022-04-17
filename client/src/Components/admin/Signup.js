import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../forms.css";
import { useNavigate } from "react-router-dom";

function Signup() {
  const { useState } = React;

  const [Name, setName] = useState("");
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [nameErr, setNameErr] = useState(false);
  const [emailErr, setEmailErr] = useState(false);
  const [PasswordErr, setPasswordErr] = useState(false);

  const [eye, seteye] = useState(true);
  const [pass, setpass] = useState("password");
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

    if (name === "password") {
      setPassword(value);
    }
  };

  const navigate = useNavigate();

  const submitForm = (e) => {
    e.preventDefault();

    if (Name.length < 1) {
      setNameErr(true);

    } else {
      setNameErr(false);
      setEmailErr(true);
    }

    if (Name === "") {
      setNameErr(true);
    } else {
      setNameErr(false);
    }

    if (Email.length < 1) {
      setEmailErr(true);
    } else {
      setEmailErr(false);
    }

    if (Email === "") {
      setEmailErr(true);
    } else {
      setEmailErr(false);
    }
    if (Password === "") {
      setPasswordErr(true);
    } else {
      setPasswordErr(false);
    }

    if (!nameErr && !emailErr && !PasswordErr) {
      axios
        .post("http://localhost:3001/admin/signup", { Name, Email, Password })
        .then((res) => {
          console.log(res.data.user);
          localStorage.setItem("token", res.data.user);

          if (res.data.user) {
            navigate("/admin/home");
          } else {
            alert("This user already exist");
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
                  <div className="recovery">
                    <p>Recovery Password</p>
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
