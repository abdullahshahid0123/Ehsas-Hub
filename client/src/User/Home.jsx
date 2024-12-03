import React, { useState } from "react";
import "./Navbar.css";
import axios from "axios";
import { NavLink } from "react-router-dom";

const Home = () => {
  const [value, setvalue] = useState({
    name: "",
    email: "",
    address: "",
    phone: "",
    book_name: "",
    book_edition: "",
    auther_name: "",
    book_imag: "",
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
    } catch (error) {
      console.log("donation not create", error);
    }
  };
  const handleImage = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.readAsDataURL(file);
    reader.addEventListener("load", () => {
      setvalue({ ...value, image: reader.result });
    });
  };

  // const [form, setForm] = useState();

  // const toggleForm = () => {
  //   setForm((state) => !state);
  // };
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
            <img src="" alt="" className="avata img-fluid rounded-circle" />
            <i className="fa-solid fa-user"></i>
          </NavLink>

          <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
            <li>
              <NavLink className="dropdown-item" to="/Profileview">
                Profile
              </NavLink>
            </li>
            <li>
              <button className="dropdown-item">Logout</button>
            </li>
          </ul>
        </div>
      </nav>

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
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h1 class="modal-title fs-5" id="staticBackdropLabel">
                  Modal title
                </h1>
                <button
                  type="button"
                  class="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div class="modal-body">
                <div className="text-center mb-3">
                  <div className="text-success">
                    <i class="fa-solid fa-book fa-3x"></i>
                  </div>
                  <h3 className="text-primary">Donate Books</h3>
                  <p className="text-secondary">
                    Join us to donate books for needy
                  </p>
                </div>

                <form onSubmit={Submit} className="">
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label htmlFor="name" className="text-dark">
                        Name
                      </label>
                      <input
                        type="text"
                        className="form-control rounded-pill"
                        id="name"
                        placeholder=" your name"
                        required
                        name="name"
                        onChange={handleInput}
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label htmlFor="email" className="text-dark">
                        Email
                      </label>
                      <input
                        type="email"
                        className="form-control rounded-pill"
                        id="email"
                        placeholder="your Email"
                        required
                        name="email"
                        onChange={handleInput}
                      />
                    </div>
                  </div>
                  <div className="form-group mb-3">
                    <label className="text-dark">Address</label>
                    <input
                      type="text"
                      className="form-control rounded-pill"
                      id="address"
                      placeholder=" your address"
                      required
                      name="address"
                      onChange={handleInput}
                    />
                  </div>

                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label htmlFor="phone" className="text-dark">
                        Phone Number
                      </label>
                      <input
                        type="phone"
                        className="form-control rounded-pill"
                        id="phone"
                        placeholder="your phone number"
                        required
                        name="phone"
                        onChange={handleInput}
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label htmlFor="book" className="text-dark">
                        Book Name
                      </label>
                      <input
                        type="text"
                        className="form-control rounded-pill"
                        id="book"
                        placeholder="your book name"
                        required
                        name="book_name"
                        onChange={handleInput}
                      />
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label htmlFor="edition" className="text-dark">
                        Book Edition
                      </label>
                      <input
                        type="text"
                        className="form-control rounded-pill"
                        id="Edition"
                        placeholder=" book edition"
                        required
                        name="book_edition"
                        onChange={handleInput}
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label htmlFor="auther" className="text-dark">
                        Auther Name
                      </label>
                      <input
                        type="text"
                        className="form-control rounded-pill"
                        id="password"
                        placeholder="book auther name"
                        required
                        name="auther_name"
                        onChange={handleInput}
                      />
                    </div>
                  </div>
                  <div className="form-group mb-3">
                    <label htmlFor="bookImage" className="text-dark">
                      Book Image
                    </label>
                    <input
                      type="file"
                      className="form-control"
                      id="bookImage"
                      accept=".jpg, .jpeg, .png"
                      placeholder="Upload book image"
                      required
                      name="book_imag"
                      onChange={handleImage}
                    />
                    <img
                      src={value.image}
                      alt=""
                      width="150"
                      height="80 "
                      className="mt-2"
                    />
                  </div>

                  <div className="d-flex justify-content-center gap-4">
                  
                  </div>
                </form>
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
            </div>
          </div>
        </div>
      </>
    </>
  );
};

export default Home;
