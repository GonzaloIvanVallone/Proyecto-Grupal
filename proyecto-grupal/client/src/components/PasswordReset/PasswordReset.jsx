import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import * as actions from "../../redux/actions/productsActions";
import "./PasswordReset.css";
import logo from "../../img/logo.JPG";
import Swal from "sweetalert2"
import { Link } from "react-router-dom";

export default function PasswordReset() {
  const dispatch = useDispatch();
  const [emailData, setEmailData] = useState({
    email: "",
  });

  const handleOnChange = (e) => {
    setEmailData({ ...emailData, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (emailData) {
      dispatch(actions.resetPassword(emailData));
      setEmailData({ email: "" });
    } else {
      Swal.fire({
        title: 'Email required',
        icon: 'error',
        confirmButtonText: 'Continue'
      })
    }
  };

  return (
    <div className="container">
      <div className="password_reset_container">
        <Link className="link_goback" to='/home'>Return</Link>
        <div className="logo_container">
          <h3>CloudyBuy</h3>
          <img className="logo_image" src={logo} alt="logo" />
        </div>
        <h1>Forgot Password?</h1>
        <h4>give us your email to help you!</h4>
        <input
          className="email_input"
          type="email"
          name="email"
          placeholder="your email"
          value={emailData.email}
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
