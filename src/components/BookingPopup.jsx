import { useState } from "react";
import "./BookingPopup.css";

const BookingPopup = ({ isOpen, onClose, service }) => {
  const [bookingDetails, setBookingDetails] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    people: "1",
    specialRequests: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    // Create a new booking object that matches the admin interface structure
    const newBooking = {
      id: Date.now(), // Generate a unique ID
      customerName: bookingDetails.name,
      customerEmail: bookingDetails.email,
      tourName: service.title,
      date: bookingDetails.date,
      amount: `$${service.price * parseInt(bookingDetails.people)}`,
      paymentStatus: "Pending",
      numberOfPeople: parseInt(bookingDetails.people),
      specialRequests: bookingDetails.specialRequests || "None",
      phone: bookingDetails.phone,
    };

    // Here you would typically send the booking to your backend
    // For now, we'll store it in localStorage to simulate persistence
    const existingBookings = JSON.parse(
      localStorage.getItem("bookings") || "[]"
    );
    localStorage.setItem(
      "bookings",
      JSON.stringify([...existingBookings, newBooking])
    );

    alert("Booking submitted successfully! We'll contact you shortly.");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="booking-popup-overlay">
      <div className="booking-popup">
        <div className="booking-popup-header">
          <h2>Book {service.title}</h2>
          <button className="close-button" onClick={onClose}>
            ×
          </button>
        </div>

        <div className="booking-popup-content">
          <div className="service-summary">
            <h3>Service Details</h3>
            <div className="summary-details">
              <p>
                <strong>Duration:</strong> {service.duration}
              </p>
              <p>
                <strong>Price:</strong> ${service.price} per person
              </p>
              <p>
                <strong>Total Price:</strong> $
                {service.price * parseInt(bookingDetails.people)}
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="booking-form">
            <div className="form-group">
              <label htmlFor="name">Full Name</label>
              <input
                type="text"
                id="name"
                value={bookingDetails.name}
                onChange={(e) =>
                  setBookingDetails({ ...bookingDetails, name: e.target.value })
                }
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                value={bookingDetails.email}
                onChange={(e) =>
                  setBookingDetails({
                    ...bookingDetails,
                    email: e.target.value,
                  })
                }
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="phone">Phone Number</label>
              <input
                type="tel"
                id="phone"
                value={bookingDetails.phone}
                onChange={(e) =>
                  setBookingDetails({
                    ...bookingDetails,
                    phone: e.target.value,
                  })
                }
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="date">Preferred Date</label>
              <input
                type="date"
                id="date"
                value={bookingDetails.date}
                onChange={(e) =>
                  setBookingDetails({ ...bookingDetails, date: e.target.value })
                }
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="people">Number of People</label>
              <select
                id="people"
                value={bookingDetails.people}
                onChange={(e) =>
                  setBookingDetails({
                    ...bookingDetails,
                    people: e.target.value,
                  })
                }
                required
              >
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                  <option key={num} value={num}>
                    {num}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="specialRequests">Special Requests</label>
              <textarea
                id="specialRequests"
                value={bookingDetails.specialRequests}
                onChange={(e) =>
                  setBookingDetails({
                    ...bookingDetails,
                    specialRequests: e.target.value,
                  })
                }
                rows="3"
              />
            </div>

            <div className="booking-actions">
              <button type="submit" className="confirm-booking">
                Confirm Booking
              </button>
              <button
                type="button"
                className="cancel-booking"
                onClick={onClose}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BookingPopup;
