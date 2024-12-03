import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../db';
import { Link } from 'react-router-dom';
import '../App.css';

function HomeScreen() {
  const [contacts, setContacts] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const contactsCollection = collection(db, 'contacts');
        const contactsSnapshot = await getDocs(contactsCollection);
        const contactsList = contactsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        contactsList.sort((a, b) => a.lastName.localeCompare(b.lastName));

        setContacts(contactsList);
      } catch (error) {
        console.error("Error fetching contacts:", error);
      }
    };

    fetchContacts();
  }, []);

  const filteredContacts = contacts.filter((contact) =>
    contact.firstName.toLowerCase().includes(search.toLowerCase()) ||
    contact.lastName.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container">
      <div className="header">
        <h1>Contacts</h1>
        <Link to="/add" className="add-button">
          + Add Contact
        </Link>
      </div>
      <div className="search-box">
        <input
          type="text"
          placeholder="Search contacts"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="search-input"
        />
      </div>
      <ul className="contact-list">
        {filteredContacts.map((contact) => (
          <li key={contact.id} className="contact-item">
            <Link to={`/contact/${contact.id}`} className="contact-link">
              {contact.firstName} {contact.lastName}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default HomeScreen;
