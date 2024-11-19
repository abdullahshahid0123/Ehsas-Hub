import { AdminDashboard } from "./admin/pages/AdminDashboard";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
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

function App() {
  return (
    <>
      <Router>
        <Routes>
        {/*user Routes*/}
        <Route path="/profileview" element={<Profileview/>}/>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Home />} />
          <Route path="/verifyuser" element={<Verifyuser />} />
          <Route path="/register" element={<Register />} />
          {/*admin Routes*/}

          <Route path="/Dnewrequest" element={<Dnewrequest/>} />
          <Route path="/Dapproverequest" element={<Dapproverequest/>} />
          <Route path="/Dcompleterequest" element={<Dcompleterequest/>} />

          <Route path="/Nnewrequest" element={<Nnewrequest/>} />
          <Route path="/Napproverequest" element={<Napproverequest/>} />
          <Route path="/Ncompleterequest" element={<Ncompleterequest />} />

          <Route path="/Vcompleterequest" element={<Vcompleterequest />} />
          <Route path="/Vapproverequest" element={<Vapproverequest />} />
          

          <Route path="/AdminDashboard" element={<AdminDashboard />} />
          <Route path="/ManageuserAccount" element={<ManageuserAccount />} />
          <Route path="/ManagevolunteerAccount" element={<ManagevolunteerAccount />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
