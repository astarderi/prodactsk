import React, { useState, useEffect } from 'react';
import { get, ref, remove } from 'firebase/database';
import { db } from './FirebaseDB';
import '../Styles.css';
import { Link } from 'react-router-dom';

function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);


  const fetchCartData = async () => {
    try {
      const cartRef = ref(db, 'cart/');
      const snapshot = await get(cartRef);
      if (snapshot.exists()) {
        const cartData = snapshot.val();
        const loadedCartItems = Object.keys(cartData)
          .map((key) => ({
            key, 
            ...cartData[key], 
          }))
          .filter((item) => item.title && item.price && item.image);
        setCartItems(loadedCartItems);
        calculateTotal(loadedCartItems); 
      } else {
        setCartItems([]);
      }
    } catch (error) {
      console.error('Error fetching cart data:', error);
    }
  };


  const calculateTotal = (items) => {
    const total = items.reduce((sum, item) => sum + item.price, 0);
    setTotalPrice(total);
  };


  useEffect(() => {
    fetchCartData();
  }, []);


  const handleRemoveItem = async (key) => {
    try {
      const itemRef = ref(db, `cart/${key}`);
      await remove(itemRef);
      fetchCartData(); 
    } catch (error) {
      console.error('Error removing item:', error);
    }
  };

  return (
    <div className="cart-page-container">
      <h1>Your Cart</h1>
      <div className="cart-items">
        {cartItems.length > 0 ? (
          cartItems.map((item) => (
            <div key={item.key} className="cart-item">
              <img src={item.image} alt={item.title} className="item-image" />
              <div className="item-info">
                <h3>{item.title}</h3>
                <p>${parseFloat(item.price).toFixed(2)}</p>
                <button onClick={() => handleRemoveItem(item.key)} className="remove-button btn btn-danger">Remove</button>
              </div>
            </div>
          ))
        ) : (
          <p>Your cart is empty.</p>
        )}
      </div>
      <div className="total-price">
        <h3>Total: ${totalPrice.toFixed(2)}</h3>
      </div>
      <div className="cart-actions">
        <Link to="/">
          <button className="go-to-products">Back to Products</button>
        </Link>
        <button className="checkout-button">Checkout</button>
      </div>
    </div>
  );
}

export default Cart;
