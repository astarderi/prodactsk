import React, { useState, useEffect } from 'react';  // הוספתי את הייבוא של useState ו-useEffect
import '../Styles.css';
import { db } from './FirebaseDB'; // משתמש ב-db מקובץ FirebaseDB
import { ref as firebaseRef, get } from 'firebase/database'; // הוספתי את get מ-firebase/database
import ProductItem from './ProductItem';  // הוספתי את הייבוא של ProductItem

function Cart() {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const cartRef = firebaseRef(db, "cart/");
    get(cartRef)
      .then((snapshot) => {
        if (snapshot.exists()) {
          setCartItems(Object.values(snapshot.val()));
        } else {
          console.log("No items in cart.");
        }
      })
      .catch((error) => {
        console.error("Error fetching cart items:", error);
      });
  }, []);

  const totalPrice = cartItems.reduce((total, item) => total + item.price, 0);

  return (
    <div>
      <h2>Shopping Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty!</p>
      ) : (
        cartItems.map((item, index) => (
          <ProductItem
            key={index}
            title={item.title}
            price={item.price}
            image={item.image}
          />
        ))
      )}
      <h3>Total Price: ${totalPrice}</h3>
      <button disabled>Proceed to Checkout</button>
    </div>
  );
}

export default Cart;
