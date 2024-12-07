import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../db';
import '../App.css';

function AddContact() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [successMessage, setSuccessMessage] = useState(''); 
  const navigate = useNavigate();

  const handleAddContact = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, 'contacts'), {
        firstName,
        lastName,
        email,
      });

      setFirstName('');
      setLastName('');
      setEmail('');
      setSuccessMessage('Contact added successfully!');

      
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (error) {
      console.error('Error adding contact:', error);
    }
  };

  return (
    <div className="container">
      <h1>Add Contact</h1>
      
   
      {successMessage && <p className="success-message">{successMessage}</p>}

      <form onSubmit={handleAddContact}>
        <div className="input-group">
          <input
            type="text"
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <input
            type="text"
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

    
        <div className="button-group">
          <button type="submit" className="add-button">Add Contact</button>
          <button
            type="button"
            className="back-button"
            onClick={() => navigate('/')}
          >
            Back to Main Page
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddContact;
