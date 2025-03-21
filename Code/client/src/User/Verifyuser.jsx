import React from "react";

const Verifyuser = () => {
  return (
    <>
      <div className="container " style={{ "margin-top": "8%" }}>
        <div className="row justify-content-center">
          <div className="col-md-5">
            <div className="card shadow-lg p-4 ">
              <div className="card-body">
                <h4 className="card-title text-center mb-3 text-primary ">
                  Verify Account And Create Password
                </h4>
                <p className="text-center text-muted mb-4">
                  Please enter the 4-digit code sent to your email.
                </p>
                <form>
                  <div>
                    <input
                      type="text"
                      class="form-control code-input mb-4"
                      maxlength="10"
                      placeholder="xxxx "
                      required
                      style={{
                        margin: "auto",
                        width: "70%",

                        "text-align": "center",
                        " font-size": "50%",
                        "vertical-align": "middle",
                      }}
                    />
                  </div>
                  <div>
                  
                <label htmlFor="Password" className="text-dark ml-20">
                  New Password
                </label>
                    <input
                      type="text"
                      class="form-control mb-4"
                      maxlength="10"
                      placeholder="Enter new Password "
                      required
                      style={{
                        margin: "auto",
                        width: "70%",

                        "text-align": "",
                        " font-size": "50%",
                        "vertical-align": "middle",
                      }}
                    />
                  </div>
                  <div
                    className="d-flex justify-content-center align-items-center mb-4 "
                    style={{ gap: "30%" }}
                  >
                    <button
                      type="button"
                      className="btn btn-link p-0"
                      id="resendCode"
                      disabled
                    >
                   <span>Click To verify</span>
                    </button>
                    <button type="submit" className="btn btn-primary ml-">
                     Reset Password 
                    </button>
                  </div>
                </form>
                <div
                  id="successMessage"
                  className="alert alert-success d-none mt-3"
                  role="alert"
                >
                  Verification successful!
                </div>
                <div
                  id="errorMessage"
                  className="alert alert-danger d-none mt-3"
                  role="alert"
                >
                  Verification failed. Please try again.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Verifyuser;
