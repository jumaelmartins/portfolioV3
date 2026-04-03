import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { FloatingNav } from './components/FloatingNav';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { Problems } from './components/Problems';
import { Services } from './components/Services';
import { CaseStudies } from './components/CaseStudies';
import { WhyWorkWithMe } from './components/WhyWorkWithMe';
import { Process } from './components/Process';
import { TechStack } from './components/TechStack';
import { Projects } from './components/Projects';
import { FinalCTA } from './components/FinalCTA';
import { Footer } from './components/Footer';
import { AppProvider } from './context/AppContext';

export default function App() {
  return (
    <AppProvider>
      <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors overflow-x-hidden">
        <Header />
        <Hero />
        <FloatingNav />
        <FloatingWhatsApp />
        <Problems />
        <Services />
        <CaseStudies />
        <WhyWorkWithMe />
        <Process />
        <TechStack />
        <Projects />
        <FinalCTA />
        <Footer />
      </div>
    </AppProvider>
  );
}