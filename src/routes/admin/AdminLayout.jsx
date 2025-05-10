import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";
import "./AdminShared.css";

const AdminLayout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if admin is logged in
    const isAdminLoggedIn = localStorage.getItem("adminSession") === "true";
    if (!isAdminLoggedIn) {
      navigate("/admin");
    }
  }, [navigate]);

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
