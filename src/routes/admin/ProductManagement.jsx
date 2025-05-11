import React, { useState, useRef, useEffect } from "react";
import "./AdminShared.css";
import { FiSearch, FiChevronDown, FiX } from "react-icons/fi";

const ProductManagement = () => {
  // Mock product data
  const [products, setProducts] = useState([
    {
      id: 1,
      title: "Handcrafted Papyrus Art",
      image: "https://images.unsplash.com/photo-1565992441121-4367c2967103",
      price: 45,
      description: "Authentic Egyptian papyrus paintings with ancient motifs.",
      category: "Artwork",
      stock: 50,
    },
    {
      id: 2,
      title: "Alabaster Statues",
      image: "https://images.unsplash.com/photo-1598188306155-25e8eb807948",
      price: 120,
      description: "Hand-carved replicas of famous Egyptian deities.",
      category: "Souvenirs",
      stock: 25,
    },
    {
      id: 3,
      title: "Gold-Plated Jewelry",
      image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a",
      price: 85,
      description:
        "Inspired by ancient Egyptian designs with modern craftsmanship.",
      category: "Jewelry",
      stock: 100,
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [isAddingProduct, setIsAddingProduct] = useState(false);
  const [newProduct, setNewProduct] = useState({
    title: "",
    image: "",
    price: "",
    description: "",
    category: "",
    stock: "",
  });

  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const categoryMenuRef = useRef(null);

  const [isCategoryPopupOpen, setIsCategoryPopupOpen] = useState(false);
  const [categories, setCategories] = useState([
    "All",
    "Artwork",
    "Souvenirs",
    "Jewelry",
    "Beauty",
    "Clothing",
    "Home Decor",
  ]);
  const [newCategory, setNewCategory] = useState("");
  const [editingCategory, setEditingCategory] = useState(null);

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

  const toggleCategoryMenu = () => {
    setIsCategoryOpen(!isCategoryOpen);
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setIsCategoryOpen(false);
  };

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleAddProduct = () => {
    if (
      !newProduct.title ||
      !newProduct.image ||
      !newProduct.price ||
      !newProduct.description ||
      !newProduct.category ||
      !newProduct.stock
    ) {
      alert("Please fill in all fields");
      return;
    }

    const product = {
      id: products.length + 1,
      ...newProduct,
      price: Number(newProduct.price),
      stock: Number(newProduct.stock),
    };

    setProducts([...products, product]);
    setNewProduct({
      title: "",
      image: "",
      price: "",
      description: "",
      category: "",
      stock: "",
    });
    setIsAddingProduct(false);
  };

  const handleDeleteProduct = (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      setProducts(products.filter((product) => product.id !== id));
    }
  };

  const handleUpdateStock = (id, newStock) => {
    setProducts(
      products.map((product) =>
        product.id === id ? { ...product, stock: newStock } : product
      )
    );
  };

  const handleAddCategory = () => {
    if (newCategory.trim() && !categories.includes(newCategory.trim())) {
      setCategories([...categories, newCategory.trim()]);
      setNewCategory("");
    }
  };

  const handleDeleteCategory = (category) => {
    if (category === "All") return; // Prevent deleting "All" category
    if (
      window.confirm(
        `Are you sure you want to delete the category "${category}"?`
      )
    ) {
      setCategories(categories.filter((c) => c !== category));
      if (selectedCategory === category) {
        setSelectedCategory("All");
      }
    }
  };

  const handleEditCategory = (oldCategory, newCategory) => {
    if (oldCategory === "All") return; // Prevent editing "All" category
    if (newCategory.trim() && !categories.includes(newCategory.trim())) {
      setCategories(
        categories.map((c) => (c === oldCategory ? newCategory.trim() : c))
      );
      if (selectedCategory === oldCategory) {
        setSelectedCategory(newCategory.trim());
      }
      setEditingCategory(null);
    }
  };

  return (
    <div className="page-container">
      <div className="admin-headline-container">
        <h1 className="admin-main-headline">Product Management</h1>
        <p className="admin-sub-headline">
          Manage your products, inventory, and pricing
        </p>
      </div>

      <div className="admin-content">
        <div className="admin-actions-bar">
          <div className="search-container">
            <div className="search-bar">
              <FiSearch className="search-icon" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="admin-search-input"
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
            <button
              className="admin-secondary-btn"
              onClick={() => setIsCategoryPopupOpen(true)}
            >
              <i className="fas fa-tags"></i>
              Manage Categories
            </button>
          </div>
          <button
            className="admin-primary-btn"
            onClick={() => setIsAddingProduct(true)}
          >
            <i className="fas fa-plus"></i>
            Add New Product
          </button>
        </div>

        {/* Add Product Popup */}
        {isAddingProduct && (
          <div className="admin-popup-overlay">
            <div className="admin-popup">
              <div className="admin-popup-header">
                <h2>Add New Product</h2>
                <button
                  className="admin-popup-close"
                  onClick={() => setIsAddingProduct(false)}
                >
                  <FiX />
                </button>
              </div>
              <div className="admin-popup-content">
                <div className="admin-form">
                  <div className="form-group">
                    <label>Title</label>
                    <input
                      type="text"
                      value={newProduct.title}
                      onChange={(e) =>
                        setNewProduct({ ...newProduct, title: e.target.value })
                      }
                    />
                  </div>
                  <div className="form-group">
                    <label>Image URL</label>
                    <input
                      type="text"
                      value={newProduct.image}
                      onChange={(e) =>
                        setNewProduct({ ...newProduct, image: e.target.value })
                      }
                    />
                  </div>
                  <div className="form-group">
                    <label>Price</label>
                    <input
                      type="number"
                      value={newProduct.price}
                      onChange={(e) =>
                        setNewProduct({ ...newProduct, price: e.target.value })
                      }
                    />
                  </div>
                  <div className="form-group">
                    <label>Description</label>
                    <textarea
                      value={newProduct.description}
                      onChange={(e) =>
                        setNewProduct({
                          ...newProduct,
                          description: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="form-group">
                    <label>Category</label>
                    <select
                      value={newProduct.category}
                      onChange={(e) =>
                        setNewProduct({
                          ...newProduct,
                          category: e.target.value,
                        })
                      }
                    >
                      <option value="">Select a category</option>
                      {categories
                        .filter((cat) => cat !== "All")
                        .map((category) => (
                          <option key={category} value={category}>
                            {category}
                          </option>
                        ))}
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Stock Quantity</label>
                    <input
                      type="number"
                      value={newProduct.stock}
                      onChange={(e) =>
                        setNewProduct({ ...newProduct, stock: e.target.value })
                      }
                    />
                  </div>
                  <div className="form-actions">
                    <button
                      className="admin-primary-btn"
                      onClick={handleAddProduct}
                    >
                      Add Product
                    </button>
                    <button
                      className="admin-action-btn delete"
                      onClick={() => setIsAddingProduct(false)}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Category Management Popup */}
        {isCategoryPopupOpen && (
          <div className="admin-popup-overlay">
            <div className="admin-popup">
              <div className="admin-popup-header">
                <h2>Manage Categories</h2>
                <button
                  className="admin-popup-close"
                  onClick={() => setIsCategoryPopupOpen(false)}
                >
                  <FiX />
                </button>
              </div>
              <div className="admin-popup-content">
                <div className="category-list">
                  {categories.map((category) => (
                    <div key={category} className="category-list-item">
                      {editingCategory === category ? (
                        <div className="category-edit-form">
                          <input
                            type="text"
                            value={newCategory}
                            onChange={(e) => setNewCategory(e.target.value)}
                            placeholder="New category name"
                          />
                          <div className="category-edit-actions">
                            <button
                              className="admin-action-btn edit"
                              onClick={() =>
                                handleEditCategory(category, newCategory)
                              }
                            >
                              Save
                            </button>
                            <button
                              className="admin-action-btn delete"
                              onClick={() => setEditingCategory(null)}
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      ) : (
                        <>
                          <span>{category}</span>
                          {category !== "All" && (
                            <div className="category-actions">
                              <button
                                className="admin-action-btn edit"
                                onClick={() => {
                                  setEditingCategory(category);
                                  setNewCategory(category);
                                }}
                              >
                                Edit
                              </button>
                              <button
                                className="admin-action-btn delete"
                                onClick={() => handleDeleteCategory(category)}
                              >
                                Delete
                              </button>
                            </div>
                          )}
                        </>
                      )}
                    </div>
                  ))}
                </div>
                <div className="category-add-form">
                  <input
                    type="text"
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    placeholder="New category name"
                  />
                  <button
                    className="admin-primary-btn"
                    onClick={handleAddCategory}
                  >
                    Add Category
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="admin-table-container">
          <table className="admin-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Image</th>
                <th>Title</th>
                <th>Category</th>
                <th>Price</th>
                <th>Stock</th>
                <th>Description</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((product) => (
                <tr key={product.id}>
                  <td>{product.id}</td>
                  <td>
                    <img
                      src={product.image}
                      alt={product.title}
                      className="product-thumbnail"
                    />
                  </td>
                  <td>{product.title}</td>
                  <td>{product.category}</td>
                  <td>${product.price}</td>
                  <td>
                    <input
                      type="number"
                      value={product.stock}
                      onChange={(e) =>
                        handleUpdateStock(product.id, Number(e.target.value))
                      }
                      className="stock-input"
                    />
                  </td>
                  <td>{product.description}</td>
                  <td>
                    <div className="action-buttons">
                      <button className="admin-action-btn edit">Edit</button>
                      <button
                        className="admin-action-btn delete"
                        onClick={() => handleDeleteProduct(product.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ProductManagement;
