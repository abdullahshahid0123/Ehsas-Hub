import React from "react";
import { MobileMenu } from "./MobileMenu";
import { Link } from "react-router-dom";

export const Header = () => {
  return (
    <>
      <header class="th-header header-layout2">
        <div class="sticky-wrapper">
          {/* <!-- Main Menu Area --> */}
          <div class="container">
            <div class="menu-area">
              <div class="header-logo">
                <a href="/">
                  {/* <h3>Ehsas Hub</h3> */}
                  <img
                    src="assetsLanding/img/logo.png"
                    alt="Donat"
                    width={150}
                  />
                </a>
              </div>
              <div class="menu-area-wrap bg-primary">
                <div class="main-menu d-none d-lg-block">
                  <ul>
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
                      <a href="#service-sec">Services</a>
                    </li>

                    <li>
                      <a href="#donation-sec">How Its Work</a>
                    </li>

                    <li>
                      <Link to="/become-volunteer">Become Volunteer</Link>
                    </li>

                    <li>
                      <a href="#contact-sec">Contact</a>
                    </li>
                  </ul>
                </div>
                <p class="header-notice">
                  <img
                    class="me-1"
                    src="assetsLanding/img/icon/heart-icon.svg"
                    alt="img"
                  />
                  Are you ready to help them? Let’s become a volunteers...
                </p>
              </div>

              <div class="header-button">
                <Link to="/login" class="th-btn style3 d-xl-block bg-primary">
                  <i class="fas fa-heart me-2"></i> Login
                </Link>
                <button
                  type="button"
                  class="icon-btn th-menu-toggle d-lg-none bg-primary mx-1"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseWidthExample"
                  aria-expanded="false"
                  aria-controls="collapseWidthExample"
                >
                  <i class="far fa-bars"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      <MobileMenu />
    </>
  );
};
