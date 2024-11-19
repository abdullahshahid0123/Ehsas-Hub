import { AdminDashboard } from "./admin/pages/AdminDashboard";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ManagevolunteerAccount from "./admin/pages/ManagevolunteerAccount";
import ManageuserAccount from "./admin/pages/ManageuserAccount";
import Login from "./User/Login";
import Home from "./User/Home";
import Verifyuser from "./User/Verifyuser";
import Register from "./User/Register";
import Profileview from "./User/Profileview";



function App() {
  return (
    <>
      <Router>
        <Routes>
        <Route path="/profileview" element={<Profileview/>}/>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Home />} />
          <Route path="/verifyuser" element={<Verifyuser />} />
          <Route path="/register" element={<Register />} />
          <Route path="/AdminDashboard" element={<AdminDashboard />} />
          <Route path="/ManageuserAccount" element={<ManageuserAccount />} />
          <Route path="/ManagevolunteerAccount" element={<ManagevolunteerAccount />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
