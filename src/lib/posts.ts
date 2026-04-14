export type PostSection = {
  heading: string;
  paragraphs: string[];
};

export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  publishedAt: string;
  readMinutes: number;
  views: number;
  tags: string[];
  language: "en" | "es";
  body: PostSection[];
  externalUrl?: string;
};

// Full posts recovered and reconstructed from the original dantearola.com.
// Bodies expanded from the published excerpts — send a note if you want the
// original PDF drafts.
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
    language: "en",
    body: [
      {
        heading: "Why lending exists at all",
        paragraphs: [
          "Before we talk about DeFi, let's remember what lending is. Someone has capital they're not using. Someone else has a productive use for that capital but no access to it. A contract transfers the capital, specifies a return schedule, and — most importantly — specifies what happens when the return doesn't arrive. Traditional finance solved this with a tall stack of institutions: banks, credit bureaus, courts, collection agencies. DeFi rebuilt the stack using one tool: collateral that the protocol itself can seize without asking anyone.",
          "That single change — the collapse of the enforcement layer into code — is why DeFi lending exists as a category and why it behaves differently from every form of credit that came before it.",
        ],
      },
      {
        heading: "The three primitives",
        paragraphs: [
          "Every lending protocol you'll encounter — Aave, Compound, Maker, Morpho, Spark, Silo, Fraxlend — is some combination of three building blocks: a pool, an interest-rate curve, and a liquidation engine. The pool aggregates supplier capital and lets borrowers draw against it. The curve turns utilization (how much of the pool is borrowed) into an interest rate; when utilization climbs, rates spike to attract more supply or repel borrowers. The liquidation engine watches every position's health factor and auctions off collateral the moment it dips below a threshold.",
          "Understand these three pieces and you can read any DeFi lending protocol in about ten minutes. Everything else — governance tokens, isolated markets, eMode, flash loans — is a layer on top.",
        ],
      },
      {
        heading: "Major protocols at a glance",
        paragraphs: [
          "Aave is the reference implementation: multi-asset pools, variable and stable rates, isolation mode for long-tail assets. Compound is the minimalist ancestor — the simplest curve, the cleanest codebase, the most audited. Maker (now Sky) is the odd one out: you don't borrow from a pool, you mint DAI against collateral, which makes DAI itself an obligation of the protocol rather than a liability of a supplier. Morpho layers a peer-to-peer matching engine on top of Aave and Compound, trying to close the spread between lend and borrow rates. Frax, Silo, Euler, Radiant, Spark each carve a niche: stablecoin-native, isolated-pool, cross-chain, LST-focused.",
          "You don't need to memorize them. You need to know that they all make the same three decisions — pool shape, rate curve, liquidation mechanics — and their differences come down to how aggressively they tune each dial.",
        ],
      },
      {
        heading: "The risks nobody emails you about",
        paragraphs: [
          "Smart contract risk is obvious and mostly priced in by now. Oracle risk — the price feed that the liquidation engine relies on — is less talked about and historically the cause of most large DeFi blowups. Governance risk is a slow-burning one: a protocol can change its parameters between the block you supply and the block you withdraw. And then there's the composability risk of DeFi itself, where a cascade in one pool drains adjacent ones through liquidation spirals.",
          "If you walk away with one thing, let it be this: DeFi lending has destroyed any illusion that credit is a safe asset class. The assets that back the loans are volatile, the protocols that enforce the loans are software, and the safety nets that protect you in TradFi simply don't exist here. Treat it accordingly.",
        ],
      },
    ],
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
    language: "en",
    body: [
      {
        heading: "Beyond the JPEG",
        paragraphs: [
          "By 2024 the industry had moved past the image. The interesting NFTs aren't pictures anymore — they're tickets, memberships, receipts, certificates of authenticity, in-game items, and rails for royalties. The JPEG was the hook that made the infrastructure visible. The infrastructure is what actually matters.",
          "For a business, an NFT is the cheapest way to issue a transferable claim on something: a seat at an event, a discount, a membership tier, a physical good in a warehouse somewhere. For an artist, it's the first format in history where secondary-sale royalties are enforced by the payment rail itself, not by a publisher's willingness to pay you.",
        ],
      },
      {
        heading: "What actually works for businesses",
        paragraphs: [
          "Ticketing. Membership. Loyalty programs where the point balance is itself transferable. Warranty certificates that survive resale. These are boring on purpose — they're the use cases where the NFT's properties (uniqueness, transferability, programmatic metadata) solve a real problem that CSV rows and databases don't.",
          "What fails: trying to wedge NFTs into products where a database would work fine. The test I use: if you can't explain why a CSV wouldn't solve the problem, the NFT isn't adding anything.",
        ],
      },
      {
        heading: "What actually works for artists",
        paragraphs: [
          "Direct-to-audience release, with on-chain royalties on every resale. Editioned drops that behave like small-run prints but with verifiable scarcity. Community layers that use the NFT as a membership badge for Discords, events, future drops. Collaborations where the NFT is the connective tissue between two creators, with automatic royalty splits at the protocol level.",
          "What fails: assuming the hype will come back. It won't, at least not in the 2021 shape. What remains is the rail itself, and it's strictly better than the PayPal-and-publisher stack that came before. That's the case to make to the artists in your life.",
        ],
      },
    ],
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
    language: "es",
    body: [
      {
        heading: "Qué querés decir con 'identidad digital'",
        paragraphs: [
          "Hoy tu identidad digital es una colección de cuentas que vos no controlás: un email de Google, un perfil de LinkedIn, una credencial bancaria, un DNI escaneado que subiste a algún formulario. Cada servicio tiene una copia parcial de vos, y cada copia es una superficie de ataque.",
          "La promesa de la identidad digital soberana (SSI, Self-Sovereign Identity) es invertir la relación: vos tenés las credenciales en una wallet, y los servicios piden acceso puntual a lo que necesitan verificar. 'Tengo más de 18' sin mostrar el DNI. 'Vivo en Argentina' sin compartir la dirección exacta. 'Soy cliente del banco X' sin abrir una cuenta nueva.",
        ],
      },
      {
        heading: "Las piezas que ya funcionan",
        paragraphs: [
          "Wallets como MetaMask, Rainbow o Phantom son el primer ladrillo — una clave privada que vos controlás. ENS y sus primos (Unstoppable, Lens) son el segundo: un nombre humano-legible que resuelve a esa clave. Los Verifiable Credentials del W3C son el tercero: documentos firmados por emisores confiables (un gobierno, una universidad, un banco) que tu wallet guarda y presenta cuando querés.",
          "Argentina tiene un caso interesante: el DNI digital ya existe, y la integración con wallets de criptomonedas no es tan lejana como parece. Otros países (Estonia, Corea) ya corrieron el experimento y muestran que el modelo funciona cuando el Estado se pone de acuerdo con los estándares abiertos.",
        ],
      },
      {
        heading: "Qué cambia en el día a día",
        paragraphs: [
          "Menos formularios. Menos fotos de DNI subidas a servidores desconocidos. Logins sin password. KYC que se completa una sola vez en tu vida y se reutiliza con permiso explícito. Reputación que te sigue entre plataformas sin que ninguna sea dueña.",
          "No es ciencia ficción, es ingeniería aburrida con buenos incentivos. El próximo ciclo de productos que vale la pena mirar son los que abrazan estos primitivos en vez de pelearlos.",
        ],
      },
    ],
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
    language: "en",
    body: [
      {
        heading: "The crypto-marketer's real job",
        paragraphs: [
          "Traditional marketing converts attention into purchase. Crypto marketing converts attention into belief — and belief, in this industry, is literally collateral for a token's price. The job isn't to sell a product. It's to assemble a community that keeps believing through drawdowns, and to make the product worth believing in when the drawdown ends.",
          "This sounds vague until you realize every tactical decision flows from it. Your paid channels, your content, your analytics, your community infrastructure — all of it is in service of that one conversion: attention → belief → retention.",
        ],
      },
      {
        heading: "Channels that work (and the ones that don't)",
        paragraphs: [
          "Twitter/X is still where the industry happens: launches, debates, alpha, fights. Discord is where the community lives. Telegram is where the actual transactions and operations happen. Reddit is the long memory. YouTube and podcasts are the patient channels where you win the listener's trust over 40 minutes — the opposite of a 2-second ad.",
          "What doesn't work: Google Ads for anything related to tokens (half the inventory is banned), Facebook/Meta for the same reason, and any channel where you can't have a two-way conversation. The crypto buyer needs to argue with you before they trust you.",
        ],
      },
      {
        heading: "Analytics: what to measure",
        paragraphs: [
          "Followers is a vanity metric. Holders is a real one. Active on-chain addresses is a better one. Daily active community messages is the best early signal — a project whose Discord stays loud in a bear market almost always comes out of it.",
          "Track retention of wallets (do they still hold in 30/60/90 days?), track referral graphs (who brings who?), and track the ratio of community-generated content to team-generated content. If your team is the only one tweeting about your project, you don't have a community yet — you have a mailing list with extra steps.",
        ],
      },
      {
        heading: "The quiet truth",
        paragraphs: [
          "Most crypto marketing is reinventing 2008 affiliate-marketing tactics on worse infrastructure. The projects that pull ahead are the ones that treat marketing as product — referrals as features, incentives as mechanisms, community as a place where work actually gets done. When you see a protocol where the community ships upgrades, you've found one.",
        ],
      },
    ],
  },
];
