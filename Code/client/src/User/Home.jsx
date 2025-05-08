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
  const username = sessionStorage.getItem("username");
  const email = sessionStorage.getItem("email");
  // console.log(id)
  // req book

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

  const [recommend, setRecommend] = useState([]);

  const FetchRecommend = async () => {
    try {
      const res = await axios.get(
        `http://127.0.0.1:5000/recommend/user/?user_id=${userId}`
      );
      console.log(res);
      setRecommend(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const [list, setlist] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [dataLimit, setDataLimit] = useState(18);
  const [loading, setLoading] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(18);
  const fetchaAtive = async (limit) => {
    setLoading(true);
    await axios
      .get("http://localhost:8000/fetch-active", {
        params: {
          limit: limit,
        },
      })
      .then((res) => {
        setlist(res.data);
        setCurrentPage(Number(res.data.meta?.page) || 1);
        setTotalPages(Number(res.data.meta?.totalPages) || 1);
      })
      .catch((err) => {
        console.log(" error fetching", err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleRowsPerPageChange = (limit) => {
    console.log("handleRowsPerPageChange called with limit:", limit); // Debug rows change
    setDataLimit(limit);
    setRowsPerPage(limit);
  };

  useEffect(() => {
    fetchaAtive(dataLimit);
    FetchRecommend();
  }, [dataLimit]);

  // for token ckecking

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

  const [searchSec, setSearchSec] = useState(true);
  const [bookTitle, setBookTitle] = useState();
  const [searchBooks, setSearchBooks] = useState([]);
  const GetSearchBooks = async (title) => {
    if (title.length > 0) {
      try {
        const res = await axios.get(
          `http://localhost:8000/search-book/${title}`
        );
        setSearchBooks(res.data);
        if (res.data.length > 0) {
          setSearchSec(false);
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      setSearchSec(true);
    }
  };

  useEffect(() => {
    GetSearchBooks(bookTitle);
  }, [bookTitle]);

  return (
    <>
      <Profile />
      <nav className="p-3 search-bar">
        <div className="row">
          <div className="col-sm-4"></div>
          <div className="col-sm-4">
            <input
              type="search"
              name=""
              id=""
              placeholder="Search Book with Title..."
              onChange={(e) => {
                setBookTitle(e.target.value);
              }}
            />
          </div>
          <div className="col-sm-4"></div>
        </div>
      </nav>
      <section className="myBg" hidden={searchSec}>
        <div className="container py-5 ">
          <h3 className="mb-5">Search Results</h3>
          {/*<div className="text-cente">*/}
          <div className="row">
            {Array.isArray(searchBooks) && searchBooks.length > 0 ? (
              searchBooks.map((rs) => {
                const { id, book_name, auther_name, book_image } = rs;

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
                              className="fa-regular fa-heart fa-lg text-danger req-btn"
                              style={{ cursor: "pointer" }}
                              onClick={() => LogActiity(userId, id, "like")}
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
      <section className="myBg">
        <div className="container py-5 ">
          <h3 className="mb-5">Recomended Books</h3>
          {/*<div className="text-cente">*/}
          <div className="row">
            {Array.isArray(recommend) && recommend.length > 0 ? (
              recommend.map((rs) => {
                const { bookId, title, author, coverImg } = rs;

                return (
                  <div className="col-sm-4 mb-4 " key={bookId}>
                    <div className="card h-100 shadow book-card">
                      <div className="row g-0">
                        <div className="col-6">
                          <img
                            src={coverImg}
                            alt=""
                            className="w-100 h-100"
                            style={{ objectFit: "cover" }}
                            onClick={() => LogActiity(userId, bookId, "click")}
                          />
                        </div>
                        <div className="col-6 p-2 d-flex flex-column justify-content-between">
                          <div>
                            <p>
                              <b>{title}</b>
                            </p>
                            <p>
                              By: <i>{author}</i>
                            </p>
                            {/* <p>
                            Edition: <i>{book_edition}</i>
                          </p> */}
                          </div>
                          <div className="d-flex justify-content-between align-items-center mt-2">
                            <button
                              className="btn btn-primary btn-sm"
                              onClick={() =>
                                ReqSubmit(bookId, username, email, title)
                              }
                            >
                              Request
                            </button>
                            <i
                              className="fa-regular fa-heart fa-lg text-danger req-btn"
                              style={{ cursor: "pointer" }}
                              onClick={() => LogActiity(userId, bookId, "like")}
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
        <div className="container py-5">
          <div className="row">
            <div className="col-sm-3 mt-5">
              <h3>All Books</h3>
            </div>
            <div className="col-sm-6 mt-5"></div>
            <div className="col-sm-3 mt-3">
              <div className="btn-group mr-2 mb-2 mb-md-0">
                <button
                  className={`btn ${
                    rowsPerPage === 36 ? "btn-primary" : "btn-outline-primary"
                  }`}
                  onClick={() => handleRowsPerPageChange(36)}
                >
                  36
                </button>
                <button
                  className={`btn ${
                    rowsPerPage === 54 ? "btn-primary" : "btn-outline-primary"
                  }`}
                  onClick={() => handleRowsPerPageChange(54)}
                >
                  54
                </button>
                <button
                  className={`btn ${
                    rowsPerPage === 72 ? "btn-primary" : "btn-outline-primary"
                  }`}
                  onClick={() => handleRowsPerPageChange(72)}
                >
                  72
                </button>
              </div>
            </div>
          </div>
          {/*<div className="text-cente">*/}
          <div className="row">
            {Array.isArray(list) && list.length > 0 ? (
              list.map((rs) => {
                const { id, book_name, auther_name, book_edition, book_image } =
                  rs;

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
                            <p>
                              Edition: <i>{book_edition}</i>
                            </p>
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
                              className="fa-regular fa-heart fa-lg text-danger req-btn"
                              style={{ cursor: "pointer" }}
                              onClick={() => LogActiity(userId, id, "like")}
                            ></i>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <p className="text-center mt-5">No book found</p>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
