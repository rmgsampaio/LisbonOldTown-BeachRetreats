import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer'; // <-- import do componente Footer
import '../style.css';

function Home() {
  return (
    <>
      <Header />
      <main className="apartamentos-container">
        <a href="/alfama" className="apartamento">
          <img src="/imagens/alfamaApartamento/sala1.jpg" alt="Apartamento em Alfama" />
          <h2>Apartamento 1 quarto - Alfama, Lisboa</h2>
          <div className="tags">
            <span>Varanda</span>
            <span>Cozinha equipada</span>
            <span>Perto do rio</span>
            <span>Centro histórico</span>
          </div>
          <div className="info">
            <p>📍 Alfama, Lisboa</p>
            <p>🏠 1 quarto</p>
          </div>
          <span className="seta">➔</span>
        </a>

        <a href="/sesimbra" className="apartamento">
          <img src="/imagens/sesimbraApartamento/quartoFake.jpeg" alt="Apartamento em Sesimbra" />
          <h2>Apartamento 2 quartos - Sesimbra, Setúbal</h2>
          <div className="tags">
            <span>Varanda</span>
            <span>Cozinha equipada</span>
            <span>Ar condicionado</span>
            <span>Piscina aquecida</span>
            <span>Rooftop</span>
            <span>Jardim</span>
            <span>Estacionamento com carregamento</span>
            <span>Elevador</span>
            <span>Vista mar</span>
            <span>Perto da praia</span>
          </div>
          <div className="info">
            <p>📍 Sesimbra, Setúbal</p>
            <p>🏠 2 quartos</p>
          </div>
          <span className="seta">➔</span>
        </a>
      </main>
      <Footer /> {/* Componente reutilizável de rodapé */}
    </>
  );
}

export default Home;
