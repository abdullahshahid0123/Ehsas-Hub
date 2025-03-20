import React from "react";
import { NavLink } from "react-router-dom";
// import "../../../public/assets/css/style2.css"
export const Sidebar = () => {
  
  return (
    <>
      <div
        className="collapse collapse-horizontal bg-dark sidebar"
        id="collapseWidthExample"
      >
        <div className="sidebar h-100">
          <div className="sidebar-logo">
            <a href="">Admin Dashboard</a>
          </div>
          <ul className="sidebar-nav">
            <li className="sidebar-header">Admin Elements</li>
            <li className="sidebar-item">
              <NavLink to="/AdminDashboard" className="sidebar-link">
                <i className="fa-solid fa-house pe-2"></i>Dashboard
              </NavLink>
            </li>
            <li className="sidebar-item">
              <NavLink to="/activelist" className="sidebar-link">
              <i class="fa-solid fa-ellipsis pe-2"></i>Active list
              </NavLink>
            </li>
            <li className="sidebar-item">
              <a
                href="#"
                className="sidebar-link collapsed"
                data-bs-target="#pages1"
                data-bs-toggle="collapse"
                arua-expended="false"
              >
                <i class="fa-solid fa-list"></i> Manage Accounts
              </a>
              <ul
                id="pages1"
                className="sidebar-dropdown list-unstyled collapse"
                data-bs-parent="#sidebar"
              >
                <li className="sidebar-item">
                  <NavLink to="/ManageuserAccount" className="sidebar-link">
                    <i className="fa-solid fa-clipboard-user px-2"></i>User
                    Account
                  </NavLink>
                </li>
                <li className="sidebar-item">
                  <NavLink
                    to="/ManagevolunteerAccount"
                    className="sidebar-link"
                  >
                    <i class="fa-solid fa-user px-2"></i>volunteer Account
                  </NavLink>
                </li>
              </ul>
            </li>
            <li className="sidebar-item">
              <a
                href="#"
                className="sidebar-link collapsed"
                data-bs-target="#pages2"
                data-bs-toggle="collapse"
                arua-expended="false"
              >
                <i class="fa-solid fa-user "></i> Donor
              </a>
              <ul
                id="pages2"
                className="sidebar-dropdown list-unstyled collapse"
                data-bs-parent="#sidebar"
              >
                <li className="sidebar-item">
                  <NavLink to="/Dnewrequest" className="sidebar-link">
                    <i className="fa-solid fa-clipboard-user px-2"></i>New
                    Request
                  </NavLink>
                </li>
                <li className="sidebar-item">
                  <NavLink to="/Dapproverequest" className="sidebar-link">
                    <i className="fa-solid fa-check px-2"></i>Approved Request
                  </NavLink>
                </li>
                <li className="sidebar-item">
                  <NavLink to="/Dprocessrequest" className="sidebar-link">
                  <i class="fa-solid fa-spinner px-2"></i>In Process
                  </NavLink>
                </li>
                <li className="sidebar-item">
                  <NavLink to="/Dcompleterequest" className="sidebar-link">
                    <i className="fa-solid fa-eye px-2"></i>Complete Request
                  </NavLink>
                </li>
              </ul>
            </li>
            <li className="sidebar-item">
              <a
                href="#"
                className="sidebar-link collapsed"
                data-bs-target="#pages3"
                data-bs-toggle="collapse"
                arua-expended="false"
              >
                <i class="fa-solid fa-people-line"></i> Needy
              </a>
              <ul
                id="pages3"
                className="sidebar-dropdown list-unstyled collapse"
                data-bs-parent="#sidebar"
              >
                <li className="sidebar-item">
                  <NavLink to="/Nnewrequest" className="sidebar-link">
                    <i className="fa-solid fa-clipboard-user px-2"></i>New
                    Request
                  </NavLink>
                </li>
                <li className="sidebar-item">
                  <NavLink to="/Napproverequest" className="sidebar-link">
                    <i className="fa-solid fa-check px-2"></i>Approved Request
                  </NavLink>
                </li>
                <li className="sidebar-item">
                  <NavLink to="/needyprocess" className="sidebar-link">
                  <i class="fa-solid fa-spinner px-2"></i>Process Request
                  </NavLink>
                </li>
                <li className="sidebar-item">
                  <NavLink to="/Ncompleterequest" className="sidebar-link">
                    <i className="fa-solid fa-eye px-2"></i>Complete Request
                  </NavLink>
                </li>
              </ul>
            </li>
            <li className="sidebar-item">
              <a
                href="#"
                className="sidebar-link collapsed"
                data-bs-target="#pages4"
                data-bs-toggle="collapse"
                arua-expended="false"
              >
                <i class="fa-solid fa-handshake-angle"></i> Volunteer
              </a>
              <ul
                id="pages4"
                className="sidebar-dropdown list-unstyled collapse"
                data-bs-parent="#sidebar"
              >
                <li className="sidebar-item">
                  <NavLink to="/Vapproverequest" className="sidebar-link">
                    <i className="fa-solid fa-check px-2"></i>Approved Request
                  </NavLink>
                </li>
                <li className="sidebar-item">
                  <NavLink to="/Vcompleterequest" className="sidebar-link">
                    <i className="fa-solid fa-eye px-2"></i>Complete Request
                  </NavLink>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};
