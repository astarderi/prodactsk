import './Styles.css';
import Product from './compenets/Product'; 
import Cart from './compenets/Cart'; 
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
    <div>
      <Routes>
        <Route path="/" element={<Product />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </div>
  </Router>
  );
}

export default App;
