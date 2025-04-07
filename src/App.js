import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './App.css';
import logoImage from './assets/JLM MUNDIAPOLIS CASABLANCA COLORFUL PNG.png';

// Constantes pour les transitions réutilisables
const springTransition = {
  type: "spring",
  stiffness: 300,
  damping: 15
};

const fadeInTransition = {
  duration: 0.8
};

// Variantes d'animation regroupées
const animations = {
  fadeIn: {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: fadeInTransition
    }
  },
  
  fadeInUp: {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { ...fadeInTransition, delay: 0.2 }
    }
  },
  
  staggerContainer: {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2
      }
    }
  },
  
  socialCard3D: {
    rest: { 
      rotateY: 0,
      rotateX: 0,
      scale: 1,
      z: 0,
      boxShadow: "0px 10px 20px rgba(0,0,0,0.1)"
    },
    hover: { 
      rotateY: 15,
      rotateX: -10,
      scale: 1.05,
      z: 50,
      boxShadow: "0px 30px 50px rgba(0,0,0,0.3)",
      transition: { duration: 0.4, ease: "easeOut" }
    }
  },
  
  logoAnimation: {
    initial: { 
      scale: 0,
      rotate: -180,
      opacity: 0 
    },
    animate: { 
      scale: 1,
      rotate: 0,
      opacity: 1,
      transition: { 
        ...springTransition,
        stiffness: 260, 
        damping: 20,
        delay: 0.3
      } 
    },
    hover: { 
      scale: 1.1,
      rotate: 10,
      boxShadow: "0px 20px 30px rgba(0,0,0,0.2)",
      transition: { 
        ...springTransition,
        stiffness: 400, 
        damping: 10 
      } 
    },
    tap: {
      scale: 0.95,
      rotate: -5,
      transition: springTransition
    }
  }
};

function App() {
  // Utilisation de useRef pour les références aux éléments DOM
  const formRef = useRef(null);
  const [scrollY, setScrollY] = useState(0);
  const [formStatus, setFormStatus] = useState('');
  const [formVisible, setFormVisible] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Effet pour gérer le défilement
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Fonction pour défiler vers une section
  const scrollToSection = (id) => {
    document.getElementById(id).scrollIntoView({ behavior: 'smooth' });
  };
  
  // Gestion des changements dans le formulaire
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  // Gestion de la soumission du formulaire
  const handleSubmit = (e) => {
    // Ne pas empêcher la soumission par défaut pour permettre à FormSubmit de fonctionner
    // e.preventDefault();
    
    // Marquer le formulaire comme soumis pour afficher le message de confirmation
    setFormSubmitted(true);
    
    // Pas besoin de réinitialiser le formulaire ici car la page sera rechargée par FormSubmit
  };

  // Effet de parallaxe pour le fond de la section hero
  const parallaxEffect = {
    y: scrollY * 0.3
  };

  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      variants={animations.fadeInUp}
      className="font-sans"
    >
      {/* Navigation Bar */}
      <nav className="bg-gradient-to-r from-green-600 to-yellow-400 shadow-md fixed top-0 left-0 right-0 z-50">
        <div className="container mx-auto px-4 py-3">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.95 }}
                className="mr-3"
              >
                <img src={logoImage} alt="JLM Logo" className="h-10 w-10" />
              </motion.div>
              <div className="text-xl font-bold text-white">JLM MUNDIAPOLIS</div>
            </div>
            <div className="hidden md:flex space-x-8">
              <button onClick={() => scrollToSection('about')} className="text-white hover:text-white hover:opacity-80 transition duration-300">À propos</button>
              <button onClick={() => scrollToSection('activities')} className="text-white hover:text-white hover:opacity-80 transition duration-300">Activités</button>
              <button onClick={() => scrollToSection('social')} className="text-white hover:text-white hover:opacity-80 transition duration-300">Photos & Vidéos</button>
              <button onClick={() => scrollToSection('contact')} className="text-white hover:text-white hover:opacity-80 transition duration-300">Contact</button>
            </div>
            <div className="md:hidden">
              <button className="text-white">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section 
        id="hero"
        className="bg-gradient-to-r from-green-600 to-yellow-400 text-white py-20 px-4 mt-16 relative overflow-hidden"
        style={{
          backgroundPosition: `${scrollY * 0.5}px 0px`
        }}
      >
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-.895-3-2-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-.895-3-2-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-.895-3-2-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-.895-3-2-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23ffffff' fill-opacity='0.1' fill-rule='evenodd'/%3E%3C/svg%3E")`,
            transform: `translateY(${scrollY * 0.3}px)`
          }}
        />
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-between">
          <div className="md:w-1/2 text-center md:text-left mb-8 md:mb-0">
            <motion.h1 
              className="text-5xl md:text-6xl font-bold mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              JLM MUNDIAPOLIS
            </motion.h1>
            <motion.p 
              className="text-xl mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Agir ensemble pour un avenir meilleur
            </motion.p>
           
          </div>
          <div className="md:w-1/2 flex justify-center">
            <motion.div
              initial="initial"
              animate="animate"
              whileHover="hover"
              whileTap="tap"
              variants={animations.logoAnimation}
              className="relative"
            >
              <img 
                src={logoImage} 
                alt="JLM Mundiapolis Logo" 
                className="w-64 h-64 object-contain"
              />
              <motion.div
                className="absolute inset-0"
                animate={{ 
                  rotate: 360,
                  transition: { 
                    repeat: Infinity, 
                    duration: 20, 
                    ease: "linear" 
                  } 
                }}
              >
                <div className="w-full h-full opacity-0">Animation overlay</div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <motion.section 
        initial="hidden"
        animate="visible"
        variants={animations.fadeInUp}
        id="about" 
        className="py-16 px-4 bg-green-50 relative overflow-hidden"
      >
        {/* Éléments décoratifs en arrière-plan */}
        <motion.div 
          className="absolute inset-0 w-full h-full opacity-10 pointer-events-none"
          style={{ y: parallaxEffect.y * 0.5 }}
        >
          <div className="absolute top-20 right-10 w-60 h-60 rounded-full bg-green-500"></div>
          <div className="absolute bottom-10 left-20 w-40 h-40 rounded-full bg-yellow-500"></div>
        </motion.div>
        
        <div className="container mx-auto max-w-4xl relative z-10">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold text-center mb-8 text-green-700"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            À propos de nous
          </motion.h2>
          <motion.div 
            className="bg-white p-8 rounded-lg shadow-lg border border-green-200"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            whileHover={{ 
              boxShadow: "0px 20px 40px rgba(0,0,0,0.2)",
              translateY: -5,
              transition: { duration: 0.3 }
            }}
          >
            <p className="mb-4 text-gray-700">
  <span className="font-bold">JLM MUNDIAPOLIS </span> est un club universitaire dynamique qui rassemble des étudiants passionnés et engagés de l'Université Mundiapolis.
</p>

            <p className="mb-4 text-gray-700">
              Notre mission est de créer un environnement où les étudiants peuvent développer leurs compétences, contribuer à la société et s'épanouir personnellement à travers diverses activités et initiatives.
            </p>
            <p className="text-gray-700">
              Nous croyons au pouvoir de l'action collective et à l'impact positif que nous pouvons avoir ensemble sur notre communauté et au-delà.
            </p>
          </motion.div>
        </div>
      </motion.section>

      {/* Activities Section */}
      <motion.section 
        initial="hidden"
        animate="visible"
        variants={animations.fadeInUp}
        id="activities" 
        className="py-16 px-4 bg-white"
      >
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-green-700">Nos Activités</h2>
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={animations.staggerContainer}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {/* Humanitarian Activities */}
            <motion.div 
              initial="rest"
              whileHover="hover"
              variants={animations.socialCard3D}
              className="bg-white p-6 rounded-lg shadow-lg border-t-4 border-red-400 perspective-1000"
              style={{ transformStyle: "preserve-3d" }}
            >
              <div style={{ transform: "translateZ(20px)" }}>
                <motion.div 
                  className="text-4xl mb-4 text-center text-red-500"
                  animate={{ 
                    rotateY: [0, 10, 0], 
                    y: [0, -5, 0] 
                  }}
                  transition={{ 
                    repeat: Infinity, 
                    repeatType: "mirror", 
                    duration: 5,
                    ease: "easeInOut"
                  }}
                >
                  ❤️
                </motion.div>
                <h3 className="text-2xl font-bold mb-4 text-center text-red-500">Activités Humanitaires</h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-center">
                    <span className="mr-2">✅</span>
                    <span>Collectes de dons</span>
                  </li>
                  <li className="flex items-center">
                    <span className="mr-2">✅</span>
                    <span>Visites aux orphelinats</span>
                  </li>
                  <li className="flex items-center">
                    <span className="mr-2">✅</span>
                    <span>Campagnes de sensibilisation</span>
                  </li>
                  <li className="flex items-center">
                    <span className="mr-2">✅</span>
                    <span>Actions environnementales</span>
                  </li>
                  <li className="flex items-center">
                    <span className="mr-2">✅</span>
                    <span>Sensibilisation aux enjeux sociétaux</span>
                  </li>
                </ul>
              </div>
            </motion.div>

            {/* Personal Development Activities */}
            <motion.div 
              initial="rest"
              whileHover="hover"
              variants={animations.socialCard3D}
              className="bg-white p-6 rounded-lg shadow-lg border-t-4 border-green-400 perspective-1000"
              style={{ transformStyle: "preserve-3d" }}
            >
              <div style={{ transform: "translateZ(20px)" }}>
                <motion.div 
                  className="text-4xl mb-4 text-center text-green-500"
                  animate={{ 
                    rotateY: [0, -10, 0], 
                    y: [0, -5, 0] 
                  }}
                  transition={{ 
                    repeat: Infinity, 
                    repeatType: "mirror", 
                    duration: 5,
                    ease: "easeInOut",
                    delay: 0.5
                  }}
                >
                  🌱
                </motion.div>
                <h3 className="text-2xl font-bold mb-4 text-center text-green-500">Développement Personnel</h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-center">
                    <span className="mr-2">✅</span>
                    <span>Ateliers de soft skills</span>
                  </li>
                  <li className="flex items-center">
                    <span className="mr-2">✅</span>
                    <span>Formations professionnelles</span>
                  </li>
                  <li className="flex items-center">
                    <span className="mr-2">✅</span>
                    <span>Conférences thématiques</span>
                  </li>
                  <li className="flex items-center">
                    <span className="mr-2">✅</span>
                    <span>Débats et tables rondes</span>
                  </li>
                  <li className="flex items-center">
                    <span className="mr-2">✅</span>
                    <span>Programmes de leadership</span>
                  </li>
                </ul>
              </div>
            </motion.div>

            {/* Sports Activities */}
            <motion.div 
              initial="rest"
              whileHover="hover"
              variants={animations.socialCard3D}
              className="bg-white p-6 rounded-lg shadow-lg border-t-4 border-yellow-400 perspective-1000"
              style={{ transformStyle: "preserve-3d" }}
            >
              <div style={{ transform: "translateZ(20px)" }}>
                <motion.div 
                  className="text-4xl mb-4 text-center text-yellow-500"
                  animate={{ 
                    rotateY: [0, 10, 0], 
                    y: [0, -5, 0] 
                  }}
                  transition={{ 
                    repeat: Infinity, 
                    repeatType: "mirror", 
                    duration: 5,
                    ease: "easeInOut",
                    delay: 1
                  }}
                >
                  🏆
                </motion.div>
                <h3 className="text-2xl font-bold mb-4 text-center text-yellow-500">Activités Sportives</h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-center">
                    <span className="mr-2">✅</span>
                    <span>Tournois sportifs</span>
                  </li>
                  <li className="flex items-center">
                    <span className="mr-2">✅</span>
                    <span>Séances d'entraînement</span>
                  </li>
                  <li className="flex items-center">
                    <span className="mr-2">✅</span>
                    <span>Compétitions interuniversitaires</span>
                  </li>
                  <li className="flex items-center">
                    <span className="mr-2">✅</span>
                    <span>Activités de plein air</span>
                  </li>
                  <li className="flex items-center">
                    <span className="mr-2">✅</span>
                    <span>Événements sportifs caritatifs</span>
                  </li>
                </ul>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* Social Media Section */}
      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={animations.fadeInUp}
        id="social" 
        className="py-16 px-4 bg-gradient-to-r from-yellow-50 to-green-50"
      >
        <div className="container mx-auto max-w-6xl">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold text-center mb-4 text-green-700"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Nos Photos et Vidéos
          </motion.h2>
          <motion.p 
            className="text-center text-gray-600 mb-12 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Découvrez nos activités en images et vidéos sur nos réseaux sociaux !
          </motion.p>
          
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={animations.staggerContainer}
            className="grid md:grid-cols-2 gap-8"
          >
            {/* TikTok Card */}
            <motion.div 
              initial="rest"
              whileHover="hover"
              variants={animations.socialCard3D}
              className="bg-white rounded-lg shadow-lg overflow-hidden perspective-1000"
              style={{ transformStyle: "preserve-3d" }}
            >
              <div className="p-8 text-center" style={{ transform: "translateZ(20px)" }}>
                <motion.div 
                  className="text-4xl mb-4 flex justify-center"
                  animate={{ rotateY: [0, 10, 0], rotateX: [0, 5, 0] }}
                  transition={{ 
                    repeat: Infinity, 
                    repeatType: "mirror", 
                    duration: 6,
                    ease: "easeInOut"
                  }}
                >
                  <span className="bg-black text-white rounded-full w-16 h-16 flex items-center justify-center">
                    <span className="text-2xl">📱</span>
                  </span>
                </motion.div>
                <h3 className="text-xl font-bold mb-2">TikTok</h3>
                <p className="text-gray-600 mb-6">Retrouvez nos vidéos d'activités, challenges et moments forts</p>
                <a 
                  href="https://www.tiktok.com/@jlm_mundiapolis?_t=ZM-8vJi0hfLJYd&_r=1" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="bg-black text-white font-bold py-2 px-6 rounded-full inline-flex items-center hover:bg-gray-800 transition duration-300"
                >
                  <span className="mr-2">Voir nos vidéos</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </a>
              </div>
            </motion.div>
            
            {/* Instagram Card */}
            <motion.div 
              initial="rest"
              whileHover="hover"
              variants={animations.socialCard3D}
              className="bg-white rounded-lg shadow-lg overflow-hidden perspective-1000"
              style={{ transformStyle: "preserve-3d" }}
            >
              <div className="p-8 text-center" style={{ transform: "translateZ(20px)" }}>
                <motion.div 
                  className="text-4xl mb-4 flex justify-center"
                  animate={{ rotateY: [0, -10, 0], rotateX: [0, 5, 0] }}
                  transition={{ 
                    repeat: Infinity, 
                    repeatType: "mirror", 
                    duration: 6,
                    ease: "easeInOut",
                    delay: 0.5
                  }}
                >
                  <span className="bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full w-16 h-16 flex items-center justify-center">
                    <span className="text-2xl">📸</span>
                  </span>
                </motion.div>
                <h3 className="text-xl font-bold mb-2">Instagram</h3>
                <p className="text-gray-600 mb-6">Explorez nos galeries photos, stories et moments partagés</p>
                <a 
                  href="https://www.instagram.com/jlm_mundiapolis?igshid=YmMyMTA2M2Y=" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold py-2 px-6 rounded-full inline-flex items-center hover:from-purple-600 hover:to-pink-600 transition duration-300"
                >
                  <span className="mr-2">Voir nos photos</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </a>
              </div>
            </motion.div>
          </motion.div>
          
          <motion.p 
            className="text-center text-gray-600 mt-12 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            Suivez-nous pour ne rien manquer de nos événements et activités !
          </motion.p>
        </div>
      </motion.section>

      {/* Contact Section */}
      <motion.section 
        initial="hidden"
        animate="visible"
        variants={animations.fadeInUp}
        id="contact" 
        className="py-16 px-4 bg-green-50 relative overflow-hidden"
      >
        {/* Éléments décoratifs en arrière-plan */}
        <motion.div 
          className="absolute inset-0 w-full h-full opacity-10 pointer-events-none"
          style={{ y: parallaxEffect.y * 0.3 }}
        >
          <div className="absolute top-20 left-10 w-40 h-40 rounded-full bg-green-500"></div>
          <div className="absolute bottom-40 right-20 w-60 h-60 rounded-full bg-yellow-500"></div>
        </motion.div>
        
        <div className="container mx-auto max-w-4xl relative z-10">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold text-center mb-8 text-green-700"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            📬
          </motion.h2>
          <motion.div 
            className="bg-white p-8 rounded-lg shadow-lg border border-green-200"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            whileHover={{ 
              boxShadow: "0px 20px 40px rgba(0,0,0,0.2)",
              translateY: -5,
              transition: { duration: 0.3 }
            }}
          >
            <form 
              action="https://formsubmit.co/yassine99zbir@gmail.com" 
              method="POST"
              className="space-y-6"
              onSubmit={handleSubmit}
            >
              <input type="hidden" name="_captcha" value="false" />
              <input type="hidden" name="_next" value={window.location.protocol + '//' + window.location.host + window.location.pathname + '#contact'} />
              <input type="hidden" name="_subject" value="Nouveau message du site JLM Mundiapolis" />
              
              <div className="mb-6">
                <label htmlFor="name" className="block text-gray-700 font-bold mb-2">Nom & Prénom</label>
                <motion.input 
                  whileFocus={{ scale: 1.02, boxShadow: "0px 5px 15px rgba(0,0,0,0.1)" }}
                  transition={{ duration: 0.2 }}
                  type="text" 
                  id="name" 
                  name="name" 
                  value={formData.name} 
                  onChange={handleChange} 
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-green-500" 
                  required 
                />
              </div>
              <div className="mb-6">
                <label htmlFor="email" className="block text-gray-700 font-bold mb-2">Email</label>
                <motion.input 
                  whileFocus={{ scale: 1.02, boxShadow: "0px 5px 15px rgba(0,0,0,0.1)" }}
                  transition={{ duration: 0.2 }}
                  type="email" 
                  id="email" 
                  name="email" 
                  value={formData.email} 
                  onChange={handleChange} 
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-green-500" 
                  required 
                />
              </div>
              <div className="mb-6">
                <label htmlFor="message" className="block text-gray-700 font-bold mb-2">Message</label>
                <motion.textarea 
                  whileFocus={{ scale: 1.02, boxShadow: "0px 5px 15px rgba(0,0,0,0.1)" }}
                  transition={{ duration: 0.2 }}
                  id="message" 
                  name="message" 
                  value={formData.message} 
                  onChange={handleChange} 
                  rows="5" 
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-green-500" 
                  required
                ></motion.textarea>
              </div>
              <div className="text-center">
                <motion.button 
                  whileHover={{ 
                    scale: 1.05,
                    boxShadow: "0px 10px 25px rgba(0,128,0,0.3)",
                  }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  type="submit" 
                  className="bg-gradient-to-r from-green-600 to-green-500 text-white font-bold py-3 px-8 rounded-full hover:from-green-700 hover:to-green-600 transition duration-300 transform"
                >
                  Envoyer
                </motion.button>
              </div>
              {formSubmitted && (
                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="text-lg text-green-600 font-bold mt-6 text-center"
                >
                  Merci pour votre message ! Nous vous répondrons dès que possible.
                </motion.p>
              )}
            </form>
          </motion.div>
        </div>
      </motion.section>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-green-600 to-yellow-400 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0 flex items-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                whileHover={{ 
                  scale: 1.1,
                  rotate: 10,
                  transition: { type: "spring", stiffness: 400, damping: 10 }
                }}
                className="mr-4"
              >
                <img src={logoImage} alt="JLM Logo" className="h-16 w-16" />
              </motion.div>
              <div>
                <h3 className="text-xl font-bold mb-2">JLM MUNDIAPOLIS</h3>
                <p className="text-white opacity-80">Agir ensemble pour un avenir meilleur</p>
              </div>
            </div>
            <div className="flex flex-col items-center md:items-end">
              <div className="flex space-x-4 mb-4">
                <a 
                  href="https://www.tiktok.com/@jlm_mundiapolis?_t=ZM-8vJi0hfLJYd&_r=1" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-white hover:text-white hover:opacity-80 transition duration-300"
                >
                  <span className="text-2xl">🎬</span>
                </a>
                <a 
                  href="https://www.instagram.com/jlm_mundiapolis?igshid=YmMyMTA2M2Y=" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-white hover:text-white hover:opacity-80 transition duration-300"
                >
                  <span className="text-2xl">📸</span>
                </a>
              </div>
              <p className="text-sm text-white opacity-80">&copy; {new Date().getFullYear()} JLM Mundiapolis. Tous droits réservés.</p>
            </div>
          </div>
        </div>
      </footer>
    </motion.div>
  );
}

export default App;
