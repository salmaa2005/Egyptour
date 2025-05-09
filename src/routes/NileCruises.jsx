import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import "./ServicePage.css";
import Navbar from "../components/Navbar";
import classicCruise from "../assets/nile-classic.jpg";
import luxuryCruise from "../assets/nile-luxury.jpg";
import familyCruise from "../assets/nile-family.png";
import honeymoonCruise from "../assets/nile-honeymoon.jpg";
import adventureCruise from "../assets/kayaking.jpg";

const NileCruises = () => {
  const [cartItems, setCartItems] = useState([]);
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

  const addToCart = (cruise) => {
    setCartItems([...cartItems, cruise]);
    alert(`${cruise.title} added to cart!`);
  };

  const cruises = [
    {
      id: 1,
      title: "Classic Nile Voyager",
      image: classicCruise,
      duration: "4 Days / 3 Nights",
      price: 450,
      description:
        "Experience the timeless beauty of the Nile with visits to all major temples between Luxor and Aswan.",
      highlights: [
        "Guided tours of Karnak and Luxor Temples",
        "Valley of the Kings exploration",
        "Kom Ombo and Edfu Temple visits",
        "Sunset felucca ride in Aswan",
      ],
    },
    {
      id: 2,
      title: "Luxury Pharaoh's Retreat",
      image: luxuryCruise,
      duration: "5 Days / 4 Nights",
      price: 890,
      description:
        "Sail in ultimate comfort with premium amenities and exclusive access to historical sites.",
      highlights: [
        "Butler service and suite accommodations",
        "Private evening temple access",
        "Gourmet dining with Nile views",
        "SPA treatments onboard",
      ],
    },
    {
      id: 3,
      title: "Family Discovery Cruise",
      image: familyCruise,
      duration: "3 Days / 2 Nights",
      price: 650,
      description:
        "Perfect for families with child-friendly activities and shorter excursion options.",
      highlights: [
        "Interactive hieroglyphics workshop",
        "Child-friendly guided tours",
        "Family cabins with connecting rooms",
        "Onboard kids' club",
      ],
    },
    {
      id: 4,
      title: "Honeymoon Serenade",
      image: honeymoonCruise,
      duration: "7 Days / 6 Nights",
      price: 1200,
      description:
        "Romantic getaway with private excursions and premium amenities for couples.",
      highlights: [
        "Private candlelit dinner on deck",
        "Couples massage sessions",
        "Sunset champagne at Abu Simbel",
        "Luxury balcony suite",
      ],
    },
    {
      id: 5,
      title: "Nile Adventure Expedition",
      image: adventureCruise,
      duration: "5 Days / 4 Nights",
      price: 720,
      description:
        "Active cruise combining historical visits with adventure activities along the Nile.",
      highlights: [
        "Early morning hot air balloon ride",
        "Bicycle tours to temples",
        "Nile kayaking excursions",
        "Desert hiking experiences",
      ],
    },
  ];

  return (
    <>
      <Navbar />
      <div className="services-hero">
        <div className="services-hero-content">
          <h1>Nile Cruise Experiences</h1>
          <p>
            Sail the legendary river that shaped ancient civilizations in style
            and comfort
          </p>
        </div>
      </div>

      <div
        className={`headline-container ${isVisible ? "in-view" : ""}`}
        ref={headlineRef}
      >
        <h1 className="main-headline">Nile Cruises</h1>
        <div className="underline">
          <p className="sub-headline">Journey Through Living History</p>
        </div>
      </div>

      <div className="services-container">
        <div className="tours-grid">
          {cruises.map((cruise) => (
            <div key={cruise.id} className="tour-card">
              <div className="tour-image-container">
                <img
                  src={cruise.image}
                  alt={cruise.title}
                  className="tour-image"
                />
              </div>
              <div className="tour-content-wrapper">
                <div className="tour-header">
                  <h3>{cruise.title}</h3>
                  <div className="tour-meta">
                    <span className="duration">{cruise.duration}</span>
                    <span className="price">${cruise.price}</span>
                  </div>
                </div>

                <div className="scrollable-content">
                  <p className="tour-description">{cruise.description}</p>
                  <div className="highlights">
                    <h4>Highlights:</h4>
                    <ul>
                      {cruise.highlights.map((item, index) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                <button
                  className="add-to-cart-btn"
                  onClick={() => addToCart(cruise)}
                >
                  Add to Cart
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
    </>
  );
};

export default NileCruises;
