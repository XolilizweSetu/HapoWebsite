import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Chatbot from './components/Chatbot';
import Home from './pages/Home';
import Solutions from './pages/Solutions';
import Services from './pages/Services';
import About from './pages/About';
import Contact from './pages/Contact';
import Environmental from './pages/esg/Environmental';
import Social from './pages/esg/Social';
import Governance from './pages/esg/Governance';
import Blog from './pages/Blog';
import VerifyEmail from './pages/VerifyEmail';
import Unsubscribe from './pages/Unsubscribe';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';

function App() {
  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Router>
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/solutions" element={<Solutions />} />
            <Route path="/services" element={<Services />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/verify-email" element={<VerifyEmail />} />
            <Route path="/unsubscribe" element={<Unsubscribe />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/esg/environmental" element={<Environmental />} />
            <Route path="/esg/social" element={<Social />} />
            <Route path="/esg/governance" element={<Governance />} />
          </Routes>
        </main>
        <Footer />
        <Chatbot />
      </div>
    </Router>
  );
}

export default App;