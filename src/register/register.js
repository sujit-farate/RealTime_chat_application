import { Box, Button, TextField, Typography } from "@mui/material";
import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { PostAPI } from "../Services/Services";
import { API } from "../API";

const Register = () => {
  const navigate = useNavigate();

  const userRegister = () => {
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    let data = {
      name: name,
      email: email,
      password: password,
    };
    PostAPI(API.REGISTER, data)
      .then((response) => {
        console.log(response);
        console.log(JSON.stringify(response.data));
        if (response.data.status == true) {
          Swal.fire({
            // title: 'Good job!',
            text: `${response.data.message}`,
            icon: "success",
          }).then(() => {
            navigate("/login");
          });
        } else {
          Swal.fire({
            // title: 'Good job!',
            text: `${response.data.message}`,
            icon: "error",
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const userLogin=()=>{
    navigate("/login")
  }
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <div
        style={{
          height: "350px",
          width: "300px",
          border: "1px solid gray",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          border: "1px solid",
          padding: "20px",
          boxShadow: "5px 10px 5px 10px #888888",
          borderRadius: "13px",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: " column",
            justifyContent: "space-evenly",
            alignItems: "center",
            height: "59vh",
          }}
        >
          <h1>User Registration</h1>
          
          <TextField id="name" label="name" size="small" />
          <TextField id="email" label="email" size="small" />
          <TextField id="password" label="password" size="small" />
          <Button variant="contained" onClick={userRegister}>
            Register
          </Button>
          <Typography>Already have an account</Typography>
          <Button variant="contained" onClick={userLogin}>Login</Button>
          {/* <NavLink to="/login">Login</NavLink> */}
        </div>{" "}
      </div>{" "}
    </div>
  );
};

export default Register;
