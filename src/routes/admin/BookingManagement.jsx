import React, { useState } from "react";
import "./AdminShared.css";

const BookingManagement = () => {
  // Mock booking data
  const [bookings] = useState([
    {
      id: 1,
      customerName: "John Doe",
      tourName: "Pyramids Tour",
      date: "2024-03-15",
      amount: "$150",
      paymentStatus: "Paid",
    },
    {
      id: 2,
      customerName: "Jane Smith",
      tourName: "Nile Cruise",
      date: "2024-03-20",
      amount: "$300",
      paymentStatus: "Pending",
    },
    {
      id: 3,
      customerName: "Mike Johnson",
      tourName: "Desert Safari",
      date: "2024-03-25",
      amount: "$200",
      paymentStatus: "Paid",
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const filteredBookings = bookings.filter((booking) => {
    const matchesSearch =
      booking.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.tourName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "All" || booking.paymentStatus === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="page-container">
      <div className="admin-headline-container">
        <h1 className="admin-main-headline">Booking Management</h1>
        <p className="admin-sub-headline">Manage and track all tour bookings</p>
      </div>

      <div className="admin-content">
        <div className="admin-actions-bar">
          <div className="search-container">
            <input
              type="text"
              placeholder="Search bookings..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="admin-search-input"
            />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="admin-select"
            >
              <option value="All">All Status</option>
              <option value="Paid">Paid</option>
              <option value="Pending">Pending</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>
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
                      <button className="admin-action-btn view">
                        View Details
                      </button>
                      <button className="admin-action-btn edit">Edit</button>
                      <button className="admin-action-btn delete">
                        Cancel
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

export default BookingManagement;
