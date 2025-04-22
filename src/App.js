import { BrowserRouter as Router } from "react-router-dom"; // Add this import
import logo from "./logo.svg";
import "./App.css";
import Navbar from "./components/Navbar";
import { Routes, Route } from "react-router-dom";
import Products from "./routes/Products";
import Cart from "./routes/Cart";
import Home from "./routes/Home";
import Services from "./routes/Services";

function App() {
  return (
    <Router>
      {" "}
      {/* Wrap everything with Router */}
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/products" element={<Products />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
