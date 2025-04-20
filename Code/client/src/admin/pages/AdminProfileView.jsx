import React, { useEffect, useState } from "react";
import { Sidebar } from "../components/Sidebar";
import { Topbar } from "../components/Topbar";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AdminProfileView = () => {
   const navigate = useNavigate();
    useEffect(() => {
      const token = sessionStorage.getItem("token");
      if (!token) {
        navigate("/adminlogin");
      }
    }, []);

  const [isEditing, setIsEditing] = useState(true);
  const [editData, setEditData] = useState({});
  const [profile, setprofile] = useState([]);

const userId = sessionStorage.getItem("id");
  const Fetch = async () => {
    
    try {
      const response = await axios.get(
        `http://localhost:8000/fetchadmin-byid/${userId}`
      );
      console.log("API Response:", response.data);
      setprofile([response.data]);
      setEditData(response.data) // Correct usage
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
  //       "http://localhost:8000/send-code-admin"
  //     );
  //     console.log("API Response:", response.data);
      
  //  } catch (error) {
  //     console.error("Error fetching admin data:", error);
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
        image: reader.result,
       
      }));
    });
  };
  const [showcode, setshowcode] = useState(false);
  const toggleCode= async()=>{

    try{
      const res = await axios.post(
        "http://localhost:8000/send-code-admin", {editData}
      );
      alert(res.data.msg);
      setshowcode(true);
    }catch(err){
      console.log(err)
    }

  }
  const Update = async () => {
    try {
      
      const res = await axios.put(`http://localhost:8000/verify-Update-Profile/${userId}`, editData);
      alert(res.data.msg)
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
        <Sidebar />
        <div className="main">
          <Topbar />
          <div class="container profile-container  bg-gray">
          <div className=" ">
            <div className="text-center" >
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
             <input type="button" value="Verify Email" className="my-4" onClick={toggleCode} hidden={isEditing}/>
                  
                  
            <div>
              {showcode && (
                <>
                  <strong className="my-4 text-black">verfication code</strong>
                  <input
                  name="verification"
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
                {
                  showcode && (
                    <>
                   <button className="mr-10" onClick={Update}>
                    Save
                  </button>
                    </>
                    )
                }
                 

                  <button
                    onClick={() => {
                      setIsEditing(true);
                      setopen(false);
                    }}
                  >
                    cancel
                  </button>
                </>
              ) : (
                <button className="mr-10" onClick={ClickToEdit}>

                  
               
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

export default AdminProfileView;
