import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Alfama from './pages/Alfama';
import Sesimbra from './pages/Sesimbra';
import Contactos from './pages/Contactos';
import Atividades from './pages/Atividades';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/alfama" element={<Alfama />} />
        <Route path="/sesimbra" element={<Sesimbra />} />
        <Route path="/contactos" element={<Contactos />} />
        <Route path="/atividades" element={<Atividades />} />
      </Routes>
    </Router>
  );
}

export default App;
