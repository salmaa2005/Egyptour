import { useEffect, useRef, useState } from "react";
import { useCart } from "../context/CartContext";
import "./Products.css";
import Navbar from "../components/Navbar";
import { FiSearch, FiChevronDown } from "react-icons/fi";
import axios from "axios";

const Products = () => {
  const headlineRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const categoryMenuRef = useRef(null);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  // Use cart context
  const { cart, addToCart, increaseQuantity, decreaseQuantity } = useCart();

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

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        categoryMenuRef.current &&
        !categoryMenuRef.current.contains(event.target)
      ) {
        setIsCategoryOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:5006/api/products");
        console.log("API Response:", response.data);
        setProducts(response.data);
        // Extract unique categories from products
        const uniqueCategories = [
          ...new Set(response.data.map((p) => p.category)),
        ];
        setCategories(["All", ...uniqueCategories]);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    let results = products;

    if (searchTerm) {
      results = results.filter(
        (product) =>
          product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.description
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          product.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedCategory !== "All") {
      results = results.filter(
        (product) => product.category === selectedCategory
      );
    }

    setFilteredProducts(results);
  }, [searchTerm, selectedCategory, products]);

  const toggleCategoryMenu = () => {
    setIsCategoryOpen(!isCategoryOpen);
  };

  const selectCategory = (category) => {
    setSelectedCategory(category);
    setIsCategoryOpen(false);
  };

  const handleAddToCart = (productName) => {
    const product = products.find((p) => p.name === productName);
    if (product && product.stockQuantity > 0) {
      addToCart(productName);
    }
  };

  const handleIncreaseQuantity = (productName) => {
    const product = products.find((p) => p.name === productName);
    if (product && cart[productName] < product.stockQuantity) {
      increaseQuantity(productName);
    }
  };

  const handleDecreaseQuantity = (productName) => {
    decreaseQuantity(productName);
  };

  return (
    <>
      <Navbar />
      <div className="products-page-container">
        <div className="top-accent" />
        <div
          className={`headline-container ${isVisible ? "in-view" : ""}`}
          ref={headlineRef}
        >
          <h1 className="main-headline">Egyptian Crafts</h1>
          <div className="underline">
            <p className="sub-headline">
              Timeless Pieces Inspired by Antiquity
            </p>
          </div>
        </div>

        <div className="search-container">
          <div className="search-controls">
            <div className="search-bar">
              <FiSearch className="search-icon" />
              <input
                type="text"
                placeholder="Search artifacts, jewelry, textiles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="category-filter" ref={categoryMenuRef}>
              <button className="category-toggle" onClick={toggleCategoryMenu}>
                {selectedCategory}
                <FiChevronDown
                  className={`chevron ${isCategoryOpen ? "open" : ""}`}
                />
              </button>
              <div className={`category-menu ${isCategoryOpen ? "open" : ""}`}>
                {categories.map((category) => (
                  <div
                    key={category}
                    className={`category-item ${
                      selectedCategory === category ? "active" : ""
                    }`}
                    onClick={() => selectCategory(category)}
                  >
                    {category}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="products-container">
          <div className="products-grid">
            {filteredProducts.map((product, index) => (
              <div key={index} className="product-card">
                <div className="product-image-container">
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="product-image"
                  />
                  <span className="product-category">{product.category}</span>
                </div>
                <div className="product-content">
                  <h3>{product.name}</h3>
                  <p>{product.description}</p>
                  <div className="product-footer">
                    <span className="product-price">${product.price}</span>
                    {cart[product.name] ? (
                      <div className="quantity-controls">
                        <button
                          className="quantity-btn"
                          onClick={() => handleDecreaseQuantity(product.name)}
                        >
                          -
                        </button>
                        <span className="quantity">{cart[product.name]}</span>
                        <button
                          className="quantity-btn"
                          onClick={() => handleIncreaseQuantity(product.name)}
                          disabled={cart[product.name] >= product.stockQuantity}
                        >
                          +
                        </button>
                      </div>
                    ) : (
                      <button
                        className="add-to-cart"
                        onClick={() => handleAddToCart(product.name)}
                        disabled={product.stockQuantity <= 0}
                      >
                        {product.stockQuantity > 0
                          ? "Add to Cart"
                          : "Out of Stock"}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Products;
