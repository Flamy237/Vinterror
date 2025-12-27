import Header from '../../../app/Header';
import Footer from '../../../app/Footer';
import '../../../app/globals.css';
export default function VinTerrorPage() {
    return (
        <>
            <Header />
            <main>
                {/* Section Hero de la page AR */}

            </main>
            <div className='conteneur'>
                <section className="hero">
                    <div className="container">
                        <h1>Apprendre plus sur nous</h1>
                        <p>Découvrez la passion qui anime VinTerror<sup>AR</sup> et notre engagement à révolutionner l'expérience des vins camerounais grâce à la réalité augmentée.</p>
                    </div>
                </section>


                <section className="about-content">
                    <div className="container">
                        <div className="section-title">
                            <h2>Qui Sommes-Nous ?</h2>
                        </div>

                        <div className="mission-vision">
                            <div className="mission">
                                <div className="mission-icon">🍷</div>
                                <h3>Notre Mission</h3>
                                <p>Révolutionner la découverte des vins camerounais en alliant l'authenticité des terroirs à l'innovation technologique. Nous connectons les amateurs de vin aux richesses viticoles locales à travers des expériences de réalité augmentée uniques.</p>
                            </div>

                            <div className="vision">
                                <div className="vision-icon">👁</div>
                                <h3>Notre Vision</h3>
                                <p>Devenir la référence incontournable pour la promotion et la valorisation des vins africains, en créant un pont entre tradition et modernité qui célèbre le patrimoine œnologique du Cameroun et au-delà.</p>
                            </div>
                        </div>

                        <div className="section-title">
                            <h2>Notre Motivation</h2>
                        </div>

                        <div className='Histoire' >
                            <p>Inspirés par l'héritage de résistance et de fierté nationale incarné par des figures comme Ruben Um Nyobè et Ernest Ouandié, VinTerror<sup>AR</sup> est né d'une conviction simple : les trésors œnologiques du Cameroun méritent d'être célébrés avec la même passion que celle qui a animé ces héros nationaux.</p>

                            <p>Notre aventure a commencé en 2025, lorsque nous fondateur, passionné à la fois de technologie et de vin, avons constaté le décalage entre la qualité exceptionnelle des vins locaux et leur visibilité limitée. En associant réalité augmentée et promotion des vins camerounais, nous créons une expérience immersive qui raconte l'histoire de chaque bouteille, des cépages aux vignerons.</p>

                            <p>Aujourd'hui, VinTerror<sup>AR</sup> continue d'écrire son histoire en redéfinissant la manière dont nous découvrons, apprécions et partageons le vin camerounais, en faisant de chaque dégustation un hommage à notre terroir et à notre patrimoine.</p>
                        </div>
                    </div>
                </section>


                <section className="values">
                    <div className="container">
                        <div className="section-title">
                            <h2>Nos Valeurs</h2>
                        </div>

                        <div className="values-grid">
                            <div className="value-item">
                                <h3>Innovation</h3>
                                <p>Nous repoussons les limites de la technologie pour créer des expériences uniques qui révèlent la beauté des vins camerounais.</p>
                            </div>

                            <div className="value-item">
                                <h3>Authenticité</h3>
                                <p>Nous célébrons la vérité des terroirs et l'intégrité des producteurs locaux dans chaque bouteille promue.</p>
                            </div>

                            <div className="value-item">
                                <h3>Engagement Local</h3>
                                <p>Nous soutenons activement l'économie camerounaise et valorisons le travail des vignerons locaux.</p>
                            </div>

                            <div className="value-item">
                                <h3>Excellence</h3>
                                <p>Nous visons l'excellence dans chaque aspect de notre travail, de la sélection des vins au développement technologique.</p>
                            </div>
                        </div>
                    </div>
                </section>


                <section className="team">
                    <div className="container">
                        <div className="section-title">
                            <h2>Notre Équipe</h2>
                        </div>

                        <div className="team-grid">
                            <div className="team-member">
                                {<div className="member-img1">
                                  </div> }
                                <div className="member-info">
                                    <h3>Wally Leonel</h3>
                                    <p>Développeur & Co-fondateur</p>
                                </div>
                            </div>
                            <div className="team-member">
                                <div className="member-img"></div>
                                <div className="member-info">
                                    <h3>Mogoue Kengni Jovane</h3>
                                    <p>Développeur & Co-fondateur</p>
                                </div>
                            </div>


                        </div>
                    </div>
                </section>

                <section className="cta">
                    <div className="container">
                        <h2>Prêt à découvrir l'expérience VinTerror<sup>AR</sup> ?</h2>
                        <p>Téléchargez notre application et explorez les vins camerounais comme jamais auparavant grâce à la réalité augmentée.</p>
                        <a href="#" className="btn">Télécharger l'application</a>
                    </div>
                </section>
            </div>
            <Footer />
        </>
    );
}