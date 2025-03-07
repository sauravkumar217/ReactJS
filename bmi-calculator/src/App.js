import { useState } from 'react';
import './App.css';

function App() {
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [bmi, setBmi] = useState(null);
  const [category, setCategory] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const calculateBMI = () => {
    if (!height || !weight) {
      alert('Please enter both height and weight');
      return;
    }

    setIsLoading(true);
    setTimeout(() => {  // Simulating API call or processing time
      const heightInMeters = height / 100;
      const bmiValue = (weight / (heightInMeters * heightInMeters)).toFixed(1);
      setBmi(bmiValue);
      
      if (bmiValue < 18.5) setCategory('Underweight');
      else if (bmiValue < 25) setCategory('Normal');
      else if (bmiValue < 30) setCategory('Overweight');
      else setCategory('Obese');
      
      setIsLoading(false);
    }, 1000);  // 1-second delay for loading simulation
  };

  return (
    <div className="container">
      <h1 className="title">BMI Calculator</h1>
      
      <div className="input-container">
        <div className="input-group">
          <label htmlFor="height">Height (cm)</label>
          <input
            type="number"
            id="height"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            placeholder="Enter height in cm"
            min="0"
          />
        </div>
        
        <div className="input-group">
          <label htmlFor="weight">Weight (kg)</label>
          <input
            type="number"
            id="weight"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            placeholder="Enter weight in kg"
            min="0"
          />
        </div>
        
        <button 
          onClick={calculateBMI} 
          disabled={isLoading}
          className="calculate-button"
        >
          {isLoading ? 'Calculating...' : 'Calculate BMI'}
        </button>
      </div>

      <div className="result-container">
        {bmi && !isLoading && (
          <>
            <h2>Your BMI: <span className="bmi-value">{bmi}</span></h2>
            <p className="category">Category: <span>{category}</span></p>
          </>
        )}
        {isLoading && <p className="loading">Loading...</p>}
      </div>
    </div>
  );
}

export default App;