import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
export const VolunteerTopbar = () => {
  const navigate = useNavigate();
  const userId = sessionStorage.getItem("id");
  const username = sessionStorage.getItem("username");

  const Logout = () => {
    sessionStorage.clear();
    alert("Logout Successfully");
    navigate("/volunteer-login");
  };

  const [image, setimage] = useState("");
  useEffect(() => {
    const getProfileImage = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8000/get-volunteer-image/${userId}`
        );

        setimage(res.data);
        console.log(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    if (userId) {
      getProfileImage();
    }
  }, [userId]);

  return (
    <>
      <nav className="navbar navbar-expand px-3 border-bottom">
        <button
          className="btn"
          id="sidebar-toggle"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#collapseWidthExample"
          aria-expanded="false"
          aria-controls="collapseWidthExample"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="navbar-collapse navbar">
          <ul className="navbar-nav">
            <li className="nav-item align-self-center flex-wrap px-4">
              <p className="marquee">
                <span>
                  {" "}
                  <strong>Ehsas Hub - {username}</strong> &nbsp;&nbsp;&nbsp;{" "}
                </span>
              </p>
            </li>
            <li className="nav-item dropdown">
              <a
                href="#"
                data-bs-toggle="dropdown"
                className="nav-icon pe-md-0"
              >
                {image ? (
                  <img
                    src={image}
                    className="avatar img-fluid rounded-circle"
                    alt=""
                  />
                ) : (
                  <img
                    src="assets/images/Profile.jpg"
                    className="avatar img-fluid rounded-circle"
                    alt=""
                  />
                )}
              </a>
              <div className="dropdown-menu dropdown-menu-end">
                <ul>
                  <li>
                    <Link to="/volunteer-profile" className="dropdown-item">
                      Profile
                    </Link>
                  </li>
                  <li>
                    <a
                      type="button"
                      className="dropdown-item border-top"
                      onClick={Logout}
                    >
                      Logout
                    </a>
                  </li>
                </ul>
              </div>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
};
