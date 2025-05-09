import { Link } from "react-router-dom";
import "./ServicePage.css";

const NileCruises = () => {
  return (
    <div className="service-page">
      <div
        className="service-hero"
        style={{ backgroundImage: "url('../assets/nile.jpg')" }}
      >
        <div className="service-hero-content">
          <h1>Nile Cruises</h1>
          <p>Sail the legendary Nile River in luxury</p>
        </div>
      </div>

      <div className="service-container">
        <div className="service-content">
          <div className="service-icon">🚢</div>
          <h2>Luxury River Voyages</h2>
          <p>
            Experience the Nile like the pharaohs did on our luxury cruises. Our
            fleet of modern vessels offers all the comforts while you visit
            ancient temples and historic sites along the river.
          </p>
          <p>
            Choose between 3, 5, or 7-night cruises between Luxor and Aswan,
            with stops at Edfu, Kom Ombo, and other significant locations. All
            cabins feature private balconies for uninterrupted Nile views.
          </p>
          <Link to="/our-services" className="back-link">
            ← Back to Services
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NileCruises;
