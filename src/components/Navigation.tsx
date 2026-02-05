"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-black/80 backdrop-blur-lg border-b border-gray-800" : ""
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <a href="#" className="text-xl font-bold gradient-text">
          DA
        </a>
        <div className="flex items-center gap-6">
          <a href="#journey" className="text-sm text-gray-400 hover:text-cyan-400 transition-colors">
            Journey
          </a>
          <a href="#skills" className="text-sm text-gray-400 hover:text-cyan-400 transition-colors">
            Skills
          </a>
          <a href="#projects" className="text-sm text-gray-400 hover:text-cyan-400 transition-colors">
            Projects
          </a>
          <a
            href="#contact"
            className="text-sm px-4 py-2 bg-cyan-500/10 text-cyan-400 rounded-full hover:bg-cyan-500/20 transition-colors"
          >
            Contact
          </a>
        </div>
      </div>
    </motion.nav>
  );
}
