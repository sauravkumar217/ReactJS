import React from 'react';
import { useNavigate } from 'react-router-dom';

const Contact = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1); // Go back to the previous page
  };

  return (
    <div className="page-content">
      <h1>Contact Us</h1>
      <p>You can contact us at contact@example.com.</p>
      <button onClick={handleBack} className="back-button">
        Go Back
      </button>
    </div>
  );
};

export default Contact;