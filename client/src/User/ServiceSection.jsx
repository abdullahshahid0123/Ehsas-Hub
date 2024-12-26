import React from "react";

export const ServiceSection = () => {
  return (
    <>
      <section
        class="overflow-hidden space"
        id="service-sec"
        data-bg-src="assetsLanding/img/bg/gray-bg2.png"
      >
        <div
          class="shape-mockup service-bg-shape2-1 d-xxl-inline-block d-none"
          data-bottom="0"
          data-left="0"
        >
          
        </div>
        <div class="container">
          <div class="row gx-80">
            <div class="col-xl-6">
              <div class="service-wrap2">
                <div class="title-area">
                  <span class="sub-title after-none before-none">
                    <i class="far fa-heart text-theme"></i> Our Services
                  </span>
                  <h2 class="sec-title">
                    We’re Helping Provide Books to Those in Need Around the
                    World
                  </h2>
                  <p class="sec-text">
                    Discover the inspiring stories of individuals and
                    communities transformed through Ehsas Hub's book exchange
                    programs. Our success stories highlight the real-life impact
                    of your donations and the educational empowerment of those
                    we support. These narratives showcase the power of shared
                    knowledge, compassion, and generosity.
                  </p>
                </div>
                <div class="service-bg-shape2-2">
                  <img
                    src="assetsLanding/img/service/service-thumb3-1.png"
                    alt="img"
                  />
                  <div class="service-bg-shape2-3 bg-primar">
                    <div class="color-masking2">
                      <img
                        src="assetsLanding/img/shape/service_bg_shape3_2.png"
                        alt="img"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-xl-6">
              <div class="row gy-30">
                <div class="col-12">
                  <div class="service-card2">
                    <div class="service-card-icon">
                      <img
                        src="assetsLanding/img/icon/service-icon/service-card-icon1-1.png"
                        alt="Icon"
                      />
                    </div>
                    <div class="box-content">
                      <h3 class="box-title">
                        <a href="about.html">Book Donations</a>
                      </h3>
                      <p class="box-text">
                        Share books you no longer need and make them available
                        to others who might beneft from them.
                      </p>
                    </div>
                  </div>
                </div>
                <div class="col-12">
                  <div class="service-card2">
                    <div class="service-card-icon">
                      <img
                        src="assetsLanding/img/icon/service-icon/service-card-icon1-2.png"
                        alt="Icon"
                      />
                    </div>
                    <div class="box-content">
                      <h3 class="box-title">
                        <a href="about.html">Book Requests</a>
                      </h3>
                      <p class="box-text">
                        As a needy person, search for books based on your
                        specifc needs and interests, with personalized
                        recommendations.
                      </p>
                    </div>
                  </div>
                </div>
                <div class="col-12">
                  <div class="service-card2">
                    <div class="service-card-icon">
                      <img
                        src="assetsLanding/img/icon/service-icon/service-card-icon1-3.png"
                        alt="Icon"
                      />
                    </div>
                    <div class="box-content">
                      <h3 class="box-title">
                        <a href="about.html">AI-Based Search</a>
                      </h3>
                      <p class="box-text">
                        Our advanced AI system ensures that every user gets book
                        suggestions that align with their unique interests,
                        making the search for books easier than ever.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
