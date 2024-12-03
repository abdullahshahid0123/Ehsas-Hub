import React from 'react'
import "./main.css"
import { Link } from 'react-router-dom'
const Main = () => {
  return (
   <>
   <div class="">
   <nav class="navbar d-flex navbar-expand-lg navbar-light bg-light fixed-top">
     <div class="container  ">
       <a class="navbar-brand" href="index.html">
         EHSAS-HUB
       </a>

       <button
         class="navbar-toggler"
         type="button"
         data-bs-toggle="collapse"
         data-bs-target="#navbarNav"
         aria-controls="navbarNav"
         aria-expanded="false"
         aria-label="Toggle navigation"
       >
         <span class="navbar-toggler-icon"></span>
       </button>

       <div class="collapse navbar-collapse " id="navbarNav">
         <ul class="navbar-nav ms-auto ">
           <li class="nav-item ">
             <a class="nav-link nav1" href="#home">
               Home
             </a>
           </li>
           <li class="nav-item">
             <a class="nav-link nav1" href="#about">
               About
             </a>
           </li>
           <li class="nav-item">
             <a class="nav-link nav1" href="#services">
               Services
             </a>
           </li>
           <li class="nav-item">
             <a
               class="nav-link nav1"
               href="#work"
             >
               How It Works
             </a>
           </li>
           <li class="nav-item">
             <Link type="button" class="btn btn-primary border-0 " to="/register"  >
              Signup
             </Link>
             <Link type="button" class="btn btn-primary border-0 " to="/login" >
              Login
             </Link>
           </li>
         </ul>
       </div>
     </div>
   </nav>
 </div>
 {/*section 2*/}
 <section class="hero" id="home">
   <div class="overlay ">
     <h1 class="display-1">Ehsas-Hub</h1>
     <p class="lead">
       Empowering communities through book donations and recommendations
     </p>
     <a href="#" class="btn btn-primary btn-lg">
       View Services
     </a>
   </div>
 </section>

 <div class="container py-5" id="about">
   <div class="row align-items-center">
     <div class="col-lg-6 mb-4 mb-lg-0">
       <div class="text-content">
         <h1
           class="display- fw-bol success"
           data-aos="slide-up"
           data-aos-delay="0"
           data-aos-duration="400"
         >
           Empowering Readers
         </h1>
         <h2
           class="h5 display-5  text-mute"
           data-aos="slide-up"
           data-aos-delay="50"
           data-aos-duration="400"
         >
           Connecting books with those in need
         </h2>
         <p
           class="lead mt-3"
           data-aos="slide-up"
           data-aos-delay="100"
           data-aos-duration="400"
         >
           Ehsas-Hub is your go-to platform in Rawalpindi, PK, that
           harnesses the power of machine learning to recommend books
           tailored to your interests. We facilitate book donations to
           ensure that every student has access to the resources they need.
           Our streamlined process makes it easy for students to request
           books and for donors and volunteers to contribute. Join us in
           revolutionizing the way books are shared and accessed, making a
           tangible impact in the lives of learners everywhere.
         </p>
         <a
           href="index.html#contact"
           class="btn bor mt-3 p-0"
           data-aos="slide-up"
           data-aos-delay="200"
           data-aos-duration="400"
         >
           Get in Touch
         </a>
       </div>
     </div>

     <div class="col-lg-6">
       <div
         class="image-wrapper text-center"
         data-aos="fade-in"
         data-aos-delay="0"
         data-aos-duration="400"
       >
         <img
           src="https://cdn.b12.io/client_media/zK9yFcVH/72f865f0-a999-11ef-9899-0242ac110002-jpg-hero_image.jpeg"
           alt="Empowering readers"
           class="img-fluid im"
         />
       </div>
     </div>
   </div>
 </div>
 {/*section 3*/}
 <section class="py-5 sec1" id="services">
   <div class="container">
     <div class="text-center mb-5">
       <h2
         data-aos="slide-up"
         data-aos-offset="120"
         data-aos-duration="400"
         data-aos-once="true"
         className="sec3"
       >
         Empower your mind
       </h2>
       <p
         data-aos="slide-up"
         data-aos-offset="120"
         data-aos-delay="50"
         data-aos-duration="400"
         data-aos-once="true"
         className="secp"
       >
         Discover, donate, and connect with
         books
       </p>
     </div>

     <div class="row">
       <div class="col-md-4 mb-4">
         <div
           class="card h-100 shadow-sm border-0"
           data-aos="fade-in"
           data-aos-offset="120"
           data-aos-duration="400"
           data-aos-once="true"
         >
           <img
             src="https://cdn.b12.io/client_media/zK9yFcVH/78ffa3aa-a999-11ef-9899-0242ac110002-jpg-hero_image.jpeg"
             class="card-img-top rounded-top"
             alt="Pile stack of vintage books with blank space"
           />
           <div class="card-body">
             <h5 class="card-title">Book Recommendations</h5>
             <p class="card-text">
               Get personalized book suggestions tailored to your
               interests.
             </p>
             <a
               href="https://ehsas-hub-staging.b12sites.com/book-recommendations"
               class="btn btn-outline-primary"
             >
               Read More
             </a>
           </div>
         </div>
       </div>

       <div class="col-md-4 mb-4">
         <div
           class="card h-100 shadow-sm border-0"
           data-aos="fade-in"
           data-aos-offset="120"
           data-aos-delay="50"
           data-aos-duration="400"
           data-aos-once="true"
         >
           <img
             src="https://cdn.b12.io/client_media/zK9yFcVH/78a14f62-a999-11ef-9899-0242ac110002-jpg-hero_image.jpeg"
             class="card-img-top rounded-top"
             alt="Book donation facilitation"
           />
           <div class="card-body">
             <h5 class="card-title">Book Donation Facilitation</h5>
             <p class="card-text">
               Easily contribute to the community by donating books.
             </p>
             <a
               href="https://ehsas-hub-staging.b12sites.com/book-donation-facilitation"
               class="btn btn-outline-primary"
             >
               Read More
             </a>
           </div>
         </div>
       </div>

       <div class="col-md-4 mb-4">
         <div
           class="card h-100 shadow-sm border-0"
           data-aos="fade-in"
           data-aos-offset="120"
           data-aos-delay="100"
           data-aos-duration="400"
           data-aos-once="true"
         >
           <img
             src="https://cdn.b12.io/client_media/zK9yFcVH/7870268a-a999-11ef-9899-0242ac110002-jpg-hero_image.jpeg"
             class="card-img-top rounded-top"
             alt="Streamlined book requests"
           />
           <div class="card-body">
             <h5 class="card-title">Streamlined Book Requests</h5>
             <p class="card-text">
               Request the books you need with ease and efficiency.
             </p>
             <a
               href="https://ehsas-hub-staging.b12sites.com/streamlined-book-requests"
               class="btn btn-outline-primary"
             >
               Read More
             </a>
           </div>
         </div>
       </div>
     </div>
   </div>
 </section>
 {/*sectuon 4 */}

 
 <div class="container " style={{ "margin-top": "100px" }} id="work">
   <div class="row">
     <div class="col-md-6">
       <div class="contact-full">
         <div
           data-aos="slide-up"
           data-aos-offset="120"
           data-aos-delay="0"
           data-aos-duration="400"
           data-aos-easing="ease-in-out"
           data-aos-once="true"
           class="sb-section-title"
         >
           Get in touch
         </div>
         <div
           data-aos="slide-up"
           data-aos-offset="120"
           data-aos-delay="50"
           data-aos-duration="400"
           data-aos-easing="ease-in-out"
           data-aos-once="true"
           class="sb-section-subtitle"
         >
           Connect for book donations and requests
         </div>

         <form
           data-aos="slide-up"
           data-aos-offset="120"
           data-aos-delay="0"
           data-aos-duration="400"
           data-aos-easing="ease-in-out"
           data-aos-once="true"
           class="form js-form"
           id="contact-form-left"
         >
           <div class="mb-3">
             <label for="name" class="form-label ">
               <b>Name</b> <span class="text-danger">*</span>
             </label>
             <input
               type="text"
               class="form-control nam"
               id="name"
               name="name"
               placeholder="Jane Smith"
               required
             />
           </div>

           <div class="mb-3">
             <label for="email" class="form-label">
               <b> Email address</b> <span class="text-danger">*</span>
             </label>
             <input
               type="email"
               class="form-control"
               id="email"
               name="from_email"
               placeholder="email@website.com"
               required
             />
           </div>

           <div class="mb-3">
             <label for="phone" class="form-label">
               <b> Phone number </b>
               <span class="text-danger">*</span>
             </label>
             <input
               type="tel"
               class="form-control"
               id="phone"
               name="from_phone"
               placeholder="555-555-5555"
               required
             />
           </div>

           <div class="mb-3">
             <label for="message" class="form-label">
               <b> Message</b>
             </label>
             <textarea
               class="form-control"
               id="message"
               name="message"
               placeholder="Your message here"
               rows="4"
             ></textarea>
           </div>

           <div class="mb-3 form-check">
             <input
               type="checkbox"
               class="form-check-input"
               id="consent"
               name="consent"
               required
             />
             <label for="consent" class="form-check-label">
               I allow this website to store my submission so they can
               respond to my inquiry. <span class="text-danger">*</span>
             </label>
           </div>

           <button type="submit" class="btn btn-primary btns">
             Submit
           </button>
         </form>
       </div>
     </div>

     <div class="col-md-6 mx-auto mt-5 clr">
       <div class="car p-4 ">
         <h3 class="mb-4">Get in touch</h3>

         <div class="d-flex align-items-center mb-3">
           <svg
             height="20px"
             width="20px"
             class="me-2"
             xmlns="http://www.w3.org/2000/svg"
             viewBox="0 0 12 8"
           >
             <path
               d="M0 8h11.2V0H0v8zm5.6-2.673l1.095-.914 3.522 2.947H.983l3.522-2.947 1.095.914zm1.594-1.33l3.366-2.81v5.626L7.194 3.996zM5.6 4.492L.985.64h9.23L5.6 4.493zm-1.594-.497L.64 6.813V1.186l3.366 2.81z"
               fill-rule="nonzero"
             ></path>
           </svg>
           <a
             href="mailto:abdullahsatti200@gmail.com"
             class="text-decoration-none bdr"
           >
             abdullahsatti200@gmail.com
           </a>
         </div>

         <h3 class="mb-4">Location</h3>
         <p class="mb-3">
           <svg
             height="20px"
             width="20px"
             class="me-2"
             xmlns="http://www.w3.org/2000/svg"
             viewBox="0 0 512 512"
           >
             <path d="M256 0C156.748 0 76 80.748 76 180c0 33.534 9.289 66.26 26.869 94.652l142.885 230.257A15 15 0 00258.499 512h.119a14.997 14.997 0 0012.75-7.292L410.611 272.22C427.221 244.428 436 212.539 436 180 436 80.748 355.252 0 256 0zm128.866 256.818L258.272 468.186l-129.905-209.34C113.734 235.214 105.8 207.95 105.8 180c0-82.71 67.49-150.2 150.2-150.2S406.1 97.29 406.1 180c0 27.121-7.411 53.688-21.234 76.818z"></path>
             <path d="M256 90c-49.626 0-90 40.374-90 90 0 49.309 39.717 90 90 90 50.903 0 90-41.233 90-90 0-49.626-40.374-90-90-90zm0 150.2c-33.257 0-60.2-27.033-60.2-60.2 0-33.084 27.116-60.2 60.2-60.2s60.1 27.116 60.1 60.2c0 32.683-26.316 60.2-60.1 60.2z"></path>
           </svg>
           <a
             href="https://www.google.com/maps/place/+Rawalpindi+PB+PK"
             target="_blank"
             class="text-decoration-none bdr"
           >
             Rawalpindi, PB, PK
           </a>
         </p>

         <h3 class="mb-4">Hours</h3>

         <ul class="list-group">
           <li class="list-group-item d-flex justify-content-between ">
             <span>Monday</span>
             <span>9:00am – 10:00pm</span>
           </li>
           <li class="list-group-item d-flex justify-content-between">
             <span>Tuesday</span>
             <span>9:00am – 10:00pm</span>
           </li>
           <li class="list-group-item d-flex justify-content-between">
             <span>Wednesday</span>
             <span>9:00am – 10:00pm</span>
           </li>
           <li class="list-group-item d-flex justify-content-between">
             <span>Thursday</span>
             <span>9:00am – 10:00pm</span>
           </li>
           <li class="list-group-item d-flex justify-content-between">
             <span>Friday</span>
             <span>9:00am – 10:00pm</span>
           </li>
           <li class="list-group-item d-flex justify-content-between">
             <span>Saturday</span>
             <span>9:00am – 6:00pm</span>
           </li>
           <li class="list-group-item d-flex justify-content-between">
             <span>Sunday</span>
             <span>9:00am – 12:00pm</span>
           </li>
         </ul>
       </div>
     </div>
   </div>
 </div>

 <div class="container-fluid p-5 mt-5 text-white cntr" >
 <div class="row align-items-center">
   
   <div class="col-12 col-md-4 mb-3 mb-md-0 text-center text-md-start ftr">
     <h2 class="mb-3">Ehsas-Hub</h2>
     <nav>
       <ul class="list-unstyled">
         <li class="mb-2">
           <a
             href="https://ehsas-hub-staging.b12sites.com/scheduling"
             class="text-white text-decoration-none hv"
           >
             Schedule appointment
           </a>
         </li>
         <li>
           <a
             href="https://ehsas-hub-staging.b12sites.com/intake-form"
             class="text-white text-decoration-none hv"
           >
             Complete intake
           </a>
         </li>
       </ul>
     </nav>
   </div>

   
   <div class="col-12 col-md-4 text-center mt-3 mt-md-0">
     <p class="mb-0">
       Web design by 
       <a
         href="https://www.b12.io/ai-web-design/?utm_source=client&utm_medium=footer&utm_campaign=ai-web-design"
         target="_blank"
         rel="nofollow noopener noreferrer"
         class="text-white text-decoration-none"
       >
         B12
       </a>
     </p>
   </div>
 </div>
</div>
   </>
  )
}

export default Main
