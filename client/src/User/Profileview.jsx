import React,{useState} from 'react'
import './Navbar.css'
import { NavLink } from 'react-router-dom'
const Profileview = () => {
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




            <div class="container profile-container bg-gray">
            
            <div class="profile-left col-lg-4 col-md-4 col-sm-12">
                <div class="text-center">
                     <img src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8bWVucyUyMHdpdGglMjBjb2F0fGVufDB8fDB8fHww" alt="Profile Image" class="profile-img"/>
                    
                    <h3 class="mt-2">John Doe</h3>
                    <p>Web Developer</p>
                </div>
                
                <div>
                    <h4 className='' style={{"padding-left":"60px", "padding-top":"30px"}}>Contact Information</h4>
                    <ul class="list-group ">
                        <li class="list-group-item"><strong>Email:</strong> johndoe@example.com</li>
                        <li class="list-group-item"><strong>Phone:</strong> +1 234 567 890</li>
                        <li class="list-group-item"><strong>Gender:</strong> Male</li>
                    </ul>
                </div>
                
                
            </div>
        
           
            
            <div class="profile-right col-lg-8 col-md-8 col-sm-12">
                <div>
                <div className='' style={{height:"60px", boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)", backgroundColor: "white" , marginBottom: "16px" , borderRadius: "6px",
              textAlign: "center",  display: "flex",    padding: "17px 16px",  fontWeight: "bold" , fontSize: "16px"   }}>
                Activities
                </div>
                    <img src=" " alt="ID Card Image" class="id-card-img"/>
                </div>
                
                <div class="mt-4">
                    <h4>About</h4>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi.</p>
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

export default Profileview
