"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const journeyData = [
  {
    period: "The Foundation",
    title: "Neuroscience, Improv & Sound",
    location: "Finland 🇫🇮",
    description: "Living at -25°C, alternating between saunas and ice lake baths. Studied neuroscience, performed improv, engineered sound.",
    highlight: "Built adaptability in extreme conditions",
    icon: "🧠",
  },
  {
    period: "The Reset",
    title: "6 Months in the Jungle",
    location: "Brazil 🇧🇷",
    description: "Solo permaculture deep in the Amazon. Self-sustained living. No internet, no shortcuts—just systems that had to work.",
    highlight: "Learned that everything is figureoutable",
    icon: "🌿",
  },
  {
    period: "The Pivot",
    title: "Blockchain & Startups",
    location: "Argentina 🇦🇷",
    description: "Project Manager at Oxygen—tokenizing and monetizing native forests. Business development in the crypto frontier.",
    highlight: "Where sustainability meets blockchain",
    icon: "🔗",
  },
  {
    period: "Now",
    title: "Data Automation at Scale",
    location: "BIND (Banco Industrial)",
    description: "Building data pipelines from extraction to analysis. Automating the flow of financial intelligence.",
    highlight: "Making banking data dance",
    icon: "📊",
  },
];

function JourneyCard({ item, index }: { item: typeof journeyData[0]; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, delay: 0.2 }}
      className={`flex items-center gap-8 ${index % 2 === 0 ? "flex-row" : "flex-row-reverse"}`}
    >
      {/* Card */}
      <div className="flex-1 p-6 bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl border border-gray-700 hover:border-cyan-500/50 transition-all hover:shadow-[0_0_30px_rgba(34,211,238,0.1)]">
        <div className="flex items-center gap-3 mb-3">
          <span className="text-3xl">{item.icon}</span>
          <div>
            <p className="text-cyan-400 text-sm uppercase tracking-wider">{item.period}</p>
            <h3 className="text-xl font-bold">{item.title}</h3>
          </div>
        </div>
        <p className="text-gray-500 text-sm mb-3">{item.location}</p>
        <p className="text-gray-300 mb-4">{item.description}</p>
        <p className="text-sm text-cyan-400/80 italic">→ {item.highlight}</p>
      </div>

      {/* Timeline dot */}
      <div className="hidden md:flex flex-col items-center">
        <div className="w-4 h-4 bg-cyan-400 rounded-full glow" />
        {index < journeyData.length - 1 && (
          <div className="w-0.5 h-24 bg-gradient-to-b from-cyan-400 to-transparent" />
        )}
      </div>

      {/* Spacer for alternating layout */}
      <div className="flex-1 hidden md:block" />
    </motion.div>
  );
}

export default function Journey() {
  return (
    <section id="journey" className="py-24 px-6 max-w-5xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <h2 className="text-4xl md:text-5xl font-bold mb-4">
          The <span className="gradient-text">Path</span>
        </h2>
        <p className="text-gray-400 max-w-xl mx-auto">
          Not a linear career. A series of deep dives into whatever needed figuring out.
        </p>
      </motion.div>

      <div className="space-y-8 md:space-y-0">
        {journeyData.map((item, index) => (
          <JourneyCard key={index} item={item} index={index} />
        ))}
      </div>
    </section>
  );
}
