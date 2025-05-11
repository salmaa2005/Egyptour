import React from "react";
import { Link } from "react-router-dom";
import "./AdminDashboard.css";

const AdminDashboard = () => {
  return (
    <div className="dashboard-page-container">
      <div className="dashboard-headline-container">
        <h1 className="dashboard-main-headline">Admin Dashboard</h1>
        <p className="dashboard-sub-headline">
          Welcome back! Here's an overview of your tours and bookings
        </p>
      </div>

      <div className="dashboard-content">
        <div className="dashboard-stats">
          <div className="dashboard-stat-card">
            <div className="dashboard-stat-icon">
              <i className="fas fa-users"></i>
            </div>
            <div className="dashboard-stat-info">
              <h3>Total Users</h3>
              <div className="dashboard-stat-value">1,234</div>
              <div className="dashboard-stat-change positive">
                +12% from last month
              </div>
            </div>
            <Link to="/admin/users" className="dashboard-stat-link">
              View Details <i className="fas fa-arrow-right"></i>
            </Link>
          </div>

          <div className="dashboard-stat-card">
            <div className="dashboard-stat-icon">
              <i className="fas fa-map-marked-alt"></i>
            </div>
            <div className="dashboard-stat-info">
              <h3>Active Tours</h3>
              <div className="dashboard-stat-value">45</div>
              <div className="dashboard-stat-change positive">
                +5 new this week
              </div>
            </div>
            <Link to="/admin/tours" className="dashboard-stat-link">
              View Details <i className="fas fa-arrow-right"></i>
            </Link>
          </div>

          <div className="dashboard-stat-card">
            <div className="dashboard-stat-icon">
              <i className="fas fa-calendar-check"></i>
            </div>
            <div className="dashboard-stat-info">
              <h3>Recent Bookings</h3>
              <div className="dashboard-stat-value">89</div>
              <div className="dashboard-stat-change positive">
                +23% from last week
              </div>
            </div>
            <Link to="/admin/bookings" className="dashboard-stat-link">
              View Details <i className="fas fa-arrow-right"></i>
            </Link>
          </div>

          <div className="dashboard-stat-card">
            <div className="dashboard-stat-icon">
              <i className="fas fa-dollar-sign"></i>
            </div>
            <div className="dashboard-stat-info">
              <h3>Total Revenue</h3>
              <div className="dashboard-stat-value">$45,678</div>
              <div className="dashboard-stat-change positive">
                +18% from last month
              </div>
            </div>
            <Link to="/admin/bookings" className="dashboard-stat-link">
              View Details <i className="fas fa-arrow-right"></i>
            </Link>
          </div>
        </div>

        <div className="dashboard-sections">
          <div className="dashboard-section">
            <div className="dashboard-section-header">
              <h2>Quick Actions</h2>
            </div>
            <div className="dashboard-quick-actions">
              <Link to="/admin/tours" className="dashboard-action-card">
                <i className="fas fa-plus"></i>
                <span>Create New Tour</span>
              </Link>
              <Link to="/admin/bookings" className="dashboard-action-card">
                <i className="fas fa-calendar"></i>
                <span>View Bookings</span>
              </Link>
              <Link to="/admin/users" className="dashboard-action-card">
                <i className="fas fa-users"></i>
                <span>Manage Users</span>
              </Link>
              <Link to="/admin/tours" className="dashboard-action-card">
                <i className="fas fa-chart-line"></i>
                <span>View Reports</span>
              </Link>
            </div>
          </div>

          <div className="dashboard-section">
            <div className="dashboard-section-header">
              <h2>Recent Activity</h2>
            </div>
            <div className="dashboard-recent-activity">
              <div className="dashboard-activity-item">
                <div className="dashboard-activity-icon">
                  <i className="fas fa-user-plus"></i>
                </div>
                <div className="dashboard-activity-details">
                  <p>New user registration</p>
                  <span>2 minutes ago</span>
                </div>
              </div>
              <div className="dashboard-activity-item">
                <div className="dashboard-activity-icon">
                  <i className="fas fa-calendar-plus"></i>
                </div>
                <div className="dashboard-activity-details">
                  <p>New booking for Pyramids Tour</p>
                  <span>15 minutes ago</span>
                </div>
              </div>
              <div className="dashboard-activity-item">
                <div className="dashboard-activity-icon">
                  <i className="fas fa-map-marked-alt"></i>
                </div>
                <div className="dashboard-activity-details">
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
