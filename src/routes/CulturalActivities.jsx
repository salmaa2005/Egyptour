import { Link } from "react-router-dom";
import "./ServicePage.css";

const CulturalActivities = () => {
  return (
    <div className="service-page">
      <div
        className="service-hero"
        style={{ backgroundImage: "url('../assets/culture.jpg')" }}
      >
        <div className="service-hero-content">
          <h1>Cultural Immersions</h1>
          <p>Participate in traditional ceremonies and crafts</p>
        </div>
      </div>

      <div className="service-container">
        <div className="service-content">
          <div className="service-icon">🎭</div>
          <h2>Authentic Egyptian Culture</h2>
          <p>
            Go beyond typical tourism with our cultural immersion experiences.
            Learn traditional crafts from local artisans, participate in cooking
            classes for Egyptian cuisine, and attend authentic cultural
            performances.
          </p>
          <p>
            Options include pottery making in Fayoum, textile weaving in Akhmim,
            or spending a day with a Nubian family in Aswan to learn about their
            traditions and way of life.
          </p>
          <Link to="/our-services" className="back-link">
            ← Back to Services
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CulturalActivities;
