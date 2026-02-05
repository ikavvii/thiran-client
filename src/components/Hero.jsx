import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import gsap from "gsap";
import {
  ArrowRight,
  Play,
  Users,
  Calendar,
  Trophy,
  Link2,
  Smartphone,
  MessageCircle,
} from "lucide-react";
import { Button } from "./ui/Button";
import { Badge } from "./ui/Badge";
import { cn } from "../lib/utils";

const Hero = ({ mousePosition }) => {
  const heroRef = useRef(null);
  const glowRef = useRef(null);
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  useEffect(() => {
    if (glowRef.current) {
      gsap.to(glowRef.current, {
        x: (mousePosition.x - 50) * 3,
        y: (mousePosition.y - 50) * 3,
        duration: 1,
        ease: "power2.out",
      });
    }
  }, [mousePosition]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
    },
  };

  const stats = [
    { icon: Calendar, value: "March 15-17", label: "2026" },
    { icon: Users, value: "1000+", label: "Participants" },
    { icon: Trophy, value: "₹1L+", label: "Prize Pool" },
  ];

  const socialIcons = [
    { icon: Link2, label: "Website" },
    { icon: Smartphone, label: "App" },
    { icon: MessageCircle, label: "Chat" },
  ];

  return (
    <section
      ref={heroRef}
      id="home"
      className="min-h-screen flex items-center relative overflow-hidden pt-20 sm:pt-24 pb-16 sm:pb-20"
    >
      {/* Animated glow orb */}
      <motion.div
        ref={glowRef}
        className="absolute w-[500px] sm:w-[700px] lg:w-[900px] aspect-square rounded-full pointer-events-none opacity-60"
        style={{
          background:
            "radial-gradient(circle, rgba(168,85,247,0.2) 0%, rgba(236,72,153,0.1) 40%, transparent 70%)",
          filter: "blur(80px)",
          y,
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
        }}
      />

      {/* Large year text in background */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center lg:justify-end lg:pr-20 pointer-events-none select-none overflow-hidden"
        style={{ opacity }}
      >
        <motion.span
          className="text-[30vw] sm:text-[25vw] lg:text-[20vw] font-display font-black text-transparent opacity-30"
          style={{ WebkitTextStroke: "1px rgba(168,85,247,0.2)" }}
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 0.3 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        >
          2026
        </motion.span>
      </motion.div>

      {/* Vertical text decoration - Hidden on mobile */}
      <motion.div
        className="absolute left-4 lg:left-8 top-1/2 -translate-y-1/2 hidden lg:flex flex-col items-center gap-4"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.8, duration: 0.6 }}
      >
        <div className="w-px h-16 bg-gradient-to-b from-transparent via-purple-500/50 to-transparent" />
        <span
          className="text-[10px] font-medium tracking-[0.2em] text-gray-500 uppercase"
          style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
        >
          The Future Is Now
        </span>
        <div className="w-px h-16 bg-gradient-to-b from-transparent via-pink-500/50 to-transparent" />
        <div className="flex flex-col gap-3 mt-4">
          {socialIcons.map((social, i) => (
            <motion.a
              key={i}
              href="#"
              className="w-9 h-9 rounded-xl bg-white/[0.03] border border-white/[0.08] flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all"
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.95 }}
              aria-label={social.label}
            >
              <social.icon size={16} />
            </motion.a>
          ))}
        </div>
      </motion.div>

      {/* Main content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left content */}
          <motion.div
            className="text-center lg:text-left order-2 lg:order-1"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Badge */}
            <motion.div
              variants={itemVariants}
              className="flex justify-center lg:justify-start"
            >
              <Badge variant="gradient" className="mb-4 sm:mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                PSG College of Technology
              </Badge>
            </motion.div>

            {/* Main heading */}
            <motion.div variants={itemVariants}>
              <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1] tracking-tight">
                <span className="text-white">Step Into the</span>
                <br />
                <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
                  Future of
                </span>
                <br />
                <span className="text-white relative inline-block">
                  Reality
                  <motion.span
                    className="absolute -right-8 sm:-right-12 top-0 sm:top-2 text-xl sm:text-2xl"
                    animate={{ rotate: [0, 15, -15, 0], scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    ✨
                  </motion.span>
                </span>
              </h1>
            </motion.div>

            {/* Description */}
            {/* Description */}
            <motion.p
              variants={itemVariants}
              className="block !my-4 px-6 sm:px-0 text-base sm:text-lg text-gray-400 max-w-xl mx-auto lg:mx-0 leading-relaxed border-l-2 border-purple-500/30 lg:pl-10"
            >
              Experience the ultimate intra-college technical fest. Compete,
              innovate, and showcase your skills in a realm where technology
              meets creativity.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-6 sm:mt-8 justify-center lg:justify-start"
            >
              <Button variant="primary" size="lg" className="">
                <span className="!px-2">Explore Now</span>
                <span className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
                  <ArrowRight
                    size={14}
                    className="group-hover:translate-x-0.5 transition-transform"
                  />
                </span>
              </Button>

              <Button variant="outline" size="lg" className="!px-2 group">
                <span className="w-7 h-7  rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
                  <Play size={12} fill="white" className="ml-0.5" />
                </span>
                <span>Watch Demo</span>
              </Button>
            </motion.div>

            {/* Stats */}
            <motion.div
              variants={itemVariants}
              className="flex flex-wrap items-center justify-center lg:justify-start gap-4 sm:gap-6 !mt-3 sm:mt-10"
            >
              {stats.map((stat, index) => (
                <div key={index} className="flex items-center gap-2.5 sm:gap-3">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-white/[0.08] flex items-center justify-center">
                    <stat.icon size={16} className="text-purple-400" />
                  </div>
                  <div className="text-left">
                    <div className="font-semibold text-sm sm:text-base text-white">
                      {stat.value}
                    </div>
                    <div className="text-[10px] sm:text-xs text-gray-500">
                      {stat.label}
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right side - VR Visual */}
          <motion.div
            className="relative order-1 lg:order-2"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="relative w-full max-w-md mx-auto lg:max-w-none aspect-square">
              {/* Main glowing orb background */}
              <motion.div
                className="absolute inset-[15%] sm:inset-[10%] rounded-full bg-gradient-to-br from-purple-500/20 via-pink-500/10 to-cyan-500/20"
                style={{ filter: "blur(60px)" }}
                animate={{ scale: [1, 1.1, 1], opacity: [0.4, 0.7, 0.4] }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />

              {/* Central VR element */}
              <motion.div
                className="absolute inset-0 flex items-center justify-center"
                animate={{ y: [0, -12, 0] }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <div className="w-40 h-40 sm:w-52 sm:h-52 lg:w-64 lg:h-64 rounded-3xl bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-white/10 backdrop-blur-sm flex items-center justify-center relative overflow-hidden shadow-2xl shadow-purple-500/20">
                  <span className="text-6xl sm:text-7xl lg:text-8xl">🥽</span>
                  <div className="absolute inset-0 bg-gradient-to-t from-purple-500/10 to-transparent" />
                </div>
              </motion.div>

              {/* Floating card 1 - VR Experience */}
              <motion.div
                className="absolute top-4 sm:top-8 right-0 sm:right-4 bg-[#0f0f18]/80 backdrop-blur-xl rounded-2xl p-3 sm:p-4 border border-white/10 shadow-xl"
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0, y: [0, -8, 0] }}
                transition={{
                  opacity: { delay: 0.6, duration: 0.5 },
                  y: { duration: 5, repeat: Infinity, ease: "easeInOut" },
                }}
              >
                <div className="flex items-center gap-2.5 sm:gap-3">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-sm sm:text-base">
                    🎮
                  </div>
                  <div>
                    <div className="text-xs sm:text-sm font-semibold text-white">
                      VR Experience
                    </div>
                    <div className="text-[10px] sm:text-xs text-gray-400">
                      Immersive Tech
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Floating card 2 - Users */}
              <motion.div
                className="absolute bottom-16 sm:bottom-20 left-0 sm:left-4 bg-[#0f0f18]/80 backdrop-blur-xl rounded-2xl p-3 sm:p-4 border border-white/10 shadow-xl"
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0, y: [0, 8, 0] }}
                transition={{
                  opacity: { delay: 0.8, duration: 0.5 },
                  y: {
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 1,
                  },
                }}
              >
                <div className="flex items-center gap-2.5 sm:gap-3">
                  <div className="flex -space-x-1.5 sm:-space-x-2">
                    {["😎", "🤓", "🧑‍💻"].map((emoji, i) => (
                      <div
                        key={i}
                        className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-gradient-to-br from-gray-700 to-gray-800 flex items-center justify-center text-xs sm:text-sm border-2 border-[#0f0f18]"
                      >
                        {emoji}
                      </div>
                    ))}
                  </div>
                  <div>
                    <div className="text-xs sm:text-sm font-semibold text-white">
                      500+ Users
                    </div>
                    <div className="text-[10px] sm:text-xs text-gray-400">
                      Already Registered
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Floating card 3 - Events count */}
              <motion.div
                className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 bg-[#0f0f18]/80 backdrop-blur-xl rounded-2xl p-3 sm:p-4 border border-white/10 shadow-xl"
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0, y: [0, -6, 0] }}
                transition={{
                  opacity: { delay: 1, duration: 0.5 },
                  y: {
                    duration: 7,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 2,
                  },
                }}
              >
                <div className="text-center">
                  <div className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                    20+
                  </div>
                  <div className="text-[10px] sm:text-xs text-gray-400">
                    Events
                  </div>
                </div>
              </motion.div>

              {/* Decorative rings */}
              <motion.div
                className="absolute inset-[12%] sm:inset-[8%] border border-purple-500/10 rounded-full pointer-events-none"
                animate={{ rotate: 360 }}
                transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
              />
              <motion.div
                className="absolute inset-[20%] sm:inset-[16%] border border-pink-500/10 rounded-full pointer-events-none"
                animate={{ rotate: -360 }}
                transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
              />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom decorative line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500/20 to-transparent" />

      {/* Scroll indicator - Hidden on mobile */}
      <motion.div
        className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 hidden sm:block"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-5 h-8 sm:w-6 sm:h-10 rounded-full border-2 border-white/20 flex justify-center pt-1.5 sm:pt-2">
          <motion.div
            className="w-1 h-2 sm:w-1.5 sm:h-3 rounded-full bg-gradient-to-b from-purple-500 to-pink-500"
            animate={{ opacity: [1, 0.3, 1], y: [0, 4, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
