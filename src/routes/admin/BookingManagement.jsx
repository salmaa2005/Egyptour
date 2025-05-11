import React, { useState, useEffect } from "react";
import "./AdminShared.css";
import { FiSearch, FiChevronDown, FiX } from "react-icons/fi";

const BookingManagement = () => {
  // Initialize bookings from localStorage
  const [bookings, setBookings] = useState(() => {
    const savedBookings = localStorage.getItem("bookings");
    return savedBookings ? JSON.parse(savedBookings) : [];
  });

  // Update localStorage whenever bookings change
  useEffect(() => {
    localStorage.setItem("bookings", JSON.stringify(bookings));
  }, [bookings]);

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
    phone: "",
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
    const newBookingWithId = {
      ...newBooking,
      id: Date.now(),
      amount: `$${newBooking.amount}`,
    };
    setBookings([...bookings, newBookingWithId]);
    setNewBooking({
      customerName: "",
      customerEmail: "",
      tourName: "",
      date: "",
      amount: "",
      paymentStatus: "Pending",
      numberOfPeople: "",
      specialRequests: "",
      phone: "",
    });
    setIsAddingBooking(false);
  };

  const handleEditBooking = () => {
    const updatedBookings = bookings.map((booking) =>
      booking.id === editingBooking.id
        ? {
            ...editingBooking,
            amount: `$${editingBooking.amount}`,
          }
        : booking
    );
    setBookings(updatedBookings);
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
                <th>Customer Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Tour</th>
                <th>Date</th>
                <th>Amount</th>
                <th>Status</th>
                <th>People</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredBookings.map((booking) => (
                <tr key={booking.id}>
                  <td>{booking.customerName}</td>
                  <td>{booking.customerEmail}</td>
                  <td>{booking.phone}</td>
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
                  <td>{booking.numberOfPeople}</td>
                  <td>
                    <div className="admin-actions">
                      <button
                        className="admin-action-btn edit"
                        onClick={() => {
                          setEditingBooking(booking);
                          setIsEditingBooking(true);
                        }}
                      >
                        Edit
                      </button>
                      <button
                        className="admin-action-btn delete"
                        onClick={() => handleDeleteBooking(booking.id)}
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

        {/* Add/Edit Booking Popup */}
        {(isAddingBooking || isEditingBooking) && (
          <div className="admin-popup-overlay">
            <div className="admin-popup">
              <div className="admin-popup-header">
                <h2>{isAddingBooking ? "Add New Booking" : "Edit Booking"}</h2>
                <button
                  className="admin-close-btn"
                  onClick={() => {
                    setIsAddingBooking(false);
                    setIsEditingBooking(false);
                    setEditingBooking(null);
                  }}
                >
                  <FiX />
                </button>
              </div>
              <div className="admin-popup-content">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    isAddingBooking ? handleAddBooking() : handleEditBooking();
                  }}
                >
                  <div className="form-group">
                    <label>Customer Name *</label>
                    <input
                      type="text"
                      value={
                        isAddingBooking
                          ? newBooking.customerName
                          : editingBooking.customerName
                      }
                      onChange={(e) =>
                        isAddingBooking
                          ? setNewBooking({
                              ...newBooking,
                              customerName: e.target.value,
                            })
                          : setEditingBooking({
                              ...editingBooking,
                              customerName: e.target.value,
                            })
                      }
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Customer Email *</label>
                    <input
                      type="email"
                      value={
                        isAddingBooking
                          ? newBooking.customerEmail
                          : editingBooking.customerEmail
                      }
                      onChange={(e) =>
                        isAddingBooking
                          ? setNewBooking({
                              ...newBooking,
                              customerEmail: e.target.value,
                            })
                          : setEditingBooking({
                              ...editingBooking,
                              customerEmail: e.target.value,
                            })
                      }
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Phone Number *</label>
                    <input
                      type="tel"
                      value={
                        isAddingBooking
                          ? newBooking.phone
                          : editingBooking.phone
                      }
                      onChange={(e) =>
                        isAddingBooking
                          ? setNewBooking({
                              ...newBooking,
                              phone: e.target.value,
                            })
                          : setEditingBooking({
                              ...editingBooking,
                              phone: e.target.value,
                            })
                      }
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Tour Name *</label>
                    <select
                      value={
                        isAddingBooking
                          ? newBooking.tourName
                          : editingBooking.tourName
                      }
                      onChange={(e) =>
                        isAddingBooking
                          ? setNewBooking({
                              ...newBooking,
                              tourName: e.target.value,
                            })
                          : setEditingBooking({
                              ...editingBooking,
                              tourName: e.target.value,
                            })
                      }
                      required
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
                    <label>Date *</label>
                    <input
                      type="date"
                      value={
                        isAddingBooking ? newBooking.date : editingBooking.date
                      }
                      onChange={(e) =>
                        isAddingBooking
                          ? setNewBooking({
                              ...newBooking,
                              date: e.target.value,
                            })
                          : setEditingBooking({
                              ...editingBooking,
                              date: e.target.value,
                            })
                      }
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Number of People *</label>
                    <input
                      type="number"
                      min="1"
                      value={
                        isAddingBooking
                          ? newBooking.numberOfPeople
                          : editingBooking.numberOfPeople
                      }
                      onChange={(e) =>
                        isAddingBooking
                          ? setNewBooking({
                              ...newBooking,
                              numberOfPeople: e.target.value,
                            })
                          : setEditingBooking({
                              ...editingBooking,
                              numberOfPeople: e.target.value,
                            })
                      }
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Amount per Person *</label>
                    <input
                      type="number"
                      min="0"
                      value={
                        isAddingBooking
                          ? newBooking.amount
                          : editingBooking.amount
                      }
                      onChange={(e) =>
                        isAddingBooking
                          ? setNewBooking({
                              ...newBooking,
                              amount: e.target.value,
                            })
                          : setEditingBooking({
                              ...editingBooking,
                              amount: e.target.value,
                            })
                      }
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Payment Status</label>
                    <select
                      value={
                        isAddingBooking
                          ? newBooking.paymentStatus
                          : editingBooking.paymentStatus
                      }
                      onChange={(e) =>
                        isAddingBooking
                          ? setNewBooking({
                              ...newBooking,
                              paymentStatus: e.target.value,
                            })
                          : setEditingBooking({
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
                    <label>Special Requests</label>
                    <textarea
                      value={
                        isAddingBooking
                          ? newBooking.specialRequests
                          : editingBooking.specialRequests
                      }
                      onChange={(e) =>
                        isAddingBooking
                          ? setNewBooking({
                              ...newBooking,
                              specialRequests: e.target.value,
                            })
                          : setEditingBooking({
                              ...editingBooking,
                              specialRequests: e.target.value,
                            })
                      }
                      rows="3"
                    />
                  </div>
                  <div className="admin-popup-actions">
                    <button
                      type="button"
                      className="admin-secondary-btn"
                      onClick={() => {
                        setIsAddingBooking(false);
                        setIsEditingBooking(false);
                        setEditingBooking(null);
                      }}
                    >
                      Cancel
                    </button>
                    <button type="submit" className="admin-primary-btn">
                      {isAddingBooking ? "Add Booking" : "Update Booking"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingManagement;
