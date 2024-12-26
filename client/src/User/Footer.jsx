import React from "react";
import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <>
      <br />
      <br />
      <footer class="footer-wrapper footer-layout2 mt-5">
        <div
          class="shape-mockup footer-bg-shape2-1 jump"
          data-left="0"
          data-top="0"
        ></div>

        <div class="widget-area space-top">
          <div class="container">
            <div class="row justify-content-between">
              <div class="col-md-6 col-xl-auto">
                <div class="widget footer-widget">
                  <div class="th-widget-about">
                    <div class="about-logo">
                      <a href="index.html">
                        <img
                          src="assetsLanding/img/logo.png"
                          alt="Donat"
                          width={200}
                          height={200}
                        />
                      </a>
                    </div>
                    <p class="about-text mb-3">
                      {" "}
                      Our secure online donation platform allows you to make
                      contributions quickly
                    </p>
                    <div class="info-card style2">
                      <div class="box-icon bg-theme">
                        <i class="fal fa-phone"></i>
                      </div>
                      <div class="box-content">
                        <p class="box-text">Call us any time:</p>
                        <h4 class="box-title">
                          <a href="tel:16336547896">+92 3218579419</a>
                        </h4>
                      </div>
                    </div>
                    <div class="info-card style2">
                      <div class="box-icon bg-theme2">
                        <i class="fal fa-envelope-open"></i>
                      </div>
                      <div class="box-content">
                        <p class="box-text">Email us any time:</p>
                        <h4 class="box-title">
                          <a
                            href="mailto:ehsashubb@gmail.com
"
                          >
                            ehsashubb@gmail.com
                          </a>
                        </h4>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-sm-6 col-xl-auto">
                <div class="widget widget_nav_menu footer-widget">
                  <h3 class="widget_title">Quick Links</h3>
                  <div class="menu-all-pages-container">
                    <ul class="menu">
                      <li>
                        <a href="#hero">Home</a>
                      </li>
                      <li>
                        <a href="#features">Features</a>
                      </li>
                      <li>
                        <a href="#about-sec">About</a>
                      </li>
                      <li>
                        <Link to="/become-volunteer">Become a Volunteer</Link>
                      </li>
                      <li>
                        <a href="#contact-sec">Contact</a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div class="col-sm-6 col-xl-auto">
                <div class="widget widget_nav_menu footer-widget">
                  <h3 class="widget_title">Our Service</h3>
                  <div class="menu-all-pages-container">
                    <ul class="menu">
                      <li>
                        <a href="#">Book Donations</a>
                      </li>
                      <li>
                        <a href="#">Book Requests</a>
                      </li>
                      <li>
                        <a href="#">AI-Based Search</a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div class="col-md-6 col-xl-auto">
                <div class="widget newsletter-widget footer-widget">
                  <h3 class="widget_title">Newsletter</h3>
                  <p class="footer-text mb-4">
                    Subscribe to Our Newsletter. Regular inspection and feedback
                    mechanisms
                  </p>
                  <form class="newsletter-form">
                    <div class="form-group style-dark">
                      <input
                        class="form-control"
                        type="email"
                        placeholder="Enter your email"
                        required=""
                      />
                    </div>
                    <button type="submit" class="th-btn style5">
                      <i class="fas fa-paper-plane"></i>
                    </button>
                  </form>
                  <div class="th-social style6">
                    <a href="https://www.facebook.com/">
                      <i class="fab fa-facebook-f"></i>
                    </a>
                    <a href="https://www.twitter.com/">
                      <i class="fab fa-twitter"></i>
                    </a>
                    <a href="https://www.linkedin.com/">
                      <i class="fab fa-linkedin-in"></i>
                    </a>
                    <a href="https://www.behance.com/">
                      <i class="fab fa-behance"></i>
                    </a>
                    <a href="https://www.vimeo.com/">
                      <i class="fab fa-vimeo-v"></i>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="copyright-wrap bg-theme text-center">
          <div class="container">
            <p class="copyright-text">
              Copyright 2024 <a href="index.html">Ehsas Hub.</a> All Rights
              Reserved.
            </p>
          </div>
        </div>
      </footer>
    </>
  );
};
