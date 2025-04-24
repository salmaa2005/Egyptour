import { useEffect, useRef, useState } from "react";
import "./OurServices.css";
import Navbar from "../components/Navbar";

const OurServices = () => {
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

  const services = [
    {
      title: "Ancient Explorations",
      icon: "🏛️",
      description:
        "Discover Egypt's majestic pyramids, temples, and archaeological wonders with our expert-guided tours.",
      link: "/guided-tours",
    },
    {
      title: "Nile Cruises",
      icon: "🚢",
      description:
        "Sail the legendary Nile River in luxury, visiting historic sites along the way.",
      link: "/nile-cruises",
    },
    {
      title: "Desert Safaris",
      icon: "🐪",
      description:
        "Experience the magic of the Sahara with our authentic Bedouin-style desert expeditions.",
      link: "/desert-safaris",
    },
    {
      title: "Cultural Immersions",
      icon: "🎭",
      description:
        "Participate in traditional ceremonies, crafts, and culinary experiences.",
      link: "/cultural-activities",
    },
    {
      title: "Red Sea Adventures",
      icon: "🐠",
      description:
        "Dive into vibrant coral reefs or relax at luxurious Red Sea resorts.",
      link: "/red-sea",
    },
    {
      title: "Custom Itineraries",
      icon: "🗺️",
      description:
        "Let us craft a personalized journey tailored to your interests and pace.",
      link: "/custom-tours",
    },
  ];

  return (
    <>
      <Navbar />
      <div className="services-hero">
        <div className="services-hero-content">
          <h1>Egyptian Experiences</h1>
          <p>
            Journey through millennia of history with our exclusive services
          </p>
        </div>
      </div>

      <div
        className={`headline-container ${isVisible ? "in-view" : ""}`}
        ref={headlineRef}
      >
        <h1 className="main-headline">Our Services</h1>
        <div className="underline">
          <p className="sub-headline">Discover Egypt Like Never Before</p>
        </div>
      </div>

      <div className="services-container">
        <div className="services-grid">
          {services.map((service, index) => (
            <div key={index} className="service-card">
              <div className="service-icon">{service.icon}</div>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
              <a href={service.link} className="service-link">
                Explore More →
              </a>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default OurServices;
