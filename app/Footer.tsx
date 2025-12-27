// app/components/Footer.tsx
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="footer-section">
      <div className="footer-top">

        {/* Colonne 1 : Logo et Social */}
        <div className="footer-logo-social">
          <div className="footer-logo">

            <img src="/assets/images/logo_vinterror.png" alt="Logo VinTerror" />
          </div>
          <div className="social-icons">
            <a href="#" aria-label="Facebook" className="social-link"><i className="fab fa-facebook-f"></i></a>
            <a href="#" aria-label="Instagram" className="social-link"><i className="fab fa-instagram"></i></a>
          </div>
        </div>

        {/* Colonne 2 : Liens (Grid/Flex Container) */}
        <div className="footer-links-grid">

          {/* Groupe 1 : The Wines */}
          <div className="footer-link-group">
            <h4 className="group-title">Les VINS</h4>
            <a href="#" className="footer-link">Tous les vins</a>
            <a href="#" className="footer-link">Les classiques</a>
            <a href="#" className="footer-link">Disponibles en AR</a>
          </div>

          {/* Groupe 2 : About */}
          <div className="footer-link-group">
            <h4 className="group-title">A Propos</h4>
            <a href="#" className="footer-link">Vinterror</a>
            <a href="#" className="footer-link">The Crew</a>
            <a href="#" className="footer-link">AR Experience</a>
          </div>

          {/* Groupe 3 : Support */}
          <div className="footer-link-group">
            <h4 className="group-title">Support</h4>
            <a href="#" className="footer-link">Localiser un Magasin</a>
            <a href="#" className="footer-link">Contacter</a>
            <a href="#" className="footer-link">Livraison & Retours</a>
          </div>

        </div>

        {/* Colonne 3 : Consommer Responsably */}
        <div className="footer-responsibility">
          <div className="responsibility-box">
            Consommer <br /> Responsablement
          </div>
        </div>

      </div>

      {/* Séparateur */}
      <hr className="footer-separator" />

      {/* Bas du Footer : Droits d'auteur et légal */}
      <div className="footer-bottom">
        <p className="copyright">
          © 2025 VinTerror. Alimenté par <span className="bloom-link">US</span>
        </p>
        <div className="legal-links">
          <Link href="/condition" className="legal-link">
         Conditions & Conditions d'Utilisation
</Link>
          <Link href="/?modal=privacy" shallow>
            <span className="legal-link cursor-pointer">Politique de confidentialité</span>
          </Link>

        </div>
      </div>
    </footer>
  );
};

export default Footer;