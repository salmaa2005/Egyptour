import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./AdminShared.css";

const AdminSidebar = () => {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <>
      <div className="admin-navbar">
        <div className="admin-navbar-left">
          <Link to="/admin/dashboard" className="admin-brand">
            <i className="fas fa-compass"></i>
            <span>EgyptTour Admin</span>
          </Link>
        </div>
        <div className="admin-navbar-right">
          <div className="admin-navbar-search">
            <i className="fas fa-search"></i>
            <input type="text" placeholder="Search..." />
          </div>
          <div className="admin-navbar-profile">
            <i className="fas fa-bell"></i>
            <div className="admin-profile-dropdown">
              <img
                src="https://ui-avatars.com/api/?name=Admin+User&background=006666&color=fff&size=128"
                alt="Admin Profile"
                className="admin-profile-image"
              />
              <span>Admin User</span>
              <i className="fas fa-chevron-down"></i>
            </div>
          </div>
        </div>
      </div>
      <div className="admin-sidebar">
        <div className="admin-sidebar-header">
          <h2>Admin Panel</h2>
        </div>
        <nav className="admin-sidebar-nav">
          <Link
            to="/admin/dashboard"
            className={`admin-sidebar-link ${
              isActive("/admin/dashboard") ? "active" : ""
            }`}
          >
            <i className="fas fa-chart-line"></i>
            Dashboard
          </Link>
          <Link
            to="/admin/products"
            className={`admin-sidebar-link ${
              isActive("/admin/products") ? "active" : ""
            }`}
          >
            <i className="fas fa-shopping-bag"></i>
            Products
          </Link>
          <Link
            to="/admin/users"
            className={`admin-sidebar-link ${
              isActive("/admin/users") ? "active" : ""
            }`}
          >
            <i className="fas fa-users"></i>
            Users
          </Link>
          <Link
            to="/admin/tours"
            className={`admin-sidebar-link ${
              isActive("/admin/tours") ? "active" : ""
            }`}
          >
            <i className="fas fa-map-marked-alt"></i>
            Tours
          </Link>
          <Link
            to="/admin/bookings"
            className={`admin-sidebar-link ${
              isActive("/admin/bookings") ? "active" : ""
            }`}
          >
            <i className="fas fa-calendar-check"></i>
            Bookings
          </Link>
        </nav>
        <div className="admin-sidebar-footer">
          <Link to="/" className="admin-sidebar-link">
            <i className="fas fa-sign-out-alt"></i>
            Logout
          </Link>
        </div>
      </div>
    </>
  );
};

export default AdminSidebar;
