"use client";

import { motion } from "framer-motion";

const blogPosts = [
  {
    title: "Infinite Guide to Lending Protocols in DeFi",
    excerpt: "Your comprehensive guide on decentralized finance (DeFi) lending protocols, designed to demystify the concepts and processes...",
    date: "Sep 8, 2024",
    readTime: "43 min read",
    views: 40,
    slug: "defi-lending-protocols",
    tags: ["DeFi", "Blockchain", "Finance"],
  },
  {
    title: "NFT for Business & Artists",
    excerpt: "How NFTs are revolutionizing the way businesses and artists interact with their audiences and monetize their work.",
    date: "Feb 20, 2024",
    readTime: "6 min read",
    views: 18,
    slug: "nft-business-artists",
    tags: ["NFT", "Business", "Art"],
  },
  {
    title: "Identidad Digital: Cómo puede cambiar tu día a día",
    excerpt: "Exploración de cómo la identidad digital está transformando nuestra vida cotidiana y qué podemos esperar en el futuro.",
    date: "Mar 15, 2024",
    readTime: "8 min read",
    views: 25,
    slug: "identidad-digital",
    tags: ["Identity", "Web3", "Future"],
  },
  {
    title: "The Complete Guide on Crypto Marketing 2022",
    excerpt: "Connecting passion with economic value is precisely the job of the crypto-marketer. Strategies, ad networks, analytics, and more.",
    date: "Jul 26, 2022",
    readTime: "9 min read",
    views: 3,
    slug: "crypto-marketing-guide",
    tags: ["Marketing", "Crypto", "Strategy"],
  },
];

export default function Blog() {
  return (
    <section id="blog" className="py-24 px-6 bg-gradient-to-b from-transparent via-gray-900/30 to-transparent">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="gradient-text">Blog</span>
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto">
            Insights on DeFi, blockchain, and crypto marketing
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {blogPosts.map((post, index) => (
            <motion.article
              key={post.slug}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group p-6 rounded-2xl bg-gray-900/50 border border-gray-800 hover:border-cyan-500/30 transition-all cursor-pointer hover:shadow-[0_0_40px_rgba(34,211,238,0.1)]"
            >
              <div className="flex flex-wrap gap-2 mb-3">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-0.5 text-xs bg-cyan-500/10 text-cyan-400 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              
              <h3 className="text-xl font-bold mb-2 group-hover:text-cyan-400 transition-colors">
                {post.title}
              </h3>
              
              <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                {post.excerpt}
              </p>
              
              <div className="flex items-center justify-between text-sm text-gray-500">
                <span>{post.date}</span>
                <div className="flex items-center gap-3">
                  <span>{post.readTime}</span>
                  <span>•</span>
                  <span>{post.views} views</span>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <p className="text-gray-500 text-sm">
            More articles coming soon...
          </p>
        </motion.div>
      </div>
    </section>
  );
}
