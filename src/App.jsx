import { useEffect, useState } from "react";

import "./App.css";

const API_URL = "https://api.freeapi.app/api/v1/public/randomproducts";

function App() {
  const [products, setProducts] = useState([]);
  const [status, setStatus] = useState("idel");
  

  useEffect(() => {
    const controller = new AbortController();

    const fetchProduct = async () => {
      try {
        setStatus("loading");
        const response = await fetch(API_URL, { signal: controller.signal });
        const data = await response.json();
        console.log(data.data.data);
        setProducts(data.data.data);
        setStatus("idel");
      } catch {
        setStatus("error");
      }
    };
    fetchProduct();

    return () => controller.abort();
  }, []);

  return (
    <div style={styles.container}>
      {products.map((product) => (
        <div key={product.id} style={styles.card}>
          <img
            src={product.thumbnail}
            alt={product.title}
            style={styles.image}
          />
          <h2>{product.title}</h2>
          <p>{product.description}</p>
          <h2>{product.brand}</h2>
          <h3>₹ {product.category}</h3>
          <h3>₹ {product.price}</h3>
        </div>
      ))}
    </div>
  );
}

const styles = {
  container: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "20px",
    padding: "20px",
  },
  card: {
    border: "1px solid #ddd",
    borderRadius: "10px",
    padding: "15px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
  },
  image: {
    width: "100%",
    height: "200px",
    objectFit: "cover",
    borderRadius: "10px",
  },
};

export default App;
