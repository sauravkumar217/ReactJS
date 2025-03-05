import ProductCard from '../components/ProductCard';
import SneakersImage from '../assets/Sneakers.jpg';
import JacketImage from '../assets/Jacket.jpg';
import HeadphonesImage from '../assets/Headphones.jpg';
import WatchImage from '../assets/Watch.jpg';
const products = [
  { id: 1, title: 'Sneakers', price: 1499, image: SneakersImage},
  { id: 2, title: 'Jacket', price: 2199, image: JacketImage },
  { id: 3, title: 'Headphones', price: 999, image: HeadphonesImage },
  { id: 4, title: 'Watch', price: 1799, image: WatchImage },
];

const ProductCataloguePage = () => {
  return (
    <div className="page product-catalogue-page">
      <h1>Product Catalogue</h1>
      <div className="product-grid">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            title={product.title}
            price={product.price}
            image={product.image}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductCataloguePage;