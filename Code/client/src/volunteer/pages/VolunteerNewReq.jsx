import React, { useEffect, useState } from "react";
import { VolunteerSidebar } from "../components/VolunteerSidebar";
import { VolunteerTopbar } from "../components/VolunteerTopbar";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const VolunteerNewReq = () => {
  const navigate = useNavigate();
  const [request, setrequest] = useState([]);
  const v_id = sessionStorage.getItem("id");
  // const check = sessionStorage.getItem("isLoggedIn");

  // useEffect(() => {
  //   if (!check) {
  //     navigate("/volunteer-login");
  //   }
  // });

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

  const ProcessReq = async (rid, vid, name, email, bookName) => {
    await axios
      .put(`http://localhost:8000/vol-req-accept/${rid}`, {
        vid,
        name,
        email,
        bookName,
      })
      .then((res) => {
        alert(res.data.msg);
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  };
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
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {Array.isArray(request) && request.length > 0 ? (
                  request.map((rs) => {
                    const {
                      id,
                      email,
                      book_name,
                      name,
                      address,
                      phone,

                      status,
                    } = rs;
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
                        <td>
                          <div class="dropdown">
                            <button
                              class="btn btn-warning dropdown-toggle"
                              type="button"
                              onClick={() =>
                                ProcessReq(id, v_id, name, email, book_name)
                              }
                            >
                              Accept
                            </button>
                          </div>
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
