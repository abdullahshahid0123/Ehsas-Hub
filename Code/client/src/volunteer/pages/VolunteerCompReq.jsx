import React, { useEffect, useState } from "react";
import { VolunteerSidebar } from "../components/VolunteerSidebar";
import { VolunteerTopbar } from "../components/VolunteerTopbar";
import axios from "axios";

export const VolunteerCompReq = () => {
  const vid = sessionStorage.getItem("id");
  const [request, setrequest] = useState([]);
  const fetchDeliveredRequest = async () => {
    await axios
      .get(`http://localhost:8000/fetch-vol-complete-all/${vid}`)
      .then((res) => {
        setrequest(res.data);
      })
      .catch((err) => {
        console.log(" error fetching", err);
      });
  };
  useEffect(() => {
    fetchDeliveredRequest();
  }, []);

  return (
    <>
      <div className="wrapper">
        <VolunteerSidebar />
        <div className="main">
          <VolunteerTopbar />
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
                  <th scope="col">Edition</th>
                  <th scope="col">Author</th>
                  <th scope="col">Status</th>
                </tr>
              </thead>
              <tbody>
                {Array.isArray(request) && request.length > 0 ? (
                  request.map((rs) => {
                    const {
                      id,
                      book_name,
                      book_edition,
                      auther_name,

                      status,
                    } = rs;
                    return (
                      <tr key={id}>
                        <td>
                          <strong>{book_name}</strong>
                        </td>
                        <td>{book_edition}</td>
                        <td>{auther_name}</td>
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
