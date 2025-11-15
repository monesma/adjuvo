import { Routes, Route, Navigate } from 'react-router-dom';
import Home from '../components/pages/Home';
import Gdpr from '../components/pages/Gdpr';
import Privacy from '../components/pages/Privacy';
import Contact from '../components/pages/Contact';
import Builder from '../components/pages/dashboard/Builder';
import Profile from '../components/pages/Profile';


export default function EmployeeRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/gdpr" element={<Gdpr />} />
      <Route path="/privacy" element={<Privacy />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/dashboard" element={<Builder />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="*" element={<Navigate to="/dashboard" />} />
    </Routes>
  );
}