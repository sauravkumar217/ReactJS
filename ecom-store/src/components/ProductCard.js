const ProductCard = ({ title, price, image }) => {
    return (
      <div className="product-card">
        <img src={image} alt={title} />
        <h3>{title}</h3>
        <p>₹ {price}</p>
        <button className="buy-btn">Buy Now</button>
      </div>
    );
  };
  
  export default ProductCard;