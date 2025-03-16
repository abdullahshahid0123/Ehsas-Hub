import React, { useEffect, useState } from "react";
import { Sidebar } from "../components/Sidebar";
import { Topbar } from "../components/Topbar";
import axios from "axios";
import "./volunteer.css";
import { useNavigate } from "react-router-dom";

const Nnewrequest = () => {
   const navigate = useNavigate();
    useEffect(() => {
      const token = sessionStorage.getItem("token");
      if (!token) {
        navigate("/adminlogin");
      }
    }, []);
  
  const Approveneedy = async (id) => {
    await axios
      .put(`http://localhost:8000/update-needy-approved/${id}`)
      .then((res) => {
        alert(res.data.msg);
        window.location.reload();
      })
      .catch((err) => {
        console.log(" error approving", err);
      });
  };
  const Rejectneedy = async (id) => {
    await axios
      .delete(`http://localhost:8000/Reject-needy/${id}`)
      .then((res) => {
        alert(res.data.msg);
        window.location.reload();
      })
      .catch((err) => {
        console.log(" error rejecting", err);
      });
  };

  const [user, setuser] = useState({});
  const [needy, setneedy] = useState([]);
  const fetchNeedy = async () => {
    await axios
      .get("http://localhost:8000/fetch-needy-pending")
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
                Needy New Request
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
                    const {
                      id,
                      name,
                      email,
                      phone,
                      gender,
                      book_name,
                      address,
                      book_edition,
                      auther_name,
                      book_image,
                      req_status,
                    } = rs;
                    return (
                      <tr key={id}>
                        <td>
                          <strong>{name}</strong>
                        </td>
                        <td>{email}</td>
                        <td>{phone}</td>
                        <td>
                          <span className="btn btn-primary">{req_status}</span>
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
                                  data-bs-toggle="modal"
                                  data-bs-target="#exampleModal"
                                  onClick={() =>
                                    setuser({
                                      id: id,
                                      name: name,
                                      email: email,
                                      phone: phone,
                                      gender: gender,
                                      address: address,
                                      book_name: book_name,
                                      book_edition: book_edition,
                                      auther_name: auther_name,
                                      book_image: book_image,
                                    })
                                  }
                                >
                                  View detail
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
          <div
            class="modal fade"
            id="exampleModal"
            tabindex="-1"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div className="row">
              <div className="col-sm-4"></div>
              <div className="col-sm-4">
                <div class="modal-dialog card">
                  <div class="modal-content">
                    <div class="modal-header">
                      <h1 class="modal-title fs-5" id="exampleModalLabel">
                        Needy Detail
                      </h1>
                    </div>
                    <div class="modal-body">
                      <form>
                        {/* Two Fields in One Row */}
                        <div className="row mb-3 mt-3">
                          <div className="col-md-6">
                            <label className="form-label">Full Name</label>
                            <input
                              type="text"
                              className="form-control home-input"
                              name="fullName"
                              value={user.name}
                              readOnly
                            />
                          </div>
                          <div className="col-md-6">
                            <label className="form-label">Email</label>
                            <input
                              type="email"
                              className="form-control home-input"
                              name="email"
                              value={user.email}
                              readOnly
                            />
                          </div>
                        </div>

                        {/* Single Fields Below */}
                        <div className="row mb-3">
                          <div className="col-md-6">
                            <label className="form-label">Phone Number</label>
                            <input
                              type="text"
                              className="form-control home-input"
                              name="phone"
                              value={user.phone}
                              readOnly
                            />
                          </div>

                          <div className="col-md-6">
                            <label className="form-label">Gender</label>
                            <input
                              type="gender"
                              className="form-control home-input"
                              name="gender"
                              value={user.gender}
                              readOnly
                            />
                          </div>
                        </div>

                        <div className="col-md-">
                          <label className="form-label">Address</label>
                          <input
                            type="text"
                            className="form-control home-input"
                            name="address"
                            value={user.address}
                            readOnly
                          />
                        </div>

                        <div className="mb-3">
                          <label className="form-label">
                            ID Card / Student Card Photo
                          </label>

                          <div>
                            <>
                              <img
                                src={user.image}
                                alt="Student Card"
                                style={{
                                  width: "100%",
                                  maxWidth: "400px",
                                  borderRadius: "8px",
                                  marginBottom: "10px",
                                }}
                              />
                            </>
                          </div>
                        </div>

                        <div className="mb-3">
                          <label className="form-label">Comments</label>
                          <textarea
                            className="form-control home-input"
                            name="comments"
                            rows="2"
                            placeholder="Leave a comment..."
                            required
                          ></textarea>
                        </div>
                      </form>
                    </div>

                    <div class="modal-footer">
                      <button
                        type="button"
                        className="btn btn-secondary"
                        data-bs-dismiss="modal"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="btn btn-success"
                        onClick={() => Approveneedy(user.id)}
                      >
                        Approve
                      </button>
                      <button
                        type="button"
                        className="btn btn-danger"
                        onClick={() => Rejectneedy(user.id)}
                      >
                        Reject
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-sm-6"></div>
        </div>
      </div>
    </>
  );
};

export default Nnewrequest;
