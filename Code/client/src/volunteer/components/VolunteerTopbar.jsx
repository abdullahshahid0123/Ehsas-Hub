import React from "react";
import { useNavigate ,Link} from "react-router-dom";

export const VolunteerTopbar = () => {
  const navigate = useNavigate();

  const Logout = () => {
    sessionStorage.clear();
    alert("Logout Successfully");
    navigate("/volunteer-login");
  };

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
                  <strong>Ehsas Hub</strong> &nbsp;&nbsp;&nbsp;{" "}
                </span>
              </p>
            </li>
            <li className="nav-item dropdown">
              <a
                href="#"
                data-bs-toggle="dropdown"
                className="nav-icon pe-md-0"
              >
                <img
                  src="assets/images/Profile.jpg"
                  className="avatar img-fluid rounded-circle"
                  alt=""
                />
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
