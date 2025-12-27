'use client';
import Header from '../../app/Header';
import Footer from '../../app/Footer';
import '../../app/globals.css';
import { useState } from 'react';


export default function ConditionsUtilisationPage() {
  const [activeSection, setActiveSection] = useState('conditions');

  const sections = [
    { id: 'conditions', label: 'Conditions Générales' },
    { id: 'confidentialite', label: 'Confidentialité' },
    { id: 'cookies', label: 'Cookies' },
    { id: 'vente', label: 'Conditions de Vente' }
  ];

  return (
    <>
      <Header />
    <div className="conditions-container">
      {/* Hero Section */}
      <section className="conditions-hero">
        <div className="container">
          <h1>Conditions Générales d'Utilisation</h1>
          <p className="hero-subtitle">
            Informations légales régissant l'utilisation de VinterroRAR et de ses services
          </p>
          <p className="last-updated">Dernière mise à jour : 4 décembre 2025</p>
        </div>
      </section>

      {/* Navigation */}
      <nav className="conditions-nav">
        <div className="container">
          <div className="nav-tabs">
            {sections.map((section) => (
              <button
                key={section.id}
                className={`nav-tab ${activeSection === section.id ? 'active' : ''}`}
                onClick={() => setActiveSection(section.id)}
              >
                {section.label}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="conditions-content">
        <div className="container">
          <div className="content-wrapper">
            {/* Sidebar for Desktop */}
            <aside className="conditions-sidebar">
              <div className="sidebar-sticky">
                <h3>Navigation Rapide</h3>
                <ul className="sidebar-links">
                  <li><a href="#article1">1. Acceptation des conditions</a></li>
                  <li><a href="#article2">2. Description du service</a></li>
                  <li><a href="#article3">3. Accès au service</a></li>
                  <li><a href="#article4">4. Compte utilisateur</a></li>
                  <li><a href="#article5">5. Propriété intellectuelle</a></li>
                  <li><a href="#article6">6. Données personnelles</a></li>
                  <li><a href="#article7">7. Responsabilités</a></li>
                  <li><a href="#article8">8. Transactions</a></li>
                  <li><a href="#article9">9. Modification des CGU</a></li>
                  <li><a href="#article10">10. Droit applicable</a></li>
                </ul>
                
                <div className="sidebar-download">
                  <h4>Télécharger</h4>
                  <button className="download-btn">
                    <span className="icon">📄</span>
                    PDF des CGU
                  </button>
                </div>
              </div>
            </aside>

            {/* Main Content Area */}
            <main className="conditions-main">
              {/* Article 1 */}
              <section id="article1" className="article-section">
                <h2>1. Acceptation des Conditions Générales d'Utilisation</h2>
                <p>
                  Les présentes Conditions Générales d'Utilisation (ci-après "CGU") régissent l'utilisation 
                  de la plateforme VinterroRAR (ci-après "la Plateforme"), accessible via le site web 
                  www.vinterrorar.cm et l'application mobile associée.
                </p>
                <p>
                  En accédant à la Plateforme, en vous y inscrivant ou en utilisant ses services, 
                  vous reconnaissez avoir pris connaissance des présentes CGU, les comprendre et 
                  les accepter sans réserve. Si vous n'acceptez pas ces conditions, veuillez ne 
                  pas utiliser la Plateforme.
                </p>
                <div className="important-note">
<strong>Note importante :</strong> VinterroRAR se réserve le droit de modifier les 
                  présentes CGU à tout moment. Les modifications entrent en vigueur dès leur publication 
                  sur la Plateforme.
                </div>
              </section>

              {/* Article 2 */}
              <section id="article2" className="article-section">
                <h2>2. Description du Service VinterroRAR</h2>
                <p>
                  VinterroRAR est une plateforme innovante de promotion et de commercialisation de 
                  vins camerounais, intégrant la technologie de réalité augmentée (AR) pour offrir 
                  une expérience utilisateur immersive.
                </p>
                <h3>2.1 Services proposés :</h3>
                <ul>
                  <li>
                    <strong>Expérience de réalité augmentée :</strong> Fonctionnalités AR permettant 
                    d'enrichir la découverte des vins via l'application mobile
                  </li>
                  <li>
                    <strong>Boutique en ligne :</strong> Plateforme de vente de vins camerounais 
                    sélectionnés
                  </li>
                  <li>
                    <strong>Contenus éducatifs :</strong> Informations sur les vins, les terroirs, 
                    les cépages et les producteurs locaux
                  </li>
                  <li>
                    <strong>Services aux producteurs :</strong> Outils de promotion et de visibilité 
                    pour les vignerons camerounais
                  </li>
                </ul>
                <h3>2.2 Exigences techniques :</h3>
                <p>
                  L'utilisation des fonctionnalités AR nécessite un smartphone compatible avec :
                </p>
                <ul>
                  <li>iOS 14+ ou Android 8.0+</li>
                  <li>Appareil photo fonctionnel</li>
                  <li>Connexion internet stable</li>
                  <li>Autorisations d'accès à la caméra</li>
                </ul>
              </section>

              {/* Article 3 */}
              <section id="article3" className="article-section">
                <h2>3. Accès au Service et Disponibilité</h2>
                <p>
                  L'accès à la Plateforme est ouvert à toute personne physique âgée d'au moins 
                  18 ans et disposant de la pleine capacité juridique. Pour les mineurs, l'utilisation 
                  doit être supervisée par un adulte responsable.
                </p>
                <p>
                  VinterroRAR s'efforce d'assurer la disponibilité et l'accessibilité de la Plateforme 
                  24h/24 et 7j/7, mais ne peut garantir une continuité absolue du service en raison :
                </p>
                <ul>
                  <li>D'opérations de maintenance technique</li>
                  <li>De problèmes de connectivité réseau</li>
                  <li>De cas de force majeure</li>
                  <li>D'éventuelles pannes matérielles ou logicielles</li>
                </ul>
                <p>
                  VinterroRAR se réserve le droit de suspendre, restreindre ou interrompre l'accès 
                  à la Plateforme pour des raisons techniques, de sécurité ou légales.
                </p>
              </section>

              {/* Article 4 */}
              <section id="article4" className="article-section">
                <h2>4. Création et Gestion du Compte Utilisateur</h2>
                <h3>4.1 Inscription :</h3>
                <p>
                  Pour accéder à certaines fonctionnalités (achats, sauvegarde de préférences, 
                  historique), la création d'un compte utilisateur est nécessaire. L'inscription 
                  requiert :
                </p>
                <ul>
                  <li>Une adresse email valide</li>
                  <li>La création d'un mot de passe sécurisé</li>
<li>L'acceptation des présentes CGU et de la politique de confidentialité</li>
                  <li>La fourniture d'informations exactes et à jour</li>
                </ul>
                
                <h3>4.2 Responsabilités de l'utilisateur :</h3>
                <p>
                  Vous êtes responsable :
                </p>
                <ul>
                  <li>De la confidentialité de vos identifiants de connexion</li>
                  <li>De toutes les activités réalisées depuis votre compte</li>
                  <li>De la mise à jour de vos informations personnelles</li>
                  <li>De l'utilisation conforme aux lois camerounaises</li>
                </ul>
                
                <div className="warning-box">
                  <strong>Attention :</strong> Toute activité suspecte sur votre compte doit être 
                  immédiatement signalée à contact@vinterrorar.cm
                </div>
              </section>

              {/* Article 5 */}
              <section id="article5" className="article-section">
                <h2>5. Propriété Intellectuelle</h2>
                <h3>5.1 Droits de VinterroRAR :</h3>
                <p>
                  La Plateforme et tous ses éléments constitutifs (logos, design, code source, 
                  contenus, marques, technologies AR) sont la propriété exclusive de VinterroRAR 
                  ou de ses partenaires et sont protégés par les lois camerounaises et internationales 
                  sur la propriété intellectuelle.
                </p>
                
                <h3>5.2 Licence d'utilisation :</h3>
                <p>
                  VinterroRAR vous accorde une licence personnelle, non exclusive, non transférable 
                  et révocable pour :
                </p>
                <ul>
                  <li>Accéder et utiliser la Plateforme à des fins personnelles</li>
                  <li>Télécharger et utiliser l'application mobile sur vos appareils</li>
                  <li>Scanner les contenus AR via l'application</li>
                </ul>
                
                <h3>5.3 Restrictions :</h3>
                <p>
                  Il est strictement interdit de :
                </p>
                <ul>
                  <li>Copier, modifier, reproduire ou distribuer les contenus sans autorisation</li>
                  <li>Utiliser la technologie AR à des fins commerciales non autorisées</li>
                  <li>Contourner les mesures techniques de protection</li>
                  <li>Extraire des données de la Plateforme par quelque moyen que ce soit</li>
                </ul>
              </section>

              {/* Article 6 */}
              <section id="article6" className="article-section">
                <h2>6. Protection des Données Personnelles</h2>
                <p>
                  VinterroRAR s'engage à protéger vos données personnelles conformément à la 
                  loi n°2010/012 du 21 décembre 2010 relative à la cybersécurité et la cybercriminalité 
                  au Cameroun et au Règlement Général sur la Protection des Données (RGPD).
                </p>
                
                <h3>6.1 Données collectées :</h3>
                <ul>
                  <li><strong>Données d'identification :</strong> Nom, email, téléphone</li>
                  <li><strong>Données de navigation :</strong> Historique, préférences, cookies</li>
                  <li><strong>Données transactionnelles :</strong> Commandes, paiements</li>
                  <li><strong>Données AR :</strong> Interactions avec la réalité augmentée</li>
                </ul>
                
                <h3>6.2 Finalités du traitement :</h3>
                <ul>
                  <li>Exécution des services demandés</li>
                  <li>Personnalisation de l'expérience utilisateur</li>
                  <li>Amélioration des fonctionnalités AR</li>
                  <li>Envoi d'informations commerciales (avec consentement)</li>
<li>Respect des obligations légales</li>
                </ul>
                
                <p>
                  Pour plus d'informations, consultez notre 
                  <a href="/politique-confidentialite" className="inline-link"> Politique de Confidentialité</a>.
                </p>
              </section>

              {/* Article 7 */}
              <section id="article7" className="article-section">
                <h2>7. Responsabilités et Limitations</h2>
                <h3>7.1 Responsabilité de VinterroRAR :</h3>
                <p>
                  VinterroRAR s'engage à fournir ses services avec diligence et selon les règles 
                  de l'art. Toutefois, notre responsabilité est limitée aux dommages directs 
                  résultant de notre faute lourde ou exclusive.
                </p>
                
                <h3>7.2 Exclusions de responsabilité :</h3>
                <p>
                  VinterroRAR ne peut être tenu responsable :
                </p>
                <ul>
                  <li>Des interruptions de service dues à des causes extérieures</li>
                  <li>De l'utilisation abusive ou frauduleuse de la Plateforme</li>
                  <li>Des contenus générés par les utilisateurs</li>
                  <li>De la qualité des produits vendus par les vignerons partenaires</li>
                  <li>Des dommages liés à l'utilisation non conforme des services AR</li>
                </ul>
                
                <h3>7.3 Responsabilité de l'utilisateur :</h3>
                <p>
                  Vous êtes responsable de :
                </p>
                <ul>
                  <li>L'utilisation sécurisée de la technologie AR</li>
                  <li>La vérification de la légalité de l'alcool dans votre pays/région</li>
                  <li>La consommation responsable des produits alcoolisés</li>
                  <li>La conformité de vos contenus aux lois en vigueur</li>
                </ul>
              </section>

              {/* Article 8 */}
              <section id="article8" className="article-section">
                <h2>8. Transactions et Conditions de Vente</h2>
                <h3>8.1 Processus d'achat :</h3>
                <p>
                  Les transactions sur VinterroRAR sont régies par des conditions de vente spécifiques 
                  disponibles lors du processus de commande. Chaque achat implique :
                </p>
                <ul>
                  <li>La sélection des produits dans le panier</li>
                  <li>La vérification des informations de livraison</li>
                  <li>Le choix du mode de paiement sécurisé</li>
                  <li>La confirmation de la commande</li>
                  <li>La réception d'un email de confirmation</li>
                </ul>
                
                <h3>8.2 Prix et paiement :</h3>
                <p>
                  Les prix sont indiqués en francs CFA et incluent toutes les taxes applicables 
                  au Cameroun. Les modes de paiement acceptés sont :
                </p>
                <ul>
                  <li>Cartes bancaires (Visa, MasterCard)</li>
                  <li>Mobile Money (MTN, Orange)</li>
                  <li>Transfert bancaire</li>
                </ul>
                
                <h3>8.3 Livraison :</h3>
                <p>
                  Les délais de livraison varient selon la région. VinterroRAR collabore avec 
                  des transporteurs locaux pour assurer une livraison sécurisée. Les frais de 
                  livraison sont calculés en fonction de la destination.
                </p>
                
                <div className="important-note">
                  <strong>Rappel :</strong> La vente d'alcool est interdite aux mineurs. 
                  Une pièce d'identité peut être exigée à la livraison.
                </div>
              </section>

              {/* Article 9 */}
              <section id="article9" className="article-section">
<h2>9. Modification et Résiliation</h2>
                <h3>9.1 Modification des CGU :</h3>
                <p>
                  VinterroRAR se réserve le droit de modifier les présentes CGU à tout moment. 
                  Les nouvelles conditions seront publiées sur la Plateforme avec indication 
                  de la date de prise d'effet. Votre poursuite d'utilisation après modification 
                  vaut acceptation des nouvelles conditions.
                </p>
                
                <h3>9.2 Suspension et résiliation :</h3>
                <p>
                  VinterroRAR peut suspendre ou résilier votre compte en cas de :
                </p>
                <ul>
                  <li>Violation des présentes CGU</li>
                  <li>Activité frauduleuse ou illégale</li>
                  <li>Comportement préjudiciable à la Plateforme ou à d'autres utilisateurs</li>
                  <li>Non-respect des lois camerounaises</li>
                </ul>
                
                <h3>9.3 Résiliation par l'utilisateur :</h3>
                <p>
                  Vous pouvez résilier votre compte à tout moment via les paramètres de votre 
                  compte ou en nous contactant à contact@vinterrorar.cm
                </p>
              </section>

              {/* Article 10 */}
              <section id="article10" className="article-section">
                <h2>10. Droit Applicable et Règlement des Litiges</h2>
                <h3>10.1 Droit applicable :</h3>
                <p>
                  Les présentes CGU sont régies et interprétées conformément au droit camerounais, 
                  sans égard aux principes de conflits de lois.
                </p>
                
                <h3>10.2 Règlement amiable :</h3>
                <p>
                  En cas de litige, les parties s'engagent à rechercher une solution amiable 
                  avant toute action judiciaire. Pour cela, vous pouvez contacter notre service 
                  client à contact@vinterrorar.cm
                </p>
                
                <h3>10.3 Juridiction compétente :</h3>
                <p>
                  À défaut de résolution amiable dans un délai de 30 jours, tout litige relève 
                  de la compétence exclusive des tribunaux de Douala, Cameroun.
                </p>
                
                <div className="contact-section">
                  <h3>Contact légal :</h3>
                  <p>
                    <strong>VinterroRAR SARL</strong><br />
                    BP 12345 Douala, Cameroun<br />
                    Email légal : legal@vinterrorar.cm<br />
                    Téléphone : +237 XXX XXX XXX<br />
                    RCCM : CM-2023-B-12345
                  </p>
                </div>
              </section>

              {/* Acceptance Section */}
              <section className="acceptance-section">
                <div className="acceptance-box">
                  <h3>Acceptation des Conditions</h3>
                  <p>
                    En utilisant la Plateforme VinterroRAR, vous reconnaissez avoir lu, compris 
                    et accepté l'intégralité des présentes Conditions Générales d'Utilisation.
                  </p>
                  <div className="acceptance-actions">
                    <button className="btn-primary">
                      J'accepte les conditions
                    </button>
                    <button className="btn-secondary">
                      Retour à l'accueil
                    </button>
                  </div>
                </div>
              </section>
            </main>
          </div>
        </div>
      </div>
    </div>
    <Footer />
    </>
  );
}
 