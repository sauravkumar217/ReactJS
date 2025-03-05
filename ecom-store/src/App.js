import { Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import ProductCataloguePage from './pages/ProductCataloguePage';
import './App.css';

function App() {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/products" element={<ProductCataloguePage />} />
      </Routes>
    </div>
  );
}

export default App;