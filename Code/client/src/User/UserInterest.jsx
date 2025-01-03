import React from "react";

const UserInterest = () => {
  return (

    <>
      <div
        style={{ maxWidth: "400px", margin: "150px auto", textAlign: "center" }}
      >
        <h2>Share Your Interests</h2>
        <form>
          <div style={{ marginBottom: "20px" }}>
            <input
              type="text"
              placeholder=" your interest"
             
              style={{
                width: "100%",
                padding: "10px",
                fontSize: "16px",
                border: "1px solid #ccc",
                borderRadius: "5px",
              }}
            />
          </div>
          <button
            type="submit"
            style={{
              padding: "10px 20px",
              fontSize: "16px",
              color: "#fff",
              backgroundColor: "#007BFF",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Submit
          </button>
        </form>
        <div style={{ marginTop: "30px" }}>
          <h3>Your Interests</h3>
          <ul>
            <li style={{ textAlign: "left" }}></li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default UserInterest;
