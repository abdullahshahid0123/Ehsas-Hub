import React, { useState, useEffect } from "react";
import "./Navbar.css";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";

const Profileview = () => {
  const LogOut = () => {
    const token = sessionStorage.getItem("token");
    if (token) {
      sessionStorage.removeItem("token");
      alert("successfuly logout");
      window.location.href = "/login";
    }
  };
  // for token check
  const navigate = useNavigate();
  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
  }, []);
  // this is fetch profile
  const [profile, setprofile] = useState([]);
  const Fetch = async () => {
    const userId = sessionStorage.getItem("id");
    try {
      const response = await axios.get(
        `http://localhost:8000/fetchuser-byid/${userId}`
      );
      // console.log("API Response:", response.data);
      setprofile([response.data]); // Correct usage
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };
  useEffect(() => {
    Fetch();
  }, []);

  // this is create donor code
  const userId = sessionStorage.getItem("id");
  const [value, setvalue] = useState({
    id: parseInt(userId),
    book_name: "",
    book_edition: "",
    auther_name: "",
 
  });
  const handleInput = (e) => {
    setvalue({ ...value, [e.target.name]: e.target.value });
  };
  const Submit = async (e) => {
    e.preventDefault();
    const postData = { ...value };
    try {
      const res = await axios.post(
        "http://localhost:8000/create-donor",
        postData
      );
      alert("donation successful");
      console.log("donation successful", res);
      setForm((state) => !state);
      setvalue({ book_imag: " " });
      window.location.reload()
    } catch (error) {
      console.log("donation not create", error);
    }
  };
  const handleImage = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.addEventListener("load", () => {
      setvalue({ ...value,  book_image: reader.result });
    });
  };
  
  return (
    <>
      <nav className="navbar-user">
        <div className="navbar-logo">
          <a href="/">EHSAS-HUB</a>
        </div>
        <div className="navbar-search ">
          <input
            type="text"
            className="search-input "
            placeholder="Search..."
          />
          <button className="search-button">
            <i className="fa-solid fa-magnifying-glass"></i>
          </button>
        </div>
        <div className="bell">
          <i class="fa-regular fa-bell"></i>
        </div>
        <div className="mail">
          <i class="fa-regular fa-envelope"></i>
        </div>
        <div className="heart">
          <i class="fa-regular fa-heart"></i>
        </div>

        <div className="switch-to-donor">
          <button
            className="donor-button"
            data-bs-toggle="modal"
            data-bs-target="#staticBackdrop"
          >
            Switch to Donate
          </button>
        </div>
        <div className="navbar-profile dropdown">
          <NavLink
            className="nav-link"
            to="#"
            id="navbarDropdown"
            role="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <img src="" alt="" className=" img-fluid rounded-circle" />
            <i className="fa-solid fa-user"></i>
          </NavLink>

          <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
            <li>
              <NavLink className="dropdown-item" to="/Profileview">
                Profile
              </NavLink>
            </li>
            <li>
              <button className="dropdown-item" onClick={LogOut}>Logout</button>
            </li>
          </ul>
        </div>
      </nav>

      <div class="container profile-container bg-gray">
        {Array.isArray(profile) && profile.length > 0 ? (
          profile.map((rs) => {
            console.log("hey bhi", rs);
            const { id, name, email, phone, gender } = rs;
            return (
              <div class="profile-left col-lg-4 col-md-4 col-sm-12" key={id}>
                <div class="text-center">
                  <img
                    src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8bWVucyUyMHdpdGglMjBjb2F0fGVufDB8fDB8fHww"
                    alt="Profile Image"
                    class="profile-img"
                  />

                  <h3 class="mt-2">{name}</h3>
                  <p>Web Developer</p>
                </div>

                <div>
                  <h4
                    className=""
                    style={{ "padding-left": "60px", "padding-top": "30px" }}
                  >
                    Contact Information
                  </h4>
                  <ul class="list-group ">
                    <li class="list-group-item">
                      <strong>Email:</strong> {email}
                    </li>
                    <li class="list-group-item">
                      <strong>Phone:</strong> {phone}
                    </li>
                    <li class="list-group-item">
                      <strong>Gender:</strong> {gender}
                    </li>
                  </ul>
                </div>
              </div>
            );
          })
        ) : (
          <p> No data available.</p>
        )}

        <div class="profile-right col-lg-8 col-md-8 col-sm-12">
          <div>
            <div
              className=""
              style={{
                height: "60px",
                boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
                backgroundColor: "white",
                marginBottom: "16px",
                borderRadius: "6px",
                textAlign: "center",
                display: "flex",
                padding: "17px 16px",
                fontWeight: "bold",
                fontSize: "16px",
              }}
            >
              Activities
            </div>
          </div>

          <div class="mt-4">
            <h4>About</h4>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
              nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi.
            </p>
          </div>
        </div>
      </div>

      <>
      <div
        class="modal fade"
        id="staticBackdrop"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabindex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="row">
          <div className="col-sm-4"></div>
          <div className="col-sm-4">
            <div class="modal-dialog card">
              <div class="modal-content">
                <div class="modal-header">
                  <h1 class="modal-title fs-5" id="staticBackdropLabel">
                    Donate Books
                  </h1>
                  
                </div>
                <div class="modal-body card-body">
                  <div className="text-center mb-3">
                    <div className="text-success">
                      <i class="fa-solid fa-book fa-3x"></i>
                    </div>
                    <h3 className="text-primary">Donate Books</h3>
                    <p className="text-secondary">
                      Join us to donate books for needy
                    </p>

                    <form onSubmit={Submit}>
                      <div className="col-md- mb-3">
                        <label
                          htmlFor="book"
                          className="text-dark home-label"
                        >
                          Book Name
                        </label>
                        <input
                          type="text"
                          className="form-control rounded-pill home-input"
                          id="book"
                          placeholder="your book name"
                          required
                          name="book_name"
                          onChange={handleInput}
                        />
                      </div>

                      <div className="row">
                        <div className="col-md-6 mb-3">
                          <label
                            htmlFor="edition"
                            className="text-dark home-label"
                          >
                            Book Edition
                          </label>
                          <input
                            type="text"
                            className="form-control rounded-pill home-input"
                            id="Edition"
                            placeholder=" book edition"
                            required
                            name="book_edition"
                            onChange={handleInput}
                          />
                        </div>
                        <div className="col-md-6 mb-3">
                          <label
                            htmlFor="auther"
                            className="text-dark home-label"
                          >
                            Auther Name
                          </label>
                          <input
                            type="text"
                            className="form-control rounded-pill home-input"
                            id="password"
                            placeholder="book auther name"
                            required
                            name="auther_name"
                            onChange={handleInput}
                          />
                        </div>
                      </div>
                      <div className="form-group mb-3">
                        <label
                          htmlFor="bookImage"
                          className="text-dark home-label"
                        >
                          Book Image
                        </label>
                        <input
                          type="file"
                          className="form-control rounded-pill home-input"
                          id="bookImage"
                          accept=".jpg, .jpeg, .png"
                          placeholder="Upload book image"
                          required
                          name="book_image"
                          onChange={handleImage}
                        />
                        <img
                          src={value.image}
                          alt=""
                          width="150"
                          height="80 "
                          className="mt-2 home-label"
                        />
                      </div>

                      <div class="modal-footer">
                        <button
                          type="button"
                          class="btn btn-secondary"
                          data-bs-dismiss="modal"
                        >
                          Close
                        </button>
                        <button type="submit" class="btn btn-primary">
                          Donate
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-sm-4"></div>
        </div>
      </div>
    </>
    </>
  );
};

export default Profileview;
