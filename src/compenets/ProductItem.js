import React from 'react';
import '../Styles.css';

function ProductItem(props) {
  return (
    <div className="product-item">
      <img src={props.image} alt={props.title} />
      <div className="product-item__details">
        <div className="product-item__title">{props.title}</div>
        <p>$ {props.price}</p>
        <button onClick={props.addToCart} className="add-to-cart btn btn-warning">Add to Cart</button>
      </div>
    </div>
  );
}

export default ProductItem;
