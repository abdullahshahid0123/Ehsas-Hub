import React from "react";
import { NavLink } from 'react-router-dom';
export const Sidebar = () => {
  return (
    <>
      <div className="collapse collapse-horizontal bg-dark sidebar" id="collapseWidthExample">
        <div className="sidebar h-100">
          <div className="sidebar-logo">
            <a href="">Admin Layout</a>
          </div>
          <ul className="sidebar-nav">
            <li className="sidebar-header">Admin Elements</li>
            <li className="sidebar-item">
              <NavLink to="/" className="sidebar-link">
                <i className="fa-solid fa-house pe-2"></i>Dashboard
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
                    <i className="fa-solid fa-clipboard-user px-2"></i>User Account

                  </NavLink>
                </li>
                <li className="sidebar-item">
                  <NavLink to="/ManagevolunteerAccount" className="sidebar-link">
                  <i class="fa-solid fa-user"></i>volunteer Account
                  </NavLink>
                </li>
              </ul>
            </li>
            <li className="sidebar-item">
              <a
                href="#"
                className="sidebar-link collapsed"
                data-bs-target="#pages1"
                data-bs-toggle="collapse"
                arua-expended="false"
              >
              <i class="fa-solid fa-user"></i> Donor
              </a>
              <ul
                id="pages1"
                className="sidebar-dropdown list-unstyled collapse"
                data-bs-parent="#sidebar"
              >
                <li className="sidebar-item">
                  <a href="#" className="sidebar-link">
                    <i className="fa-solid fa-clipboard-user px-2"></i>New Request

                  </a>
                </li>
                <li className="sidebar-item">
                  <a href="#" className="sidebar-link">
                    <i className="fa-solid fa-check px-2"></i>Approved Request
                  </a>
                </li>
                <li className="sidebar-item">
                  <a href="#" className="sidebar-link">
                    <i className="fa-solid fa-eye px-2"></i>Complete Request
                  </a>
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
              <i class="fa-solid fa-people-line"></i> Needy
              </a>
              <ul
                id="pages2"
                className="sidebar-dropdown list-unstyled collapse"
                data-bs-parent="#sidebar"
              >
                <li className="sidebar-item">
                  <a href="#" className="sidebar-link">
                    <i className="fa-solid fa-clipboard-user px-2"></i>New Request

                  </a>
                </li>
                <li className="sidebar-item">
                  <a href="#" className="sidebar-link">
                    <i className="fa-solid fa-check px-2"></i>Approved Request
                  </a>
                </li>
                <li className="sidebar-item">
                  <a href="#" className="sidebar-link">
                    <i className="fa-solid fa-eye px-2"></i>Complete Request
                  </a>
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
            <i class="fa-solid fa-handshake-angle"></i> Volunteer
            </a>
            <ul
              id="pages3"
              className="sidebar-dropdown list-unstyled collapse"
              data-bs-parent="#sidebar"
            >
              
              <li className="sidebar-item">
                <a href="#" className="sidebar-link">
                  <i className="fa-solid fa-check px-2"></i>Approved Request
                </a>
              </li>
              <li className="sidebar-item">
                <a href="#" className="sidebar-link">
                  <i className="fa-solid fa-eye px-2"></i>Complete Request
                </a>
              </li>
            </ul>
          </li>

          </ul>
        </div>
      </div>
    </>
  );
};
