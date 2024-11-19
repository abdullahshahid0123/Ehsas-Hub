import React, { useState } from 'react'
import './volunteer.css'
import { Sidebar } from "../components/Sidebar";
import { Topbar } from "../components/Topbar";

const ManageuserAccount = () => {
  const [Open, setOpen] = useState(false)
  const toggleOpen = () => {
    setOpen(state => !state)

  }

  return (
    <>
      <div className="wrapper">
        <Sidebar />
        <div className="main">
          <Topbar />
          <div className="container mt-4">
            <h2>User List</h2>
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
                        <li><a class="dropdown-item" href="#" onClick={toggleOpen}>View detail</a></li>

                      </ul>
                    </div>

                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          { Open && (
            <div
              className="modal show d-flex justify-content-center align-items-center"
              style={{
                display: 'block',
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                backgroundColor: 'rgba(0, 0, 0, 0.6)',
                zIndex: 1050,
              }}
            >
              <div
                className="modal-dialog"
                style={{
                  width: '80%',
                  maxWidth: '1000px',
                  margin: 'auto',
                  position: 'absolute',
                  top: '78%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                }}
              >
                <div className="modal-content">
                  <div className="modal-header justify-content-center">
                    <h5 className="modal-title">User Detail</h5>
                  </div>
                  <div className="modal-body">
                    <form >
                    <div className="mb-3 flex space-x-4">
                  <div className="w-1/2">
                    <label className="form-label">Full Name</label>
                    <input
                      type="text"
                      className="form-control"
                      name="fullName"
                      
                      required
                      placeholder="Enter full name"
                    />
                  </div>
                  <div className="w-1/2">
                    <label className="form-label">Email</label>
                    <input
                      type="email"
                      className="form-control"
                      name="email"
                     
                      required
                      placeholder="Enter email"
                    />
                  </div>
                </div>
      
                      {/* Phone Number */}
                      <div className="mb-3">
                        <label className="form-label">Phone Number</label>
                        <input
                          type="text"
                          className="form-control"
                          name="phone"
                        
                          required
                          placeholder="Enter phone number"
                        />
                      </div>
      
                      {/* Address */}
                      <div className="mb-3">
                        <label className="form-label">Address</label>
                        <input
                          type="text"
                          className="form-control"
                          name="address"
                         
                          required
                          placeholder="Enter address"
                        />
                      </div>
      
                      {/* Password */}
                      <div className="mb-3">
                        <label className="form-label">Password</label>
                        <input
                          type="password"
                          className="form-control"
                          name="password"
                         
                          required
                          placeholder="Enter password"
                        />
                      </div>
      
                      {/* ID Card Photo (Front) */}
                      <div className="mb-3">
                        <label className="form-label">ID Card Photo (Front)</label>
                        <input
                          type="file"
                          className="form-control"
                          name="idCardFront"
                          
                          accept="image/*"
                        />
                      </div>
      
                      {/* ID Card Photo (Back) */}
                      <div className="mb-3">
                        <label className="form-label">ID Card Photo (Back)</label>
                        <input
                          type="file"
                          className="form-control"
                          name="idCardBack"
                          
                          accept="image/*"
                        />
                      </div>
      
                      {/* Status */}
                      <div className="mb-3">
                        <label className="form-label">Status</label>
                        <select
                          className="form-select"
                          name="status"
                         
                          required
                        >
                          <option value="student">Student</option>
                          <option value="employee">Employee</option>
                        </select>
                      </div>
      
                      {/* Student Card Photo */}
                      <div className="mb-3">
                        <label className="form-label">Student Card Photo</label>
                        <input
                          type="file"
                          className="form-control"
                          name="studentCard"
                          
                          accept="image/*"
                        />
                      </div>
      
                      {/* Comments */}
                      <div className="mb-3">
                        <label className="form-label">Comments</label>
                        <textarea
                          className="form-control"
                          name="comments"
                          rows="4"
                         
                          placeholder="Leave a comment..."
                          required
                        ></textarea>
                      </div>
      
                      {/* Action Buttons */}
                      <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" onClick={toggleOpen}>
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
export default ManageuserAccount
