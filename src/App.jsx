import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomeScreen from './components/HomeScreen';
import AddContact from './components/AddContact';
import ContactDetail from './components/ContactDetail';
import EditContacts from './components/EditContacts';

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomeScreen />} />
      <Route path="/add" element={<AddContact />} />
      <Route path="/contact/:id" element={<ContactDetail />} />
      <Route path="/edit/:id" element={<EditContacts />} />
    </Routes>
  );
}

export default App;
