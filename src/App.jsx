import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CartProvider } from "./context/CartContext"; // Import the CartProvider
import Navbar from "./components/Navbar";
import Home from "./routes/Home";
import Products from "./routes/Products";
import Cart from "./routes/Cart";
import OurServices from "./routes/OurServices";
import SignUp from "./routes/SignUp";
import Login from "./routes/Login";
import GuidedTours from "./routes/GuidedTours";
import NileCruises from "./routes/NileCruises";
import DesertSafaris from "./routes/DesertSafaris";
import CulturalActivities from "./routes/CulturalActivities";
import RedSeaAdventures from "./routes/RedSeaAdventures";
import Footer from "./components/Footer";
import "./App.css";

function App() {
  return (
    <CartProvider>
      {" "}
      {/* Wrap your entire app with CartProvider */}
      <Router>
        <div className="app-container">
          <Navbar />

          <main className="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/services" element={<OurServices />} />
              <Route path="/products" element={<Products />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/login" element={<Login />} />

              {/* Service Detail Routes */}
              <Route path="/guided-tours" element={<GuidedTours />} />
              <Route path="/nile-cruises" element={<NileCruises />} />
              <Route path="/desert-safaris" element={<DesertSafaris />} />
              <Route
                path="/cultural-activities"
                element={<CulturalActivities />}
              />
              <Route
                path="/red-sea-adventures"
                element={<RedSeaAdventures />}
              />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;
