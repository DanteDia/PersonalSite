"use client";

import { motion } from "framer-motion";

export default function Contact() {
  return (
    <section id="contact" className="py-24 px-6">
      <div className="max-w-3xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Let&apos;s <span className="gradient-text">Connect</span>
          </h2>
          <p className="text-gray-400 mb-12 max-w-xl mx-auto">
            Whether you need help automating data chaos, want to talk blockchain, 
            or just want to swap jungle survival stories—I&apos;m here.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <a
            href="mailto:aroladante@gmail.com"
            className="px-8 py-4 bg-cyan-500 text-black font-semibold rounded-full hover:bg-cyan-400 transition-all hover:scale-105 hover:shadow-[0_0_30px_rgba(34,211,238,0.4)]"
          >
            aroladante@gmail.com
          </a>
          <a
            href="https://www.linkedin.com/in/dante-arola-81456712a/"
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-4 border border-gray-600 text-gray-300 rounded-full hover:border-cyan-500 hover:text-cyan-400 transition-all flex items-center justify-center gap-2"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
            LinkedIn
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-16 pt-8 border-t border-gray-800"
        >
          <p className="text-gray-500 text-sm">
            Based in Argentina 🇦🇷 • Working globally • Usually caffeinated
          </p>
        </motion.div>
      </div>
    </section>
  );
}
