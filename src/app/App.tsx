import { AppProvider } from './context/AppContext';
import { PortfolioProvider } from './context/PortfolioContext';
import { Background } from './components/Background';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { StackMarquee } from './components/StackMarquee';
import { About } from './components/About';
import { Services } from './components/Services';
import { Projects } from './components/Projects';
import { CaseStudies } from './components/CaseStudies';
import { Blog } from './components/Blog';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';

export default function App() {
  return (
    <AppProvider>
      <PortfolioProvider>
        <div style={{ position: 'relative', width: '100%', maxWidth: '100vw', background: '#0A0A0D', overflowX: 'hidden' }}>
          <Background />
          <Header />
          <Hero />
          <StackMarquee />
          <About />
          <Services />
          <Projects />
          <CaseStudies />
          <Blog />
          <Contact />
          <Footer />
        </div>
      </PortfolioProvider>
    </AppProvider>
  );
}
