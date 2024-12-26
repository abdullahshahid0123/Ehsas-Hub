import React, { useEffect, useState } from "react";
import { VolunteerSidebar } from "../components/VolunteerSidebar";
import { VolunteerTopbar } from "../components/VolunteerTopbar";
import axios from "axios";
// import { useNavigate } from "react-router-dom";

export const VolunteerProcessReq = () => {
  const id = sessionStorage.getItem("id");
  const [request, setrequest] = useState([]);
  // const navigate = useNavigategate();
  const check = sessionStorage.getItem("isLoggedIn");

  // useEffect(() => {
  //   if (!check) {
  //     navigate("/volunteer-login");
  //   }
  // });

  const fetchProcessRequest = async () => {
    await axios
      .get(`http://localhost:8000/fetch-vol-process/${id}`)
      .then((res) => {
        setrequest(res.data);
      })
      .catch((err) => {
        console.log(" error fetching", err);
      });
  };
  useEffect(() => {
    fetchProcessRequest();
  }, []);

  console.log(request);
  return (
    <>
      <div className="wrapper">
        <VolunteerSidebar />
        <div className="main">
          <VolunteerTopbar />
          <nav className="navbar navbar-expand-md  bg-light ">
            <div className="container">
              <a href="#" className="navbar-brand">
                Volunteer New Request
              </a>
            </div>
          </nav>
          <div className="container mt-4">
            <table className="table table-striped table-bordered text-center">
              <thead>
                <tr>
                  <th scope="col">Name</th>
                  <th scope="col">Phone Number</th>
                  <th scope="col">Address</th>
                  <th scope="col">Status</th>
                </tr>
              </thead>
              <tbody>
                {Array.isArray(request) && request.length > 0 ? (
                  request.map((rs) => {
                    const { id, name, address, phone, vname, status } = rs;
                    return (
                      <tr key={id}>
                        <td>
                          <strong>{name}</strong>
                        </td>
                        <td>{phone}</td>
                        <td>{address}</td>
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
