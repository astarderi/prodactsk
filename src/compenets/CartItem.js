import React from 'react';
import '../Styles.css';

function CartItem(props) {


  return (
    <div className="cart-item">
      <div><img className="img" src={props.image} alt={props.title} /></div>
      <div className="cart-item__details">
        <div className="cart-item__title">{props.title}</div>
        <p>$ {props.price}</p>
        <button onClick={props.addToCart} className="delete-btn">delete</button>
      </div>
    </div>
  );
}
export default CartItem;
