import React, { useState } from "react";
import "./AdminShared.css";
import { FiSearch, FiChevronDown, FiX } from "react-icons/fi";

const BookingManagement = () => {
  // Mock booking data
  const [bookings, setBookings] = useState([
    {
      id: 1,
      customerName: "John Doe",
      customerEmail: "john@example.com",
      tourName: "Pyramids Tour",
      date: "2024-03-15",
      amount: "$150",
      paymentStatus: "Paid",
      numberOfPeople: 2,
      specialRequests: "None",
    },
    {
      id: 2,
      customerName: "Jane Smith",
      customerEmail: "jane@example.com",
      tourName: "Nile Cruise",
      date: "2024-03-20",
      amount: "$300",
      paymentStatus: "Pending",
      numberOfPeople: 4,
      specialRequests: "Vegetarian meals",
    },
    {
      id: 3,
      customerName: "Mike Johnson",
      customerEmail: "mike@example.com",
      tourName: "Desert Safari",
      date: "2024-03-25",
      amount: "$200",
      paymentStatus: "Paid",
      numberOfPeople: 3,
      specialRequests: "None",
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [isAddingBooking, setIsAddingBooking] = useState(false);
  const [isEditingBooking, setIsEditingBooking] = useState(false);
  const [editingBooking, setEditingBooking] = useState(null);
  const [newBooking, setNewBooking] = useState({
    customerName: "",
    customerEmail: "",
    tourName: "",
    date: "",
    amount: "",
    paymentStatus: "Pending",
    numberOfPeople: "",
    specialRequests: "",
  });

  const statuses = ["All", "Paid", "Pending", "Cancelled"];
  const availableTours = ["Pyramids Tour", "Nile Cruise", "Desert Safari"];

  const filteredBookings = bookings.filter((booking) => {
    const matchesSearch =
      booking.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.tourName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.customerEmail.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "All" || booking.paymentStatus === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleAddBooking = () => {
    if (
      !newBooking.customerName ||
      !newBooking.customerEmail ||
      !newBooking.tourName ||
      !newBooking.date ||
      !newBooking.amount ||
      !newBooking.numberOfPeople
    ) {
      alert("Please fill in all required fields");
      return;
    }

    const booking = {
      id: bookings.length + 1,
      ...newBooking,
    };

    setBookings([...bookings, booking]);
    setNewBooking({
      customerName: "",
      customerEmail: "",
      tourName: "",
      date: "",
      amount: "",
      paymentStatus: "Pending",
      numberOfPeople: "",
      specialRequests: "",
    });
    setIsAddingBooking(false);
  };

  const handleEditBooking = (booking) => {
    setEditingBooking({ ...booking });
    setIsEditingBooking(true);
  };

  const handleUpdateBooking = () => {
    if (
      !editingBooking.customerName ||
      !editingBooking.customerEmail ||
      !editingBooking.tourName ||
      !editingBooking.date ||
      !editingBooking.amount ||
      !editingBooking.numberOfPeople
    ) {
      alert("Please fill in all required fields");
      return;
    }

    setBookings(
      bookings.map((booking) =>
        booking.id === editingBooking.id ? editingBooking : booking
      )
    );
    setIsEditingBooking(false);
    setEditingBooking(null);
  };

  const handleDeleteBooking = (id) => {
    if (window.confirm("Are you sure you want to cancel this booking?")) {
      setBookings(bookings.filter((booking) => booking.id !== id));
    }
  };

  return (
    <div className="page-container">
      <div className="admin-headline-container">
        <h1 className="admin-main-headline">Booking Management</h1>
        <p className="admin-sub-headline">Manage and track all tour bookings</p>
      </div>

      <div className="admin-content">
        <div className="admin-actions-bar">
          <div className="search-container">
            <div className="search-bar">
              <FiSearch className="search-icon" />
              <input
                type="text"
                placeholder="Search bookings..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="admin-search-input"
              />
            </div>
            <div className="category-filter">
              <button className="category-toggle">
                {statusFilter}
                <FiChevronDown className="chevron" />
              </button>
              <div className="category-menu">
                {statuses.map((status) => (
                  <div
                    key={status}
                    className={`category-item ${
                      statusFilter === status ? "active" : ""
                    }`}
                    onClick={() => setStatusFilter(status)}
                  >
                    {status}
                  </div>
                ))}
              </div>
            </div>
          </div>
          <button
            className="admin-primary-btn"
            onClick={() => setIsAddingBooking(true)}
          >
            <i className="fas fa-plus"></i>
            Add New Booking
          </button>
        </div>

        <div className="admin-table-container">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Booking ID</th>
                <th>Customer</th>
                <th>Tour</th>
                <th>Date</th>
                <th>Amount</th>
                <th>Payment</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredBookings.map((booking) => (
                <tr key={booking.id}>
                  <td>#{booking.id}</td>
                  <td>{booking.customerName}</td>
                  <td>{booking.tourName}</td>
                  <td>{booking.date}</td>
                  <td>{booking.amount}</td>
                  <td>
                    <span
                      className={`status-badge ${booking.paymentStatus.toLowerCase()}`}
                    >
                      {booking.paymentStatus}
                    </span>
                  </td>
                  <td>
                    <div className="action-buttons">
                      <button
                        className="admin-action-btn edit"
                        onClick={() => handleEditBooking(booking)}
                      >
                        Edit
                      </button>
                      <button
                        className="admin-action-btn delete"
                        onClick={() => handleDeleteBooking(booking.id)}
                      >
                        Cancel
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Add Booking Popup */}
        {isAddingBooking && (
          <div className="admin-popup-overlay">
            <div className="admin-popup">
              <div className="admin-popup-header">
                <h2>Add New Booking</h2>
                <button
                  className="admin-popup-close"
                  onClick={() => setIsAddingBooking(false)}
                >
                  <FiX />
                </button>
              </div>
              <div className="admin-popup-content">
                <div className="admin-form">
                  <div className="form-group">
                    <label>Customer Name</label>
                    <input
                      type="text"
                      value={newBooking.customerName}
                      onChange={(e) =>
                        setNewBooking({
                          ...newBooking,
                          customerName: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="form-group">
                    <label>Customer Email</label>
                    <input
                      type="email"
                      value={newBooking.customerEmail}
                      onChange={(e) =>
                        setNewBooking({
                          ...newBooking,
                          customerEmail: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="form-group">
                    <label>Tour</label>
                    <select
                      value={newBooking.tourName}
                      onChange={(e) =>
                        setNewBooking({
                          ...newBooking,
                          tourName: e.target.value,
                        })
                      }
                    >
                      <option value="">Select a tour</option>
                      {availableTours.map((tour) => (
                        <option key={tour} value={tour}>
                          {tour}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Date</label>
                    <input
                      type="date"
                      value={newBooking.date}
                      onChange={(e) =>
                        setNewBooking({ ...newBooking, date: e.target.value })
                      }
                    />
                  </div>
                  <div className="form-group">
                    <label>Amount</label>
                    <input
                      type="text"
                      value={newBooking.amount}
                      onChange={(e) =>
                        setNewBooking({ ...newBooking, amount: e.target.value })
                      }
                    />
                  </div>
                  <div className="form-group">
                    <label>Payment Status</label>
                    <select
                      value={newBooking.paymentStatus}
                      onChange={(e) =>
                        setNewBooking({
                          ...newBooking,
                          paymentStatus: e.target.value,
                        })
                      }
                    >
                      {statuses
                        .filter((status) => status !== "All")
                        .map((status) => (
                          <option key={status} value={status}>
                            {status}
                          </option>
                        ))}
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Number of People</label>
                    <input
                      type="number"
                      value={newBooking.numberOfPeople}
                      onChange={(e) =>
                        setNewBooking({
                          ...newBooking,
                          numberOfPeople: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="form-group">
                    <label>Special Requests</label>
                    <textarea
                      value={newBooking.specialRequests}
                      onChange={(e) =>
                        setNewBooking({
                          ...newBooking,
                          specialRequests: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="form-actions">
                    <button
                      className="admin-primary-btn"
                      onClick={handleAddBooking}
                    >
                      Add Booking
                    </button>
                    <button
                      className="admin-action-btn delete"
                      onClick={() => setIsAddingBooking(false)}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Edit Booking Popup */}
        {isEditingBooking && editingBooking && (
          <div className="admin-popup-overlay">
            <div className="admin-popup">
              <div className="admin-popup-header">
                <h2>Edit Booking</h2>
                <button
                  className="admin-popup-close"
                  onClick={() => {
                    setIsEditingBooking(false);
                    setEditingBooking(null);
                  }}
                >
                  <FiX />
                </button>
              </div>
              <div className="admin-popup-content">
                <div className="admin-form">
                  <div className="form-group">
                    <label>Customer Name</label>
                    <input
                      type="text"
                      value={editingBooking.customerName}
                      onChange={(e) =>
                        setEditingBooking({
                          ...editingBooking,
                          customerName: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="form-group">
                    <label>Customer Email</label>
                    <input
                      type="email"
                      value={editingBooking.customerEmail}
                      onChange={(e) =>
                        setEditingBooking({
                          ...editingBooking,
                          customerEmail: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="form-group">
                    <label>Tour</label>
                    <select
                      value={editingBooking.tourName}
                      onChange={(e) =>
                        setEditingBooking({
                          ...editingBooking,
                          tourName: e.target.value,
                        })
                      }
                    >
                      <option value="">Select a tour</option>
                      {availableTours.map((tour) => (
                        <option key={tour} value={tour}>
                          {tour}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Date</label>
                    <input
                      type="date"
                      value={editingBooking.date}
                      onChange={(e) =>
                        setEditingBooking({
                          ...editingBooking,
                          date: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="form-group">
                    <label>Amount</label>
                    <input
                      type="text"
                      value={editingBooking.amount}
                      onChange={(e) =>
                        setEditingBooking({
                          ...editingBooking,
                          amount: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="form-group">
                    <label>Payment Status</label>
                    <select
                      value={editingBooking.paymentStatus}
                      onChange={(e) =>
                        setEditingBooking({
                          ...editingBooking,
                          paymentStatus: e.target.value,
                        })
                      }
                    >
                      {statuses
                        .filter((status) => status !== "All")
                        .map((status) => (
                          <option key={status} value={status}>
                            {status}
                          </option>
                        ))}
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Number of People</label>
                    <input
                      type="number"
                      value={editingBooking.numberOfPeople}
                      onChange={(e) =>
                        setEditingBooking({
                          ...editingBooking,
                          numberOfPeople: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="form-group">
                    <label>Special Requests</label>
                    <textarea
                      value={editingBooking.specialRequests}
                      onChange={(e) =>
                        setEditingBooking({
                          ...editingBooking,
                          specialRequests: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="form-actions">
                    <button
                      className="admin-primary-btn"
                      onClick={handleUpdateBooking}
                    >
                      Update Booking
                    </button>
                    <button
                      className="admin-action-btn delete"
                      onClick={() => {
                        setIsEditingBooking(false);
                        setEditingBooking(null);
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

export default BookingManagement;
