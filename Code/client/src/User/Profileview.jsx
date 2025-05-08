import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import Profile from "../components/Profile";

const Profileview = () => {
  // for token check
  const navigate = useNavigate();
  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
  }, []);
  // this is fetch profile
  const [isEditing, setIsEditing] = useState(true);
  const [editData, setEditData] = useState({});
  const [profile, setprofile] = useState([]);

  const [verification, setverification] = useState("");

  const userId = sessionStorage.getItem("id");
  const email = sessionStorage.getItem("email");

  const id = sessionStorage.getItem("id");

  const Fetch = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/fetchuser-byid/${userId}`
      );

      setprofile([response.data]); // Correct usage
      // setEditData(profile[0]);
      // console.log(response.data);
      setEditData(response.data);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };
  useEffect(() => {
    Fetch();
  }, [userId]);

  const handleEdit = (e) => {
    const { name, value } = e.target;
    setEditData((prev) => ({ ...prev, [name]: value }));
    // console.log(editData);
  };
  const [showcode, setshowcode] = useState(false);
  const toggleCode = async () => {
    try {
      const res = await axios.post(
        "http://localhost:8000/user-profile-verify",
        { editData }
      );
      alert(res.data.msg);
      setshowcode(true);
    } catch (err) {
      console.log(err);
    }
  };
  const Update = async () => {
    try {
      const res = await axios.put(
        `http://localhost:8000/update-profile/${userId}`,
        editData
      );
      alert(res.data.msg);
      window.location.reload();
    } catch (error) {
      console.log("eror in updating", error);
    }
  };

  const handleEditImage = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.addEventListener("load", () => {
      setEditData((prev) => ({
        ...prev,
        image: reader.result,
      }));
    });
  };

  const ClickToEdit = () => {
    setIsEditing(false);
    setopen(true);
  };
  const [getvalue, setgetvalue] = useState([]);
  const FetchState = async (id) => {
    try {
      const res = await axios.get(
        `http://localhost:8000/count-donate-books/${id}`
      );
      setgetvalue(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  const [reqvalue, setreqvalue] = useState([]);
  const FetchReqState = async (id) => {
    try {
      const res = await axios.get(
        `http://localhost:8000/count-req-books/${id}`
      );
      setreqvalue(res.data);
      // console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    FetchState(userId);
    FetchReqState(userId);
  }, [userId]);
  const [open, setopen] = useState(false);

  // for the show books
  const [openModal, setopenModal] = useState(false);

  const [donatelist, setdonatelist] = useState([]);
  const Fetchdonatebook = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8000/show-donate-books/${id}`
      );

      setdonatelist(res.data);
      setopenModal(true);
    } catch (error) {
      console.log(error);
    }
  };
  // for the show books
  const [openreqModal, setopenreqModal] = useState(false);

  const [Reqlist, setReqlist] = useState([]);
  const FetchReqbook = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8000/show-request-books/${id}`
      );

      setReqlist(res.data);
      setopenreqModal(true);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div>
        <Profile />
        <div class="container profile-container bg-blac">
          <div className="col-6">
            <div className="text-center">
              <img
                style={{
                  width: "100px",
                  height: "100px",
                  borderRadius: "50%",
                  objectFit: "cover",
                }}
                src={editData.image}
                name="image"
                alt=""
              />
              <input
                type="file"
                hidden={isEditing}
                name="image"
                onChange={handleEditImage}
              />
            </div>
            <strong className="text-black">Name</strong>
            <input
              type="text"
              value={editData.name}
              name="name"
              readOnly={true}
              onChange={handleEdit}
            />
            <strong className="text-black">Email</strong>
            <input
              type="text"
              name="email"
              value={editData.email}
              readOnly={isEditing}
              onChange={handleEdit}
            />
            <input
              type="button"
              value="Verify Email"
              className="my-4"
              onClick={toggleCode}
              hidden={isEditing}
            />

            <div>
              {showcode && (
                <>
                  <strong className="my-4 text-black">verfication code</strong>
                  <input
                    // name="verification"
                    className="text-center"
                    maxlength="4"
                    type="text"
                    placeholder="xxxx"
                    name="code"
                    // // value={verification}
                    onChange={handleEdit}
                  />
                </>
              )}
            </div>
            <strong className="text-black">Phone</strong>
            <input
              type="number"
              name="phone"
              value={editData.phone}
              readOnly={isEditing}
              onChange={handleEdit}
            />

            {isEditing ? (
              <>
                <strong className="text-black">gender</strong>
                <input
                  className="mb-5"
                  type="text"
                  name="gender"
                  value={editData.gender}
                  readOnly={isEditing}
                  onChange={handleEdit}
                />
              </>
            ) : (
              <>
                <strong className="text-dark">Gender:</strong>

                <select
                  name="gender"
                  id=""
                  className="form-control home-input"
                  value={editData.gender}
                  readOnly={isEditing}
                  onChange={handleEdit}
                >
                  <option disabled selected>
                    --Select--
                  </option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </>
            )}

            <div className="mb-5">
              {open ? (
                <>
                  {showcode && (
                    <>
                      <button className="mt-5 btn btn-primary" onClick={Update}>
                        Save
                      </button>
                    </>
                  )}

                  <button
                    className="mt-5 ml-5 btn btn-danger"
                    onClick={() => {
                      setIsEditing(true);
                      setopen(false);
                    }}
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <button className="mr-10 btn btn-primary" onClick={ClickToEdit}>
                  Edit profile
                </button>
              )}
            </div>
          </div>
          <div class="profile-right col-lg-6 col-md-8 col-sm-12">
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
              <div className="row">
                <div class="col-sm-6">
                  <div
                    class="card flex-fill border-0 shadow"
                    onClick={() => Fetchdonatebook(id)}
                    style={{ cursor: "pointer" }}
                  >
                    <div class="card-body p-5 text-center flex-fill">
                      <h3>{getvalue !== 0 ? getvalue : 0}</h3>
                      <h6>Donate books</h6>
                    </div>
                  </div>
                </div>
                <div class="col-sm-6">
                  <div
                    class="card flex-fill border-0  shadow"
                    onClick={() => FetchReqbook(id)}
                    style={{ cursor: "pointer" }}
                  >
                    <div class="card-body p-5 text-center flex-fill">
                      <h3>{reqvalue !== 0 ? reqvalue : 0}</h3>
                      <h6>Request books</h6>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {openModal && (
              <div
                style={{
                  position: "fixed",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  backgroundColor: "rgba(0,0,0,0.5)",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  zIndex: 1000,
                }}
              >
                <div
                  style={{
                    backgroundColor: "white",
                    padding: "20px",
                    borderRadius: "10px",
                    width: "90%",
                    maxWidth: "800px",
                    maxHeight: "80%",
                    overflowY: "auto",
                  }}
                >
                  <div
                    style={{
                      textAlign: "center",
                      marginTop: "20px",
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <h4 className="text-center mb-4">Donated Books</h4>

                    <button
                      onClick={() => setopenModal(false)}
                      style={{
                        padding: "10px 20px",
                        backgroundColor: "#007bff",
                        color: "white",
                        border: "none",
                        borderRadius: "5px",
                      }}
                    >
                      Close
                    </button>
                  </div>
                  <br />
                  {Array.isArray(donatelist) && donatelist.length > 0 ? (
                    <table
                      style={{ width: "100%", borderCollapse: "collapse" }}
                    >
                      <thead>
                        <tr style={{ backgroundColor: "#f5f5f5" }}>
                          <th
                            style={{
                              padding: "10px",
                              border: "1px solid #ddd",
                            }}
                          >
                            #
                          </th>
                          <th
                            style={{
                              padding: "10px",
                              border: "1px solid #ddd",
                            }}
                          >
                            Book Name
                          </th>
                          <th
                            style={{
                              padding: "10px",
                              border: "1px solid #ddd",
                            }}
                          >
                            Genres
                          </th>
                       
                          <th
                            style={{
                              padding: "10px",
                              border: "1px solid #ddd",
                            }}
                          >
                            Author
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {donatelist.map((rs, index) => {
                          const {
                            id,
                            book_name,
                            generes,
                            book_edition,
                            auther_name,
                            book_image,
                          } = rs;
                          return (
                            <tr key={id}>
                              {/*<td style={{ padding: "10px", border: "1px solid #ddd", textAlign: "center" }}>
                    <img src={book_image} alt={book_name} style={{ width: "60px", height: "60px", objectFit: "cover", borderRadius: "6px" }} />
                  </td>*/}
                              <td
                                style={{
                                  padding: "10px",
                                  border: "1px solid #ddd",
                                  textAlign: "center",
                                }}
                              >
                                {index + 1}
                              </td>
                              <td
                                style={{
                                  padding: "10px",
                                  border: "1px solid #ddd",
                                  textAlign: "center",
                                }}
                              >
                                {book_name}
                              </td>
                              <td
                                style={{
                                  padding: "10px",
                                  border: "1px solid #ddd",
                                  textAlign: "center",
                                }}
                              >
                                {generes}
                              </td>
                             
                              <td
                                style={{
                                  padding: "10px",
                                  border: "1px solid #ddd",
                                  textAlign: "center",
                                }}
                              >
                                {auther_name}
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  ) : (
                    <p>No donated books found</p>
                  )}
                </div>
              </div>
            )}

            {openreqModal && (
              <div
                style={{
                  position: "fixed",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  backgroundColor: "rgba(0,0,0,0.5)",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  zIndex: 1000,
                }}
              >
                <div
                  style={{
                    backgroundColor: "white",
                    padding: "20px",
                    borderRadius: "10px",
                    width: "90%",
                    maxWidth: "800px",
                    maxHeight: "80%",
                    overflowY: "auto",
                  }}
                >

                  <div
                    style={{
                      textAlign: "center",
                      marginTop: "20px",
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <h4 className="text-center mb-4">Requested Books</h4>

                    <button
                      onClick={() => setopenreqModal(false)}
                      style={{
                        padding: "10px 20px",
                        backgroundColor: "#007bff",
                        color: "white",
                        border: "none",
                        borderRadius: "5px",
                      }}
                    >
                      Close
                    </button>
                  </div>
                  <br />
                  <h4 className="text-center mb-4">Requested Books</h4>

                  {Array.isArray(Reqlist) && Reqlist.length > 0 ? (
                    <table
                      style={{ width: "100%", borderCollapse: "collapse" }}
                    >
                      <thead>
                        <tr style={{ backgroundColor: "#f5f5f5" }}>
                          <th
                            style={{
                              padding: "10px",
                              border: "1px solid #ddd",
                            }}
                          >
                            #
                          </th>
                          <th
                            style={{
                              padding: "10px",
                              border: "1px solid #ddd",
                            }}
                          >
                            Book Name
                          </th>
                          <th
                            style={{
                              padding: "10px",
                              border: "1px solid #ddd",
                            }}
                          >
                            Genres
                          </th>
                          <th
                            style={{
                              padding: "10px",
                              border: "1px solid #ddd",
                            }}
                          >
                            Edition
                          </th>
                          <th
                            style={{
                              padding: "10px",
                              border: "1px solid #ddd",
                            }}
                          >
                            Author
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {Reqlist.map((rs, index) => {
                          const {
                            id,
                            book_name,
                            generes,
                            book_edition,
                            auther_name,
                            book_image,
                          } = rs;

                          return (
                            <tr key={id}>
                              {/*<td style={{ padding: "10px", border: "1px solid #ddd", textAlign: "center" }}>
                    <img src={book_image} alt={book_name} style={{ width: "60px", height: "60px", objectFit: "cover", borderRadius: "6px" }} />
                  </td>*/}
                              <td
                                style={{
                                  padding: "10px",
                                  border: "1px solid #ddd",
                                  textAlign: "center",
                                }}
                              >
                                {index + 1}
                              </td>
                              <td
                                style={{
                                  padding: "10px",
                                  border: "1px solid #ddd",
                                  textAlign: "center",
                                }}
                              >
                                {book_name}
                              </td>
                              <td
                                style={{
                                  padding: "10px",
                                  border: "1px solid #ddd",
                                  textAlign: "center",
                                }}
                              >
                                {generes}
                              </td>
                              <td
                                style={{
                                  padding: "10px",
                                  border: "1px solid #ddd",
                                  textAlign: "center",
                                }}
                              >
                                {book_edition}
                              </td>
                              <td
                                style={{
                                  padding: "10px",
                                  border: "1px solid #ddd",
                                  textAlign: "center",
                                }}
                              >
                                {auther_name}
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  ) : (
                    <p>No Requested books found</p>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Profileview;
