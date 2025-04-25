import React, { useState, useEffect } from "react";
import "./Navbar.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Home.css";
import Profile from "../components/Profile";

const Home = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const token = sessionStorage.getItem("token");

    if (!token) {
      navigate("/login");
    }
  }, []);

  const userId = sessionStorage.getItem("id");
  // console.log(id)
  // req book

  const ReqSubmit = async (id) => {
    try {
      const res = await axios.put(
        `http://localhost:8000/needy-request/${userId}`,
        { reqId: id }
      );
      console.log(res.data);
      alert(res.data.msg);
      window.location.reload();
    } catch (error) {
      console.log("donation not create", error);
    }
  };

  const [list, setlist] = useState([]);
  const fetchaAtive = async () => {
    await axios
      .get("http://localhost:8000/fetch-active")
      .then((res) => {
        setlist(res.data);
      })
      .catch((err) => {
        console.log(" error fetching", err);
      });
  };
  useEffect(() => {
    fetchaAtive();
  }, []);

  // for token ckecking

  return (
    <>
      <Profile />

      <div className="container py-5">
        <h3 className="mb-5">Recomended Books</h3>
        {/*<div className="text-cente">*/}
          <div className="row">
  {Array.isArray(list) && list.length > 0 ? (
    list.map((rs) => {
      const { id, book_name, auther_name, book_edition, book_image } = rs;

      return (
        <div className="col-sm-4 mb-4 " key={id}>
          <div className="card h-100 shadow book-card" >
            <div className="row g-0">
              <div className="col-6">
                <img src={book_image} alt="" className="w-100 h-100" style={{ objectFit: "cover" }} />
              </div>
              <div className="col-6 p-2 d-flex flex-column justify-content-between">
                <div>
                  <p><b>{book_name}</b></p>
                  <p>By: <i>{auther_name}</i></p>
                  <p>Edition: <i>{book_edition}</i></p>
                </div>
                <div className="d-flex justify-content-between align-items-center mt-2">
                  <button
                    className="btn btn-primary btn-sm"
                    onClick={() => ReqSubmit(id)}
                  >
                    Request
                  </button>
                  <i className="fa-regular fa-heart fa-lg text-danger req-btn" style={{ cursor: "pointer" }}></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    })
  ) : (
    <p className="text-center">No post found</p>
  )}
</div>

      </div>
       <div className="container py-5">
        <h3 className="mb-5">All Books</h3>
        {/*<div className="text-cente">*/}
          <div className="row">
  {Array.isArray(list) && list.length > 0 ? (
    list.map((rs) => {
      const { id, book_name, auther_name, book_edition, book_image } = rs;

      return (
        <div className="col-sm-4 mb-4 " key={id}>
          <div className="card h-100 shadow book-card" >
            <div className="row g-0">
              <div className="col-6">
                <img src={book_image} alt="" className="w-100 h-100" style={{ objectFit: "cover" }} />
              </div>
              <div className="col-6 p-2 d-flex flex-column justify-content-between">
                <div>
                  <p><b>{book_name}</b></p>
                 
                  <p>By: <i>{auther_name}</i></p>
                  <p>Edition: <i>{book_edition}</i></p>
                </div>
                <div className="d-flex justify-content-between align-items-center mt-2">
                  <button
                    className="btn btn-primary btn-sm"
                    onClick={() => ReqSubmit(id)}
                  >
                    Request
                  </button>
                  <i className="fa-regular fa-heart fa-lg text-danger req-btn" style={{ cursor: "pointer" }}></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    })
  ) : (
    <p className="text-center">No post found</p>
  )}
</div>

      </div>
    </>
  );
};

export default Home;
