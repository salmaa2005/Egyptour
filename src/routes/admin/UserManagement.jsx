import React, { useState } from "react";
import "./UserManagement.css";

const UserManagement = () => {
  // Mock user data
  const [users, setUsers] = useState([
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
  const [isAddingUser, setIsAddingUser] = useState(false);
  const [isEditingUser, setIsEditingUser] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    role: "Customer",
    status: "Active",
  });

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEditUser = (user) => {
    setEditingUser({ ...user });
    setIsEditingUser(true);
  };

  const handleUpdateUser = () => {
    if (!editingUser.name || !editingUser.email) {
      alert("Please fill in all required fields");
      return;
    }

    setUsers(
      users.map((user) => (user.id === editingUser.id ? editingUser : user))
    );
    setIsEditingUser(false);
    setEditingUser(null);
  };

  const handleDeleteUser = (userId) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      setUsers(users.filter((user) => user.id !== userId));
    }
  };

  const handleAddUser = () => {
    if (!newUser.name || !newUser.email) {
      alert("Please fill in all required fields");
      return;
    }

    const newUserWithId = {
      ...newUser,
      id: users.length + 1,
    };

    setUsers([...users, newUserWithId]);
    setNewUser({
      name: "",
      email: "",
      role: "Customer",
      status: "Active",
    });
    setIsAddingUser(false);
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
          <button
            className="user-primary-btn"
            onClick={() => setIsAddingUser(true)}
          >
            <i className="fas fa-plus"></i>
            Add New User
          </button>
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

        {/* Add User Popup */}
        {isAddingUser && (
          <div className="admin-popup-overlay">
            <div className="admin-popup">
              <div className="admin-popup-header">
                <h2>Add New User</h2>
                <button
                  className="close-button"
                  onClick={() => setIsAddingUser(false)}
                >
                  ×
                </button>
              </div>
              <div className="admin-popup-content">
                <div className="admin-form">
                  <div className="form-group">
                    <label>Name *</label>
                    <input
                      type="text"
                      value={newUser.name}
                      onChange={(e) =>
                        setNewUser({ ...newUser, name: e.target.value })
                      }
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Email *</label>
                    <input
                      type="email"
                      value={newUser.email}
                      onChange={(e) =>
                        setNewUser({ ...newUser, email: e.target.value })
                      }
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Role</label>
                    <select
                      value={newUser.role}
                      onChange={(e) =>
                        setNewUser({ ...newUser, role: e.target.value })
                      }
                    >
                      <option value="Customer">Customer</option>
                      <option value="Admin">Admin</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Status</label>
                    <select
                      value={newUser.status}
                      onChange={(e) =>
                        setNewUser({ ...newUser, status: e.target.value })
                      }
                    >
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                    </select>
                  </div>
                  <div className="form-actions">
                    <button
                      className="admin-primary-btn"
                      onClick={handleAddUser}
                    >
                      Add User
                    </button>
                    <button
                      className="cancel-booking"
                      onClick={() => setIsAddingUser(false)}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Edit User Popup */}
        {isEditingUser && editingUser && (
          <div className="admin-popup-overlay">
            <div className="admin-popup">
              <div className="admin-popup-header">
                <h2>Edit User</h2>
                <button
                  className="close-button"
                  onClick={() => {
                    setIsEditingUser(false);
                    setEditingUser(null);
                  }}
                >
                  ×
                </button>
              </div>
              <div className="admin-popup-content">
                <div className="admin-form">
                  <div className="form-group">
                    <label>Name *</label>
                    <input
                      type="text"
                      value={editingUser.name}
                      onChange={(e) =>
                        setEditingUser({
                          ...editingUser,
                          name: e.target.value,
                        })
                      }
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Email *</label>
                    <input
                      type="email"
                      value={editingUser.email}
                      onChange={(e) =>
                        setEditingUser({
                          ...editingUser,
                          email: e.target.value,
                        })
                      }
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Role</label>
                    <select
                      value={editingUser.role}
                      onChange={(e) =>
                        setEditingUser({
                          ...editingUser,
                          role: e.target.value,
                        })
                      }
                    >
                      <option value="Customer">Customer</option>
                      <option value="Admin">Admin</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Status</label>
                    <select
                      value={editingUser.status}
                      onChange={(e) =>
                        setEditingUser({
                          ...editingUser,
                          status: e.target.value,
                        })
                      }
                    >
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                    </select>
                  </div>
                  <div className="form-actions">
                    <button
                      className="admin-primary-btn"
                      onClick={handleUpdateUser}
                    >
                      Update User
                    </button>
                    <button
                      className="cancel-booking"
                      onClick={() => {
                        setIsEditingUser(false);
                        setEditingUser(null);
                      }}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserManagement;
