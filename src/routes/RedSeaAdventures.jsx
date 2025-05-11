import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import "./ServicePage.css";
import Navbar from "../components/Navbar";
import BookingPopup from "../components/BookingPopup";
import diving from "../assets/redsea-diving.jpg";
import snorkeling from "../assets/redsea-snorkeling.jpg";
import resort from "../assets/redsea-resort.jpg";
import submarine from "../assets/redsea-submarine.webp";
import safari from "../assets/redsea-safari.jpg";
import redSeaImage from "../assets/redsea-bg.jpg";

const RedSeaAdventures = () => {
  const [selectedAdventure, setSelectedAdventure] = useState(null);
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

  const handleBookNow = (adventure) => {
    setSelectedAdventure(adventure);
    setIsBookingOpen(true);
  };

  const adventures = [
    {
      id: 1,
      title: "Scuba Diving Expedition",
      image: diving,
      duration: "Full Day",
      price: 150,
      description:
        "Explore the Red Sea's famous coral reefs with PADI certified instructors.",
      highlights: [
        "2 guided reef dives",
        "All equipment provided",
        "Underwater photography available",
        "Small groups (max 6 divers)",
      ],
    },
    {
      id: 2,
      title: "Snorkeling Safari",
      image: snorkeling,
      duration: "Half Day",
      price: 75,
      description:
        "Discover vibrant marine life at the best snorkeling spots along the coast.",
      highlights: [
        "3 different snorkeling locations",
        "Marine biologist guide",
        "Underwater viewing scope provided",
        "Lunch on a private beach",
      ],
    },
    {
      id: 3,
      title: "Luxury Resort Getaway",
      image: resort,
      duration: "3 Days / 2 Nights",
      price: 550,
      description:
        "Relax at a 5-star Red Sea resort with private beach and spa facilities.",
      highlights: [
        "All-inclusive premium package",
        "Private beach cabana",
        "Daily snorkeling trips",
        "Sunset yoga sessions",
      ],
    },
    {
      id: 4,
      title: "Submarine Adventure",
      image: submarine,
      duration: "2 Hours",
      price: 95,
      description:
        "Explore underwater without getting wet in our tourist submarine.",
      highlights: [
        "View coral reefs from 15m depth",
        "Air-conditioned comfort",
        "Marine life spotting guide",
        "Perfect for non-swimmers",
      ],
    },
    {
      id: 5,
      title: "Desert & Sea Safari",
      image: safari,
      duration: "Full Day",
      price: 180,
      description:
        "Combination desert adventure and Red Sea snorkeling experience.",
      highlights: [
        "4x4 desert dune bashing",
        "Bedouin lunch in the mountains",
        "Afternoon reef exploration",
        "Sunset beach relaxation",
      ],
    },
  ];

  return (
    <>
      <Navbar />
      <div
        className="services-hero"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${redSeaImage})`,
        }}
      >
        <div className="services-hero-content">
          <h1>Red Sea Adventures</h1>
          <p>Dive into crystal-clear waters along Egypt's stunning coastline</p>
        </div>
      </div>

      <div
        className={`headline-container ${isVisible ? "in-view" : ""}`}
        ref={headlineRef}
      >
        <h1 className="main-headline">Marine Paradise</h1>
        <div className="underline">
          <p className="sub-headline">Discover Underwater Wonders</p>
        </div>
      </div>

      <div className="services-container">
        <div className="tours-grid">
          {adventures.map((adventure) => (
            <div key={adventure.id} className="tour-card">
              <div className="tour-image-container">
                <img
                  src={adventure.image}
                  alt={adventure.title}
                  className="tour-image"
                />
              </div>
              <div className="tour-content-wrapper">
                <div className="tour-header">
                  <h3>{adventure.title}</h3>
                  <div className="tour-meta">
                    <span className="duration">{adventure.duration}</span>
                    <span className="price">${adventure.price}</span>
                  </div>
                </div>

                <div className="scrollable-content">
                  <p className="tour-description">{adventure.description}</p>
                  <div className="highlights">
                    <h4>Highlights:</h4>
                    <ul>
                      {adventure.highlights.map((item, index) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                <button
                  className="add-to-cart-btn"
                  onClick={() => handleBookNow(adventure)}
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

      {selectedAdventure && (
        <BookingPopup
          isOpen={isBookingOpen}
          onClose={() => setIsBookingOpen(false)}
          service={selectedAdventure}
        />
      )}
    </>
  );
};

export default RedSeaAdventures;
