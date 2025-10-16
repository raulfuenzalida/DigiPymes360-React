import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Perfil from './components/Perfil';
import LoginForm from './components/Login';
import Inicio from './components/Inicio';
import Registro from './components/Registro';
import Nosotros from './components/Nosotros';
import Compra from './components/Compra';
import Soporte from './components/Soporte';
export default function App() {
  return (
    
      
      <div className="container mt-4">
        
      
      <Routes>
        <Route path="/" element={<Inicio/>} />
        <Route path="/login" element={<LoginForm/>} />
        <Route path="/registro" element={<Registro/>} />
        <Route path="/nosotros" element={<Nosotros/>} />
        <Route path="/perfil" element={<Perfil/>} />
        <Route path="/compra" element={<Compra/>} />
        <Route path="/soporte" element={<Soporte/>} />
        
      </Routes>
      </div>
      

  );
}
