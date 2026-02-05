import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Sparkles, ChevronRight } from 'lucide-react';
import { Button } from './ui/Button';
import { cn } from '../lib/utils';
import Modal from './Modal';
import RegisterForm from "./RegisterForm";


const navLinks = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Events', href: '#events' },
  { name: 'Contact', href: '#contact' },
];

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState('Home');
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
          isScrolled ? 'py-2 sm:py-3' : 'py-4 sm:py-5'
        )}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <nav
            className={cn(
              'flex items-center justify-between rounded-2xl transition-all duration-300',
              isScrolled
                ? 'bg-[#0a0a0f]/80 backdrop-blur-xl border border-white/[0.08] px-4 sm:px-6 py-3 shadow-2xl shadow-black/20'
                : 'px-2'
            )}
          >
            {/* Logo */}
            <motion.a
              href="#home"
              className="flex items-center gap-2 sm:gap-3 group z-10"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="relative">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-lg shadow-purple-500/30">
                  <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                </div>
                <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 blur-xl opacity-40 group-hover:opacity-60 transition-opacity" />
              </div>
              <div className="font-display text-lg sm:text-xl font-bold tracking-wide">
                <span className="text-white">THIRAN</span>
                <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">'26</span>
              </div>
            </motion.a>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center">
              <div className="flex items-center gap-1 bg-white/[0.03] backdrop-blur-sm rounded-full p-1.5 border border-white/[0.06]">
                {navLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={() => setActiveLink(link.name)}
                    className={cn(
                      'relative px-4 lg:px-5 py-2 text-sm font-medium transition-all duration-200 rounded-full',
                      activeLink === link.name
                        ? 'text-white'
                        : 'text-gray-400 hover:text-white'
                    )}
                  >
                    {activeLink === link.name && (
                      <motion.div
                        layoutId="activeNav"
                        className="absolute inset-0 bg-white/[0.08] rounded-full"
                        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                      />
                    )}
                    <span className="relative z-10">{link.name}</span>
                  </a>
                ))}
              </div>
            </div>

            {/* CTA Button - Desktop */}
            <div className="hidden md:block">
              <Button variant="primary" size="md" onClick={()=>setOpenModal(true)} className="group">
                <span>Register Now</span>
                <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
              </Button>
            </div>

            <Modal isOpen={openModal} onClose={()=>setOpenModal(false)} >
              <RegisterForm/>
            </Modal>

            {/* Mobile Menu Button */}
            <motion.button
              className="md:hidden relative z-10 w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              whileTap={{ scale: 0.9 }}
              aria-label="Toggle menu"
            >
              <AnimatePresence mode="wait">
                {isMobileMenuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.15 }}
                  >
                    <X size={20} />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.15 }}
                  >
                    <Menu size={20} />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </nav>
        </div>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="fixed top-20 left-4 right-4 z-50 md:hidden"
            >
              <div className="bg-[#0f0f18]/95 backdrop-blur-xl rounded-2xl border border-white/10 p-4 shadow-2xl shadow-black/40">
                <div className="flex flex-col gap-1">
                  {navLinks.map((link, index) => (
                    <motion.a
                      key={link.name}
                      href={link.href}
                      onClick={() => {
                        setActiveLink(link.name);
                        setIsMobileMenuOpen(false);
                      }}
                      className={cn(
                        'flex items-center justify-between px-4 py-3.5 rounded-xl font-medium transition-all',
                        activeLink === link.name
                          ? 'bg-purple-500/10 text-white'
                          : 'text-gray-400 hover:text-white hover:bg-white/5'
                      )}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <span>{link.name}</span>
                      {activeLink === link.name && (
                        <div className="w-1.5 h-1.5 rounded-full bg-purple-500" />
                      )}
                    </motion.a>
                  ))}
                </div>
                <div className="mt-4 pt-4 border-t border-white/5">
                  <Button
                    variant="primary"
                    size="lg"
                    className="w-full justify-center"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <span>Register Now</span>
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
