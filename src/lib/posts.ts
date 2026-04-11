export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  publishedAt: string;
  readMinutes: number;
  views: number;
  tags: string[];
  externalUrl?: string;
};

// TODO(confirm): external URLs for each post (Medium / Substack / Notion / native)?
// Recovered verbatim from the original dantearola.com site.
export const posts: Post[] = [
  {
    slug: "defi-lending-protocols",
    title: "Infinite Guide to Lending Protocols in DeFi",
    excerpt:
      "A comprehensive guide to decentralized finance lending protocols — designed to demystify the concepts, mechanics, and tradeoffs of on-chain credit markets.",
    publishedAt: "Sep 8, 2024",
    readMinutes: 43,
    views: 40,
    tags: ["DeFi", "Blockchain", "Finance"],
  },
  {
    slug: "nft-business-artists",
    title: "NFT for Business & Artists",
    excerpt:
      "How NFTs are reshaping the way businesses and artists connect with their audiences and monetize their work.",
    publishedAt: "Feb 20, 2024",
    readMinutes: 6,
    views: 18,
    tags: ["NFT", "Business", "Art"],
  },
  {
    slug: "identidad-digital",
    title: "Identidad Digital: Cómo puede cambiar tu día a día",
    excerpt:
      "Exploración de cómo la identidad digital está transformando nuestra vida cotidiana y qué podemos esperar en el futuro cercano.",
    publishedAt: "Mar 15, 2024",
    readMinutes: 8,
    views: 25,
    tags: ["Identity", "Web3", "Future"],
  },
  {
    slug: "crypto-marketing-guide",
    title: "The Complete Guide on Crypto Marketing 2022",
    excerpt:
      "Connecting passion with economic value is precisely the job of the crypto-marketer — strategies, ad networks, analytics, and more.",
    publishedAt: "Jul 26, 2022",
    readMinutes: 9,
    views: 3,
    tags: ["Marketing", "Crypto", "Strategy"],
  },
];
