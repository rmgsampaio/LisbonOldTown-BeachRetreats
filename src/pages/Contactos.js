import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../style.css';

function Contactos() {
  return (
    <>
      <Header />
      <main className="contactos-container">
        <section className="about-section">
          <h1>Conheça a nossa história</h1>
          <p>
            Na <span className="highlight">5 Steps House</span>, transformamos estadias temporárias em experiências autênticas.
            Cada apartamento é cuidadosamente selecionado e equipado para oferecer o conforto de uma casa
            com o charme de viver como um local.
          </p>

          <div className="profile-card">
            <div className="profile-image">
              <div className="avatar-placeholder">NS</div>
            </div>
            <div className="profile-info">
              <h2>Nuno Sampaio</h2>
              <p className="title">Proprietário & Gestor</p>
              <p>
                Com mais de 10 anos de experiência no mercado imobiliário de Lisboa, garanto pessoalmente
                a qualidade de cada propriedade. Estou disponível para garantir que sua estadia
                seja perfeita em todos os detalhes.
              </p>
            </div>
          </div>
        </section>

        <section className="contact-section">
          <h2>Entre em Contacto</h2>
          <p className="subtitle">
            Pronto para reservar ou tem dúvidas? Estou aqui para ajudar!
          </p>

          <div className="contact-methods">
            <div className="contact-card" onClick={() => window.open('https://wa.me/351966892301', '_blank')}>
              <div className="contact-icon">📱</div>
              <h3>WhatsApp</h3>
              <p>+351 966 892 301</p>
              <p className="contact-hint">(Clique para conversar)</p>
            </div>

            <div className="contact-card" onClick={() => window.location.href = 'mailto:5stepshouse@gmail.com'}>
              <div className="contact-icon">✉️</div>
              <h3>Email</h3>
              <p>5stepshouse@gmail.com</p>
              <p className="contact-hint">(Clique para enviar email)</p>
            </div>
          </div>

          <div className="social-section">
            <h3>Siga-nos nas redes sociais</h3>
            <div className="social-links">
              <a href="https://instagram.com/nunosampaio" target="_blank" rel="noopener noreferrer" className="social-link">
                <span className="social-icon">📷</span> Instagram
              </a>
              <a href="https://facebook.com/nunosampaio" target="_blank" rel="noopener noreferrer" className="social-link">
                <span className="social-icon">👍</span> Facebook
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />

      <style jsx>{`
        /* Contact Page Styles */
        .contactos-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 2rem;
          color: #333;
          padding-top: 130px; /* Margem superior para o header */
        }

        .about-section, .contact-section {
          margin-bottom: 4rem;
        }

        .highlight {
          font-weight: bold;
          color: #2a6496;
        }

        .profile-card {
          display: flex;
          gap: 2rem;
          align-items: center;
          background: #f9f9f9;
          padding: 2rem;
          border-radius: 10px;
          margin-top: 2rem;
          box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }

        .profile-image {
          width: 150px;
          height: 150px;
          border-radius: 50%;
          overflow: hidden;
          flex-shrink: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #2a6496;
          color: white;
          font-size: 3rem;
          font-weight: bold;
        }

        .profile-info h2 {
          margin-top: 0;
          color: #2a6496;
        }

        .profile-info .title {
          font-style: italic;
          color: #666;
          margin-bottom: 1rem;
        }

        .contact-methods {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 1.5rem;
          margin: 2rem 0;
          max-width: 800px;
          margin-left: auto;
          margin-right: auto;
        }

        .contact-card {
          background: white;
          padding: 1.5rem;
          border-radius: 8px;
          box-shadow: 0 2px 5px rgba(0,0,0,0.1);
          transition: all 0.3s ease;
          cursor: pointer;
          text-align: center;
        }

        .contact-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 5px 15px rgba(0,0,0,0.1);
          background: #f5f9fc;
        }

        .contact-icon {
          font-size: 2rem;
          margin-bottom: 1rem;
        }

        .contact-hint {
          font-size: 0.8rem;
          color: #666;
          margin-top: 0.5rem;
        }

        .social-section {
          margin-top: 3rem;
          text-align: center;
        }

        .social-links {
          display: flex;
          justify-content: center;
          gap: 1.5rem;
          margin-top: 1.5rem;
          flex-wrap: wrap;
        }

        .social-link {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.8rem 1.5rem;
          background: #f0f0f0;
          border-radius: 50px;
          text-decoration: none;
          color: #333;
          transition: all 0.3s;
        }

        .social-link:hover {
          background: #2a6496;
          color: white;
        }

        .social-icon {
          font-size: 1.2rem;
        }

        @media (max-width: 768px) {
          .contactos-container {
            padding-top: 130px; /* Margem maior para mobile */
          }

          .profile-card {
            flex-direction: column;
            text-align: center;
          }

          .social-links {
            flex-direction: column;
            align-items: center;
          }
        }
      `}</style>
    </>
  );
}

export default Contactos;