// Page principal du site
"use client";

import { Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
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

// ✅ CORRECTION : useSearchParams doit être dans un composant séparé
// enveloppé dans <Suspense> — obligatoire dans Next.js 15 même avec 'use client'
function PrivacyModal() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const isPrivacyModalOpen = searchParams.get('modal') === 'privacy';

  const closeModal = () => {
    router.push('/', { scroll: false });
  };

  if (!isPrivacyModalOpen) return null;

  return (
    <Modal isOpen={true} onClose={closeModal}>
      <h2 className="text-xl font-semibold">
        Politique de Confidentialité - VinterroRAR
      </h2>
      <p className="mt-2 text-sm text-gray-700">
        Votre confiance est essentielle. Nous collectons certaines informations
        (nom, email, données d&apos;utilisation) uniquement pour personnaliser votre
        expérience de réalité augmentée et gérer vos commandes de vins locaux.
        La protection de vos données est notre priorité : nous utilisons un
        chiffrement SSL et respectons scrupuleusement les normes RGPD.

        Notre application de réalité augmentée nécessite l&apos;accès à votre appareil
        photo pour activer ses fonctionnalités, mais aucune image ou vidéo n&apos;est
        enregistrée ou stockée sur nos serveurs.

        Vous gardez le contrôle total sur vos informations. À tout moment, vous
        pouvez consulter, modifier ou supprimer vos données personnelles. Pour
        toute question concernant la confidentialité, contactez-nous à :
        privacy@vinterrorar.cm

        Innovation et respect de votre vie privée, pour une expérience authentique.
      </p>
    </Modal>
  );
}

export default function Home() {
  return (
    <>
      <Head>
        <title>VinTerror Monstres Universels – Ils sont vivants!</title>
      </Head>

      <main className="bg-black text-white font-sans overflow-hidden">
        <Header />
        <HeroSection />
        <Apropos />
        <InfoCardsSection />
        <GangSection />
        <TestimonialSection />
        <ARSection />
        <SubscribeSection />
      </main>

      {/* ✅ useSearchParams isolé dans <Suspense> */}
      <Suspense fallback={null}>
        <PrivacyModal />
      </Suspense>

      <Footer />
    </>
  );
}