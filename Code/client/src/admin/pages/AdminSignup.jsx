import axios from "axios";
import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./AdminLogin.css"

const AdminSignup = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [value, setValue] = useState({
    name: "",
    email: " ",
    phone: " ",
    password: "",
  
    gender: " ",
    image: " ",
  });

  const handlInput = (e) => {
    setValue({ ...value, [e.target.name]: e.target.value });
  };

  const handleImage = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.readAsDataURL(file);
    reader.addEventListener("load", () => {
      setValue({ ...value, image: reader.result });
    });
  };
  const navigate = useNavigate();

  const Submit = async (e) => {
    e.preventDefault();
    const postData = { ...value };
    try {
      const res = await axios.post(
        "http://localhost:8000/create-admin",
        postData
      );
      setErrorMessage(res.data.msg)

       if (res.data.msg === "User Created successfully") {
         navigate("/adminlogin");
       }
     
    } catch (error) {
      setErrorMessage(res.data.msg);
      console.log("register failed", error.message);
    }
    // console.log(value);
  };

  return (
    <>
      <div className="signup-container d-flex align-items-center justify-content-center min-vh-100">
        <div
          className="card shadow-lg p-4 mt-5 "
          style={{
            maxWidth: "580px",
            maxheigt: "100%",
            width: "100%",
            borderRadius: "10px",
          }}
        >
          <div className="text-center mb-3">
            <div className="text-success ">
              <i class="fa-solid fa-book fa-3x"></i>
            </div>
            <h3 className="text-primary">Create Your Account</h3>
            <p className="text-secondary">Admin Signup</p>
          </div>
          {errorMessage && (
            <div className="text-center mb-4">
              <span className="text-danger ">{errorMessage}</span>
            </div>
          )}
          <form onSubmit={Submit}>
            <div className="row">
              <div className="col-md-6 mb-3">
                <label htmlFor="name" className="text-dark">
                  Name
                </label>
                <input
                  type="text"
                  className="form-control rounded-pill home-input"
                  id="name"
                  placeholder="Enter your name"
                  required
                  name="name"
                  onChange={handlInput}
                />
              </div>

              <div className="col-md-6 mb-3">
                <label htmlFor="email" className="text-dark">
                  Email
                </label>
                <input
                  type="text"
                  className="form-control rounded-pill home-input"
                  id="email"
                  placeholder="Enter your email"
                  required
                  name="email"
                  onChange={handlInput}
                />
              </div>
            </div>
            <div className="row">
              <div className="col-md-6 mb-3">
                <label htmlFor="phone" className="text-dark">
                  Phone Number
                </label>
                <input
                  type="text"
                  className="form-control rounded-pill home-input"
                  id="phone"
                  required
                  placeholder="Enter your phone number"
                  name="phone"
                  onChange={handlInput}
                />
              </div>
              <div className="col-md-6 mb-3">
                <label htmlFor="password" className="text-dark">
                  Password
                </label>
                <input
                  type="password"
                  className="form-control rounded-pill home-input"
                  id="password"
                  placeholder="Enter your password"
                  required
                  name="password"
                  onChange={handlInput}
                />
              </div>
            </div>
            
            <div className="row">
              <div className="col-12">
                <div className="form-group mb-3">
                  <label className="text-dark">Gender:</label>
                  <div className="d-flex">
                    <select
                      name="gender"
                      id=""
                      className="form-control home-input"
                      required
                      onChange={handlInput}
                    >
                      <option disabled selected>
                        --Select--
                      </option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
            <div className="form-group mb-3">
              <label htmlFor="idCard" className="text-dark">
                Profile Picture
              </label>
              <input
                type="file"
                required
                className="form-control home-input"
                onChange={handleImage}
                name="internImg"
                accept=".jpg, .jpeg, .png"
                id=""
              />

              <img
                src={value.image}
                alt=""
                width={150}
                height={80}
                className="mt-2"
              />
            </div>
            <div className="d-flex justify-content-center">
              <button
                type="submit"
                className="btn btn-primary mx-auto rounded-pill custom-btn"
                style={{
                  backgroundColor: "#007bff",
                  borderColor: "#007bff",
                  width: "60%",
                }}
              >
                Sign Up
              </button>
            </div>
            <p className="d-flex justify-content-center mt-4">
              Already Have account? <NavLink to="/adminlogin">Login here</NavLink>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default AdminSignup;
