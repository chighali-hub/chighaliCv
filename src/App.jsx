import Background from './components/background.jsx';
import Navbar from './components/navbar.jsx';
import Hero from './components/hero.jsx';
import About from './components/about.jsx';
import Skills from './components/skills.jsx';
import Projects from './components/projects.jsx';
import Parcours from './components/parcours.jsx';
import Contact from './components/contact.jsx';
import Footer from './components/footer.jsx';

export default function App() {
  return (
    <>
      <Background />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Parcours />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
