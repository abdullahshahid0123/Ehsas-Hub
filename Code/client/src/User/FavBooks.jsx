import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Profile from "../components/Profile";

export const FavBooks = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const token = sessionStorage.getItem("token");

    if (!token) {
      navigate("/login");
    }
  }, []);

  const userId = sessionStorage.getItem("id");
  const username = sessionStorage.getItem("username");
  const email = sessionStorage.getItem("email");

  const [favBooks, setFavBooks] = useState([]);

  useEffect(() => {
    const GetFavBooks = async (id) => {
      try {
        const res = await axios.get(
          `http://localhost:8000/get-fav-books/${id}`
        );
        setFavBooks(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    GetFavBooks(userId);
  }, [1000]);

  const LogActiity = async (uId, bId, action) => {
    try {
      const res = await axios.post("http://localhost:8000/log-activity", {
        userId: parseInt(uId),
        bookId: bId,
        action: action,
      });
      console.log(res.data.msg);
    } catch (error) {
      console.log(error);
    }
  };

  const ReqSubmit = async (id, username, email, bookName) => {
    LogActiity(userId, id, "requested");
    try {
      const res = await axios.put(
        `http://localhost:8000/needy-request/${userId}`,
        { reqId: id, name: username, email: email, bookName: bookName }
      );
      console.log(res.data);
      alert(res.data.msg);
      window.location.reload();
    } catch (error) {
      console.log("donation not create", error);
    }
  };

  const RemoveFav = (id) => {
    axios
      .delete(`http://localhost:8000/remove-fav/${id}`)
      .then((res) => {
        alert(res.data.msg);
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <>
      <Profile />
      <section className="myBg">
        <div className="container py-5 ">
          <h3 className="mb-5">Favourite Books</h3>
          {/*<div className="text-cente">*/}
          <div className="row">
            {Array.isArray(favBooks) && favBooks.length > 0 ? (
              favBooks.map((rs) => {
                const { favId, id, book_name, auther_name, book_image } = rs;

                return (
                  <div className="col-sm-4 mb-4 " key={id}>
                    <div className="card h-100 shadow book-card">
                      <div className="row g-0">
                        <div className="col-6">
                          <img
                            src={book_image}
                            alt=""
                            className="w-100 h-100"
                            style={{ objectFit: "cover" }}
                            onClick={() => LogActiity(userId, id, "click")}
                          />
                        </div>
                        <div className="col-6 p-2 d-flex flex-column justify-content-between">
                          <div>
                            <p>
                              <b>{book_name}</b>
                            </p>
                            <p>
                              By: <i>{auther_name}</i>
                            </p>
                            {/* <p>
                            Edition: <i>{book_edition}</i>
                          </p> */}
                          </div>
                          <div className="d-flex justify-content-between align-items-center mt-2">
                            <button
                              className="btn btn-primary btn-sm"
                              onClick={() =>
                                ReqSubmit(id, username, email, book_name)
                              }
                            >
                              Request
                            </button>
                            <i
                              className="fa-regular fa-trash fa-lg text-danger req-btn"
                              style={{ cursor: "pointer" }}
                              onClick={() => RemoveFav(favId)}
                              //   onClick={() => LogActiity(userId, id, "like")}
                            ></i>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <p className="text-center">No book found</p>
            )}
          </div>
        </div>
      </section>
    </>
  );
};
