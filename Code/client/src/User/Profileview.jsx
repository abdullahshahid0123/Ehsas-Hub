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
  const [showcode, setshowcode] = useState(false);
  const [verification, setverification] = useState("");

  const userId = sessionStorage.getItem("id");
  const id = sessionStorage.getItem("id");

  console.log(id);

  const email = sessionStorage.getItem("email");
  console.log(email);

  const Fetch = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/fetchuser-byid/${id}`
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
    console.log(editData);
  };
  const Update = async () => {
    try {
      const res = await axios.put(
        `http://localhost:8000/update-profile/${userId}`,
        editData
      );
      const { token, msg, email } = res.data;
      sessionStorage.setItem("token", token);
      sessionStorage.setItem("email", email);
      if (res.data.msg === "code send to your email") {
        setshowcode(true);
      }

      alert(msg);
      Fetch();
    } catch (error) {
      console.log("eror in updating", error);
    }
  };

  const UpdateVerify = async () => {
    try {
      // console.log("this is email", email);
      const res = await axios.post(
        `http://localhost:8000/user-profile-verify/${email}`,
        { code: verification }
      );
      alert(res.data.msg);
      // setIsEditing(true);
    } catch (error) {
      console.log("error in code matching", error);
    }
  };
  const handleEditImage = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.addEventListener("load", () => {
      setEditData({ ...value, image: reader.result });
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
    FetchState(id);
    FetchReqState(id);
  }, [id]);
  const [open, setopen] = useState(false);

  return (
    <>
      <div>
        <Profile />
        <div class="container profile-container bg-gray">
          <div className="col-6">
            <div>
              <img src={editData.image} alt="" width={100} height={100} />
              <input
                type="file"
                hidden={isEditing}
                onChange={handleEditImage}
              />
            </div>
            <strong className="text-black">Name</strong>
            <input
              type="text"
              value={editData.name}
              name="name"
              readOnly={isEditing}
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
            <div>
              {showcode && (
                <>
                  <strong className="my-4 text-black">verfication code</strong>
                  <input
                    className="text-center"
                    maxlength="4"
                    type="text"
                    placeholder="xxxx"
                    value={verification}
                    onChange={(e) => {
                      setverification(e.target.value);
                    }}
                  />
                  <button className="my-4" onClick={UpdateVerify}>
                    verify
                  </button>
                </>
              )}
            </div>
            <strong className="text-black">Phone</strong>
            <input
              type="text"
              name="phone"
              value={editData.phone}
              readOnly={isEditing}
              onChange={handleEdit}
            />
            <strong className="text-black">gender</strong>{" "}
            <input
              className="mb-5"
              type="text"
              name="gender"
              value={editData.gender}
              readOnly={isEditing}
              onChange={handleEdit}
            />
            <div className="mb-5">
              {open ? (
                <>
                  <button className="mr-10" onClick={Update}>
                    Save
                  </button>

                  <button
                    onClick={() => {
                      setIsEditing(true);
                      setopen(false);
                    }}
                  >
                    cancle
                  </button>
                </>
              ) : (
                <button className="mr-10" onClick={ClickToEdit}>
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
                  <div class="card flex-fill border-0 shadow">
                    <div class="card-body p-5 text-center flex-fill">
                      <h3>{getvalue !== 0 ? getvalue : 0}</h3>
                      <h6>Donate books</h6>
                    </div>
                  </div>
                </div>
                <div class="col-sm-6">
                  <div class="card flex-fill border-0  shadow">
                    <div class="card-body p-5 text-center flex-fill">
                      <h3>{reqvalue !== 0 ? reqvalue : 0}</h3>
                      <h6>Request books</h6>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profileview;
