import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import Journey from "@/components/Journey";
import About from "@/components/About";
import WebEvolution from "@/components/WebEvolution";
import DataGraphs from "@/components/DataGraphs";
import TechnicalShowcase from "@/components/TechnicalShowcase";
import Experience from "@/components/Experience";
import SpeakingEvents from "@/components/SpeakingEvents";
import Projects from "@/components/Projects";
import Education from "@/components/Education";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <main className="min-h-screen" style={{ backgroundColor: 'var(--bg-primary)' }}>
      <Navigation />
      <Hero />
      <Journey />
      <About />
      <WebEvolution />
      <DataGraphs />
      <TechnicalShowcase />
      <Experience />
      <SpeakingEvents />
      <Projects />
      <Education />
      <Contact />

      <footer style={{
        padding: '3rem 1.5rem',
        textAlign: 'center',
        borderTop: '1px solid var(--border)',
        backgroundColor: 'var(--bg-alt)'
      }}>
        <p style={{
          fontFamily: "var(--font-mono)",
          fontSize: '0.8rem',
          color: 'var(--text-muted)',
          margin: 0
        }}>
          © {new Date().getFullYear()} Dante Arola. Built with curiosity and too much coffee.
        </p>
      </footer>
    </main>
  );
}
