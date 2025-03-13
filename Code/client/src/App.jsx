import { AdminDashboard } from "./admin/pages/AdminDashboard";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import ManagevolunteerAccount from "./admin/pages/ManagevolunteerAccount";
import ManageuserAccount from "./admin/pages/ManageuserAccount";
import Login from "./User/Login";
import Home from "./User/Home";
import Verifyuser from "./User/Verifyuser";
import Register from "./User/Register";
import Profileview from "./User/Profileview";
import Dnewrequest from "./admin/pages/Dnewrequest";
import Dapproverequest from "./admin/pages/Dapproverequest";
import Dcompleterequest from "./admin/pages/Dcompleterequest";
import Nnewrequest from "./admin/pages/Nnewrequest";
import Ncompleterequest from "./admin/pages/Ncompleterequest";
import Napproverequest from "./admin/pages/Napproverequest";
import Vcompleterequest from "./admin/pages/Vcompleterequest";
import Vapproverequest from "./admin/pages/Vapproverequest";
import UserInterest from "./User/UserInterest";
import Main from "./User/Main";
import { VolunteerDashboard } from "./volunteer/pages/VolunteerDashboard";
import { VolunteerNewReq } from "./volunteer/pages/VolunteerNewReq";
import { VolunteerCompReq } from "./volunteer/pages/VolunteerCompReq";
import VolunteerLogin from "./volunteer/pages/VolunteerLogin";
import { VolunteerProcessReq } from "./volunteer/pages/VolunteerProcessReq";
import { AdminProcessReq } from "./admin/pages/AdminProcessReq";
import ActiveList from "./admin/pages/ActiveList";
import ResetPass from "./User/ResetPass";
import NeedyProcessReq from "./admin/pages/NeedyProcessReq.";
import AdminSignup from "./admin/pages/AdminSignup";
import AdminLogin from "./admin/pages/AdminLogin";
import AdminResetPass from "./admin/pages/AdminResetPass";
import AdminProfileView from "./admin/pages/AdminProfileView";
import CreateVolunteer from "./components/CreateVolunteer";
import Preloader from "./components/Preloader";
import { useEffect, useState } from "react";

function AppWrapper() {
  const location = useLocation();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Show the preloader on route change
    setLoading(true);

    const timer = setTimeout(() => {
      setLoading(false); // Hide the preloader after a delay
    }, 1000); // Adjust delay as per your requirements

    return () => clearTimeout(timer); // Cleanup timeout
  }, [location]);

  return (
    <>
      {loading && <Preloader />}
      <Routes>
        {/*user Routes*/}
        <Route path="/resetpass" element={<ResetPass />} />
        <Route path="/" element={<Main />} />
        <Route path="/profileview" element={<Profileview />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/verifyuser" element={<Verifyuser />} />

        <Route path="/register" element={<Register />} />
        <Route path="/userinterest" element={<UserInterest />} />

        {/*admin Routes*/}
        <Route path="/adminprofileview" element={<AdminProfileView />} />
        <Route path="/adminresetpass" element={<AdminResetPass />} />
        <Route path="/adminlogin" element={<AdminLogin />} />
        <Route path="/adminsignup" element={<AdminSignup />} />
        <Route path="/activelist" element={<ActiveList />} />

        <Route path="/Dnewrequest" element={<Dnewrequest />} />
        <Route path="/Dapproverequest" element={<Dapproverequest />} />
        <Route path="/Dprocessrequest" element={<AdminProcessReq />} />
        <Route path="/Dcompleterequest" element={<Dcompleterequest />} />
        <Route path="/Nnewrequest" element={<Nnewrequest />} />
        <Route path="/Napproverequest" element={<Napproverequest />} />
        <Route path="/needyprocess" element={<NeedyProcessReq />} />

        <Route path="/Ncompleterequest" element={<Ncompleterequest />} />
        <Route path="/Vcompleterequest" element={<Vcompleterequest />} />
        <Route path="/Vapproverequest" element={<Vapproverequest />} />
        <Route path="/AdminDashboard" element={<AdminDashboard />} />
        <Route path="/ManageuserAccount" element={<ManageuserAccount />} />
        <Route
          path="/ManagevolunteerAccount"
          element={<ManagevolunteerAccount />}
        />

        {/* Volunteer */}
        <Route path="/become-volunteer" element={<CreateVolunteer />} />

        <Route path="/volunteer-login" element={<VolunteerLogin />} />
        <Route path="/volunteer-dashboard" element={<VolunteerDashboard />} />
        <Route path="/volunteer-new-req" element={<VolunteerNewReq />} />
        <Route path="/volunteer-comp-req" element={<VolunteerCompReq />} />
        <Route
          path="/volunteer-process-req"
          element={<VolunteerProcessReq />}
        />
      </Routes>
    </>
  );
}

function App() {
  return (
    <>
      <Router>
        <AppWrapper />
      </Router>
    </>
  );
}

export default App;
