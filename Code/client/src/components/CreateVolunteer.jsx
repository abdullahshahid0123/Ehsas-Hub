import axios from "axios";
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const CreateVolunteer = () => {
  const navigate = useNavigate();

  // useEffect(() => {
  //   const token = sessionStorage.getItem("token");

  //   if (!token) {
  //     navigate("/");
  //   } else {
  //     navigate("/volunteer-dashboard");
  //   }
  // });

  const [errorMessage, setErrorMessage] = useState("");
  const [value, setValue] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    address: "",
    image: "",
  });

  const handlInput = (e) => {
    setValue({ ...value, [e.target.name]: e.target.value });
  };

  const [showcode, setshowcode] = useState(false);

  const toggleCode = async () => {
    try {
      const res = await axios.post(
        `http://localhost:8000/email-send-code/${value.email}`
      );
      alert(res.data.msg);
      setshowcode(true);
    } catch (err) {
      console.log(err);
    }
  };

  const handleImage = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.readAsDataURL(file);
    reader.addEventListener("load", () => {
      setValue({ ...value, image: reader.result });
    });
  };

  const handleInput = (e) => {
    setValue({ ...value, [e.target.name]: e.target.value });
  };
  const CreateVolunteer = async (e) => {
    e.preventDefault();
    const postData = { ...value };
    try {
      const res = await axios.post(
        "http://localhost:8000/create-volunteer",
        postData
      );

      setErrorMessage(res.data.msg);

      if (res.data.msg === "Request submitted successfuly ") {
        navigate("/volunteer-login");
      }

      setForm((state) => !state);
    } catch (error) {
      setErrorMessage(res.data.msg);
      console.log(error);
    }
  };
  return (
    <>
      <div className="container">
        <div className="container-fluid">
          <div className="row">
            <div className="col-sm-2"></div>
            <div className="col-sm-8 p-3 mt-4 card">
              <div className="text-center mb-3 mt-3">
                <div className="text-success ">
                  <i class="fa-solid fa-right-to-bracket fa-3x"></i>
                </div>
                <h3 className="text-primary">Become a Volunteer</h3>
                <p className="text-secondary">Join us as a Volunteer</p>
              </div>
              {errorMessage && (
                <div className="text-center mb-4">
                  <span className="text-danger ">{errorMessage}</span>
                </div>
              )}
              <form onSubmit={CreateVolunteer}>
                <div className="mb-3">
                  <label className="form-label">Full Name</label>
                  <input
                    type="text"
                    className="form-control"
                    required
                    name="name"
                    onChange={handleInput}
                  />
                </div>
                <div className="row ">
                  <div className="mb-3 col-md-12">
                    <label className="form-label">Email</label>
                    <input
                      className="form-control"
                      type="email"
                      required
                      name="email"
                      onChange={handleInput}
                    />
                    <input
                      type="button"
                      value="Verify Email"
                      className="my-4"
                      onClick={toggleCode}
                    />
                    <div>
                      {showcode && (
                        <>
                          <strong className="my-4 text-black">
                            verfication code
                          </strong>
                          <input
                            // name="verification"
                            className="text-center"
                            maxlength="4"
                            type="text"
                            placeholder="xxxx"
                            name="code"
                            onChange={handlInput}
                          />
                        </>
                      )}
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="mb-3 col-md-6">
                    <label className="form-label">Password</label>
                    <input
                      className="form-control"
                      type="password"
                      required
                      name="password"
                      onChange={handleInput}
                    />
                  </div>

                  <div className="mb-3 col-md-6">
                    <label className="form-label">Phone Number</label>
                    <input
                      type="number"
                      className="form-control"
                      required
                      name="phone"
                      onChange={handleInput}
                      placeholder="03xxxxxxxxx"
                      min={11}
                    />
                  </div>
                </div>

                <div className="mb-3">
                  <label className="form-label">Address</label>
                  <input
                    type="text"
                    className="form-control"
                    required
                    name="address"
                    onChange={handleInput}
                  />
                </div>
                <div className="form-group mb-3">
                  <div className="text-center mt-3">
                    {value.image ? (
                      <img
                        src={value.image}
                        alt=""
                        width="150"
                        height="80 "
                        className="mt-2"
                      />
                    ) : (
                      ""
                    )}
                  </div>
                  <label htmlFor="bookImage" className="text-dark">
                    CNIC Image
                  </label>
                  <input
                    type="file"
                    className="form-control"
                    id="bookImage"
                    accept=".jpg, .jpeg, .png"
                    placeholder="Upload book image"
                    required
                    name="profile"
                    onChange={handleImage}
                  />
                </div>
                <div className="text-center">
                  <button type="submit" className="btn btn-primary">
                    Submit
                  </button>
                  <p>
                    Alreay Have account{" "}
                    <NavLink to="/volunteer-login">Login here</NavLink>
                  </p>
                </div>
              </form>
            </div>
            <div className="col-sm-2"></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateVolunteer;
