import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import WebEvolution from "@/components/WebEvolution";
import DataGraphs from "@/components/DataGraphs";
import TechnicalShowcase from "@/components/TechnicalShowcase";
import DictionaryCard from "@/components/DictionaryCard";
import EmbeddedXPost from "@/components/EmbeddedXPost";
import Projects from "@/components/Projects"; // Keep this as it's still relevant

export default function Home() {
  return (
    <main className="min-h-screen" style={{ backgroundColor: 'var(--bg-primary)' }}>
      <Navigation />
      <Hero />
      <WebEvolution />
      <DataGraphs />
      <TechnicalShowcase />
      <DictionaryCard />
      <Projects />
      <EmbeddedXPost />
      
      <footer style={{ 
        padding: '3rem 1.5rem', 
        textAlign: 'center', 
        borderTop: '1px solid var(--border)',
        backgroundColor: 'var(--bg-alt)'
      }}>
        <p style={{ 
          fontFamily: "'JetBrains Mono', monospace", 
          fontSize: '0.8rem', 
          color: 'var(--text-muted)',
          margin: 0 
        }}>
          © {new Date().getFullYear()} Dante Arola. Built at the edge of tomorrow.
        </p>
      </footer>
    </main>
  );
}
