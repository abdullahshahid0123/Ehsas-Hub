import React, { useState } from 'react'
import './Navbar.css'
import { NavLink } from 'react-router-dom'

const Home = () => {
    const [form, setForm] = useState()

    const toggleForm = () => {
        setForm(state => !state)
    }
    return (
        <>
            <nav className="navbar-user">

                <div className="navbar-logo">
                    <a href="/">Logo</a>
                </div>
                <div className='bell'>
                    <i class="fa-regular fa-bell"></i>
                </div>
                <div className='mail'>
                    <i class="fa-regular fa-envelope"></i>
                </div>
                <div className='heart'><i class="fa-regular fa-heart"></i></div>

                <div className="switch-to-donor">
                    <button className="donor-button" onClick={toggleForm}>Switch to Donate</button>
                </div>
                <div className="navbar-profile">
                    <NavLink to="/Profileview"><img src="" alt="" /><i class="fa-solid fa-user"></i></NavLink>
                </div>
            </nav>

            <div className='app-container'>
                <div className="container-user ">
                    <div className="header">What can I help with?</div>
                    <div className="input-box">
                        <input type="text" placeholder="Message ChatGPT" />
                    </div>
                    <div className="buttons">
                        <div className="button"><i className="fas fa-palette"></i> Create image</div>
                        <div className="button"><i className="fas fa-file-alt"></i> Summarize text</div>
                        <div className="button"><i className="fas fa-code"></i> Code</div>
                        <div className="button"><i className="fas fa-magic"></i> Surprise me</div>
                        <div className="button"><i className="fas fa-lightbulb"></i> Brainstorm</div>
                        <div className="button"><i className="fas fa-ellipsis-h"></i> More</div>
                    </div>
                    <div className="footer">
                        ChatGPT can make mistakes. Check important info.
                    </div>
                </div>
            </div>

            {form && (
                <div className="modal-overlay d-flex align-items-center justify-content-center">
          <div className="card shadow-lg p-4 signup-modal" style={{ maxWidth: '600px', width: '100%', borderRadius: '10px' }}>
            <div className="text-center mb-3">
              <div className='text-success'>
              <i class="fa-solid fa-book fa-3x"></i>
              </div>
              <h3 className="text-primary">Donate Books</h3>
              <p className="text-secondary">Join us to donate books for needy</p>
            </div>

            <form>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label htmlFor="name" className="text-dark">Name</label>
                  <input type="text" className="form-control rounded-pill" id="name" placeholder=" your name" />
                </div>
                <div className="col-md-6 mb-3">
                  <label htmlFor="email" className="text-dark">Email</label>
                  <input type="email" className="form-control rounded-pill" id="email" placeholder="your Email" />
                </div>
              </div>
              <div className="form-group mb-3">
              <label className="text-dark">Address</label>
              <input type="text" className="form-control rounded-pill" id="address" placeholder=" your address" />
            </div>
             
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label htmlFor="phone" className="text-dark">Phone Number</label>
                  <input type="phone" className="form-control rounded-pill" id="phone" placeholder="your phone number" />
                </div>
                <div className="col-md-6 mb-3">
                  <label htmlFor="book" className="text-dark">Book Name</label>
                  <input type="text" className="form-control rounded-pill" id="book" placeholder="your book name" />
                </div>
              </div>

             
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label htmlFor="edition" className="text-dark"> Book Edition</label>
                  <input type="text" className="form-control rounded-pill" id="Edition" placeholder=" book edition" />
                </div>
                <div className="col-md-6 mb-3">
                  <label htmlFor="auther" className="text-dark">Auther Name</label>
                  <input type="text" className="form-control rounded-pill" id="password" placeholder="book auther name" />
                </div>
              </div>
              <div className="form-group mb-3">
                <label htmlFor="additionalInfo" className="text-dark">Description</label>
                <textarea className="form-control" id="additionalInfo" placeholder="description" rows="3"></textarea>
              </div>
              
              <div className="d-flex justify-content-center gap-4">
              <button type="button" className="btn btn-secondary w-50 mx-auto rounded-pill ms-2" onClick={toggleForm}>Cancel</button>
                <button type="submit" className="btn btn-primary w-50 mx-auto rounded-pill">Donate</button>
                
              </div>
            </form>
          </div>
        </div>
            )}
        </>
    )
}

export default Home
