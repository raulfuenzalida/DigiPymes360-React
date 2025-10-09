import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';


export default function App() {
  return (
    <Router>
      
      <div className="container mt-4">
        <h1 className="text-center">Bienvenido a DigiPymes360</h1>
      </div>
      
      <Routes>
        <Route path="/" element={<p>Inicio</p>} />
        <Route path="/login" element={<p>Página de Login</p>} />
        <Route path="/registro" element={<p>Registro</p>} />
        <Route path="/perfil" element={<p>Perfil del usuario</p>} />
      </Routes>
      
    </Router>
  );
}
