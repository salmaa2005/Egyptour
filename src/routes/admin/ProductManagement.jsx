import React, { useState } from "react";
import "./AdminShared.css";

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

  const categories = [
    "All",
    ...new Set(products.map((product) => product.category)),
  ];

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
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="admin-search-input"
            />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="admin-select"
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
          <button
            className="admin-primary-btn"
            onClick={() => setIsAddingProduct(true)}
          >
            Add New Product
          </button>
        </div>

        {isAddingProduct && (
          <div className="admin-form-container">
            <h2>Add New Product</h2>
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
                <input
                  type="text"
                  value={newProduct.category}
                  onChange={(e) =>
                    setNewProduct({ ...newProduct, category: e.target.value })
                  }
                />
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
