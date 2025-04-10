import React, { useState, useEffect } from "react";
import { Sidebar } from "../components/Sidebar";
import { Topbar } from "../components/Topbar";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Dapproverequest = () => {
   const navigate = useNavigate();
    useEffect(() => {
      const token = sessionStorage.getItem("token");
      if (!token) {
        navigate("/adminlogin");
      }
    }, []);
  
  const [request, setrequest] = useState([]);
  const fetchApprovedRequest = async () => {
    await axios
      .get("http://localhost:8000/fetch-donor-approved")
      .then((res) => {
        setrequest(res.data.data);
      })
      .catch((err) => {
        console.log(" error fetching", err);
      });
  };
  useEffect(() => {
    fetchApprovedRequest();
  }, []);

  return (
    <>
      <div className="wrapper">
        <Sidebar />
        <div className="main">
          <Topbar />
          <nav className="navbar navbar-expand-md  bg-light ">
            <div className="container">
              <a href="#" className="navbar-brand">
                Donor Approve Request
              </a>
            </div>
          </nav>
          <div className="container mt-4">
            <table className="table table-striped table-bordered text-center">
              <thead>
                <tr>
                  <th scope="col">Name</th>
                  <th scope="col">Email</th>
                  <th scope="col">Phone Number</th>
                  <th scope="col">Status</th>
                  
                </tr>
              </thead>
              <tbody>
                {Array.isArray(request) && request.length > 0 ? (
                  request.map((rs) => {
                    const {
                      id,
                      name,
                      email,
                      phone,

                      status,
                    } = rs;
                    return (
                      <tr key={id}>
                        <td>
                          <strong>{name}</strong>
                        </td>
                        <td>{email}</td>
                        <td>{phone}</td>
                        <td>
                          <span className="btn btn-success">{status}</span>
                        </td>
                        
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan="5" className="text-center">
                      No data available.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dapproverequest;
