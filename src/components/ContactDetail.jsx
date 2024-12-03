import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { doc, getDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../db';
import '../App.css'; // Ensure you import the CSS file

function ContactDetail() {
  const { id } = useParams();
  const [contact, setContact] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchContact = async () => {
      const docRef = doc(db, 'contacts', id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setContact(docSnap.data());
      } else {
        console.log("No such document!");
      }
    };
    fetchContact();
  }, [id]);

  const handleDelete = async () => {
    await deleteDoc(doc(db, 'contacts', id));
    navigate('/');
  };

  if (!contact) return <div>Loading...</div>;

  return (
    <div className="container">
      <h1>Contact Details</h1>
      <div className="detail-container">
        <p><strong>First Name:</strong> {contact.firstName}</p>
        <p><strong>Last Name:</strong> {contact.lastName}</p>
        <p><strong>Email:</strong> {contact.email}</p>
        <button className="delete-button" onClick={handleDeleteContact}>Delete Contact</button>
        <button className="back-button" onClick={() => navigate('/')}>Back to Home</button>
      </div>
    </div>
  );
}

export default ContactDetail;