import React,{useState,useEffect} from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from 'axios';

export const Topbar = () => {
const navigate=useNavigate()
  const LogOut=()=>{
  const token=sessionStorage.getItem("token")
  if(token){
    sessionStorage.removeItem("token")
    alert("successfuly logout")
    
    navigate("/adminlogin")
  }
}
const userId=sessionStorage.getItem("id")
const [image, setimage]=useState("")

  useEffect(() => {
      const getProfileImage=async()=>{
      try{
        const res = await axios.get(`http://localhost:8000/get-admin-profile/${userId}`);
        
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
              {image ? (
                <img
                  src={image}
                  className="avatar img-fluid rounded-circle"
                  alt=""
                />
                ):(
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
                    <NavLink to="/adminprofileview" className="dropdown-item">
                      Profile
                    </NavLink>
                  </li>
                  <li>
                    <a href="login.html" className="dropdown-item border-top" onClick={LogOut}>
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
