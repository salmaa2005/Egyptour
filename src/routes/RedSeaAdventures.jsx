import { Link } from "react-router-dom";
import "./ServicePage.css";

const RedSeaAdventures = () => {
  return (
    <div className="service-page">
      <div
        className="service-hero"
        style={{ backgroundImage: "url('../assets/red-sea.jpg')" }}
      >
        <div className="service-hero-content">
          <h1>Red Sea Adventures</h1>
          <p>Dive into vibrant coral reefs or relax at luxurious resorts</p>
        </div>
      </div>

      <div className="service-container">
        <div className="service-content">
          <div className="service-icon">🐠</div>
          <h2>Marine Paradise</h2>
          <p>
            The Red Sea offers some of the world's best diving and snorkeling
            opportunities. Our certified dive masters will guide you to
            spectacular coral reefs teeming with marine life.
          </p>
          <p>
            For non-divers, we offer glass-bottom boat tours, submarine
            experiences, or simply relaxing at our partner resorts in Hurghada
            or Sharm El Sheikh with private beaches and world-class amenities.
          </p>
          <Link to="/our-services" className="back-link">
            ← Back to Services
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RedSeaAdventures;
