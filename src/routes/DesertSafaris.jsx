import { Link } from "react-router-dom";
import "./ServicePage.css";

const DesertSafaris = () => {
  return (
    <div className="service-page">
      <div
        className="service-hero"
        style={{ backgroundImage: "url('../assets/desert.jpg')" }}
      >
        <div className="service-hero-content">
          <h1>Desert Safaris</h1>
          <p>Experience the magic of the Sahara</p>
        </div>
      </div>

      <div className="service-container">
        <div className="service-content">
          <div className="service-icon">🐪</div>
          <h2>Authentic Bedouin Experiences</h2>
          <p>
            Our desert safaris offer an authentic Bedouin-style experience in
            the Western Desert. Ride camels across golden dunes, visit remote
            oases, and sleep under the stars in traditional tents.
          </p>
          <p>
            Options range from overnight trips to 3-day expeditions including
            Bahariya Oasis, the White Desert, and the Black Desert. All meals
            and equipment provided.
          </p>
          <Link to="/our-services" className="back-link">
            ← Back to Services
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DesertSafaris;
