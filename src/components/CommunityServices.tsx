"use client";

import { motion } from "framer-motion";

const services = [
  {
    title: "Business Ideas",
    description: "Develop ideas, leverage knowledge & network",
    icon: "💡",
    color: "cyan",
  },
  {
    title: "Personal Finances",
    description: "Need help organizing your finances? Let's work on it together.",
    icon: "💰",
    color: "green",
  },
  {
    title: "Crypto Vision",
    description: "Introduction to Web3 — understand the blockchain revolution",
    icon: "🔮",
    color: "purple",
  },
  {
    title: "Drone Services",
    description: "Mavic Mini for your projects or just fun. Driver & cameraman included!",
    icon: "🚁",
    color: "blue",
  },
  {
    title: "Photo Studio",
    description: "All the basics plus software skills for your visual projects",
    icon: "📸",
    color: "pink",
  },
];

const colorClasses = {
  cyan: "border-cyan-500/30 hover:border-cyan-500/60 hover:shadow-cyan-500/10",
  green: "border-green-500/30 hover:border-green-500/60 hover:shadow-green-500/10",
  purple: "border-purple-500/30 hover:border-purple-500/60 hover:shadow-purple-500/10",
  blue: "border-blue-500/30 hover:border-blue-500/60 hover:shadow-blue-500/10",
  pink: "border-pink-500/30 hover:border-pink-500/60 hover:shadow-pink-500/10",
};

export default function CommunityServices() {
  return (
    <section id="community" className="py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Community <span className="gradient-text">Services</span>
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto mb-2">
            Let&apos;s help each other
          </p>
          <p className="text-gray-500 text-sm max-w-lg mx-auto">
            The idea is to show my different vortex in life. There&apos;s no established price — 
            it&apos;s a matter of sharing & experiencing together.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`group p-6 rounded-2xl bg-gray-900/30 border transition-all hover:shadow-[0_0_30px] cursor-pointer ${
                colorClasses[service.color as keyof typeof colorClasses]
              }`}
            >
              <div className="text-4xl mb-4">{service.icon}</div>
              <h3 className="text-xl font-bold mb-2 group-hover:text-white transition-colors">
                {service.title}
              </h3>
              <p className="text-gray-400 text-sm">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border border-cyan-500/30 rounded-full text-cyan-400 hover:border-cyan-500/60 transition-all"
          >
            Interested? Let&apos;s talk →
          </a>
        </motion.div>
      </div>
    </section>
  );
}
