import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import WhyThiran from './components/WhyThiran';
import Events from './components/Events';
import EventModal from './components/EventModal';
import ParticleField from './components/ParticleField';
import Footer from './components/Footer';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { ToastContainer } from 'react-toastify';
import './index.css';

gsap.registerPlugin(ScrollTrigger);

// Replace with your Google OAuth Client ID
const GOOGLE_CLIENT_ID = 'YOUR_GOOGLE_CLIENT_ID.apps.googleusercontent.com';

function App() {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });
  const appRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth) * 100;
      const y = (e.clientY / window.innerHeight) * 100;
      setMousePosition({ x, y });
      
      if (appRef.current) {
        appRef.current.style.setProperty('--mouse-x', `${x}%`);
        appRef.current.style.setProperty('--mouse-y', `${y}%`);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleEventClick = (event) => {
    setSelectedEvent(event);
  };

  const handleCloseModal = () => {
    setSelectedEvent(null);
  };

  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <div ref={appRef} className="cyber-bg min-h-screen relative noise">
        <div className="grid-pattern fixed inset-0 pointer-events-none z-0" />
        <ParticleField />
        <Navbar />
        <ToastContainer autoClose={3000} position='bottom-center'/>
        <main className="relative z-10 space-y-12 sm:space-y-16 lg:space-y-24">
          <Hero mousePosition={mousePosition} />
          <WhyThiran />
          <Events onEventClick={handleEventClick} mousePosition={mousePosition} />
        </main>

        <Footer />

        {selectedEvent && (
          <EventModal event={selectedEvent} onClose={handleCloseModal} />
        )}
      </div>
    </GoogleOAuthProvider>
  );
}

export default App;
