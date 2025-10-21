import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Perfil from './components/Perfil';
import LoginForm from './components/Login';
import Inicio, { CatalogContext } from './components/Inicio';
import Registro from './components/Registro';
import Nosotros from './components/Nosotros';
import Compra from './components/Compra';
import Soporte from './components/Soporte';
import PrivateRoute from './components/PrivateRoute';
import pyme from '../src/img/img_pyme.jpg'
export default function App() {
  const contextValue = {
    products: [],
    loading: false
  };

  return (
    <div className="container mt-4">
      <Routes>
        <Route path="/" element={
          <CatalogContext.Provider value={contextValue}>
            <Inicio>
              {(product) => (
                <div className="card shadow-sm h-100">
                  <img src={pyme} className="card-img-top" alt="{product.nombre}" />
                  <div className="card-body text-center">
                    <h5 className="card-title">{product.nombre}</h5>
                    <p className="card-text">Precio : ${product.precio} dólares</p>
                    <p className="card-text">En Stock : ${product.stock}</p>
                    <button className="btn btn-success mt-auto addCarrito">Añadir al carrito</button>
                  </div>
                </div>
              )}
            </Inicio>
          </CatalogContext.Provider>
        } />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/nosotros" element={<Nosotros />} />


        <Route
          path="/perfil"
          element={
            <PrivateRoute>
              <Perfil />
            </PrivateRoute>
          }
        />
        <Route
          path="/compra"
          element={
            <PrivateRoute>
              <Compra />
            </PrivateRoute>
          }
        />
        <Route
          path="/soporte"
          element={
            <PrivateRoute>
              <Soporte />
            </PrivateRoute>
          }
        />
      </Routes>
    </div>
  );
}
