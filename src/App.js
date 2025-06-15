import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Projects from './pages/Projects';
import ProjectDetail from './pages/ProjectDetail';
import FeatureDetail from './pages/FeatureDetail';
import Contact from './pages/Contact'; // Ensure this path is correct
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/projects/:id" element={<ProjectDetail />} />
            <Route path="/projects/:projectId/features/:featureId" element={<FeatureDetail />} />
            <Route path="/contact" element={<Contact />} /> {/* Contact Route */}
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;