import React, { useState, useEffect } from "react";
import "./volunteer.css";
import { Sidebar } from "../components/Sidebar";
import { Topbar } from "../components/Topbar";
import axios from "axios";

const ManagevolunteerAccount = () => {
  const [volunteer, setvolunteer] = useState([]);

  // here we create volunteer
  const [value, setValue] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    address: "",
    profile: "",
  });
  const handleInput = (e) => {
    setValue({ ...value, [e.target.name]: e.target.value });
  };
  const CreateVolunteer = async (e) => {
    e.preventDefault();
    const postData = { ...value };
    try {
      const res = await axios.post(
        "http://localhost:8000/create-volunteer",
        postData
      );
      console.log(res, "volunteer created successful");
      alert("volunteer created successful");
      setForm((state) => !state);
    } catch (error) {
      console.log(error);
    }
  };
  // here we fetch volunteer
  const fetchVolunteer = async () => {
   
    await axios.get("http://localhost:8000/fetch-volunteer").then((res)=>{
      setvolunteer(res.data.data);
    })
      
    .catch((error)=>{
      console.log(error)
    })
    
  };
  useEffect(() => {
    fetchVolunteer();
  }, []);
  // status manage
  const [Status, setStatus] = useState([]);

  const handlefreez = (id) => {
    setStatus((prevstate) =>{ if (Array.isArray(prevstate)) {
      return prevstate.map((s)=>
          s.id===id ? {...s, Status : s.Status===0 ? 1:0} : s
       )
    } else {
      console.error("error",prevstate)
      return prevstate;
    } 

    })
  
  
  };

  const [Form, setForm] = useState(false);
  const toggleForm = () => {
    setForm((state) => !state);
  };
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
                Volunteer
              </a>
              <button className="btn btn-primary ms-auto" onClick={toggleForm}>
                Create Volunteer
              </button>
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
              {Array.isArray(volunteer) && volunteer.length > 0 ? (volunteer.map(({id,name ,email,phone})=>{
                
                return(
                <tr key={id}>
                  <td>
                    <strong>{name}</strong>
                  </td>
                  <td>{email}</td>
                  <td>{phone}</td>
                  <td>
                    <span
                      className={`btn ${
                        Status === 0 ? "btn-success" : "btn-danger"
                      }`}
                    >
                      {Status === 0 ? "Active" : "Freeze"}
                    </span>
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
                            key={id}
                          >
                            View Detail
                          </a>
                        </li>
                        <li>
                          <a
                            class="dropdown-item"
                            href="#"
                            onClick={()=>handlefreez(id)}
                          >
                            {Status === 0 ? "freeze" : "active"}
                          </a>
                        </li>
                      </ul>
                    </div>
                  </td>
                </tr>
              )
            })) : (
              <tr>
                    <td colSpan="5" className="text-center">
                      No data available.
                    </td>
                  </tr>
            )
          }
              </tbody>
            </table>
          </div>
          {Form && (
            <div
              className="modal show d-flex justify-content-center align-items-center "
              style={{
                display: "block",
                backgroundColor: "rgba(0, 0, 0, 0.6)",
              }}
            >
              <div className="modal-dialog " style={{ width: "80%" }}>
                <div className="modal-content">
                  <div className="modal-header justify-content-center">
                    <h5 className="modal-title ">ADD VOLUNTEER</h5>
                  </div>
                  <div className="modal-body">
                    <form onSubmit={CreateVolunteer}>
                      <div className="mb-3">
                        <label className="form-label">Full Name</label>
                        <input
                          type="text"
                          className="form-control"
                          required
                          name="name"
                          onChange={handleInput}
                        />
                      </div>
                      <div className="row ">
                        <div className="mb-3 col-md-6">
                          <label className="form-label">Email</label>
                          <input
                            className="form-control"
                            type="email"
                            required
                            name="email"
                            onChange={handleInput}
                          />
                        </div>
                        <div className="mb-3 col-md-6">
                          <label className="form-label">Password</label>
                          <input
                            className="form-control"
                            type="password"
                            required
                            name="password"
                            onChange={handleInput}
                          />
                        </div>
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Phone Number</label>
                        <input
                          type="text"
                          className="form-control"
                          required
                          name="phone"
                          onChange={handleInput}
                        />
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Address</label>
                        <input
                          type="text"
                          className="form-control"
                          required
                          name="address"
                          onChange={handleInput}
                        />
                      </div>
                      <div className="form-group mb-3">
                        <label htmlFor="bookImage" className="text-dark">
                          profile photo
                        </label>
                        <input
                          type="file"
                          className="form-control"
                          id="bookImage"
                          accept=".jpg, .jpeg, .png"
                          placeholder="Upload book image"
                          required
                          name="profile"
                          onChange={handleInput}
                        />
                        <img
                          src=""
                          alt=""
                          width="150"
                          height="80 "
                          className="mt-2"
                        />
                      </div>
                      <div className="modal-footer">
                        <button
                          type="button"
                          className="btn btn-secondary"
                          onClick={toggleForm}
                        >
                          Cancel
                        </button>
                        <button type="submit" className="btn btn-primary">
                          Submit
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          )}
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
              <div className="modal-dialog1">
                <div className="modal-content">
                  <div className="modal-header justify-content-center">
                    <h5 className="modal-title mt-4">Volunteer Detail</h5>
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
  );
};

export default ManagevolunteerAccount;
