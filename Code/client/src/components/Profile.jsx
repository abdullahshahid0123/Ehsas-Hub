import React, { useState,useEffect } from "react";
// import "./Navbar.css";
import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";

const Profile = () => {
  const LogOut = () => {
    const token = sessionStorage.getItem("token");
    if (token) {
      sessionStorage.removeItem("token");
      alert("successfuly logout");
      window.location.href = "/login";
    }
  };
  const userId = sessionStorage.getItem("id");
 

  const [value, setvalue] = useState({
    id: parseInt(userId),
    book_name: "",
    generes:"",
    book_edition: "",
    auther_name: "",
    book_image:"",
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
      alert(res.data.msg);
      
      window.location.reload();
    } catch (error) {
      console.log("donation not create", error);
    }
  };
  const handleImage = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.addEventListener("load", () => {
      setvalue({ ...value, book_image: reader.result });
    });
  };
  const [image,setimage]=useState(" ")

    useEffect(() => {
      const getProfileImage=async()=>{
      try{
        const res = await axios.get(`http://localhost:8000/get-user-image/${userId}`);
        // console.log(res.data)
      setimage(res.data)
    }catch(error){
      console.log(error)

    }
    }
    if(userId){
      getProfileImage();
    }
     
    },[userId])

  




  return (
    <>
      <nav className="navbar-user" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 20px" }}>
  {/* Left: Logo */}
  <div className="navbar-logo">
    <a href="/home">EHSAS-HUB</a>
  </div>

  {/* Right: Heart, Donate Button, Profile */}
  <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
    {/* Heart Icon */}
   

    {/* Switch to Donate Button */}
    <div className="switch-to-donor">
      <button
        className="donor-button"
        data-bs-toggle="modal"
        data-bs-target="#staticBackdrop"
      >
        Switch to Donate
      </button>
    </div>

    {/* Profile Dropdown */}
    <div className="navbar-profile dropdown">
      <NavLink
        className="nav-link"
        to="#"
        id="navbarDropdown"
        role="button"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        {image ? (
          <img
            src={image}
            alt="Profile"
            className="img-fluid rounded-circle"
            style={{ width: "40px", height: "40px", objectFit: "cover" }}
          />
        ) : (
          <i className="fa-solid fa-user" style={{ fontSize: "24px" }}></i>
        )}
      </NavLink>

     <ul
  className="dropdown-menu dropdown-menu-start"
  style={{ textAlign: "left" }}
  aria-labelledby="navbarDropdown"
>
  <li>
    <NavLink className="dropdown-item" to="/Profileview">
      Profile
    </NavLink>
  </li>
  <li>
    <NavLink className="dropdown-item" to="/Profileview">
      Favourites
    </NavLink>
  </li>
  <li>
    <button className="dropdown-item" onClick={LogOut}>
      Logout
    </button>
  </li>
</ul>
    </div>
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
                        <div className="col-md- mb-3">
                          <label
                            htmlFor="book"
                            className="text-dark home-label"
                          >
                            Generes
                          </label>
                          <input
                            type="text"
                            className="form-control rounded-pill home-input"
                            id="book"
                            placeholder=" generes name"
                            required
                            name="generes"
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
                            src={value.book_image}
                            alt="image"
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

export default Profile;
