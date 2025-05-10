import { useEffect, useState } from "react";
import { useCart } from "../context/CartContext";
import "./Cart.css";
import Navbar from "../components/Navbar";

const Cart = () => {
  const { cart, increaseQuantity, decreaseQuantity, removeItem } = useCart();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Fetch products (in a real app, this would be an API call)
    const dummyProducts = [
      {
        title: "Handcrafted Papyrus Art",
        image: "https://images.unsplash.com/photo-1565992441121-4367c2967103",
        price: 45,
        description:
          "Authentic Egyptian papyrus paintings with ancient motifs.",
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
    setProducts(dummyProducts);
  }, []);

  const calculateTotal = () => {
    return Object.entries(cart).reduce((total, [title, quantity]) => {
      const product = products.find((p) => p.title === title);
      return total + (product?.price || 0) * quantity;
    }, 0);
  };

  const cartItems = Object.entries(cart)
    .map(([title, quantity]) => {
      const product = products.find((p) => p.title === title);
      if (!product) return null;

      return {
        ...product,
        quantity,
        total: product.price * quantity,
      };
    })
    .filter(Boolean);

  return (
    <>
      <Navbar />
      <div className="cart-page-container">
        <div className="top-accent" />
        <div className="cart-container">
          <h1 className="cart-heading">Your Shopping Cart</h1>

          {cartItems.length === 0 ? (
            <div className="empty-cart">
              <p>Your cart is empty</p>
              <a href="/products" className="continue-shopping">
                Continue Shopping
              </a>
            </div>
          ) : (
            <div className="cart-content">
              <div className="cart-items">
                {cartItems.map((item, index) => (
                  <div key={index} className="cart-item">
                    <div className="item-image-container">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="item-image"
                      />
                    </div>
                    <div className="item-details">
                      <h3 className="item-title">{item.title}</h3>
                      <p className="item-description">{item.description}</p>
                      <p className="item-category">{item.category}</p>
                    </div>
                    <div className="item-quantity">
                      <button
                        className="quantity-btn"
                        onClick={() => decreaseQuantity(item.title)}
                      >
                        -
                      </button>
                      <span className="quantity">{item.quantity}</span>
                      <button
                        className="quantity-btn"
                        onClick={() => increaseQuantity(item.title)}
                      >
                        +
                      </button>
                    </div>
                    <div className="item-price">
                      ${item.price} × {item.quantity} ={" "}
                      <strong>${item.total.toFixed(2)}</strong>
                    </div>
                    <button
                      className="remove-item"
                      onClick={() => removeItem(item.title)}
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>

              <div className="cart-summary">
                <h3>Order Summary</h3>
                <div className="summary-row">
                  <span>Subtotal</span>
                  <span>${calculateTotal().toFixed(2)}</span>
                </div>
                <div className="summary-row">
                  <span>Shipping</span>
                  <span>Free</span>
                </div>
                <div className="summary-row total">
                  <span>Total</span>
                  <span>${calculateTotal().toFixed(2)}</span>
                </div>
                <button className="checkout-btn">Proceed to Checkout</button>
                <a href="/products" className="continue-shopping">
                  Continue Shopping
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Cart;
