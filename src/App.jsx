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
import AdminLayout from "./routes/admin/AdminLayout";
import AdminLogin from "./routes/admin/AdminLogin";
import AdminDashboard from "./routes/admin/AdminDashboard";
import UserManagement from "./routes/admin/UserManagement";
import TourManagement from "./routes/admin/TourManagement";
import BookingManagement from "./routes/admin/BookingManagement";
import "./App.css";

function App() {
  return (
    <CartProvider>
      {" "}
      {/* Wrap your entire app with CartProvider */}
      <Router>
        <div className="app-container">
          <Routes>
            {/* Admin Routes */}
            <Route path="/admin" element={<AdminLogin />} />
            <Route path="/admin" element={<AdminLayout />}>
              <Route path="dashboard" element={<AdminDashboard />} />
              <Route path="users" element={<UserManagement />} />
              <Route path="tours" element={<TourManagement />} />
              <Route path="bookings" element={<BookingManagement />} />
            </Route>

            {/* Customer Routes */}
            <Route
              path="/*"
              element={
                <>
                  <Navbar />
                  <main className="main-content">
                    <Routes>
                      <Route path="/" element={<Home />} />
                      <Route path="/services" element={<OurServices />} />
                      <Route path="/products" element={<Products />} />
                      <Route path="/cart" element={<Cart />} />
                      <Route path="/signup" element={<SignUp />} />
                      <Route path="/login" element={<Login />} />
                      <Route path="/guided-tours" element={<GuidedTours />} />
                      <Route path="/nile-cruises" element={<NileCruises />} />
                      <Route
                        path="/desert-safaris"
                        element={<DesertSafaris />}
                      />
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
                </>
              }
            />
          </Routes>
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;
