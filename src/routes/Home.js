import { useEffect, useRef, useState } from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import temple from "../assets/21.jpg";
import "./Home.css";
import AlternatingLayoutPage from "../components/AlternatingLayoutPage";
function Home() {
  const headlineRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect(); // Stop observing after it appears
        }
      },
      { threshold: 0.3 } // 30% visible
    );
    if (headlineRef.current) {
      observer.observe(headlineRef.current);
    }
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <Navbar />
      <Hero
        cName="hero"
        heroImg={temple}
        title="Your Journey Starts Here"
        text="What are you waiting for?"
        url="/"
        btnClass="show"
        buttonText="Our Services"
      />
      <div
        className={`headline-container ${isVisible ? "in-view" : ""}`}
        ref={headlineRef}
      >
        <h1 className="main-headline">Pyramids to Reefs</h1>
        <div className="underline">
          <p className="sub-headline">Explore The Wonders Of Egypt</p>
        </div>
      </div>
      <div className="explore">
        <div className="karnak-temple"></div>
      </div>
      <AlternatingLayoutPage />
    </>
  );
}

export default Home;
