import React, { useEffect, useState } from "react";
import axios from "axios";
import { Sidebar } from "../components/Sidebar";
import { Topbar } from "../components/Topbar";

export const AdminProcessReq = () => {
  const id = sessionStorage.getItem("id");
  const DeliveredReq = async (id) => {
    await axios
      .put(`http://localhost:8000/update-deliver/${id}`)
      .then((res) => {
        alert(res.data.msg);
        window.location.reload();
      })
      .catch((err) => {
        console.log(" error approving", err);
      });
  };
  const [request, setrequest] = useState([]);
  const fetchProcessRequest = async () => {
    await axios
      .get("http://localhost:8000/fetch-d-process")
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
        <Sidebar />
        <div className="main">
          <Topbar />
          <nav className="navbar navbar-expand-md  bg-light ">
            <div className="container">
              <a href="#" className="navbar-brand">
                Donor Process Request
              </a>
            </div>
          </nav>
          <div className="container mt-4">
            <table className="table table-striped table-bordered text-center">
              <thead>
                <tr>
                  <th scope="col">Name</th>
                  
                  <th scope="col">Address</th>
                  <th scope="col">Volunteer Name</th>
                  <th scope="col">Status</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {Array.isArray(request) && request.length > 0 ? (
                  request.map((rs) => {
                    const { id, name, address, vname, status } = rs;
                    return (
                      <tr key={id}>
                        <td>
                          <strong>{name}</strong>
                        </td>
                       
                        <td>{address}</td>
                        <td>{vname}</td>
                        <td>
                          <span className="btn btn-success">{status}</span>
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
                                  onClick={() =>DeliveredReq(id)}
                                >
                                  Delivered
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
