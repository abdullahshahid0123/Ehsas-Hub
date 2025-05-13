import React, { useEffect, useState } from "react";
import { VolunteerSidebar } from "../components/VolunteerSidebar";
import { VolunteerTopbar } from "../components/VolunteerTopbar";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const VolunteerProfile = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (!token) {
      navigate("/volunteer-login");
    }
  }, []);

  const [isEditing, setIsEditing] = useState(true);
  const [editData, setEditData] = useState([]);
  const [profile, setprofile] = useState([]);

  const userId = sessionStorage.getItem("id");

  const Fetch = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/get-volunteer/${userId}`
      );
      console.log("API Response:", response.data);
      setprofile(response.data);
      setEditData(response.data); // Correct usage
    } catch (error) {
      console.error("Error fetching admin data:", error);
    }
  };

  useEffect(() => {
    Fetch();
  }, []);
  //  const SendCode = async () => {
  //   const userId = sessionStorage.getItem("id");
  //   try {
  //     const response = await axios.post(
  //       "http://localhost:8000/send-code"
  //     );
  //     console.log("API Response:", response.data);

  //  } catch (error) {
  //     console.error("Error fetching volunteer data:", error);
  //   }
  // };
  const handleEdit = (e) => {
    const { name, value } = e.target;
    setEditData((prev) => ({ ...prev, [name]: value }));
    console.log(editData);
  };
  const handleEditImage = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.addEventListener("load", () => {
      setEditData((prev) => ({
        ...prev,
        profile: reader.result,
      }));
    });
  };
  const [showcode, setshowcode] = useState(false);
  const toggleCode = async () => {
    try {
      const res = await axios.post("http://localhost:8000/send-code", {
        editData,
      });
      alert(res.data.msg);
      setshowcode(true);
    } catch (err) {
      console.log(err);
    }
  };
  const Update = async () => {
    try {
      const res = await axios.put(
        `http://localhost:8000/update-profile-volunteer/${userId}`,
        editData
      );
      sessionStorage.setItem("token", res.data.token);
      alert(res.data.msg);
      window.location.reload();
    } catch (error) {
      console.log("eror in updating", error);
    }
  };

  const [open, setopen] = useState(false);
  const ClickToEdit = () => {
    setIsEditing(false);
    setopen(true);
  };
  return (
    <>
      <div className="wrapper">
        <VolunteerSidebar />
        <div className="main">
          <VolunteerTopbar />
          <div class="container profile-container ">
            <div className=" ">
              <div className="text-center">
                <img
                  style={{
                    width: "100px",
                    height: "100px",
                    borderRadius: "50%",
                    objectFit: "cover",
                  }}
                  src={editData.profile}
                  name="profile"
                  alt=""
                />
                <input
                  type="file"
                  hidden={isEditing}
                  name="profile"
                  onChange={handleEditImage}
                  accept=".jpg, .jpeg, .png"
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
                    <strong className="my-4 text-black">
                      verfication code
                    </strong>
                    <input
                      //   name="verification"
                      className="text-center"
                      maxlength="4"
                      type="number"
                      placeholder="xxxx"
                      name="code"
                      // value={verification}
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

              <strong className="text-black">Address</strong>
              <input
                type="text"
                name="address"
                value={editData.address}
                readOnly={isEditing}
                onChange={handleEdit}
              />
              {/* <strong className="text-black">gender</strong>{" "}
	            <input
	              className="mb-5"
	              type="text"
	              name="gender"
	              value={editData.gender}
	              readOnly={isEditing}
	              onChange={handleEdit}
	            />*/}
              <div className="mb-5">
                {open ? (
                  <>
                    {showcode && (
                      <>
                        <button
                          className="mr-10 mt-5 btn btn-primary"
                          onClick={Update}
                        >
                          Save
                        </button>
                      </>
                    )}

                    <button
                      className="btn btn-danger mt-5"
                      onClick={() => {
                        setIsEditing(true);
                        setopen(false);
                      }}
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <button
                    className="mr-10 mt-5 btn btn-primary"
                    onClick={ClickToEdit}
                  >
                    Edit profile
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default VolunteerProfile;
