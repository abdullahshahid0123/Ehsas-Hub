import React from "react";
import { Link } from "react-router-dom";

export const MobileMenu = () => {
  return (
    <>
      {/* <div style={{ minHeight: "120px" }}> */}
      <br />
      <br />
      <div class="collapse navbar-collapse" id="collapseWidthExample">
        <div class="th-menu-area text-center">
          <div class="th-mobile-menu">
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
                <Link to="/become-volunteer">Become a Volunteer</Link>
              </li>

              <li>
                <a href="#contact-sec">Contact</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      {/* </div> */}
    </>
  );
};
