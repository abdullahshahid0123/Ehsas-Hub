import React from "react";
import { Link } from "react-router-dom";

export const HowItsWork = () => {
  return (
    <>
      <section class="space overflow-hidden" id="donation-sec">
        <div class="container">
          <div class="row justify-content-center">
            <div class="col-lg-8">
              <div class="title-area text-center">
                <span class="sub-title before-none after-none">
                  <i class="far fa-heart text-theme"></i> How it's Work
                </span>
                <h2 class="sec-title">
                  See Your Impact: Transparent Donation Causes
                </h2>
              </div>
            </div>
          </div>
          <div class="row gy-30 gx-30 justify-content-center">
            <div class="col-xl-3 col-lg-4">
              <div class="feature-card ">
                <div class="feature-card-bg-shape">
                  <img
                    src="assetsLanding/img/shape/feature-card-bg-shape1-1.png"
                    alt="img"
                  />
                </div>
                <div class="box-icon">
                  <img
                    src="assetsLanding/img/icon/service-icon/service-card-icon1-3.png"
                    alt="icon"
                    width={64}
                    height={64}
                  />
                </div>
                <h3 class="box-title">Sign Up</h3>
                <p class="box-text">
                  Create an account as a donor or a needy person, or both. You
                  can switch between roles at any time.
                </p>
                <Link class="link-btn style2" to="/login">
                  Sign Up <i class="fa-solid fa-arrow-up-right ms-2"></i>
                </Link>
              </div>
            </div>
            <div class="col-xl-3 col-lg-4">
              <div class="feature-card">
                <div class="feature-card-bg-shape">
                  <img
                    src="assetsLanding/img/shape/feature-card-bg-shape1-1.png"
                    alt="img"
                  />
                </div>
                <div class="box-icon">
                  <img
                    src="assetsLanding/img/icon/service-icon/service-card-icon1-2.png"
                    alt="icon"
                    width={64}
                    height={64}
                  />
                </div>
                <h3 class="box-title"> Browse & Donate </h3>
                <p class="box-text">
                  If you're a donor, browse the list of available books and
                  donate the ones you no longer need.
                </p>
                <Link class="link-btn style2" to="/">
                  Browse & Donate<i class="fa-solid fa-arrow-up-right ms-2"></i>
                </Link>
              </div>
            </div>
            <div class="col-xl-3 col-lg-4">
              <div class="feature-card">
                <div class="feature-card-bg-shape">
                  <img
                    src="assetsLanding/img/shape/feature-card-bg-shape1-1.png"
                    alt="img"
                  />
                </div>
                <div class="box-icon">
                  <img
                    src="assetsLanding/img/icon/service-icon/service-card-icon1-1.png"
                    alt="icon"
                    width={64}
                    height={64}
                  />
                </div>
                <h3 class="box-title"> Request Books </h3>
                <p class="box-text">
                  Search based on your preferences. Our AI system will recommend
                  books that suit your interests.
                </p>
                <Link class="link-btn style2" href="about.html">
                  Request Books <i class="fa-solid fa-arrow-up-right ms-2"></i>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
