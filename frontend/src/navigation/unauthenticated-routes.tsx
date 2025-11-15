import { Navigate, Route, Routes} from 'react-router-dom'
import Gdpr from '../components/pages/Gdpr';
import Privacy from '../components/pages/Privacy';
import Contact from '../components/pages/Contact';
import Home from '../components/pages/Home';
import Signin from '../components/pages/auth/Signin';
import Signup from '../components/pages/auth/Signup';

export default function UnauthenticatedRoutes() {
  return (
    <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/gdpr" element={<Gdpr />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="*" element={<Navigate to="/signin" />} />
    </Routes>
  )
}
