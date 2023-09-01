import { Box, Typography } from "@mui/material";
import React from "react";
import TextField from "@mui/material/TextField/TextField";
import Button from "@mui/material/Button/Button";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { LoginAPI, PostAPI } from "../Services/Services";
import { API } from "../API";

const Login = () => {
  const navigate = useNavigate();
  const login = () => {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    let data = {
      email: email,
      password: password,
    };

    PostAPI(API.LOGIN, data)
      .then((response) => {
        console.log(response);
        console.log(response.data.data);
        if (response.data.status == true) {
          Swal.fire({
            // title: 'Good job!',
            text: `${response.data.message}`,
            icon: "success",
          }).then(() => {
            navigate("/chatv1", {
              state: {
                name: response.data.data.name,
                email: email,
                password: password,
              },
            });
          });
        } else {
          Swal.fire({
            // title: 'Good job!',
            text: "User Login Faild",
            // text: `${response.data.message}`,
            icon: "error",
          });
        }
      })
      .catch((error) => {
        Swal.fire({
          // title: 'Good job!',
          text: error.message,
          // text: `${response.data.message}`,
          icon: "warning",
        });
        console.log(error);
      });
  };

  const userRegister=()=>{
    navigate("/")
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
          <h1>User Login</h1>
          <TextField id="email" label="email" size="small" />
          <TextField id="password" label="password" size="small" />
          <Button variant="contained" onClick={login}>
            Login
          </Button>
          <Typography>Already have an account</Typography>
          <Button variant="contained" onClick={userRegister}>
            Register
          </Button>
          <Box>
         <NavLink>Forgot Password?</NavLink></Box>
        </div>
      </div>
    </div>
  );
};

export default Login;
