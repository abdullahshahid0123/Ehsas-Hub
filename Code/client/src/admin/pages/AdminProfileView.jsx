import React, { useEffect, useState } from "react";
import { Sidebar } from "../components/Sidebar";
import { Topbar } from "../components/Topbar";
import axios from "axios";

const AdminProfileView = () => {
  const [profile, setprofile] = useState([]);

  const Fetch = async () => {
    const userId = sessionStorage.getItem("id");
    try {
      const response = await axios.get(
        `http://localhost:8000/fetchadmin-byid/${userId}`
      );
      console.log("API Response:", response.data);
      setprofile([response.data]); // Correct usage
    } catch (error) {
      console.error("Error fetching admin data:", error);
    }
  };
  useEffect(() => {
    Fetch();
  }, []);

  return (
    <>
      <div className="wrapper">
        <Sidebar />
        <div className="main">
          <Topbar />
          <div class="container profile-container bg-gray">
            {Array.isArray(profile) && profile.length > 0 ? (
              profile.map((rs) => {
                console.log("hey bhi", rs);
                const { id, name, email, phone, gender, image } = rs;
                return (
                  <div
                    class="profile-left col-lg-4 col-md-4 col-sm-12"
                    key={id}
                  >
                    <div class="text-center">
                      <img
                        src={image}
                        alt="Profile Image"
                        class="profile-img"
                      />

                      <h3 class="mt-2">{name}</h3>
                      <p>Admin</p>
                    </div>

                    <div>
                      <h4
                        className=""
                        style={{
                          "padding-left": "60px",
                          "padding-top": "30px",
                        }}
                      >
                        Contact Information
                      </h4>
                      <ul class="list-group ">
                        <li class="list-group-item">
                          <strong>Email:</strong> {email}
                        </li>
                        <li class="list-group-item">
                          <strong>Phone:</strong> {phone}
                        </li>
                        <li class="list-group-item">
                          <strong>Gender:</strong> {gender}
                        </li>
                      </ul>
                    </div>
                  </div>
                );
              })
            ) : (
              <p> No data available.</p>
            )}

            <div class="profile-right col-lg-8 col-md-8 col-sm-12">
              <div>
                <div
                  className=""
                  style={{
                    height: "60px",
                    boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
                    backgroundColor: "white",
                    marginBottom: "16px",
                    borderRadius: "6px",
                    textAlign: "center",
                    display: "flex",
                    padding: "17px 16px",
                    fontWeight: "bold",
                    fontSize: "16px",
                  }}
                >
                  Activities
                </div>
              </div>

              <div class="mt-4">
                <h4>About</h4>
                <p></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminProfileView;
