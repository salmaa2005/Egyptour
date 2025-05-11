import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import "./ServicePage.css";
import Navbar from "../components/Navbar";
import BookingPopup from "../components/BookingPopup";
import pyramidsImage from "../assets/2.jpg";
import luxorTemple from "../assets/3.jpg";
import alex from "../assets/alex.jpg";
import abuSimbel from "../assets/abu-simbel.jpg";
import museum from "../assets/museum.jpg";
import desert from "../assets/whiteDesert.jpg";
import nileCruise from "../assets/nileCruise.jpg";
import saqqara from "../assets/saqqara.jpg";
import redSea from "../assets/redSea.jpg";
import mosque from "../assets/islamic.jpg";
import siwa from "../assets/siwa-oasis.jpg";
import bgImage from "../assets/15.jpg";

const GuidedTours = () => {
  const [selectedTour, setSelectedTour] = useState(null);
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

  const handleBookNow = (tour) => {
    setSelectedTour(tour);
    setIsBookingOpen(true);
  };

  const tours = [
    {
      id: 1,
      title: "Pyramids of Giza Expedition",
      image: pyramidsImage,
      duration: "Full Day",
      price: 120,
      description:
        "Explore the last remaining wonder of the ancient world with our expert Egyptologists.",
      highlights: [
        "Private access to restricted areas",
        "Camel ride around the pyramids",
        "Sunset photo opportunity",
      ],
    },
    {
      id: 2,
      title: "Luxor Temple Discovery",
      image: luxorTemple,
      duration: "2 Days",
      price: 280,
      description:
        "Journey through the world's greatest open-air museum with special access to newly opened tombs.",
      highlights: [
        "Hot air balloon ride at dawn",
        "Evening sound and light show",
        "Nile view dinner included",
      ],
    },
    {
      id: 3,
      title: "Alexandria Heritage Tour",
      image: alex,
      duration: "Day Trip",
      price: 95,
      description:
        "Discover Egypt's Mediterranean jewel with visits to ancient sites and modern landmarks.",
      highlights: [
        "Visit to the Roman Amphitheater",
        "Qaitbay Citadel tour",
        "Free time at Montazah Palace Gardens",
      ],
    },
    {
      id: 4,
      title: "Abu Simbel Sun Festival",
      image: abuSimbel,
      duration: "3 Days",
      price: 350,
      description:
        "Witness the spectacular phenomenon when sunlight illuminates the inner sanctum of Ramses II's temple.",
      highlights: [
        "Exclusive viewing platform access",
        "Nubian cultural performance",
        "Guided tour of both temples",
      ],
    },
    {
      id: 5,
      title: "Cairo Museum VIP Experience",
      image: museum,
      duration: "Half Day",
      price: 150,
      description:
        "Private after-hours tour of the Egyptian Museum with a senior Egyptologist.",
      highlights: [
        "Tutankhamun's treasures viewing",
        "Hands-on artifact demonstration",
        "Skip-the-line access",
      ],
    },
    {
      id: 6,
      title: "White Desert Adventure",
      image: desert,
      duration: "Overnight",
      price: 180,
      description:
        "Camp under the stars among surreal limestone formations in Egypt's Western Desert.",
      highlights: [
        "4x4 desert safari",
        "Traditional Bedouin dinner",
        "Crystal Mountain visit",
      ],
    },
    {
      id: 7,
      title: "Nile Dinner Cruise",
      image: nileCruise,
      duration: "Evening",
      price: 75,
      description:
        "Luxurious evening sail with gourmet dining and traditional entertainment.",
      highlights: [
        "Five-course Egyptian feast",
        "Belly dancing show",
        "Private upper deck option",
      ],
    },
    {
      id: 8,
      title: "Saqqara & Memphis Explorer",
      image: saqqara,
      duration: "Full Day",
      price: 110,
      description:
        "Discover the Step Pyramid and ancient capital with an archaeology specialist.",
      highlights: [
        "Step Pyramid interior access",
        "Imhotep Museum visit",
        "Colossus of Ramses II viewing",
      ],
    },
    {
      id: 9,
      title: "Red Sea Snorkeling Safari",
      image: redSea,
      duration: "Full Day",
      price: 90,
      description:
        "Explore vibrant coral reefs and marine life in the Red Sea's protected areas.",
      highlights: [
        "Three snorkeling stops",
        "Marine biologist guide",
        "Lunch on a private beach",
      ],
    },
    {
      id: 10,
      title: "Coptic Cairo & Islamic Cairo",
      image: mosque,
      duration: "Full Day",
      price: 85,
      description:
        "Journey through Egypt's Christian and Islamic heritage sites.",
      highlights: [
        "Hanging Church visit",
        "Ben Ezra Synagogue tour",
        "Khan el-Khalili market time",
      ],
    },
    {
      id: 11,
      title: "Siwa Oasis Retreat",
      image: siwa,
      duration: "3 Days",
      price: 420,
      description:
        "Experience this remote desert oasis with its unique Berber culture.",
      highlights: [
        "Cleopatra's Bath soak",
        "Salt lake visit",
        "Traditional mud-brick accommodation",
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
          <h1>Ancient Explorations</h1>
          <p>
            Discover Egypt's majestic pyramids, temples, and archaeological
            wonders
          </p>
        </div>
      </div>

      <div
        className={`headline-container ${isVisible ? "in-view" : ""}`}
        ref={headlineRef}
      >
        <h1 className="main-headline">Expert-Guided Tours</h1>
        <div className="underline">
          <p className="sub-headline">Walk in the footsteps of pharaohs</p>
        </div>
      </div>

      <div className="services-container">
        <div className="tours-grid">
          {tours.map((tour) => (
            <div key={tour.id} className="tour-card">
              <div className="tour-image-container">
                <img src={tour.image} alt={tour.title} className="tour-image" />
              </div>
              <div className="tour-content-wrapper">
                <div className="tour-header">
                  <h3>{tour.title}</h3>
                  <div className="tour-meta">
                    <span className="duration">{tour.duration}</span>
                    <span className="price">${tour.price}</span>
                  </div>
                </div>

                <div className="scrollable-content">
                  <p className="tour-description">{tour.description}</p>
                  <div className="highlights">
                    <h4>Highlights:</h4>
                    <ul>
                      {tour.highlights.map((item, index) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                <button
                  className="add-to-cart-btn"
                  onClick={() => handleBookNow(tour)}
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

      {selectedTour && (
        <BookingPopup
          isOpen={isBookingOpen}
          onClose={() => setIsBookingOpen(false)}
          service={selectedTour}
        />
      )}
    </>
  );
};

export default GuidedTours;
