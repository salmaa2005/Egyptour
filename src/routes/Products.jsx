import { useEffect, useRef, useState } from "react";
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
  const [cart, setCart] = useState({});

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

  const handleAddToCart = (productTitle) => {
    setCart((prevCart) => ({
      ...prevCart,
      [productTitle]: (prevCart[productTitle] || 0) + 1,
    }));
  };

  const handleIncreaseQuantity = (productTitle) => {
    setCart((prevCart) => ({
      ...prevCart,
      [productTitle]: (prevCart[productTitle] || 0) + 1,
    }));
  };

  const handleDecreaseQuantity = (productTitle) => {
    setCart((prevCart) => {
      const currentQuantity = prevCart[productTitle] || 0;
      if (currentQuantity <= 1) {
        const newCart = { ...prevCart };
        delete newCart[productTitle];
        return newCart;
      }
      return {
        ...prevCart,
        [productTitle]: currentQuantity - 1,
      };
    });
  };

  return (
    <>
      <Navbar />
      <div className="page-container">
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
                    onClick={() => handleCategorySelect(category)}
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
                    src={product.image}
                    alt={product.title}
                    className="product-image"
                  />
                  <span className="product-category">{product.category}</span>
                </div>
                <div className="product-content">
                  <h3>{product.title}</h3>
                  <p>{product.description}</p>
                  <div className="product-footer">
                    <span className="product-price">${product.price}</span>
                    {cart[product.title] ? (
                      <div className="quantity-controls">
                        <button
                          className="quantity-btn"
                          onClick={() => handleDecreaseQuantity(product.title)}
                        >
                          -
                        </button>
                        <span className="quantity">{cart[product.title]}</span>
                        <button
                          className="quantity-btn"
                          onClick={() => handleIncreaseQuantity(product.title)}
                        >
                          +
                        </button>
                      </div>
                    ) : (
                      <button
                        className="add-to-cart"
                        onClick={() => handleAddToCart(product.title)}
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
