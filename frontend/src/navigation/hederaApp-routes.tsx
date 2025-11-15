import {Routes, Route, Navigate} from 'react-router-dom'

import Home from '../components/pages/Home';
import Gdpr from '../components/pages/Gdpr';
import Privacy from '../components/pages/Privacy';
import Contact from '../components/pages/Contact';
import App from '../components/pages/dashboard/App';
import Profile from '../components/pages/Profile';


export default function AuthenticatedRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/gdpr" element={<Gdpr />} />
      <Route path="/privacy" element={<Privacy />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/dashboard" element={<App />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="*" element={<Navigate to="/dashboard" />} />
    </Routes>
  )
}
