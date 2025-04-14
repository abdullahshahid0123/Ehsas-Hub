import React from "react";
import { Link } from "react-router-dom";
export const AboutSection = () => {
  return (
    <>
      <div class="overflow-hidden space" id="about-sec">
        <div
          class="shape-mockup about-bg-shape2-1 jump-reverse d-lg-inline-block d-none"
          data-top="10%"
          data-right="5%"
        >
          <img src="assetsLanding/img/shape/heart-shape1.png" alt="shape" />
        </div>
        <div
          class="shape-mockup about-bg-shape3-1 jump"
          data-bottom="20%"
          data-right="5%"
        >
          <div class="color-masking2">
            <div
              class="masking-src"
              data-mask-src="assetsLanding/img/shape/about_shape3_1.png"
            ></div>
            <img src="assetsLanding/img/shape/about_shape3_1.png" alt="img" />
          </div>
        </div>
        <div class="container">
          <div class="row gy-60 align-items-center">
            <div class="col-xl-6">
              <div class="img-box3">
                <div class="img1">
                  <img
                    src="assetsLanding/img/normal/about_3_1.png"
                    alt="About"
                    width={540}
                  />
                </div>
                <div class="img2 jump">
                  <img
                    src="assetsLanding/img/normal/about_3_2.png"
                    alt="img"
                    width={400}
                  />
                </div>
                <div class="about-shape3-1 jump-reverse">
                  <div class="color-masking2">
                    <div
                      class="masking-src"
                      data-mask-src="assetsLanding/img/shape/about_shape1_1.png"
                    ></div>
                    <img
                      src="assetsLanding/img/shape/about_shape1_1.png"
                      alt="img"
                    />
                  </div>
                </div>
                <div class="year-counter movingX">
                  <div class="year-counter_number">
                    <span class="counter-number">266300</span>+ Students Need
                    Books They Can’t Afford
                  </div>
                  <Link class="link-btn style2" to="/become-volunteer">
                    Become a Volunteer
                  </Link>
                </div>
              </div>
            </div>
            <div class="col-xl-6">
              <div class="title-area mb-40">
                <span class="sub-title after-none before-none">
                  <i class="text-theme far fa-heart"></i> About Us
                </span>
                <h2 class="sec-title">
                  Empowering Education Through Shared Knowledge
                </h2>
                <p>
                  Ehsas Hub was founded with the vision to create a platform
                  that facilitates the exchange of books to support education
                  and personal growth. We believe in the power of shared
                  knowledge and are committed to helping users get the books
                  they need, while also providing a way for others to give back
                  to the community
                </p>
              </div>
              <div class="about-wrap3">
                <p class="mb-30">
                  Our volunteers play a vital role by collecting book donations
                  directly from generous donors and helping distribute them to
                  those in need. Through their efforts, not only do they foster
                  educational growth, but they also earn a commission as a
                  reward for their hard work.
                </p>
                {/* <div class="about-feature-grid mx-3">
                  <div class="box-icon">
                    <img src="assetsLanding/img/icon/about-icon3-1.svg" alt="icon" />
                  </div>
                  <div class="media-body">
                    <h4 class="box-title">1 Year of Experiences</h4>
                    <p class="box-text">
                      Join our monthly giving program to
                      offer continuous support to Ehsas Hub’s initiatives. Your
                      regular contributions help us make a lasting impact.
                    </p>
                  </div>
                </div> */}
                <div class="btn-wrap mt-40 mx-5">
                  <a href="about.html" class="th-btn style3 style-radius">
                    Become a Volunteer{" "}
                    <i class="fa-solid fa-arrow-up-right ms-2"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
