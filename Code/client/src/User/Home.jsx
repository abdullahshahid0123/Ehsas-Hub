import React, { useState, useEffect } from "react";
import "./Navbar.css";
import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";
import "./Home.css"

const Home = () => {
  const LogOut = () => {
    const token = sessionStorage.getItem("token");
    if (token) {
      sessionStorage.removeItem("token");
      alert("successfuly logout");
      window.location.href = "/login";
    }
  };
  const userId = sessionStorage.getItem("id");
  // console.log(id)
  // req book

  const ReqSubmit = async (id) => {
    try {
      const res = await axios.put(
        `http://localhost:8000/needy-request/${userId}`,
        { reqId: id }
      );
      console.log(res.data);
      alert(res.data.msg);
      window.location.reload();
    } catch (error) {
      console.log("donation not create", error);
    }
  };

  const [list, setlist] = useState([]);
  const fetchaAtive = async () => {
    await axios
      .get("http://localhost:8000/fetch-active")
      .then((res) => {
        setlist(res.data);
      })
      .catch((err) => {
        console.log(" error fetching", err);
      });
  };
  useEffect(() => {
    fetchaAtive();
  }, []);

  // for token ckecking
  const navigate = useNavigate();
  useEffect(() => {
    const token = sessionStorage.getItem("token");
    const id = sessionStorage.getItem("id");

    // if (!token) {
    //   navigate("/register");
    // }
    // if (!id) {
    //   navigate("/login");
    // }
  }, []);

  const [value, setvalue] = useState({
    id: parseInt(userId),
    book_name: "",
    book_edition: "",
    auther_name: "",
  });
  console.log(value);
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
      console.log(setvalue);
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
            <img src="" alt="" className="avata img-fluid rounded-circle" />
            <i className="fa-solid fa-user"></i>
          </NavLink>

          <ul className="dropdown-menu  justify-content-start" aria-labelledby="navbarDropdown">
            <li>
              <NavLink className="dropdown-item  " to="/Profileview">
                Profile
              </NavLink>
            </li>
            <li>
              <button className="dropdown-item" onClick={LogOut}>
                Logout
              </button>
            </li>
          </ul>
        </div>
      </nav>

      <div className="container py-5">
        <h2 className="text-center text-uppercase mb-5">All Books</h2>
        <div className="row g-4">
          <div className="row ">
            {Array.isArray(list) && list.length > 0 ? (
              list.map((rs) => {
                const { id, book_name, auther_name, book_edition } = rs;

                return (
                  <>
                    <div className="col-sm-3 card mx-2" key={id}>
                      <div className="row">
                        <div className="col-6">
                          <img
                            src="https://www.libertybooks.com/image/cache/catalog/zelaldinus-a-masque-9789386021076-313x487.jpg?q6"
                            alt=""
                            className="w-100"
                          />
                        </div>
                        <div className="col-6 p-2">
                          <p>
                            <b>{book_name}</b>
                          </p>

                          <p>
                            By:<i>{auther_name}</i>
                          </p>
                          <p>
                            Edition:<i>{book_edition}</i>
                          </p>
                          <div className="text-center">
                            <button
                              className="btn btn-primary"
                              onClick={() => ReqSubmit(id)}
                            >
                              Request
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                );
              })
            ) : (
              <p className="text-center">No post found</p>
            )}
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

export default Home;
