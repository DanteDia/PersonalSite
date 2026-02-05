"use client";

import { motion } from "framer-motion";

const skills = [
  {
    category: "Data & Analytics",
    items: ["Looker Studio", "Power BI", "Python", "SQL", "ETL Pipelines", "Real-time Dashboards"],
    color: "cyan",
  },
  {
    category: "Automation",
    items: ["Zapier", "n8n", "API Integrations", "Zoho Books", "Google Sheets Automation", "Data Flow Architecture"],
    color: "purple",
  },
  {
    category: "Blockchain & Fintech",
    items: ["Token Economics", "Smart Contracts", "DeFi Protocols", "Crypto Analytics", "Project Management", "Business Development"],
    color: "pink",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function Skills() {
  return (
    <section id="skills" className="py-24 px-6 bg-gradient-to-b from-transparent via-gray-900/50 to-transparent">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            What I <span className="gradient-text">Build</span>
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto">
            Systems that turn chaos into clarity. Data that tells stories. Automation that gives you time back.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {skills.map((skill, index) => (
            <motion.div
              key={skill.category}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="p-6 rounded-2xl bg-gray-900/50 border border-gray-800 hover:border-gray-700 transition-all"
            >
              <h3 className={`text-xl font-bold mb-4 ${
                skill.color === "cyan" ? "text-cyan-400" :
                skill.color === "purple" ? "text-purple-400" : "text-pink-400"
              }`}>
                {skill.category}
              </h3>
              <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="flex flex-wrap gap-2"
              >
                {skill.items.map((item) => (
                  <motion.span
                    key={item}
                    variants={itemVariants}
                    className={`px-3 py-1 text-sm rounded-full border ${
                      skill.color === "cyan" ? "border-cyan-500/30 text-cyan-300" :
                      skill.color === "purple" ? "border-purple-500/30 text-purple-300" :
                      "border-pink-500/30 text-pink-300"
                    }`}
                  >
                    {item}
                  </motion.span>
                ))}
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Current focus callout */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="mt-16 p-8 rounded-2xl bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border border-cyan-500/20 text-center"
        >
          <p className="text-cyan-400 text-sm uppercase tracking-wider mb-2">Currently Focused On</p>
          <h3 className="text-2xl md:text-3xl font-bold mb-4">
            End-to-End Data Automation at BIND
          </h3>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Building pipelines that take raw data from extraction through transformation to actionable insights. 
            Making banking data work smarter, not harder.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
