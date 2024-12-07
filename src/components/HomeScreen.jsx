import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../db.js';
import { Link } from 'react-router-dom';
import '../App.css';

function HomeScreen() {
  const [contacts, setContacts] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContacts = async () => {
      setLoading(true); 
      try {
        const contactsCollection = collection(db, 'contacts');
        const contactsSnapshot = await getDocs(contactsCollection);

        if (!contactsSnapshot.empty) {
          const contactsList = contactsSnapshot.docs.map((doc) => ({
            id: doc.id,
            firstName: doc.data()['firstName'],
            lastName: doc.data()['lastname'],
            email: doc.data()['email'], 
            phoneNumber: doc.data()['phoneNumber'] || 'N/A',
          }));

          
          contactsList.sort((a, b) =>
            (a.lastName || '').localeCompare(b.lastName || '')
          );

          setContacts(contactsList);
        } else {
          console.log('No contacts found in Firestore!');
          setContacts([]);
        }
      } catch (error) {
        console.error('Error fetching contacts from Firestore:', error);
      } finally {
        setLoading(false); 
      }
    };

    fetchContacts();
  }, []);

  const filteredContacts = contacts.filter((contact) =>
    `${contact.firstName} ${contact.lastName}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  if (loading) return <p>Loading contacts...</p>;

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

      {filteredContacts.length > 0 ? (
        <ul className="contact-list">
          {filteredContacts.map((contact) => (
            <li key={contact.id} className="contact-item">
              <Link to={`/contact/${contact.id}`} className="contact-link">
                {contact.firstName} {contact.lastName}
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p>No contacts found.</p>
      )}
    </div>
  );
}

export default HomeScreen;

