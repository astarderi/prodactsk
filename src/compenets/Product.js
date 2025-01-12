import { useEffect, useState } from "react";
import ProductItem from "./ProductItem";
import { db } from './FirebaseDB'; 
import { getDatabase, ref, set } from 'firebase/database';
import '../Styles.css';
import { Link } from "react-router-dom";

function Product() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1000); 

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch("https://fakestoreapi.com/products");
        const jsonData = await response.json();
        const formatProductList = jsonData.map((item) => ({
          title: item.title,
          price: item.price,
          image: item.image,
        }));
        setProducts(formatProductList);
        setFilteredProducts(formatProductList);  
      } catch (error) {
        console.error("Error fetching products", error);
      }
    };
    fetchProduct();
  }, []);

  const addToCart = (product) => {
    const productRef = ref(db, `cart/${product.title}`); // יצירת מפתח בעגלה לפי שם המוצר
  
    set(productRef, {
      title: product.title,
      price: product.price,
      image: product.image,
    })
    .then(() => {
      console.log("Product added to cart successfully");
    })
    .catch((error) => {
      console.error("Error adding product to cart:", error);
    });
  };


  const filterByPrice = () => {
    const filtered = products.filter(
      (product) => product.price >= minPrice && product.price <= maxPrice
    );
    setFilteredProducts(filtered);
  };

  return (
    <div className="home-page-container">
      <h1>Products List</h1>
      <div className="filter-controls">
        <label>Min Price:</label>
        <input
          type="number"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
        />
        <label>Max Price:</label>
        <input
          type="number"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
        />
        <button onClick={filterByPrice}>Filter</button>
        <button>
  <Link to="/cart">Go to Cart</Link>
</button>
      </div>

      <div className="product-list">
        {filteredProducts.map((item, index) => (
          <ProductItem
            key={index}
            title={item.title}
            price={item.price}
            image={item.image}
            addToCart={() => addToCart(item)}  
          />
        ))}
      </div>
    </div>
  );
}

export default Product;
