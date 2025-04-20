import React, { useEffect, useState } from "react";
import { VolunteerSidebar } from "../components/VolunteerSidebar";
import { VolunteerTopbar } from "../components/VolunteerTopbar";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const VolunteerDashboard = () => {
  const navigate = useNavigate();
  const id = sessionStorage.getItem("id");
  // const check = sessionStorage.getItem("isLoggedIn");

  // useEffect(() => {
  //   if (!token) {
  //     navigate("/volunteer-login");
  //   }
  // });

  const [approve, setApprove] = useState(0);
  const [process, setProcess] = useState(0);
  const [completed, setCompleted] = useState(0);

  useEffect(() => {
    const CountNew = async () => {
      await axios
        .get(`http://localhost:8000/vol-new-count/${id}`)
        .then((res) => {
          setApprove(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    CountNew();

    const CountProcess = async () => {
      await axios
        .get(`http://localhost:8000/vol-process-count/${id}`)
        .then((res) => {
          setProcess(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    CountProcess();

    const CountCompleted = async () => {
      await axios
        .get(`http://localhost:8000/vol-completed-count/${id}`)
        .then((res) => {
          setCompleted(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    CountCompleted();
  });

  return (
    <>
      <div className="wrapper">
        <VolunteerSidebar />
        <div className="main">
          <VolunteerTopbar />
          <main class="content px-3 py-2">
            <div class="container-fluid">
              <div class="mt-4 mb-5">
                <ol class="breadcrumb">
                  <li class="breadcrumb-item">
                    <a href="#">Dashboard</a>
                  </li>
                  <li class="breadcrumb-item active" aria-current="page">
                    Home
                  </li>
                </ol>
              </div>
              <div className="row">
                <div className="col-12">
                  <div class="card flex-fill border-0 illustration shadow">
                    <div class="card-body p-2 flex-fill">
                      <h4>Statistics</h4>
                    </div>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-sm-4">
                  <div class="card flex-fill border-0 illustration shadow">
                    <div class="card-body p-5 text-center flex-fill">
                      <h3>{approve !== 0 ? approve : 0}</h3>
                      <h5>New</h5>
                    </div>
                  </div>
                </div>

                <div class="col-sm-4">
                  <div class="card flex-fill border-0 illustration shadow">
                    <div class="card-body p-5 text-center flex-fill">
                      <h3>{process !== 0 ? process : 0}</h3>
                      <h5>Process</h5>
                    </div>
                  </div>
                </div>

                <div class="col-sm-4">
                  <div class="card flex-fill border-0 illustration shadow">
                    <div class="card-body p-5 text-center flex-fill">
                      <h3>{completed !== 0 ? completed : 0}</h3>
                      <h5>Completed</h5>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
};
