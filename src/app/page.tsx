import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import Journey from "@/components/Journey";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Blog from "@/components/Blog";
import CommunityServices from "@/components/CommunityServices";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <Hero />
      <Journey />
      <Skills />
      <Projects />
      <Blog />
      <CommunityServices />
      <Contact />
      
      {/* Footer */}
      <footer className="py-8 px-6 text-center border-t border-gray-900">
        <p className="text-gray-600 text-sm">
          © {new Date().getFullYear()} Dante Arola. Built with curiosity and too much coffee.
        </p>
      </footer>
    </main>
  );
}
