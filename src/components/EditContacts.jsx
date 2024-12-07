import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { doc, getDoc, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../db';
import '../App.css'; 

function EditContacts() {
  const { id } = useParams();
  const [contact, setContact] = useState({
    firstName: '',
    lastName: '',
    email: ''
  });
  const [loading, setLoading] = useState(true);
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
          navigate('/');
        }
      } catch (error) {
        console.error("Error fetching contact:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchContact();
  }, [id, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setContact((prevContact) => ({
      ...prevContact,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const docRef = doc(db, 'contacts', id);
      await updateDoc(docRef, contact);
      navigate(`/contact/${id}`);
    } catch (error) {
      console.error("Error updating contact:", error);
      alert("Failed to update contact. Please try again.");
    }
  };

  const handleDelete = async () => {
    try {
      await deleteDoc(doc(db, 'contacts', id));
      navigate('/');
    } catch (error) {
      console.error("Error deleting contact:", error);
      alert("Failed to delete contact. Please try again.");
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="edit-contact-container">
      <div className="edit-header">
        <Link to="/">{"< Contacts"}</Link>
      </div>
      <h1>Edit Contact</h1>
      <form onSubmit={handleSubmit} className="edit-contact-form">
        <div className="form-row">
          <input 
            type="text" 
            name="firstName" 
            value={contact.firstName} 
            onChange={handleChange} 
            placeholder="First Name" 
          />
          <input 
            type="text" 
            name="lastName" 
            value={contact.lastName} 
            onChange={handleChange} 
            placeholder="Last Name" 
          />
        </div>
        <input 
          type="email" 
          name="email" 
          value={contact.email} 
          onChange={handleChange} 
          placeholder="Email" 
          className="centered-input"
        />
        <div>
          <button type="submit" className="update-button">Update Contact</button>
          <Link to="/" className="cancel-button">Cancel</Link>
        </div>
      </form>
      <button onClick={handleDelete} className="delete-button">Delete Contact</button>
    </div>
  );
}

export default EditContacts;
