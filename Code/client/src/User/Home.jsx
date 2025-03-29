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
        <h2 className="text-center text-uppercase mb-5">All Books</h2>
        <div className="row g-4">
          <div className="row ">
            {Array.isArray(list) && list.length > 0 ? (
              list.map((rs) => {
                const { id, book_name, auther_name, book_edition } = rs;

                return (
                  <>
                    <div className="col-sm-3 card mx-" key={id}>
                      <div className="row">
                        <div className="col-6">
                          <img
                            src="https://www.libertybooks.com/image/cache/catalog/zelaldinus-a-masque-9789386021076-313x487.jpg?q6"
                            alt=""
                            className="w-100"
                          />
                        </div>
                        <div className="col-6 p-2">
                          <p>
                            <b>{book_name}</b>
                          </p>

                          <p>
                            By:<i>{auther_name}</i>
                          </p>
                          <p>
                            Edition:<i>{book_edition}</i>
                          </p>
                          <div className="text-center">
                            <button
                              className="btn btn-primary"
                              onClick={() => ReqSubmit(id)}
                            >
                              Request
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                );
              })
            ) : (
              <p className="text-center">No post found</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
