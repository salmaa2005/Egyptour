import React, { useState } from "react";
import "./AdminShared.css";

const TourManagement = () => {
  // Mock tour data
  const [tours] = useState([
    {
      id: 1,
      name: "Pyramids Tour",
      category: "Guided Tours",
      price: "$150",
      duration: "1 day",
      bookings: 45,
    },
    {
      id: 2,
      name: "Nile Cruise",
      category: "Nile Cruises",
      price: "$300",
      duration: "3 days",
      bookings: 28,
    },
    {
      id: 3,
      name: "Desert Safari",
      category: "Desert Safaris",
      price: "$200",
      duration: "2 days",
      bookings: 32,
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredTours = tours.filter((tour) => {
    const matchesSearch = tour.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" || tour.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="page-container">
      <div className="admin-headline-container">
        <h1 className="admin-main-headline">Tour Management</h1>
        <p className="admin-sub-headline">
          Manage your tour packages and availability
        </p>
      </div>

      <div className="admin-content">
        <div className="admin-actions-bar">
          <div className="search-container">
            <input
              type="text"
              placeholder="Search tours..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="admin-search-input"
            />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="admin-select"
            >
              <option value="All">All Categories</option>
              <option value="Guided Tours">Guided Tours</option>
              <option value="Nile Cruises">Nile Cruises</option>
              <option value="Desert Safaris">Desert Safaris</option>
              <option value="Cultural Activities">Cultural Activities</option>
              <option value="Red Sea Adventures">Red Sea Adventures</option>
            </select>
          </div>
          <button className="admin-primary-btn">Add New Tour</button>
        </div>

        <div className="admin-table-container">
          <table className="admin-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Tour Name</th>
                <th>Category</th>
                <th>Price</th>
                <th>Duration</th>
                <th>Bookings</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredTours.map((tour) => (
                <tr key={tour.id}>
                  <td>{tour.id}</td>
                  <td>{tour.name}</td>
                  <td>{tour.category}</td>
                  <td>{tour.price}</td>
                  <td>{tour.duration}</td>
                  <td>{tour.bookings}</td>
                  <td>
                    <div className="action-buttons">
                      <button className="admin-action-btn edit">Edit</button>
                      <button className="admin-action-btn view">
                        View Details
                      </button>
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

export default TourManagement;
