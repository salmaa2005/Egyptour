import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import "./ServicePage.css";
import Navbar from "../components/Navbar";
import BookingPopup from "../components/BookingPopup";
import nubianVillage from "../assets/nubian-village.jpg";
import foodTour from "../assets/egyptian-food.jpg";
import pottery from "../assets/pottery.jpg";
import textile from "../assets/textile.jpg";
import pharaonicDance from "../assets/cultural-dance.jpg";
import bgImage from "../assets/nubian-culture.jpg";

const CulturalActivities = () => {
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const headlineRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    if (headlineRef.current) {
      observer.observe(headlineRef.current);
    }
    return () => observer.disconnect();
  }, []);

  const handleBookNow = (activity) => {
    setSelectedActivity(activity);
    setIsBookingOpen(true);
  };

  const activities = [
    {
      id: 1,
      title: "Nubian Village Experience",
      image: nubianVillage,
      duration: "Full Day",
      price: 120,
      description:
        "Immerse yourself in the vibrant culture of Egypt's Nubian community near Aswan.",
      highlights: [
        "Traditional Nubian lunch in a local home",
        "Henna painting workshop",
        "Nubian language and music introduction",
        "Colorful village walking tour",
      ],
    },
    {
      id: 2,
      title: "Cairo Food Tour",
      image: foodTour,
      duration: "Evening",
      price: 85,
      description:
        "Taste authentic Egyptian cuisine through hidden local eateries and street food spots.",
      highlights: [
        "15+ food tastings across 5 locations",
        "Visit to Khan el-Khalili market",
        "Egyptian coffee and tea ceremony",
        "Local food expert guide",
      ],
    },
    {
      id: 3,
      title: "Fayoum Pottery Workshop",
      image: pottery,
      duration: "Half Day",
      price: 65,
      description:
        "Learn traditional pottery techniques from master artisans in Egypt's oldest pottery village.",
      highlights: [
        "Hands-on pottery making session",
        "Visit to ancient pottery kilns",
        "Take home your creation",
        "Guided tour of Tunis Village",
      ],
    },
    {
      id: 4,
      title: "Akhmim Textile Weaving",
      image: textile,
      duration: "Full Day",
      price: 95,
      description:
        "Discover Egypt's textile heritage in the country's weaving capital.",
      highlights: [
        "Silk and cotton weaving demonstration",
        "Try traditional loom weaving",
        "Visit to Coptic weaving families",
        "Local market textile shopping",
      ],
    },
    {
      id: 5,
      title: "Cultural Dance Show",
      image: pharaonicDance,
      duration: "2 Hours",
      price: 45,
      description: "Experience Cultural Egyptian dance performances.",
      highlights: [
        "Authentic Egyptian costumes",
        "Live traditional music",
        "Interactive dance participation",
        "Historical context explanation",
      ],
    },
  ];

  return (
    <>
      <Navbar />
      <div
        className="services-hero"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${bgImage})`,
        }}
      >
        <div className="services-hero-content">
          <h1>Cultural Immersions</h1>
          <p>Participate in authentic Egyptian traditions and crafts</p>
        </div>
      </div>

      <div
        className={`headline-container ${isVisible ? "in-view" : ""}`}
        ref={headlineRef}
      >
        <h1 className="main-headline">Our Traditions</h1>
        <div className="underline">
          <p className="sub-headline">Connect with Egypt's Living Heritage</p>
        </div>
      </div>

      <div className="services-container">
        <div className="tours-grid">
          {activities.map((activity) => (
            <div key={activity.id} className="tour-card">
              <div className="tour-image-container">
                <img
                  src={activity.image}
                  alt={activity.title}
                  className="tour-image"
                />
              </div>
              <div className="tour-content-wrapper">
                <div className="tour-header">
                  <h3>{activity.title}</h3>
                  <div className="tour-meta">
                    <span className="duration">{activity.duration}</span>
                    <span className="price">${activity.price}</span>
                  </div>
                </div>

                <div className="scrollable-content">
                  <p className="tour-description">{activity.description}</p>
                  <div className="highlights">
                    <h4>Highlights:</h4>
                    <ul>
                      {activity.highlights.map((item, index) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                <button
                  className="add-to-cart-btn"
                  onClick={() => handleBookNow(activity)}
                >
                  Book Now
                </button>
              </div>
            </div>
          ))}
        </div>
        <Link
          to="/services"
          className="service-link"
          style={{ display: "block", textAlign: "center", marginTop: "2rem" }}
        >
          ← Back to Services
        </Link>
      </div>

      {selectedActivity && (
        <BookingPopup
          isOpen={isBookingOpen}
          onClose={() => setIsBookingOpen(false)}
          service={selectedActivity}
        />
      )}
    </>
  );
};

export default CulturalActivities;
