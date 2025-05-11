import { useEffect, useRef, useState } from "react";
import { useCart } from "../context/CartContext";
import "./Products.css";
import Navbar from "../components/Navbar";
import { FiSearch, FiChevronDown } from "react-icons/fi";

const Products = () => {
  const headlineRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const categoryMenuRef = useRef(null);

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

  const products = [
    {
      title: "Handcrafted Papyrus Art",
      image: "https://images.unsplash.com/photo-1565992441121-4367c2967103",
      price: 45,
      description: "Authentic Egyptian papyrus paintings with ancient motifs.",
      category: "Artwork",
    },
    {
      title: "Alabaster Statues",
      image: "https://images.unsplash.com/photo-1598188306155-25e8eb807948",
      price: 120,
      description: "Hand-carved replicas of famous Egyptian deities.",
      category: "Souvenirs",
    },
    {
      title: "Gold-Plated Jewelry",
      image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a",
      price: 85,
      description:
        "Inspired by ancient Egyptian designs with modern craftsmanship.",
      category: "Jewelry",
    },
    {
      title: "Perfume Oils",
      image: "https://images.unsplash.com/photo-1615368144592-6a8d1dfc9f5c",
      price: 35,
      description: "Traditional Egyptian scents like lotus and amber.",
      category: "Beauty",
    },
    {
      title: "Cotton Galabeyas",
      image: "https://images.unsplash.com/photo-1551232864-3f0890e580d9",
      price: 55,
      description: "Traditional Egyptian garments in vibrant colors.",
      category: "Clothing",
    },
    {
      title: "Copper Tableware",
      image: "https://images.unsplash.com/photo-1584735422189-fbd9e34104b2",
      price: 75,
      description:
        "Hand-hammered copper plates and bowls with Egyptian patterns.",
      category: "Home Decor",
    },
  ];

  const categories = [
    "All",
    ...new Set(products.map((product) => product.category)),
  ];

  useEffect(() => {
    let results = products;

    if (searchTerm) {
      results = results.filter(
        (product) =>
          product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
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
  }, [searchTerm, selectedCategory]);

  const toggleCategoryMenu = () => {
    setIsCategoryOpen(!isCategoryOpen);
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setIsCategoryOpen(false);
  };

  return (
    <>
      <Navbar />
      <div className="products-page-container">
        <div className="products-top-accent" />
        <div
          className={`products-headline-container ${
            isVisible ? "products-headline-in-view" : ""
          }`}
          ref={headlineRef}
        >
          <h1 className="products-main-headline">Egyptian Crafts</h1>
          <div className="products-headline-underline">
            <p className="products-sub-headline">
              Timeless Pieces Inspired by Antiquity
            </p>
          </div>
        </div>

        <div className="products-search-container">
          <div className="products-search-controls">
            <div className="products-search-bar">
              <FiSearch className="products-search-icon" />
              <input
                type="text"
                className="products-search-input"
                placeholder="Search artifacts, jewelry, textiles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="products-category-filter" ref={categoryMenuRef}>
              <button
                className="products-category-toggle"
                onClick={toggleCategoryMenu}
              >
                {selectedCategory}
                <FiChevronDown
                  className={`products-chevron ${
                    isCategoryOpen ? "products-chevron-open" : ""
                  }`}
                />
              </button>
              <div
                className={`products-category-menu ${
                  isCategoryOpen ? "products-category-menu-open" : ""
                }`}
              >
                {categories.map((category) => (
                  <div
                    key={category}
                    className={`products-category-item ${
                      selectedCategory === category
                        ? "products-category-item-active"
                        : ""
                    }`}
                    onClick={() => handleCategorySelect(category)}
                  >
                    {category}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="products-items-container">
          <div className="products-items-grid">
            {filteredProducts.map((product, index) => (
              <div key={index} className="products-item-card">
                <div className="products-item-image-container">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="products-item-image"
                  />
                  <span className="products-item-category">
                    {product.category}
                  </span>
                </div>
                <div className="products-item-content">
                  <h3 className="products-item-title">{product.title}</h3>
                  <p className="products-item-description">
                    {product.description}
                  </p>
                  <div className="products-item-footer">
                    <span className="products-item-price">
                      ${product.price}
                    </span>
                    {cart[product.title] ? (
                      <div className="products-quantity-controls">
                        <button
                          className="products-quantity-btn"
                          onClick={() => decreaseQuantity(product.title)}
                        >
                          -
                        </button>
                        <span className="products-quantity">
                          {cart[product.title]}
                        </span>
                        <button
                          className="products-quantity-btn"
                          onClick={() => increaseQuantity(product.title)}
                        >
                          +
                        </button>
                      </div>
                    ) : (
                      <button
                        className="products-add-to-cart-btn"
                        onClick={() => addToCart(product.title)}
                      >
                        Add to Cart
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
