import React from "react";
import { Link } from "react-router-dom";
import "./AdminDashboard.css";

const AdminDashboard = () => {
  return (
    <div className="page-container">
      <div className="admin-headline-container">
        <h1 className="admin-main-headline">Admin Dashboard</h1>
        <p className="admin-sub-headline">
          Welcome back! Here's an overview of your tours and bookings
        </p>
      </div>

      <div className="admin-content">
        <div className="admin-dashboard-stats">
          <div className="stat-card">
            <div className="stat-icon">
              <i className="fas fa-users"></i>
            </div>
            <div className="stat-info">
              <h3>Total Users</h3>
              <div className="stat-value">1,234</div>
              <div className="stat-change positive">+12% from last month</div>
            </div>
            <Link to="/admin/users" className="stat-link">
              View Details <i className="fas fa-arrow-right"></i>
            </Link>
          </div>

          <div className="stat-card">
            <div className="stat-icon">
              <i className="fas fa-map-marked-alt"></i>
            </div>
            <div className="stat-info">
              <h3>Active Tours</h3>
              <div className="stat-value">45</div>
              <div className="stat-change positive">+5 new this week</div>
            </div>
            <Link to="/admin/tours" className="stat-link">
              View Details <i className="fas fa-arrow-right"></i>
            </Link>
          </div>

          <div className="stat-card">
            <div className="stat-icon">
              <i className="fas fa-calendar-check"></i>
            </div>
            <div className="stat-info">
              <h3>Recent Bookings</h3>
              <div className="stat-value">89</div>
              <div className="stat-change positive">+23% from last week</div>
            </div>
            <Link to="/admin/bookings" className="stat-link">
              View Details <i className="fas fa-arrow-right"></i>
            </Link>
          </div>

          <div className="stat-card">
            <div className="stat-icon">
              <i className="fas fa-dollar-sign"></i>
            </div>
            <div className="stat-info">
              <h3>Total Revenue</h3>
              <div className="stat-value">$45,678</div>
              <div className="stat-change positive">+18% from last month</div>
            </div>
            <Link to="/admin/bookings" className="stat-link">
              View Details <i className="fas fa-arrow-right"></i>
            </Link>
          </div>
        </div>

        <div className="admin-dashboard-sections">
          <div className="dashboard-section">
            <div className="section-header">
              <h2>Quick Actions</h2>
            </div>
            <div className="quick-actions">
              <Link to="/admin/tours" className="action-card">
                <i className="fas fa-plus"></i>
                <span>Create New Tour</span>
              </Link>
              <Link to="/admin/bookings" className="action-card">
                <i className="fas fa-calendar"></i>
                <span>View Bookings</span>
              </Link>
              <Link to="/admin/users" className="action-card">
                <i className="fas fa-users"></i>
                <span>Manage Users</span>
              </Link>
              <Link to="/admin/tours" className="action-card">
                <i className="fas fa-chart-line"></i>
                <span>View Reports</span>
              </Link>
            </div>
          </div>

          <div className="dashboard-section">
            <div className="section-header">
              <h2>Recent Activity</h2>
            </div>
            <div className="recent-activity">
              <div className="activity-item">
                <div className="activity-icon">
                  <i className="fas fa-user-plus"></i>
                </div>
                <div className="activity-details">
                  <p>New user registration</p>
                  <span>2 minutes ago</span>
                </div>
              </div>
              <div className="activity-item">
                <div className="activity-icon">
                  <i className="fas fa-calendar-plus"></i>
                </div>
                <div className="activity-details">
                  <p>New booking for Pyramids Tour</p>
                  <span>15 minutes ago</span>
                </div>
              </div>
              <div className="activity-item">
                <div className="activity-icon">
                  <i className="fas fa-map-marked-alt"></i>
                </div>
                <div className="activity-details">
                  <p>New tour added: Desert Safari</p>
                  <span>1 hour ago</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
