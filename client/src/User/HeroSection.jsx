import React from "react";
import { Link } from "react-router-dom";

export const HeroSection = () => {
  return (
    <>
      <div class="th-hero-wrapper hero-3" id="hero">
        <div
          class="shape-mockup hero-shape-3-1 d-lg-block d-none"
          data-top="20%"
          data-left="50%"
        ></div>

        <div class="container test">
          <div class="row gx-40 align-items-center">
            <div class="col-lg-6">
              <div class="hero-style3">
                <span class="sub-title after-none">
                  Join us in making books accessible to everyone!
                </span>
                <h1 class="hero-title">
                  <span class="title1">Donate Books for Better</span>
                  <span class="title2">
                  
                    <span class="text-theme2 d-inline-block">Learning!</span>
                  </span>
                </h1>
                <p class="hero-text">
                  Welcome to Ehsas Hub – a community-driven platform dedicated
                  to the exchange of books for those in need. Whether you’re
                  looking to donate books or are seeking educational resources,
                  our platform connects individuals from all walks of life.
                </p>
                <div class="btn-wrap">
                  <Link to="/login" class="th-btn bg-primary">
                    Discover Now<i class="fa-solid fa-arrow-up-right ms-2"></i>
                  </Link>
                  <a
                    href="#"
                    class="play-btn style3 popup-video"
                  >
                    <i class="fas fa-play"></i>
                  </a>
                </div>
              </div>
            </div>

            <div className="col-lg-6">
              <img
                src="assetsLanding/img/hero/hero_bg_3_1.jpg"
                style={{
                  border: "5px solid #ffc107",
                  borderRadius: "50px",
                }}
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
