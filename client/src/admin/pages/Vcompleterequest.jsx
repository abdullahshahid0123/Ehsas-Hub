import React, { useState } from "react";
import { Sidebar } from "../components/Sidebar";
import { Topbar } from "../components/Topbar";

const Vcompleterequest = () => {
    const [Open, setOpen] = useState(false);
  const toggleOpen = () => {
    setOpen((state) => !state);
  };
  return (
    <>
    <div className="wrapper">
    <Sidebar />
    <div className="main">
      <Topbar />
      <nav className="navbar navbar-expand-md  bg-light ">
      <div className="container">
        <a href="#" className="navbar-brand">
        Volunteer Complete 
        
        Request
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
            <tr>
              <td>
                <strong>John Doe</strong>
              </td>
              <td>johndoe@example.com</td>
              <td>(123) 456-7890</td>
              <td>
                <span className="btn btn-success">Active</span>
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
                        onClick={toggleOpen}
                      >
                        View detail
                      </a>
                      <li><a class="dropdown-item" href="#">Freeze</a></li>
                    </li>
                  </ul>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      {Open && (
        <div
          className="modal show d-flex justify-content-center align-items-center"
          style={{
            display: "block",
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.6)",
            zIndex: 1050,
          }}
        >
          <div
            className="modal-dialog"
            
          >
            <div className="modal-content">
              <div className="modal-header justify-content-center">
                <h5 className="modal-title mt-4">volunteer complete request Detail</h5>
              </div>
              <div className="modal-body">
                <form>
                  {/* Two Fields in One Row */}
                  <div className="row mb-3 mt-3">
                    <div className="col-md-6">
                      <label className="form-label">Full Name</label>
                      <input
                        type="text"
                        className="form-control"
                        name="fullName"
                        required
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Email</label>
                      <input
                        type="email"
                        className="form-control"
                        name="email"
                        required
                      />
                    </div>
                  </div>

                  {/* Single Fields Below */}
                  <div className="row mb-3">
                    <div className="col-md-6">
                      <label className="form-label">Phone Number</label>
                      <input
                        type="text"
                        className="form-control"
                        name="phone"
                        required
                      />
                    </div>

                    <div className="col-md-6">
                      <label className="form-label">Address</label>
                      <input
                        type="text"
                        className="form-control"
                        name="address"
                        required
                      />
                    </div>
                  </div>
                  <div className="row mb-3">
                    <div className="col-md-6">
                      <label className="form-label">Password</label>
                      <input
                        type="password"
                        className="form-control"
                        name="password"
                        required
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Gender</label>
                      <input
                        type="gender"
                        className="form-control"
                        name="gender"
                        required
                      />
                    </div>
                  </div>

                  <div className="mb-3">
                    <label className="form-label">
                      ID Card / Student Card Photo
                    </label>

                    <div>
                      <img
                        src="imahe"
                        alt="Student Card"
                        style={{
                          width: "100%",
                          maxWidth: "400px",
                          borderRadius: "8px",
                          marginBottom: "10px",
                        }}
                      />
                    </div>

                    <p>No image available</p>
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Comments</label>
                    <textarea
                      className="form-control"
                      name="comments"
                      rows="2"
                      placeholder="Leave a comment..."
                      required
                    ></textarea>
                  </div>

                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={toggleOpen}
                    >
                      Cancel
                    </button>
                    <button type="submit" className="btn btn-success">
                      Approve
                    </button>
                    <button type="button" className="btn btn-danger">
                      Reject
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  </div>
    </>
  )
}

export default Vcompleterequest



