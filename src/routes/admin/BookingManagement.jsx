import React, { useState, useEffect, useRef } from "react";
import "./BookingManagement.css";
import { FiSearch, FiChevronDown, FiX } from "react-icons/fi";

// Define static data outside the component
const initialBookings = [
  {
    id: 1,
    customerName: "John Smith",
    customerEmail: "john.smith@email.com",
    phone: "+1 (555) 123-4567",
    category: "Guided Tours",
    tourName: "Pyramids Tour",
    date: "2024-03-15",
    amount: "$150",
    paymentStatus: "Paid",
    numberOfPeople: "2",
    specialRequests: "Early morning tour preferred",
  },
  {
    id: 2,
    customerName: "Maria Garcia",
    customerEmail: "maria.g@email.com",
    phone: "+1 (555) 987-6543",
    category: "Nile Cruises",
    tourName: "Luxor to Aswan Cruise",
    date: "2024-03-20",
    amount: "$450",
    paymentStatus: "Pending",
    numberOfPeople: "4",
    specialRequests: "Vegetarian meal options",
  },
  {
    id: 3,
    customerName: "Ahmed Hassan",
    customerEmail: "ahmed.h@email.com",
    phone: "+20 123 456 7890",
    category: "Desert Safaris",
    tourName: "White Desert Tour",
    date: "2024-03-25",
    amount: "$200",
    paymentStatus: "Confirmed",
    numberOfPeople: "3",
    specialRequests: "Private guide requested",
  },
  {
    id: 4,
    customerName: "Sarah Johnson",
    customerEmail: "sarah.j@email.com",
    phone: "+1 (555) 234-5678",
    category: "Cultural Activities",
    tourName: "Traditional Cooking Class",
    date: "2024-03-18",
    amount: "$75",
    paymentStatus: "Paid",
    numberOfPeople: "2",
    specialRequests: "Allergic to nuts",
  },
  {
    id: 5,
    customerName: "Mohammed Ali",
    customerEmail: "m.ali@email.com",
    phone: "+20 987 654 3210",
    category: "Red Sea Adventures",
    tourName: "Hurghada Diving",
    date: "2024-03-22",
    amount: "$180",
    paymentStatus: "Pending",
    numberOfPeople: "1",
    specialRequests: "Advanced diving certification",
  },
];

const BookingManagement = () => {
  // Initialize with static data
  const [bookings, setBookings] = useState(initialBookings);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
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
    category: "",
  });

  // Update localStorage whenever bookings change
  useEffect(() => {
    localStorage.setItem("bookings", JSON.stringify(bookings));
  }, [bookings]);

  const statuses = ["All", "Paid", "Pending", "Cancelled"];

  // Define service categories and their tours
  const serviceCategories = {
    "Guided Tours": [
      "Pyramids Tour",
      "Luxor Temple Tour",
      "Egyptian Museum Tour",
    ],
    "Nile Cruises": [
      "Luxor to Aswan Cruise",
      "Cairo to Luxor Cruise",
      "Nile River Day Cruise",
    ],
    "Desert Safaris": [
      "Western Desert Safari",
      "White Desert Tour",
      "Siwa Oasis Safari",
    ],
    "Cultural Activities": [
      "Traditional Cooking Class",
      "Egyptian Dance Workshop",
      "Local Market Tour",
    ],
    "Red Sea Adventures": [
      "Hurghada Diving",
      "Sharm El Sheikh Snorkeling",
      "Red Sea Boat Tour",
    ],
  };

  const filteredBookings = bookings.filter((booking) => {
    const matchesSearch =
      booking.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.tourName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.customerEmail.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      categoryFilter === "All" || booking.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  console.log("Filtered bookings:", filteredBookings);

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
      category: "",
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

  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const categoryMenuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        categoryMenuRef.current &&
        !categoryMenuRef.current.contains(event.target)
      ) {
        setIsCategoryOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleCategoryMenu = () => {
    setIsCategoryOpen(!isCategoryOpen);
  };

  const handleCategorySelect = (category) => {
    setCategoryFilter(category);
    setIsCategoryOpen(false);
  };

  return (
    <div className="booking-page-container">
      <div className="booking-headline-container">
        <h1 className="booking-main-headline">Booking Management</h1>
        <p className="booking-sub-headline">Manage and monitor tour bookings</p>
      </div>

      <div className="booking-content">
        <div className="booking-actions-bar">
          <div className="booking-search-container">
            <input
              type="text"
              className="booking-search-input"
              placeholder="Search bookings..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button
            className="booking-primary-btn"
            onClick={() => setIsAddingBooking(true)}
          >
            <i className="fas fa-plus"></i>
            Add New Booking
          </button>
        </div>

        <div className="booking-table-container">
          <table className="booking-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Customer</th>
                <th>Tour</th>
                <th>Date</th>
                <th>Guests</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredBookings.map((booking) => (
                <tr key={booking.id}>
                  <td>{booking.id}</td>
                  <td>{booking.customerName}</td>
                  <td>{booking.tourName}</td>
                  <td>
                    <span className="booking-date-tag">{booking.date}</span>
                  </td>
                  <td>{booking.numberOfPeople}</td>
                  <td>
                    <span className="booking-amount-tag">
                      ${booking.amount}
                    </span>
                  </td>
                  <td>
                    <span
                      className={`booking-status-badge ${booking.paymentStatus.toLowerCase()}`}
                    >
                      {booking.paymentStatus}
                    </span>
                  </td>
                  <td>
                    <div className="booking-action-buttons">
                      <button
                        className="booking-action-btn view"
                        onClick={() => {
                          setEditingBooking(booking);
                          setIsEditingBooking(true);
                        }}
                      >
                        <i className="fas fa-eye"></i>
                        View
                      </button>
                      <button
                        className="booking-action-btn edit"
                        onClick={() => {
                          setEditingBooking(booking);
                          setIsEditingBooking(true);
                        }}
                      >
                        <i className="fas fa-edit"></i>
                        Edit
                      </button>
                      <button
                        className="booking-action-btn delete"
                        onClick={() => handleDeleteBooking(booking.id)}
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

        {/* Add/Edit Booking Popup */}
        {(isAddingBooking || isEditingBooking) && (
          <div className="admin-popup-overlay">
            <div className="admin-popup">
              <div className="admin-popup-header">
                <h2>{isAddingBooking ? "Add New Booking" : "Edit Booking"}</h2>
                <button
                  className="close-button"
                  onClick={() => {
                    setIsAddingBooking(false);
                    setIsEditingBooking(false);
                    setEditingBooking(null);
                  }}
                >
                  ×
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
                    <label>Service Category *</label>
                    <select
                      value={
                        isAddingBooking
                          ? newBooking.category
                          : editingBooking.category
                      }
                      onChange={(e) => {
                        const category = e.target.value;
                        if (isAddingBooking) {
                          setNewBooking({
                            ...newBooking,
                            category,
                            tourName: "",
                          });
                        } else {
                          setEditingBooking({
                            ...editingBooking,
                            category,
                            tourName: "",
                          });
                        }
                      }}
                      required
                    >
                      <option value="">Select a category</option>
                      {Object.keys(serviceCategories).map((category) => (
                        <option key={category} value={category}>
                          {category}
                        </option>
                      ))}
                    </select>
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
                      disabled={
                        isAddingBooking
                          ? !newBooking.category
                          : !editingBooking.category
                      }
                    >
                      <option value="">Select a tour</option>
                      {isAddingBooking
                        ? serviceCategories[newBooking.category]?.map(
                            (tour) => (
                              <option key={tour} value={tour}>
                                {tour}
                              </option>
                            )
                          )
                        : serviceCategories[editingBooking.category]?.map(
                            (tour) => (
                              <option key={tour} value={tour}>
                                {tour}
                              </option>
                            )
                          )}
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
                  <div className="form-actions">
                    <button type="submit" className="admin-primary-btn">
                      {isAddingBooking ? "Add Booking" : "Update Booking"}
                    </button>
                    <button
                      type="button"
                      className="cancel-booking"
                      onClick={() => {
                        setIsAddingBooking(false);
                        setIsEditingBooking(false);
                        setEditingBooking(null);
                      }}
                    >
                      Cancel
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
