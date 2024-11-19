import React, { useState } from 'react'
import './volunteer.css'
import { Sidebar } from "../components/Sidebar";
import { Topbar } from "../components/Topbar";


const ManagevolunteerAccount = () => {

  const [Form, setForm] = useState(false)
  const toggleForm = () => {
    setForm(state => !state)

  }




  return (
    <>
      <div className="wrapper">
        <Sidebar />
        <div className="main">
          <Topbar/>
          <nav className="navbar navbar-expand-md navbar-ligh bg-light ">
            <div className="container">
              <a href="#" className="navbar-brand">
                Volunteer
              </a>
              <button className="btn btn-primary ms-auto" onClick={toggleForm}>
                Create Volunteer
              </button>
            </div>
          </nav>
          {Form && (
            <div className="modal show d-flex justify-content-center align-items-center " style={{ display: 'block', backgroundColor: 'rgba(0, 0, 0, 0.6)' }}>
              <div className="modal-dialog " style={{ width: "80%" }}>
                <div className="modal-content">
                  <div className="modal-header justify-content-center">
                    <h5 className="modal-title ">ADD VOLUNTEER</h5>

                  </div>
                  <div className="modal-body">
                    <form >

                      <div className="mb-3">
                        <label className="form-label">Full Name</label>
                        <input
                          type="text"

                          className="form-control"
                          required
                        />
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Email</label>
                        <input

                          className="form-control"
                          required
                        />
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Phone Number</label>
                        <input
                          type="text"

                          className="form-control"
                          required
                        />
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Address</label>
                        <input
                          type="text"

                          className="form-control"
                          required
                        />
                      </div>
                      <div className="modal-footer">
                        <button
                          type="button"

                          className="btn btn-secondary" onClick={toggleForm}
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="btn btn-primary"
                        >
                          Submit
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          )}
          <div className="container mt-4">
            <h2>Volunteer List</h2>
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
                  <td><strong>John Doe</strong></td>
                  <td>johndoe@example.com</td>
                  <td>(123) 456-7890</td>
                  <td>
                    <span className='btn btn-success'>Active</span>
                  </td>
                  <td >
                    <div class="dropdown">
                      <button class="btn btn-warning dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                        Action
                      </button>
                      <ul class="dropdown-menu">
                        <li><a class="dropdown-item" href="#">Edit</a></li>
                        <li><a class="dropdown-item" href="#">Freeze</a></li>
                      </ul>
                    </div>

                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>



    </>
  )
}

export default ManagevolunteerAccount
