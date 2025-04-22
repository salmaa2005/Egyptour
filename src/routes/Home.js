import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import temple from "../assets/21.jpg";
import "./Home.css"; // Create this file if it doesn't exist

function Home() {
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
        buttonText="Explore"
      />
      <div className="headline-container">
        <h1 className="main-headline">Pyramids to Reefs</h1>
        <div className="underline">
          <p className="sub-headline">Explore The Wonders Of Egypt</p>
        </div>
      </div>
      <div className="explore">
        <div className="karnak-temple"></div>
      </div>
    </>
  );
}

export default Home;
