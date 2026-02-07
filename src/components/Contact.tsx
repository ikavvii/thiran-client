import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  MapPin, 
  Send, 
  CheckCircle,
  Mail,
  Phone,
  Sparkles,
  Heart
} from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { contactInfo, socialLinks } from '@/data/contact';

gsap.registerPlugin(ScrollTrigger);

// Floating particle component
const FloatingParticle = ({ delay = 0 }: { delay?: number }) => (
  <motion.div
    className="absolute w-1 h-1 rounded-full bg-gradient-to-r from-violet-400 to-fuchsia-400"
    initial={{ opacity: 0, y: 100 }}
    animate={{ 
      opacity: [0, 1, 0],
      y: [-20, -100],
      x: [0, Math.random() * 40 - 20],
    }}
    transition={{
      duration: 3,
      delay,
      repeat: Infinity,
      ease: "easeOut"
    }}
  />
);

export default function Contact() {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    gsap.to('.contact-aurora-1', {
      yPercent: -30,
      xPercent: 20,
      rotation: 15,
      ease: 'none',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
    });

    gsap.to('.contact-aurora-2', {
      yPercent: 40,
      xPercent: -25,
      rotation: -10,
      ease: 'none',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
    });
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    
    setTimeout(() => {
      setFormState({ name: '', email: '', subject: '', message: '' });
      setIsSubmitted(false);
    }, 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  return (
    <section ref={sectionRef} id="contact" className="section-padding relative overflow-hidden">
      {/* Aurora background effects */}
      <div className="contact-aurora-1 absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full opacity-30"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(139, 92, 246, 0.4) 0%, rgba(236, 72, 153, 0.2) 40%, transparent 70%)',
          filter: 'blur(80px)',
        }}
      />
      <div className="contact-aurora-2 absolute -bottom-40 -left-40 w-[500px] h-[500px] rounded-full opacity-25"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(34, 211, 238, 0.4) 0%, rgba(139, 92, 246, 0.2) 40%, transparent 70%)',
          filter: 'blur(80px)',
        }}
      />
      
      {/* Subtle mesh gradient overlay */}
      <div className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            radial-gradient(at 20% 30%, rgba(139, 92, 246, 0.8) 0%, transparent 50%),
            radial-gradient(at 80% 70%, rgba(236, 72, 153, 0.6) 0%, transparent 50%),
            radial-gradient(at 50% 50%, rgba(34, 211, 238, 0.4) 0%, transparent 50%)
          `,
        }}
      />

      <div className="container mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.div 
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full mb-6"
            style={{
              background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.15) 0%, rgba(236, 72, 153, 0.15) 100%)',
              border: '1px solid rgba(139, 92, 246, 0.3)',
            }}
            whileHover={{ scale: 1.05 }}
          >
            <Sparkles className="w-4 h-4 text-violet-400" />
            <span className="text-sm text-violet-300 font-medium">Let's Connect</span>
          </motion.div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            <span className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-cyan-400 bg-clip-text text-transparent">
              Get In Touch
            </span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            We'd love to hear from you! Drop us a message and 
            let's create something amazing together.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Contact Info - Left Side */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2 space-y-5"
          >
            {/* Info Cards with new design */}
            {contactInfo.map((info, index) => {
              const Icon = info.icon;
              const gradients = [
                'from-violet-500/20 to-fuchsia-500/20',
                'from-fuchsia-500/20 to-pink-500/20',
                'from-cyan-500/20 to-violet-500/20',
              ];
              const iconBgs = [
                'from-violet-500 to-fuchsia-500',
                'from-fuchsia-500 to-pink-500',
                'from-cyan-500 to-violet-500',
              ];
              
              return (
                <motion.a
                  key={info.label}
                  href={info.href}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ scale: 1.02, x: 5 }}
                  className="block group"
                >
                  <div 
                    className={`relative p-5 rounded-2xl bg-gradient-to-br ${gradients[index]} backdrop-blur-xl border border-white/10 overflow-hidden`}
                  >
                    {/* Hover glow effect */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      style={{
                        background: 'radial-gradient(circle at 50% 50%, rgba(139, 92, 246, 0.2) 0%, transparent 70%)',
                      }}
                    />
                    
                    <div className="relative flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${iconBgs[index]} flex items-center justify-center shadow-lg`}>
                        <Icon className="w-5 h-5 text-white" />
                      </div>
                      <div className="flex-1">
                        <p className="text-xs text-gray-500 uppercase tracking-wider mb-0.5">{info.label}</p>
                        <p className="font-medium text-white group-hover:text-violet-300 transition-colors">{info.value}</p>
                      </div>
                      <motion.div
                        className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                        whileHover={{ scale: 1.1 }}
                      >
                        <Send className="w-3.5 h-3.5 text-violet-400" />
                      </motion.div>
                    </div>
                  </div>
                </motion.a>
              );
            })}

            {/* Social Links with floating effect */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="p-6 rounded-2xl bg-gradient-to-br from-violet-500/10 to-fuchsia-500/10 backdrop-blur-xl border border-white/10"
            >
              <div className="flex items-center gap-2 mb-4">
                <Heart className="w-4 h-4 text-fuchsia-400" />
                <h3 className="text-lg font-semibold text-white">Follow Us</h3>
              </div>
              <div className="flex gap-3">
                {socialLinks.map((social, index) => {
                  const Icon = social.icon;
                  const colors = ['hover:bg-violet-500', 'hover:bg-cyan-500', 'hover:bg-fuchsia-500', 'hover:bg-pink-500'];
                  return (
                    <motion.a
                      key={social.label}
                      href={social.href}
                      className={`w-11 h-11 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center ${colors[index % colors.length]} hover:border-transparent hover:text-white text-gray-400 transition-all duration-300`}
                      aria-label={social.label}
                      whileHover={{ scale: 1.15, y: -3, rotate: 5 }}
                      whileTap={{ scale: 0.9 }}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 + index * 0.1 }}
                    >
                      <Icon className="w-4 h-4" />
                    </motion.a>
                  );
                })}
              </div>
            </motion.div>

            {/* Location Card with animation */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="p-5 rounded-2xl bg-gradient-to-br from-cyan-500/10 to-violet-500/10 backdrop-blur-xl border border-white/10 relative overflow-hidden"
            >
              {/* Floating particles */}
              <div className="absolute inset-0 pointer-events-none">
                {[...Array(5)].map((_, i) => (
                  <FloatingParticle key={i} delay={i * 0.6} />
                ))}
              </div>
              
              <div className="aspect-video rounded-xl overflow-hidden relative group cursor-pointer">
                {/* Animated gradient background */}
                <div className="absolute inset-0 bg-gradient-to-br from-violet-900/40 via-fuchsia-900/30 to-cyan-900/40" />
                <motion.div 
                  className="absolute inset-0"
                  animate={{
                    background: [
                      'radial-gradient(circle at 30% 30%, rgba(139, 92, 246, 0.3) 0%, transparent 50%)',
                      'radial-gradient(circle at 70% 70%, rgba(236, 72, 153, 0.3) 0%, transparent 50%)',
                      'radial-gradient(circle at 30% 30%, rgba(139, 92, 246, 0.3) 0%, transparent 50%)',
                    ]
                  }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                />
                {/* Dot pattern */}
                <div className="absolute inset-0 opacity-20"
                  style={{
                    backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)',
                    backgroundSize: '12px 12px',
                  }}
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.div 
                    className="text-center"
                    whileHover={{ scale: 1.1 }}
                  >
                    <motion.div
                      animate={{ y: [0, -8, 0] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    >
                      <MapPin className="w-10 h-10 text-fuchsia-400 mx-auto mb-2" />
                    </motion.div>
                    <p className="text-gray-400 text-sm group-hover:text-white transition-colors font-medium">Tech Campus, Chennai</p>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Contact Form - Right Side */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-3"
          >
            <div className="relative p-8 md:p-10 rounded-3xl overflow-hidden"
              style={{
                background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.1) 0%, rgba(236, 72, 153, 0.08) 50%, rgba(34, 211, 238, 0.1) 100%)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
              }}
            >
              {/* Animated border glow */}
              <div className="absolute inset-0 rounded-3xl opacity-50"
                style={{
                  background: 'linear-gradient(135deg, transparent 0%, rgba(139, 92, 246, 0.1) 50%, transparent 100%)',
                }}
              />
              
              <form onSubmit={handleSubmit} className="relative">
                {isSubmitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-16"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', delay: 0.2 }}
                      className="w-20 h-20 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center mx-auto mb-6"
                    >
                      <CheckCircle className="w-10 h-10 text-white" />
                    </motion.div>
                    <h3 className="text-2xl font-bold mb-2 bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                      Message Sent!
                    </h3>
                    <p className="text-gray-400">
                      Thank you for reaching out. We'll get back to you soon.
                    </p>
                  </motion.div>
                ) : (
                  <>
                    <div className="flex items-center gap-3 mb-8">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center">
                        <Mail className="w-5 h-5 text-white" />
                      </div>
                      <h3 className="text-2xl font-bold bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
                        Send a Message
                      </h3>
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-5 mb-5">
                      {/* Name Input */}
                      <div className="group">
                        <label htmlFor="name" className={`block text-sm font-medium mb-2 transition-colors ${focusedField === 'name' ? 'text-violet-400' : 'text-gray-400'}`}>
                          Your Name
                        </label>
                        <motion.div
                          className="relative"
                          whileFocus={{ scale: 1.01 }}
                        >
                          <input
                            type="text"
                            id="name"
                            name="name"
                            value={formState.name}
                            onChange={handleChange}
                            onFocus={() => setFocusedField('name')}
                            onBlur={() => setFocusedField(null)}
                            placeholder="John Doe"
                            className="w-full px-4 py-3.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-gray-500 focus:outline-none focus:border-violet-500/50 focus:bg-violet-500/5 transition-all duration-300"
                            required
                          />
                          {focusedField === 'name' && (
                            <motion.div
                              layoutId="inputGlow"
                              className="absolute inset-0 rounded-xl pointer-events-none"
                              style={{
                                boxShadow: '0 0 20px rgba(139, 92, 246, 0.3)',
                              }}
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              exit={{ opacity: 0 }}
                            />
                          )}
                        </motion.div>
                      </div>
                      
                      {/* Email Input */}
                      <div className="group">
                        <label htmlFor="email" className={`block text-sm font-medium mb-2 transition-colors ${focusedField === 'email' ? 'text-fuchsia-400' : 'text-gray-400'}`}>
                          Email Address
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formState.email}
                          onChange={handleChange}
                          onFocus={() => setFocusedField('email')}
                          onBlur={() => setFocusedField(null)}
                          placeholder="john@example.com"
                          className="w-full px-4 py-3.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-gray-500 focus:outline-none focus:border-fuchsia-500/50 focus:bg-fuchsia-500/5 transition-all duration-300"
                          required
                        />
                      </div>
                    </div>

                    {/* Subject Input */}
                    <div className="mb-5 group">
                      <label htmlFor="subject" className={`block text-sm font-medium mb-2 transition-colors ${focusedField === 'subject' ? 'text-cyan-400' : 'text-gray-400'}`}>
                        Subject
                      </label>
                      <input
                        type="text"
                        id="subject"
                        name="subject"
                        value={formState.subject}
                        onChange={handleChange}
                        onFocus={() => setFocusedField('subject')}
                        onBlur={() => setFocusedField(null)}
                        placeholder="How can we help?"
                        className="w-full px-4 py-3.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-gray-500 focus:outline-none focus:border-cyan-500/50 focus:bg-cyan-500/5 transition-all duration-300"
                        required
                      />
                    </div>

                    {/* Message Input */}
                    <div className="mb-8 group">
                      <label htmlFor="message" className={`block text-sm font-medium mb-2 transition-colors ${focusedField === 'message' ? 'text-violet-400' : 'text-gray-400'}`}>
                        Message
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formState.message}
                        onChange={handleChange}
                        onFocus={() => setFocusedField('message')}
                        onBlur={() => setFocusedField(null)}
                        placeholder="Your message here..."
                        rows={5}
                        className="w-full px-4 py-3.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-gray-500 focus:outline-none focus:border-violet-500/50 focus:bg-violet-500/5 transition-all duration-300 resize-none"
                        required
                      />
                    </div>

                    {/* Submit Button */}
                    <motion.button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full relative py-4 px-6 rounded-xl font-semibold text-white overflow-hidden group disabled:opacity-70"
                      style={{
                        background: 'linear-gradient(135deg, #8b5cf6 0%, #d946ef 50%, #06b6d4 100%)',
                      }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {/* Animated shine effect */}
                      <motion.div
                        className="absolute inset-0 opacity-0 group-hover:opacity-100"
                        style={{
                          background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
                        }}
                        animate={{
                          x: ['-100%', '100%'],
                        }}
                        transition={{
                          duration: 1.5,
                          repeat: Infinity,
                          repeatDelay: 0.5,
                        }}
                      />
                      
                      <span className="relative flex items-center justify-center gap-2">
                        {isSubmitting ? (
                          <motion.div
                            className="w-6 h-6 border-2 border-white border-t-transparent rounded-full"
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                          />
                        ) : (
                          <>
                            Send Message
                            <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                          </>
                        )}
                      </span>
                    </motion.button>
                  </>
                )}
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
