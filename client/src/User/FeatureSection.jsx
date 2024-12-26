import React from "react";

export const FeatureSection = () => {
  return (
    <>
      <section
        class="feature-area-1 position-relative space-bottom mt-5"
        id="features"
      >
        <div
          class="feature-bg-wrap"
          data-bg-src="assetsLanding/img/bg/gray-bg2.png"
          data-mask-src="assetsLanding/img/bg/feature-bg-mask-1.png"
        >
          <div class="feature-bg-shape1-1"></div>
        </div>
        <div class="container">
          <div class="row gy-30 gx-30 justify-content-end">
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
                    src="assetsLanding/img/icon/feature-icon1-1.png"
                    alt="icon"
                  />
                </div>
                <h3 class="box-title">Dual Role for Users</h3>
                <p class="box-text">
                  As a user, you have the opportunity to contribute as both a
                  donor and a needy person.
                </p>
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
                    src="assetsLanding/img/icon/feature-icon1-2.png"
                    alt="icon"
                  />
                </div>
                <h3 class="box-title">AI-Powered Book Suggestions</h3>
                <p class="box-text">
                  Our smart AI system recommends books based on your interests.
                </p>
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
                    src="assetsLanding/img/icon/feature-icon1-3.png"
                    alt="icon"
                  />
                </div>
                <h3 class="box-title">User-Friendly Interface</h3>
                <p class="box-text">
                  Ehsas Hub allowing users to navigate effortlessly between
                  roles and actions.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
