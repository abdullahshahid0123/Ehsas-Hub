import React from "react";
import { NavLink } from "react-router-dom";

export const VolunteerSidebar = () => {
  return (
    <>
      <div
        className="collapse collapse-horizontal bg-dark sidebar"
        id="collapseWidthExample"
      >
        <div className="sidebar h-100">
          <div className="sidebar-logo">
            <a href="">Volunteer Dasboard</a>
          </div>
          <ul className="sidebar-nav">
            <li className="sidebar-header">Volunteer Elements</li>
            <li className="sidebar-item">
              <NavLink to="/volunteer-dashboard" className="sidebar-link">
                <i className="fa-solid fa-house pe-2"></i>Dashboard
              </NavLink>
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
                  <NavLink to="/volunteer-new-req" className="sidebar-link">
                    <i className="fa-solid fa-check px-2"></i>New Request
                  </NavLink>
                </li>
                <li className="sidebar-item">
                  <NavLink to="/volunteer-process-req" className="sidebar-link">
                    <i className="fa-solid fa-process px-2"></i>In Process
                  </NavLink>
                </li>
                <li className="sidebar-item">
                  <NavLink to="/volunteer-comp-req" className="sidebar-link">
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
