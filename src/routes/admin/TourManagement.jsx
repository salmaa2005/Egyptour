import React, { useState } from "react";
import "./AdminShared.css";
import { FiSearch, FiChevronDown, FiX } from "react-icons/fi";

const TourManagement = () => {
  // Mock tour data
  const [tours, setTours] = useState([
    {
      id: 1,
      name: "Pyramids Tour",
      category: "Guided Tours",
      price: "$150",
      duration: "1 day",
      bookings: 45,
      description: "Explore the ancient pyramids of Giza",
      maxGroupSize: 20,
      location: "Giza",
    },
    {
      id: 2,
      name: "Nile Cruise",
      category: "Nile Cruises",
      price: "$300",
      duration: "3 days",
      bookings: 28,
      description: "Luxury cruise on the Nile River",
      maxGroupSize: 50,
      location: "Luxor to Aswan",
    },
    {
      id: 3,
      name: "Desert Safari",
      category: "Desert Safaris",
      price: "$200",
      duration: "2 days",
      bookings: 32,
      description: "Adventure in the Egyptian desert",
      maxGroupSize: 15,
      location: "Western Desert",
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [isAddingTour, setIsAddingTour] = useState(false);
  const [isEditingTour, setIsEditingTour] = useState(false);
  const [editingTour, setEditingTour] = useState(null);
  const [newTour, setNewTour] = useState({
    name: "",
    category: "",
    price: "",
    duration: "",
    description: "",
    maxGroupSize: "",
    location: "",
  });
  const [isViewingTour, setIsViewingTour] = useState(false);
  const [viewingTour, setViewingTour] = useState(null);

  const categories = [
    "All",
    "Guided Tours",
    "Nile Cruises",
    "Desert Safaris",
    "Cultural Activities",
    "Red Sea Adventures",
  ];

  const filteredTours = tours.filter((tour) => {
    const matchesSearch = tour.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" || tour.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleAddTour = () => {
    if (
      !newTour.name ||
      !newTour.category ||
      !newTour.price ||
      !newTour.duration ||
      !newTour.description ||
      !newTour.maxGroupSize ||
      !newTour.location
    ) {
      alert("Please fill in all fields");
      return;
    }

    const tour = {
      id: tours.length + 1,
      ...newTour,
      bookings: 0,
    };

    setTours([...tours, tour]);
    setNewTour({
      name: "",
      category: "",
      price: "",
      duration: "",
      description: "",
      maxGroupSize: "",
      location: "",
    });
    setIsAddingTour(false);
  };

  const handleEditTour = (tour) => {
    setEditingTour({ ...tour });
    setIsEditingTour(true);
  };

  const handleUpdateTour = () => {
    if (
      !editingTour.name ||
      !editingTour.category ||
      !editingTour.price ||
      !editingTour.duration ||
      !editingTour.description ||
      !editingTour.maxGroupSize ||
      !editingTour.location
    ) {
      alert("Please fill in all fields");
      return;
    }

    setTours(
      tours.map((tour) => (tour.id === editingTour.id ? editingTour : tour))
    );
    setIsEditingTour(false);
    setEditingTour(null);
  };

  const handleDeleteTour = (id) => {
    if (window.confirm("Are you sure you want to delete this tour?")) {
      setTours(tours.filter((tour) => tour.id !== id));
    }
  };

  const handleViewTour = (tour) => {
    setViewingTour(tour);
    setIsViewingTour(true);
  };

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
            <div className="search-bar">
              <FiSearch className="search-icon" />
              <input
                type="text"
                placeholder="Search tours..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="admin-search-input"
              />
            </div>
            <div className="category-filter">
              <button className="category-toggle">
                {selectedCategory}
                <FiChevronDown className="chevron" />
              </button>
              <div className="category-menu">
                {categories.map((category) => (
                  <div
                    key={category}
                    className={`category-item ${
                      selectedCategory === category ? "active" : ""
                    }`}
                    onClick={() => setSelectedCategory(category)}
                  >
                    {category}
                  </div>
                ))}
              </div>
            </div>
          </div>
          <button
            className="admin-primary-btn"
            onClick={() => setIsAddingTour(true)}
          >
            <i className="fas fa-plus"></i>
            Add New Tour
          </button>
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
                      <button
                        className="admin-action-btn edit"
                        onClick={() => handleEditTour(tour)}
                      >
                        Edit
                      </button>
                      <button
                        className="admin-action-btn view"
                        onClick={() => handleViewTour(tour)}
                      >
                        View Details
                      </button>
                      <button
                        className="admin-action-btn delete"
                        onClick={() => handleDeleteTour(tour.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* View Tour Details Popup */}
        {isViewingTour && viewingTour && (
          <div className="admin-popup-overlay">
            <div className="admin-popup">
              <div className="admin-popup-header">
                <h2>Tour Details</h2>
                <button
                  className="close-button"
                  onClick={() => {
                    setIsViewingTour(false);
                    setViewingTour(null);
                  }}
                >
                  ×
                </button>
              </div>
              <div className="admin-popup-content">
                <div className="tour-details">
                  <div className="detail-group">
                    <label>Tour Name:</label>
                    <span>{viewingTour.name}</span>
                  </div>
                  <div className="detail-group">
                    <label>Category:</label>
                    <span>{viewingTour.category}</span>
                  </div>
                  <div className="detail-group">
                    <label>Price:</label>
                    <span>{viewingTour.price}</span>
                  </div>
                  <div className="detail-group">
                    <label>Duration:</label>
                    <span>{viewingTour.duration}</span>
                  </div>
                  <div className="detail-group">
                    <label>Location:</label>
                    <span>{viewingTour.location}</span>
                  </div>
                  <div className="detail-group">
                    <label>Max Group Size:</label>
                    <span>{viewingTour.maxGroupSize} people</span>
                  </div>
                  <div className="detail-group">
                    <label>Current Bookings:</label>
                    <span>{viewingTour.bookings} bookings</span>
                  </div>
                  <div className="detail-group full-width">
                    <label>Description:</label>
                    <p>{viewingTour.description}</p>
                  </div>
                </div>
                <div className="form-actions">
                  <button
                    className="admin-action-btn delete"
                    onClick={() => {
                      setIsViewingTour(false);
                      setViewingTour(null);
                    }}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Add Tour Popup */}
        {isAddingTour && (
          <div className="admin-popup-overlay">
            <div className="admin-popup">
              <div className="admin-popup-header">
                <h2>Add New Tour</h2>
                <button
                  className="close-button"
                  onClick={() => setIsAddingTour(false)}
                >
                  ×
                </button>
              </div>
              <div className="admin-popup-content">
                <div className="admin-form">
                  <div className="form-group">
                    <label>Tour Name</label>
                    <input
                      type="text"
                      value={newTour.name}
                      onChange={(e) =>
                        setNewTour({ ...newTour, name: e.target.value })
                      }
                    />
                  </div>
                  <div className="form-group">
                    <label>Category</label>
                    <select
                      value={newTour.category}
                      onChange={(e) =>
                        setNewTour({ ...newTour, category: e.target.value })
                      }
                    >
                      <option value="">Select a category</option>
                      {categories
                        .filter((cat) => cat !== "All")
                        .map((category) => (
                          <option key={category} value={category}>
                            {category}
                          </option>
                        ))}
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Price</label>
                    <input
                      type="text"
                      value={newTour.price}
                      onChange={(e) =>
                        setNewTour({ ...newTour, price: e.target.value })
                      }
                    />
                  </div>
                  <div className="form-group">
                    <label>Duration</label>
                    <input
                      type="text"
                      value={newTour.duration}
                      onChange={(e) =>
                        setNewTour({ ...newTour, duration: e.target.value })
                      }
                    />
                  </div>
                  <div className="form-group">
                    <label>Description</label>
                    <textarea
                      value={newTour.description}
                      onChange={(e) =>
                        setNewTour({ ...newTour, description: e.target.value })
                      }
                    />
                  </div>
                  <div className="form-group">
                    <label>Max Group Size</label>
                    <input
                      type="number"
                      value={newTour.maxGroupSize}
                      onChange={(e) =>
                        setNewTour({ ...newTour, maxGroupSize: e.target.value })
                      }
                    />
                  </div>
                  <div className="form-group">
                    <label>Location</label>
                    <input
                      type="text"
                      value={newTour.location}
                      onChange={(e) =>
                        setNewTour({ ...newTour, location: e.target.value })
                      }
                    />
                  </div>
                  <div className="form-actions">
                    <button
                      className="admin-primary-btn"
                      onClick={handleAddTour}
                    >
                      Add Tour
                    </button>
                    <button
                      className="cancel-booking"
                      onClick={() => setIsAddingTour(false)}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Edit Tour Popup */}
        {isEditingTour && editingTour && (
          <div className="admin-popup-overlay">
            <div className="admin-popup">
              <div className="admin-popup-header">
                <h2>Edit Tour</h2>
                <button
                  className="close-button"
                  onClick={() => {
                    setIsEditingTour(false);
                    setEditingTour(null);
                  }}
                >
                  ×
                </button>
              </div>
              <div className="admin-popup-content">
                <div className="admin-form">
                  <div className="form-group">
                    <label>Tour Name</label>
                    <input
                      type="text"
                      value={editingTour.name}
                      onChange={(e) =>
                        setEditingTour({ ...editingTour, name: e.target.value })
                      }
                    />
                  </div>
                  <div className="form-group">
                    <label>Category</label>
                    <select
                      value={editingTour.category}
                      onChange={(e) =>
                        setEditingTour({
                          ...editingTour,
                          category: e.target.value,
                        })
                      }
                    >
                      <option value="">Select a category</option>
                      {categories
                        .filter((cat) => cat !== "All")
                        .map((category) => (
                          <option key={category} value={category}>
                            {category}
                          </option>
                        ))}
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Price</label>
                    <input
                      type="text"
                      value={editingTour.price}
                      onChange={(e) =>
                        setEditingTour({
                          ...editingTour,
                          price: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="form-group">
                    <label>Duration</label>
                    <input
                      type="text"
                      value={editingTour.duration}
                      onChange={(e) =>
                        setEditingTour({
                          ...editingTour,
                          duration: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="form-group">
                    <label>Description</label>
                    <textarea
                      value={editingTour.description}
                      onChange={(e) =>
                        setEditingTour({
                          ...editingTour,
                          description: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="form-group">
                    <label>Max Group Size</label>
                    <input
                      type="number"
                      value={editingTour.maxGroupSize}
                      onChange={(e) =>
                        setEditingTour({
                          ...editingTour,
                          maxGroupSize: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="form-group">
                    <label>Location</label>
                    <input
                      type="text"
                      value={editingTour.location}
                      onChange={(e) =>
                        setEditingTour({
                          ...editingTour,
                          location: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="form-actions">
                    <button
                      className="admin-primary-btn"
                      onClick={handleUpdateTour}
                    >
                      Update Tour
                    </button>
                    <button
                      className="cancel-booking"
                      onClick={() => {
                        setIsEditingTour(false);
                        setEditingTour(null);
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

export default TourManagement;
