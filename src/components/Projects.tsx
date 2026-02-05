"use client";

import { motion } from "framer-motion";

const projects = [
  {
    title: "Zoho Books → Looker Studio Pipeline",
    description: "Automated accounting data flow using Zapier and Google Sheets. Real-time financial visualization without the manual export dance.",
    tech: ["Zoho Books", "Zapier", "Google Sheets", "Looker Studio"],
    link: "https://github.com/DanteDia/Zoho-Books-Real-Time-Data-Integration-with-Zapier-and-Looker-Studio",
    status: "Live",
  },
  {
    title: "Excel → Cloud Migration",
    description: "Led BAFA's transformation from Excel-based accounting to a modern cloud platform with real-time dashboards for customer and cash flow management.",
    tech: ["Data Migration", "Dashboard Design", "Process Automation"],
    status: "Completed",
  },
  {
    title: "Oxygen Token Project",
    description: "Business development and project management for a cleantech startup tokenizing native Argentinian forests. Where sustainability meets blockchain.",
    tech: ["Tokenization", "Smart Contracts", "Business Strategy"],
    status: "Ongoing",
  },
];

export default function Projects() {
  return (
    <section id="projects" className="py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Things I&apos;ve <span className="gradient-text">Shipped</span>
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto">
            Projects where I went from &quot;how does this work?&quot; to &quot;here&apos;s the solution.&quot;
          </p>
        </motion.div>

        <div className="space-y-6">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group p-6 rounded-2xl bg-gray-900/30 border border-gray-800 hover:border-cyan-500/30 transition-all hover:shadow-[0_0_40px_rgba(34,211,238,0.1)]"
            >
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-xl font-bold group-hover:text-cyan-400 transition-colors">
                      {project.title}
                    </h3>
                    <span className={`px-2 py-0.5 text-xs rounded-full ${
                      project.status === "Live" ? "bg-green-500/20 text-green-400" :
                      project.status === "Ongoing" ? "bg-cyan-500/20 text-cyan-400" :
                      "bg-gray-500/20 text-gray-400"
                    }`}>
                      {project.status}
                    </span>
                  </div>
                  <p className="text-gray-400 mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-1 text-xs bg-gray-800 text-gray-400 rounded"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                {project.link && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="shrink-0 px-4 py-2 border border-gray-700 rounded-lg text-sm hover:border-cyan-500 hover:text-cyan-400 transition-all"
                  >
                    View on GitHub →
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <a
            href="https://github.com/DanteDia"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-cyan-400 transition-colors"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
            </svg>
            See more on GitHub
          </a>
        </motion.div>
      </div>
    </section>
  );
}
