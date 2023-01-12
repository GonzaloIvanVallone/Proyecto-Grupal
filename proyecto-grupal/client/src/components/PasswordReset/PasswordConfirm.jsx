import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import * as actions from "../../redux/actions/productsActions";
import "./PasswordReset.css";
import logo from "../../img/logo.JPG";
import Swal from "sweetalert2"

export default function PasswordConfirm() {
  const dispatch = useDispatch();
  let data = window.location.toString().split("/");
  let email = data[4];
  let token = data[5];
  const [userData, setUserData] = useState({
    email: email,
    password: "",
    password2: "",
    token: token,
  });
  const handleOnChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (userData.password && userData.password2) {
      if (userData.password === userData.password2) {
        if (
          token === localStorage.getItem("token") &&
          email === localStorage.getItem("email")
        ) {
          dispatch(actions.resetConfirm(userData));
          setUserData({
            email: "",
            password: "",
            password2: "",
          });
          Swal.fire({
            title: 'Password Changed!',
            icon: 'success',
            confirmButtonText: 'Continue'
          })
        } else {
          Swal.fire({
            title: 'Acess Denied!',
            icon: 'error',
            confirmButtonText: 'Continue'
          })
        }
      } else {
        Swal.fire({
          title: 'Password do not match',
          icon: 'error',
          confirmButtonText: 'Continue'
        })
      }
    } else {
      Swal.fire({
        title: 'Incomplete data!',
        icon: 'error',
        confirmButtonText: 'Continue'
      })
    }
  };
  return (
    <div className="container">
      <div className="password_reset_container">
        <div className="logo_container">
          <h3>CloudyBuy</h3>
          <img className="logo_image" src={logo} alt="logo" />
        </div>
        <h2>let's change your password</h2>
        
        <input
          className="email_input"
          type="password"
          name="password"
          placeholder="your new password"
          value={userData.password}
          onChange={(e) => handleOnChange(e)}
        />
        <input
          className="email_input"
          type="password"
          name="password2"
          placeholder="confirm password"
          value={userData.password2}
          onChange={(e) => handleOnChange(e)}
        />
        <button
          className="confirm_button"
          type="submit"
          onClick={(e) => handleSubmit(e)}
        >
          Send
        </button>
      </div>
    </div>
  );
}
