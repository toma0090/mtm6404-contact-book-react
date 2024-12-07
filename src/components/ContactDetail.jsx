import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { doc, getDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../db';
import '../App.css'; 

function ContactDetail() {
  const { id } = useParams();
  const [contact, setContact] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchContact = async () => {
      try {
        const docRef = doc(db, 'contacts', id);
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
          setContact(docSnap.data());
        } else {
          console.error("No such document!");
          navigate('/');  // Redirect if contact not found
        }
      } catch (error) {
        console.error("Error fetching contact:", error);
      }
    };
    fetchContact();
  }, [id, navigate]);

  const handleDelete = async () => {
    try {
      await deleteDoc(doc(db, 'contacts', id));
      navigate('/');
    } catch (error) {
      console.error("Error deleting contact:", error);
      alert("Failed to delete contact. Please try again.");
    }
  };

  if (!contact) return <div>Loading...</div>;

  return (
    <div className="container">
      <h1>Contact Details</h1>
      <div className="detail-container">
        <p><strong>First Name:</strong> {contact.firstName}</p>
        <p><strong>Last Name:</strong> {contact.lastName}</p>
        <p><strong>Email:</strong> {contact.email}</p>
        <button className="delete-button" onClick={handleDelete}>Delete Contact</button>
        <button className="back-button" onClick={() => navigate('/')}>Back to Home</button>
      </div>
    </div>
  );
}

export default ContactDetail;
