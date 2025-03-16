import React, { useEffect, useState } from "react";
import { Sidebar } from "../components/Sidebar";
import { Topbar } from "../components/Topbar";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Vcompleterequest = () => {
   const navigate = useNavigate();
    useEffect(() => {
      const token = sessionStorage.getItem("token");
      if (!token) {
        navigate("/adminlogin");
      }
    }, []);
  
  const [needy, setneedy] = useState([]);
  const fetchNeedy = async () => {
    await axios
      .get("http://localhost:8000/fetch-vol-complete-all")
      .then((res) => {
        setneedy(res.data);
      })
      .catch((err) => {
        console.log(" error fetching", err);
      });
  };
  useEffect(() => {
    fetchNeedy();
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
                Volunteer Complete Request
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
                {Array.isArray(needy) && needy.length > 0 ? (
                  needy.map((rs) => {
                    const { id, vname, vphone, vemail, status } = rs;

                    return (
                      <tr key={id}>
                        <td>
                          <strong>{vname}</strong>
                        </td>
                        <td>{vemail}</td>
                        <td>{vphone}</td>
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

export default Vcompleterequest;
