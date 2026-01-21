import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Importa o Link do react-router-dom
import './Header.css';

function Header() {
  const [showHeader, setShowHeader] = useState(true);
  let lastScrollY = 0; // Controla a posição do scroll

  // Função para controlar o comportamento do scroll
  const handleScroll = () => {
    if (window.scrollY > lastScrollY) {
      setShowHeader(false);  // Esconde o header quando rola para baixo
    } else {
      setShowHeader(true);  // Mostra o header quando rola para cima
    }
    lastScrollY = window.scrollY; // Atualiza a última posição do scroll
  };

  // Adiciona um listener de scroll quando o componente monta
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    // Limpa o listener quando o componente desmonta
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header className={`topo ${showHeader ? 'show' : 'hide'}`}>
      <div className="logo">
        {/* Link que leva à página inicial ao clicar no logo ou texto */}
        <Link to="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none', color: '#1c3a4f' }}>
          <img src="/imagens/Logo Site_FOTO.png" alt="Logo Lisbon Old Town & Beach Retreats" className="logo-img" />
          Lisbon Old Town & Beach Retreats
        </Link>
      </div>
      <nav>
        <ul>
          <li className="dropdown">
            <span className="menu-title">Apartamentos ▾</span>
            <ul className="dropdown-content">
              <li><a href="/alfama">Alfama</a></li>
              <li><a href="/sesimbra">Sesimbra</a></li>
            </ul>
          </li>
          <li><a href="/contactos">Contactos</a></li>
         
        </ul>
      </nav>
    </header>
  );
}

export default Header;
