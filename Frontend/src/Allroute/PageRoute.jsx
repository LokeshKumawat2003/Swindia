import React from 'react';
import { Routes, Route } from 'react-router-dom'; 
import Table from '../components/Table';
import Login from '../Page/Login';
import Signup from '../Page/Signup';
import ViewDetails from '../Page/Detaile';
import Admin from '../Page/admin';
import Navbar from '../components/Navbar';
import Profile from '../Page/Profile';

const PageRoute = () => {
  return (
    <div>
      <Navbar />
      <Routes> 
        <Route path="/" element={<Table />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/detaile" element={<ViewDetails />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="*" element={  <h1>Ree</h1> } />
      </Routes>
    </div>
  );
};

export default PageRoute;
