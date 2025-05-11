import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import "./ServicePage.css";
import Navbar from "../components/Navbar";
import BookingPopup from "../components/BookingPopup";
import whiteDesert from "../assets/white-desert.avif";
import westernDesert from "../assets/western-desert.jpg";
import siwaOasis from "../assets/siwa-oasis.jpg";
import blackDesert from "../assets/black-desert.jpg";
import dahabiya from "../assets/dahabiya.jpg";
import bgImage from "../assets/desert.jpg";

const DesertSafaris = () => {
  const [selectedSafari, setSelectedSafari] = useState(null);
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

  const handleBookNow = (safari) => {
    setSelectedSafari(safari);
    setIsBookingOpen(true);
  };

  const safaris = [
    {
      id: 1,
      title: "White Desert Expedition",
      image: whiteDesert,
      duration: "2 Days / 1 Night",
      price: 250,
      description:
        "Explore Egypt's surreal White Desert National Park with its stunning chalk rock formations.",
      highlights: [
        "Camp under the stars in the desert",
        "Visit Crystal Mountain",
        "Traditional Bedouin dinner",
        "4x4 desert safari experience",
      ],
    },
    {
      id: 2,
      title: "Western Desert Adventure",
      image: westernDesert,
      duration: "3 Days / 2 Nights",
      price: 380,
      description:
        "Journey through the vast Western Desert with visits to hidden oases and canyons.",
      highlights: [
        "Bahariya Oasis exploration",
        "Sandboarding on golden dunes",
        "Hot springs experience",
        "Fossil hunting in the desert",
      ],
    },
    {
      id: 3,
      title: "Siwa Oasis Retreat",
      image: siwaOasis,
      duration: "4 Days / 3 Nights",
      price: 420,
      description:
        "Discover the magical Siwa Oasis near the Libyan border with its unique Berber culture.",
      highlights: [
        "Cleopatra's Bath soak",
        "Salt lake visit",
        "Ancient Oracle Temple tour",
        "Traditional mud-brick accommodation",
      ],
    },
    {
      id: 4,
      title: "Black Desert Safari",
      image: blackDesert,
      duration: "Full Day",
      price: 150,
      description:
        "Day trip to the volcanic landscapes of Egypt's mysterious Black Desert.",
      highlights: [
        "Climb the volcanic peaks",
        "Visit El Haiz oasis",
        "Picnic lunch in the desert",
        "Geology expert guide",
      ],
    },
    {
      id: 5,
      title: "Luxury Dahabiya Safari",
      image: dahabiya,
      duration: "5 Days / 4 Nights",
      price: 950,
      description:
        "Premium desert experience combining luxury camping with authentic Bedouin experiences.",
      highlights: [
        "Private luxury desert camp",
        "Gourmet meals under the stars",
        "Stargazing with telescope",
        "Private guided tours",
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
          <h1>Desert Safaris</h1>
          <p>Experience the magic of Egypt's vast deserts</p>
        </div>
      </div>

      <div
        className={`headline-container ${isVisible ? "in-view" : ""}`}
        ref={headlineRef}
      >
        <h1 className="main-headline">Sahara Adventures</h1>
        <div className="underline">
          <p className="sub-headline">Discover the Golden Sea</p>
        </div>
      </div>

      <div className="services-container">
        <div className="tours-grid">
          {safaris.map((safari) => (
            <div key={safari.id} className="tour-card">
              <div className="tour-image-container">
                <img
                  src={safari.image}
                  alt={safari.title}
                  className="tour-image"
                />
              </div>
              <div className="tour-content-wrapper">
                <div className="tour-header">
                  <h3>{safari.title}</h3>
                  <div className="tour-meta">
                    <span className="duration">{safari.duration}</span>
                    <span className="price">${safari.price}</span>
                  </div>
                </div>

                <div className="scrollable-content">
                  <p className="tour-description">{safari.description}</p>
                  <div className="highlights">
                    <h4>Highlights:</h4>
                    <ul>
                      {safari.highlights.map((item, index) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                <button
                  className="add-to-cart-btn"
                  onClick={() => handleBookNow(safari)}
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

      {selectedSafari && (
        <BookingPopup
          isOpen={isBookingOpen}
          onClose={() => setIsBookingOpen(false)}
          service={selectedSafari}
        />
      )}
    </>
  );
};

export default DesertSafaris;
