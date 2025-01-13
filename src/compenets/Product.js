import { useEffect, useState } from "react";
import ProductItem from "./ProductItem";
import { db } from './FirebaseDB'; 
import { ref, set, get } from 'firebase/database';
import '../Styles.css';
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

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

  const addToCart = async (product) => {
    if (!product || !product.title || !product.price || !product.image) {
      console.error("Invalid product data:", product);
      return; // Stop if there's invalid data
    }
    const uniqueKey = product.title.replace(/[.#$\[\]]/g, "");    try {
      const productRef = ref(db, `cart/${uniqueKey}`);
      const snapshot = await get(productRef);

      if (snapshot.exists()) {
        alert("המוצר כבר נמצא בעגלת הקניות, פריט אחד ללקוח");
      } else {
        await set(productRef, {
          title: product.title,
          price: parseFloat(product.price), 
          image: product.image,
        });
        alert("המוצר נוסף לעגלה בהצלחה!");
      }
    } catch (error) {
      console.error("Error adding product to cart:", error);
    }
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
      
      <div className="filter-controls-container">
        <div style={{ position: "relative", marginBottom: "20px" }}>
          <Link to="/cart">
            <button className="btn btn-warning">Go to Cart</button>
          </Link>
        </div>

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
          <button className="btn btn-warning" onClick={filterByPrice}>Filter</button>
        </div>
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
