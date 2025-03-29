import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Verifyuser = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [value, setValue] = useState({
    code: "",
    password: "",
  });
  const handleInput = (e) => {
    setValue({ ...value, [e.target.name]: e.target.value });
  };
  const navigate = useNavigate();

  const Submit = async (e) => {
    e.preventDefault();
    const logData = { ...value };
    try {
      const email = sessionStorage.getItem("email");
      console.log(email);
      const res = await axios.post(
        `http://localhost:8000/user-reset-pass/${email}`,
        logData
      );

      console.log("response data", res.data);

      
      alert(res.data.msg);
      setErrorMessage("");
      navigate("/login");
    } catch (error) {
      setErrorMessage("Invalid Credential. Please try again!");
      console.log("login here", error.message);
    }
  };
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
                {errorMessage && (
                  <div className="text-center mb-4">
                    <span className="text-danger ">{errorMessage}</span>
                  </div>
                )}
                <form onSubmit={Submit}>
                  <div>
                    <input
                      type="text"
                      class="form-control code-input mb-4"
                      maxlength="10"
                      placeholder="xxxx "
                      required
                      name="code"
                      onChange={handleInput}
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
                      name="password"
                      onChange={handleInput}
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Verifyuser;
