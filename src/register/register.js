import { Box, Button, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
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
    const Cpassword = document.getElementById("Cpassword").value;
    const profile = document.getElementById("profile").files[0];
  //  const profilePath=`uploads\\${profile.lastModified}-${profile.name}`

    
    // let data = {
    //   name: name,
    //   email: email,
    //   password: password,
    //   image:profile
    // };
    // console.log("=====>",profile)
    var FormData = require("form-data");

    var datav1 = new FormData();
    datav1.append("name", name);
    datav1.append("email", email);
    datav1.append("password", password);
    datav1.append("Cpassword", Cpassword);
    datav1.append("file", profile);

    var config = {
      method: "post",
      url: "http://localhost:4000/api/v1/register",

      data: datav1,
    };

    axios(config)
      .then(function (response) {
        console.log("uploded image",response.data);
        if(response.data.status==true){
          Swal.fire({
                    // title: 'Good job!',
                    text: `${response.data.message}`,
                    icon: "success",
                  })
        }else{
          Swal.fire({
                    // title: 'Good job!',
                    text: `${response.data.message}`,
                    icon: "error",
                  })
        }
       
      })
      .catch(function (error) {
        console.log(error);
        Swal.fire({
                  // title: 'Good job!',
                  text: `${error.message}`,
                  icon: "error",
                })
       
      });


  // var imgUrl = `${fetchFile?.data[0].name}`;
  // let newIMG = imgUrl.replace(/\\/g, "/");
    // PostAPI(API.REGISTER, data)
    //   .then((response) => {
    //     console.log(response);
    //     console.log(JSON.stringify(response.data));
    //     if (response.data.status == true) {
    //       Swal.fire({
    //         // title: 'Good job!',
    //         text: `${response.data.message}`,
    //         icon: "success",
    //       }).then(() => {
    //         navigate("/login");
    //       });
    //     } else {
    //       Swal.fire({
    //         // title: 'Good job!',
    //         text: `${response.data.message}`,
    //         icon: "error",
    //       });
    //     }
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
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
          // height: "350px",
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
            height: "76vh",
          }}
        >
          <h1>User Registration</h1>
          
          <TextField id="name" label="name" size="small" />
          <TextField id="email" label="email" size="small" />
          <TextField id="password" label="password" size="small" />
          <TextField id="Cpassword" label="confirm password" size="small" />
          <TextField id="profile"  size="small" type="file" />
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
