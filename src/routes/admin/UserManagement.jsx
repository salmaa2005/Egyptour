import React, { useState } from "react";
import "./UserManagement.css";

const UserManagement = () => {
  // Mock user data
  const [users] = useState([
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      role: "Customer",
      status: "Active",
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane@example.com",
      role: "Customer",
      status: "Inactive",
    },
    {
      id: 3,
      name: "Admin User",
      email: "admin@example.com",
      role: "Admin",
      status: "Active",
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEditUser = (user) => {
    // Implement edit logic or show a modal
    alert(`Edit user: ${user.name}`);
  };

  const handleDeleteUser = (userId) => {
    // Implement delete logic
    alert(`Delete user with ID: ${userId}`);
  };

  return (
    <div className="user-page-container">
      <div className="user-headline-container">
        <h1 className="user-main-headline">User Management</h1>
        <p className="user-sub-headline">Manage and monitor user accounts</p>
      </div>

      <div className="user-content">
        <div className="user-actions-bar">
          <div className="user-search-container">
            <input
              type="text"
              className="user-search-input"
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button className="user-primary-btn">Add New User</button>
        </div>

        <div className="user-table-container">
          <table className="user-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                  <td>
                    <span
                      className={`status-badge ${
                        user.status ? user.status.toLowerCase() : ""
                      }`}
                    >
                      {user.status || "Unknown"}
                    </span>
                  </td>
                  <td>
                    <div className="user-action-buttons">
                      <button
                        className="user-action-btn edit"
                        onClick={() => handleEditUser(user)}
                      >
                        <i className="fas fa-edit"></i>
                        Edit
                      </button>
                      <button
                        className="user-action-btn delete"
                        onClick={() => handleDeleteUser(user.id)}
                      >
                        <i className="fas fa-trash"></i>
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UserManagement;
