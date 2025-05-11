import React, { useEffect } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";
import "./AdminShared.css";

const AdminLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Check if admin is logged in
    const isAdminLoggedIn = localStorage.getItem("adminSession") === "true";

    // Only redirect if not on the login page and not logged in
    if (!isAdminLoggedIn && location.pathname !== "/admin") {
      navigate("/admin");
    }
  }, [navigate, location]);

  // Don't show sidebar on login page
  if (location.pathname === "/admin") {
    return <Outlet />;
  }

  return (
    <div className="admin-layout">
      <AdminSidebar />
      <div className="admin-main-content">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;
