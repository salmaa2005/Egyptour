import React, { useState } from "react";
import "./AdminShared.css";

const UserManagement = () => {
  // Mock user data
  const [users] = useState([
    { id: 1, name: "John Doe", email: "john@example.com", role: "Customer" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", role: "Customer" },
    { id: 3, name: "Admin User", email: "admin@example.com", role: "Admin" },
  ]);

  const [searchTerm, setSearchTerm] = useState("");

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="page-container">
      <div className="admin-headline-container">
        <h1 className="admin-main-headline">User Management</h1>
        <p className="admin-sub-headline">
          Manage user accounts and permissions
        </p>
      </div>

      <div className="admin-content">
        <div className="admin-actions-bar">
          <div className="search-container">
            <input
              type="text"
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="admin-search-input"
            />
          </div>
          <button className="admin-primary-btn">Add New User</button>
        </div>

        <div className="admin-table-container">
          <table className="admin-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
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
                    <div className="action-buttons">
                      <button className="admin-action-btn edit">Edit</button>
                      <button className="admin-action-btn delete">
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
