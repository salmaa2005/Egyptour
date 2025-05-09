import { Link } from "react-router-dom";
import "./ServicePage.css";

const CustomTours = () => {
  return (
    <div className="service-page">
      <div
        className="service-hero"
        style={{ backgroundImage: "url('../assets/custom.jpg')" }}
      >
        <div className="service-hero-content">
          <h1>Custom Itineraries</h1>
          <p>Your journey, your way</p>
        </div>
      </div>

      <div className="service-container">
        <div className="service-content">
          <div className="service-icon">🗺️</div>
          <h2>Tailored Experiences</h2>
          <p>
            Our travel experts will work with you to create a completely
            personalized itinerary based on your interests, schedule, and
            budget. Whether you're a history buff, adventure seeker, or luxury
            traveler, we'll craft your perfect Egyptian experience.
          </p>
          <p>
            Combine any of our services or add unique experiences like hot air
            balloon rides over Luxor, private museum tours, or exclusive access
            to archaeological sites.
          </p>
          <Link to="/our-services" className="back-link">
            ← Back to Services
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CustomTours;
