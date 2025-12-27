// Page principal du site
"use client";

import {useSearchParams, useRouter} from 'next/navigation';
import Modal from './modal';

import Head from 'next/head';
import Header from './Header';
import HeroSection from './HeroSection';
import Apropos from './Apropos';
import InfoCardsSection from './thirthSection';
import GangSection from './gangSection';
import TestimonialSection from './testimodialSection';
import ARSection from './ARSection';
import SubscribeSection from './suscribeSection';
import Footer from './Footer';
import './globals.css';

export default function Home() {
  // Gestion de la modale de politique de confidentialité
  const searchParams = useSearchParams ();
  const router = useRouter ();
  const isPrivacyModalOpen = searchParams.get('modal') === 'privacy';

  const closeModal = () => {
    router.push('/', { scroll: false });
  };

  return (
    <>
      <Head>
        <title>VinTerror Monstres Universels – Ils sont vivants!</title>
      </Head>

      <main className="bg-black text-white font-sans overflow-hidden">
        <Header />
        {/* Section Héro */}
        <HeroSection />

        {/* Section À propos */}
        <Apropos />


        {/* Section cartes info */}
        <InfoCardsSection />


        {/* Section Histoires */}
        <GangSection />



        <TestimonialSection />

        {/* Section AR */}
        <ARSection />

        {/* Section Abonnement */}
        <SubscribeSection />

        {/* Le reste de votre contenu de page ici */}
        {/* <p style={{ padding: '20px', color: '#333' }}>
          Bienvenue sur la page d'accueil de Vin Terror.
        </p> */}
      </main>

      {isPrivacyModalOpen && (
        <Modal isOpen={true} onClose={closeModal}>
          <h2 className="text-xl font-semibold">   Politique de Confidentialité - VinterroRAR</h2>
          <p className="mt-2 text-sm text-gray-700">
            Votre confiance est essentielle. Nous collectons certaines informations (nom, email, données d'utilisation) uniquement pour personnaliser votre expérience de réalité augmentée et gérer vos commandes de vins locaux. La protection de vos données est notre priorité : nous utilisons un chiffrement SSL et respectons scrupuleusement les normes RGPD.

            Notre application de réalité augmentée nécessite l'accès à votre appareil photo pour activer ses fonctionnalités, mais aucune image ou vidéo n'est enregistrée ou stockée sur nos serveurs.

            Vous gardez le contrôle total sur vos informations. À tout moment, vous pouvez consulter, modifier ou supprimer vos données personnelles. Pour toute question concernant la confidentialité, contactez-nous à : privacy@vinterrorar.cm

            Innovation et respect de votre vie privée, pour une expérience authentique.</p>

        </Modal>
      )}

      <Footer />
    </>
  );
}