import './Styles.css';
import database from "./FirebaseDB";
import { ref, set } from "firebase/database";
import { formatProductName } from "../utils/Utils";

function Buy(props) {
  const addToCart = (event) => {
    const productObject = {
      image: props.product.image,
      title: props.product.title,
      price: props.product.price,
    };

    const uniqueKey = productObject.title;
    const formattedKey = formatProductName(uniqueKey);

    set(ref(database, "Product/" + formattedKey), productObject)
      .then(() => {
        console.log("Data sent successfully!");
      })
      .catch((error) => {
        console.error("Error sending data:", error);
      });
  };

  return (
    <div className="buy-control">
      <button className="add-to-cart btn btn-warning" onClick={addToCart}>
        Add to Cart
      </button>
    </div>
  );
}

export default Buy;