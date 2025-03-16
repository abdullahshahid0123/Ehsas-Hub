import React, { useEffect, useState } from "react";
import { Sidebar } from "../components/Sidebar";
import { Topbar } from "../components/Topbar";
import axios from "axios";
import { useNavigate } from "react-router-dom";
// import "../../../public/assets/css/style2.css"

export const AdminDashboard = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (!token) {
      navigate("/adminlogin");
    }
  }, []);

  

  const [pUsers, setpUsers] = useState(0);
  const [aUsers, setaUsers] = useState(0);
  const [fUsers, setfUsers] = useState(0);
  const [vUsers, setvUsers] = useState(0);

  // Donor
  const [pDonor, setpDonor] = useState(0);
  const [aDonor, setaDonor] = useState(0);
  const [prDonor, setprDonor] = useState(0);
  const [cDonor, setcDonor] = useState(0);

  // Needy
  const [pNeedy, setpNeedy] = useState(0);
  const [aNeedy, setaNeedy] = useState(0);
  const [prNeedy, setprNeedy] = useState(0);
  const [cNeedy, setcNeedy] = useState(0);

  useEffect(() => {
    // users
    const CountPendingUsers = async () => {
      await axios
        .get("http://localhost:8000/count-pending-users")
        .then((res) => {
          setpUsers(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    CountPendingUsers();

    const CountActiveUsers = async () => {
      await axios
        .get("http://localhost:8000/count-active-users")
        .then((res) => {
          setaUsers(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    CountActiveUsers();

    const CountFreezeUsers = async () => {
      await axios
        .get("http://localhost:8000/count-freeze-users")
        .then((res) => {
          setfUsers(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    CountFreezeUsers();

    const CountVolunteer = async () => {
      await axios
        .get("http://localhost:8000/count-vol")
        .then((res) => {
          setvUsers(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    CountVolunteer();

    // Donor
    const CountDonorPending = async () => {
      await axios
        .get("http://localhost:8000/count-pending-donor")
        .then((res) => {
          setpDonor(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    CountDonorPending();

    const CountDonorApproved = async () => {
      await axios
        .get("http://localhost:8000/count-approve-donor")
        .then((res) => {
          setaDonor(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    CountDonorApproved();

    const CountDonorProcess = async () => {
      await axios
        .get("http://localhost:8000/count-process-donor")
        .then((res) => {
          setprDonor(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    CountDonorProcess();

    const CountDonorCompleted = async () => {
      await axios
        .get("http://localhost:8000/count-complete-donor")
        .then((res) => {
          setcDonor(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    CountDonorCompleted();

    // needy
    const CountNeedyPending = async () => {
      await axios
        .get("http://localhost:8000/count-pending-needy")
        .then((res) => {
          setpNeedy(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    CountNeedyPending();

    const CountNeedyApproved = async () => {
      await axios
        .get("http://localhost:8000/count-approve-needy")
        .then((res) => {
          setaNeedy(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    CountNeedyApproved();

    const CountNeedyProcess = async () => {
      await axios
        .get("http://localhost:8000/count-process-needy")
        .then((res) => {
          setprNeedy(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    CountNeedyProcess();

    const CountNeedyCompleted = async () => {
      await axios
        .get("http://localhost:8000/count-complete-needy")
        .then((res) => {
          setcNeedy(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    CountNeedyCompleted();
  });

  return (
    <>
      <div className="wrapper">
        <Sidebar />
        <div className="main">
          <Topbar />
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
              {/* Users */}
              <div className="row">
                <div className="col-12">
                  <div class="card flex-fill border-0 illustration shadow">
                    <div class="card-body p-2 flex-fill">
                      <small>
                        <h4>Users Statistics</h4>
                      </small>
                    </div>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-sm-3">
                  <div class="card flex-fill border-0 illustration shadow">
                    <div class="card-body p-5 text-center flex-fill">
                      <h3>{pUsers !== 0 ? pUsers : 0}</h3>
                      <h5>Pending</h5>
                    </div>
                  </div>
                </div>
                <div class="col-sm-3">
                  <div class="card flex-fill border-0 illustration shadow">
                    <div class="card-body p-5 text-center flex-fill">
                      <h3>{aUsers !== 0 ? aUsers : 0}</h3>
                      <h5>Active</h5>
                    </div>
                  </div>
                </div>
                <div class="col-sm-3">
                  <div class="card flex-fill border-0 illustration shadow">
                    <div class="card-body p-5 text-center flex-fill">
                      <h3>{fUsers !== 0 ? fUsers : 0}</h3>
                      <h5>Freeze</h5>
                    </div>
                  </div>
                </div>
                <div class="col-sm-3">
                  <div class="card flex-fill border-0 illustration shadow">
                    <div class="card-body p-5 text-center flex-fill">
                      <h3>{vUsers !== 0 ? vUsers : 0}</h3>
                      <h5>Volunteer</h5>
                    </div>
                  </div>
                </div>
              </div>
              {/* Donor */}
              <div className="row">
                <div className="col-12">
                  <div class="card flex-fill border-0 illustration shadow">
                    <div class="card-body p-2 flex-fill">
                      <h4>Donor Statistics</h4>
                    </div>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-sm-3">
                  <div class="card flex-fill border-0 illustration shadow">
                    <div class="card-body p-5 text-center flex-fill">
                      <h3>{pDonor !== 0 ? pDonor : 0}</h3>
                      <h5>Pending</h5>
                    </div>
                  </div>
                </div>
                <div class="col-sm-3">
                  <div class="card flex-fill border-0 illustration shadow">
                    <div class="card-body p-5 text-center flex-fill">
                      <h3>{aDonor !== 0 ? aDonor : 0}</h3>
                      <h5>Approved</h5>
                    </div>
                  </div>
                </div>
                <div class="col-sm-3">
                  <div class="card flex-fill border-0 illustration shadow">
                    <div class="card-body p-5 text-center flex-fill">
                      <h3>{prDonor !== 0 ? prDonor : 0}</h3>
                      <h5>In Process</h5>
                    </div>
                  </div>
                </div>
                <div class="col-sm-3">
                  <div class="card flex-fill border-0 illustration shadow">
                    <div class="card-body p-5 text-center flex-fill">
                      <h3>{cDonor !== 0 ? cDonor : 0}</h3>
                      <h5>Completed</h5>
                    </div>
                  </div>
                </div>
              </div>
              {/* Needy */}
              <div className="row">
                <div className="col-12">
                  <div class="card flex-fill border-0 illustration shadow">
                    <div class="card-body p-1 flex-fill">
                      <h4>Needy Statistics</h4>
                    </div>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-sm-3">
                  <div class="card flex-fill border-0 illustration shadow">
                    <div class="card-body p-5 text-center flex-fill">
                      <h3>{pNeedy !== 0 ? pNeedy : 0}</h3>
                      <h5>Pending</h5>
                    </div>
                  </div>
                </div>
                <div class="col-sm-3">
                  <div class="card flex-fill border-0 illustration shadow">
                    <div class="card-body p-5 text-center flex-fill">
                      <h3>{aNeedy !== 0 ? aNeedy : 0}</h3>
                      <h5>Approved</h5>
                    </div>
                  </div>
                </div>
                <div class="col-sm-3">
                  <div class="card flex-fill border-0 illustration shadow">
                    <div class="card-body p-5 text-center flex-fill">
                      <h3>{prNeedy !== 0 ? prNeedy : 0}</h3>
                      <h5>Process</h5>
                    </div>
                  </div>
                </div>
                <div class="col-sm-3">
                  <div class="card flex-fill border-0 illustration shadow">
                    <div class="card-body p-5 text-center flex-fill">
                      <h3>{cNeedy !== 0 ? cNeedy : 0}</h3>
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
