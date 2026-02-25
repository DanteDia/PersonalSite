import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Education from "@/components/Education";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <main className="min-h-screen" style={{ backgroundColor: '#faf8f4' }}>
      <Navigation />
      <Hero />
      <About />
      <Experience />
      <Projects />
      <Education />
      <Contact />
      
      {/* Footer */}
      <footer style={{ 
        padding: '2rem 0', 
        textAlign: 'center', 
        borderTop: '1px solid #e5e3df',
        backgroundColor: '#f5f3ef'
      }}>
        <p style={{ 
          fontFamily: "'JetBrains Mono', monospace", 
          fontSize: '0.8rem', 
          color: '#6a6a6a',
          margin: 0 
        }}>
          © {new Date().getFullYear()} Dante Arola. Built with care.
        </p>
      </footer>
    </main>
  );
}
