import React, { useEffect, useState } from "react";
import { Sidebar } from "../components/Sidebar";
import { Topbar } from "../components/Topbar";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Napproverequest = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (!token) {
      navigate("/adminlogin");
    }
  }, []);

  const Processneedy = async (id) => {
    await axios
      .put(`http://localhost:8000/update-needy-process/${id}`)
      .then((res) => {
        alert(res.data.msg);
        window.location.reload();
      })
      .catch((err) => {
        console.log(" error approving", err);
      });
  };

  const [needy, setneedy] = useState({});
  const fetchNeedy = async () => {
    await axios
      .get("http://localhost:8000/fetch-needy-approved")
      .then((res) => {
        setneedy(res.data.data);
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
                Needy Approve Request
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

                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {Array.isArray(needy) && needy.length > 0 ? (
                  needy.map((rs) => {
                    const { needyId, id, name, email, phone, req_status } = rs;
                    console.log(rs);
                    return (
                      <tr key={id}>
                        <td>
                          <strong>{name}</strong>
                        </td>
                        <td>{email}</td>
                        <td>{phone}</td>
                        <td>
                          <span className="btn btn-success">{req_status}</span>
                        </td>
                        <td>
                          <div class="dropdown">
                            <button
                              class="btn btn-warning dropdown-toggle"
                              type="button"
                              data-bs-toggle="dropdown"
                              aria-expanded="false"
                            >
                              Action
                            </button>
                            <ul class="dropdown-menu">
                              <li>
                                <a
                                  class="dropdown-item"
                                  href="#"
                                  onClick={() => Processneedy(needyId)}
                                >
                                  In Process
                                </a>
                              </li>
                            </ul>
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

export default Napproverequest;
