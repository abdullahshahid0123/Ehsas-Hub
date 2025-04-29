import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Sidebar } from "../components/Sidebar";
import { Topbar } from "../components/Topbar";

export const Feedbacks = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const check = sessionStorage.getItem("token");

    if (!check) {
      navigate("/login");
    }
  });

  const [feedback, setFeedback] = useState([]);

  useEffect(() => {
    const GetFeedbacks = async () => {
      try {
        const res = await axios.get("http://localhost:8000/get-feedback");
        setFeedback(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    GetFeedbacks();
  }, []);

  return (
    <>
      <div className="wrapper">
        <Sidebar />
        <div className="main">
          <Topbar />
          <nav className="navbar navbar-expand-md  bg-light ">
            <div className="container">
              <a href="#" className="navbar-brand">
                Feedbacks
              </a>
            </div>
          </nav>
          <div className="container mt-4">
            <table className="table table-striped table-bordered text-center">
              <thead>
                <tr>
                  <th scope="col">Name</th>
                  <th scope="col">Email</th>
                  <th scope="col">Message</th>
                  <th scope="col">Date</th>
                </tr>
              </thead>
              <tbody>
                {Array.isArray(feedback) && feedback.length > 0 ? (
                  feedback.map((rs) => {
                    const { id, name, email, message, created_at } = rs;
                    let d = new Date(created_at);
                    return (
                      <tr key={id}>
                        <td>
                          <strong>{name}</strong>
                        </td>
                        <td>{email}</td>
                        <td>{message}</td>

                        <td>{d.toLocaleDateString()}</td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan="5" className="text-center">
                      No data available.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};
