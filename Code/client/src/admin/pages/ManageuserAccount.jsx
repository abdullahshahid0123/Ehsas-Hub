import React, { useState, useEffect } from "react";
import { Sidebar } from "../components/Sidebar";
import { Topbar } from "../components/Topbar";
import axios from "axios";
import "./volunteer.css";
import { useNavigate } from "react-router-dom";

const ManageuserAccount = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (!token) {
      navigate("/adminlogin");
    }
  }, []);

  // const [User, setUser] = useState([]);
  const [userr, setUserr] = useState({});
  const [comment, setComment] = useState(" ");

  const Approveusers = async (id, name, email) => {
    await axios
      .put(`http://localhost:8000/approve-user/${id}`, {
        name,
        email,
      })
      .then((res) => {
        alert(res.data.msg);
        window.location.reload();
      })
      .catch((err) => {
        console.log(" error approving", err);
      });
  };
  const Rejectusers = async (id, name, email) => {
    await axios
      .put(`http://localhost:8000/reject-user/${id}`, {
        name,
        email,
        comment,
      })
      .then((res) => {
        alert(res.data.msg);
        window.location.reload();
      })
      .catch((err) => {
        console.log(" error approving", err);
      });
  };

  const Freezeusers = async (id, name, email) => {
    await axios
      .put(`http://localhost:8000/freeze-user/${id}`, { name, email })
      .then((res) => {
        alert(res.data.msg);
        window.location.reload();
      })
      .catch((err) => {
        console.log(" error approving", err);
      });
  };

  // const [selectedUser, setSelectedUser] = useState({});
  const [post, setpost] = useState([]);
  const fetchusers = async () => {
    await axios
      .get("http://localhost:8000/fetch-user")
      .then((res) => {
        setpost(res.data.data);
        // console.log(setpost);
      })
      .catch((err) => {
        console.log(" error fetching", err);
      });
  };

  // use of useEffect
  useEffect(() => {
    fetchusers();
    // Approveusers()
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
                User List
              </a>
            </div>
          </nav>
          <div className="container mt-4 mb-">
            <table className="table  table-striped table-bordered text-center">
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
                {Array.isArray(post) && post.length > 0 ? (
                  post.map((rs) => {
                    const {
                      id,
                      name,
                      email,
                      phone,
                      image,
                      gender,
                      status,
                      address,
                    } = rs;
                    return (
                      <>
                        <tr key={id}>
                          <td>
                            <strong>{name}</strong>
                          </td>
                          <td>{email}</td>
                          <td>{phone}</td>
                          <td>
                            {status === null ? (
                              <span className="btn btn-primary">Pending</span>
                            ) : status === 1 ? (
                              <span className="btn btn-success">Active</span>
                            ) : status === 0 ? (
                              <span className="btn btn-danger">Freeze</span>
                            ) : (
                              ""
                            )}
                          </td>
                          <td>
                            <div className="dropdown">
                              <button
                                className="btn btn-warning dropdown-toggle "
                                type="button"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                              >
                                Action
                              </button>
                              <ul
                                className="dropdown-menu overflow-y-auto absolute max-h-60 z-50 bottom-full mb-2"
                                style={{ overflow: "visible" }}
                              >
                                <li>
                                  <a
                                    className="dropdown-item"
                                    href="#"
                                    onClick={() =>
                                      setUserr({
                                        id: id,
                                        name: name,
                                        email: email,
                                        gender: gender,
                                        image: image,
                                        phone: phone,
                                        address: address,
                                      })
                                    }
                                    data-bs-toggle="modal"
                                    data-bs-target="#exampleModal"
                                  >
                                    View detail
                                  </a>
                                  {status === 1 ? (
                                    <li>
                                      <a
                                        class="dropdown-item"
                                        href="#"
                                        onClick={() =>
                                          Freezeusers(id, name, email)
                                        }
                                      >
                                        Freeze
                                      </a>
                                    </li>
                                  ) : status === 0 ? (
                                    <li>
                                      <a
                                        class="dropdown-item"
                                        href="#"
                                        onClick={() =>
                                          Approveusers(id, name, email)
                                        }
                                      >
                                        Active
                                      </a>
                                    </li>
                                  ) : (
                                    ""
                                  )}
                                </li>
                              </ul>
                            </div>
                          </td>
                        </tr>
                      </>
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
                    User Detail
                  </h1>
                </div>
                <div className="modal-body">
                  <form>
                    {/* Two Fields in One Row */}
                    <div className="row mb-3 mt-3">
                      <div className="col-md-6">
                        <label className="form-label home-label">
                          Full Name
                        </label>
                        <input
                          type="text"
                          className="form-control home-input"
                          name="fullName"
                          value={userr.name}
                          readOnly
                        />
                      </div>
                      <div className="col-md-6">
                        <label className="form-label home-label">Email</label>
                        <input
                          type="email"
                          className="form-control home-input"
                          name="email"
                          value={userr.email}
                          readOnly
                        />
                      </div>
                    </div>

                    {/* Single Fields Below */}
                    <div className="row mb-3">
                      <div className="col-md-6">
                        <label className="form-label home-label">
                          Phone Number
                        </label>
                        <input
                          type="text"
                          className="form-control home-input"
                          name="phone"
                          value={userr.phone}
                          readOnly
                        />
                      </div>

                      <div className="col-md-6">
                        <label className="form-label home-label">Gender</label>
                        <input
                          type="gender"
                          className="form-control home-input "
                          name="gender"
                          value={userr.gender}
                          readOnly
                        />
                      </div>
                    </div>
                    <div className="row"></div>
                    <div className="col-md-">
                      <label className="form-label home-label">Address</label>
                      <input
                        type="text"
                        className="form-control home-input"
                        name="address"
                        value={userr.address}
                        readOnly
                      />
                    </div>

                    <div className="mb-3">
                      <label className="form-label home-label">
                        ID Card / Student Card Photo
                      </label>

                      <div>
                        <>
                          <img
                            src={userr.image}
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
                      <label className="form-label home-label">Comments</label>
                      <textarea
                        onChange={(e) => setComment(e.target.value)}
                        className="form-control textarea-user-account"
                        name="comments"
                        rows="1"
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
                    onClick={() =>
                      Approveusers(userr.id, userr.name, userr.email)
                    }
                  >
                    Approve
                  </button>
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() =>
                      Rejectusers(userr.id, userr.name, userr.email)
                    }
                  >
                    Reject
                  </button>
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

export default ManageuserAccount;
